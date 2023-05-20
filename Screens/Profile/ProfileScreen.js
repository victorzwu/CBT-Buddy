import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, storage } from "../../Firebase/firebase-setup";
import { signOut } from "firebase/auth";
import Button from "../../Components/Button";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../color";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from "moment";
import { update } from "../../Firebase/firestore";
import { doc, db,getDoc } from "firebase/firestore";
import { uploadAvatar } from "../../Firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";


export default function ProfileScreen() {
  const [avatar, setAvatar] = useState("");
  useEffect(()=> {
    async function getUri () {
      const docRef = doc(firestore, "avatar", auth.currentUser.uid);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const downloadUrl = await getDownloadURL(ref(storage, data.uri));
        setAvatar(downloadUrl)
        console.log("Download", downloadUrl);
      }
    }
    getUri()
  }, [])

  const getImageBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (err) {
      console.log("fetch image ", err);
    }
  };

  const openImagePickerAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);

      let uri = result.assets[0].uri;
      let imgBlob = await getImageBlob(uri);
      let uuid = moment().valueOf();
      const storageRef = ref(storage, `Avatar/${uuid}_img`);
      uploadBytes(storageRef, imgBlob)
        .then((snapshot) => {
          // console.log("Uploaded a blob!", snapshot);
          uploadAvatar(`Avatar/${uuid}_img`, auth.currentUser.uid)
          // setFormData({
          //   ...formData,
          //   photo: `${uuid}_img`,
          // });
          // if (formData.id) {
          //   update(formData.id, {
          //     photo: `${uuid}_img`,
          //   });
          //   Alert.alert("WOW", "Edit Success!");
          // }
        })
        .catch((err) => {
          console.log("err = ", err);
        });
    }
  };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     allowsMultipleSelection: false,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     // let uri = result.uri;
  //     let uri = result.assets[0].uri;
  //     let imgBlob = await getImageBlob(uri);
  //     let uuid = moment().valueOf();
  //     const storageRef = ref(storage, `Avatar/${uuid}_img`);
  //     uploadBytes(storageRef, imgBlob)
  //       .then((snapshot) => {
  //         // console.log("Uploaded a blob!");
  //         setFormData({
  //           ...formData,
  //           photo: `${uuid}_img`,
  //         });
  //         setImage(uri);
  //         if (formData.id) {
  //           update(formData.id, {
  //             photo: `${uuid}_img`,
  //           });
  //           Alert.alert("WOW", "Edit Success!");
  //           // getData();
  //           navigation.goBack();
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("err = ", err);
  //       });
  //   }
  // };

  const changeAvatar = () => {
    openImagePickerAsync();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={changeAvatar}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text>Email: {auth.currentUser.email}</Text>

      <View style={styles.signOutButton}>
        <Button
          onPress={() => {
            signOut(auth);
          }}
          title="Sign Out"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden",
    marginBottom: 20,
  },
  avatarImage: {
    height: "100%",
    width: "100%",
  },
  avatarPlaceholder: {
    height: "100%",
    width: "100%",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  signOutButton: {
    marginTop: 20,
  },
});
