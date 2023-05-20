import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { storage } from "../../Firebase/firebase-setup";
import { COLORS } from "../../color";
import { update } from "../../Firebase/firestore";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Button from "../../Components/Button";
import { firestore, auth } from "../../Firebase/firebase-setup";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import { useJournal } from "../../Contexts/JournalContext";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function AddPhotoAndLocation({ navigation }) {
  const { formData, setFormData, data, getData } = useJournal();

  const [image, setImage] = useState("");
  const [cameraImage, setCameraImage] = useState("");

  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function fetchImageData(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf("/") + 1);
    const imageRef = await ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytesResumable(imageRef, blob);
    return uploadResult.metadata.fullPath;
  }

  const verifyPermission = async () => {
    if (permissionInfo.granted == true) {
      return true;
    }
    await requestPermission();
    return permissionInfo.granted;
  };

  const takePicture = async () => {
    const permissionReceived = await verifyPermission();
    if (permissionReceived == false) {
      Alert.alert("You need to give camera permissions");
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      setCameraImage(result.assets[0].uri);
      //imageUriHandler(imageUri);
      let cameraUri = await fetchImageData(result.assets[0].uri);
      setFormData({
        ...formData,
        photo: `${cameraUri}`,
      });
      if (formData.id) {
        update(formData.id, {
          photo: `${cameraUri}`,
        });
        getData();
        navigation.goBack();
      }
    } catch (err) {
      console.log("image error: ", err);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      // let uri = result.uri;
      let uri = result.assets[0].uri;
      let imgBlob = await getImageBlob(uri);
      let uuid = moment().valueOf();
      const storageRef = ref(storage, `${uuid}_img`);
      uploadBytes(storageRef, imgBlob)
        .then((snapshot) => {
          // console.log("Uploaded a blob!");
          setFormData({
            ...formData,
            photo: `${uuid}_img`,
          });
          setImage(uri);
          if (formData.id) {
            update(formData.id, {
              photo: `${uuid}_img`,
            });
            Alert.alert("WOW", "Edit Success!");
            getData();
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log("err = ", err);
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tit}>Photo And Location</Text>
      <View style={styles.itemBox}>
        <Text style={styles.itemTip}>Tap the photo</Text>
        <TouchableOpacity onPress={pickImage} style={styles.item}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <FontAwesome name="photo" size={80} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.itemBox}>
        <Text style={styles.itemTip}>Tap the camera</Text>
        <TouchableOpacity onPress={takePicture} style={styles.item}>
          {cameraImage ? (
            <Image source={{ uri: cameraImage }} style={styles.image} />
          ) : (
            <AntDesign name="camera" size={100} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
      {!formData.id && (
        <View style={styles.itemBox}>
          <Text style={styles.itemTip}>Tap the map</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Map", { screen: "Journal" });
            }}
            style={styles.itemMap}
          >
            <FontAwesome5
              name="map-marker-alt"
              size={100}
              color={COLORS.yellow}
            />
          </TouchableOpacity>
        </View>
      )}
      {!formData.id && (
        <View style={styles.btnBox}>
          <Button
            onPress={async () => {
              // auth
              // auth.currentUser.email
              await addDoc(collection(firestore, "journals"), {
                ...formData,
                email: auth.currentUser.email,
              });
              Alert.alert("Congratulations", "ADD Success!");
              getData();
              navigation.navigate("JournalList");
              // setFormData({
              //   ...formData,
              //   detail: value,
              // });
              // if (formData.id) {
              //   update(formData.id, {
              //     detail: value,
              //   });
              //   Alert.alert("Edit Success!");
              //   getData();
              //   navigation.goBack();
              // } else {
              //   navigation.navigate({
              //     name: "AddPhotoAndLocation",
              //   });
              // }
            }}
            title="Submit"
          />
          <View style={styles.submitBtn}></View>
          <Button
            onPress={() => {
              setImage(null);
              setCameraImage(null);
              setFormData({
                ...formData,
                location: "",
                photo: "",
              });
            }}
            danger={true}
            title="Reset"
          ></Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tit: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 30,
  },
  itemBox: {
    alignItems: "center",
    marginTop: 30,
  },
  item: {
    width: 120,
    height: 120,
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  itemTip: {
    paddingVertical: 10,
    fontSize: 16,
  },
  itemMap: {
    width: 120,
    height: 120,
    borderWidth: 4,
    borderColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  submitBtn: {
    marginRight: 80,
  },
});
