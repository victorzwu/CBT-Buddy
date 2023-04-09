import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { storage } from "../../Firebase/firebase-setup";
import { COLORS } from "../../color";
import { update } from "../../Firebase/firestore";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { ref, uploadBytes } from "firebase/storage";
import moment from "moment";

export default function Com({ formData, setFormData, navigation, getData }) {
  const [image, setImage] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const getImageBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (err) {
      console.log("fetch image ", err);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);


  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      // setImage(result.uri);
      let uri = result.assets[0].uri;
      let imgBlob = await getImageBlob(uri);
      let uuid = moment().valueOf();
      const storageRef = ref(storage, `${uuid}_img`);
      uploadBytes(storageRef, imgBlob)
        .then((snapshot) => {
          console.log("Uploaded a blob!");
          setFormData({
            ...formData,
            photo: `${uuid}_img`,
          });
          setCameraImage(uri);
          if (formData.id) {
            update(formData.id, {
              photo: `${uuid}_img`,
            });
            alert("Edit Success!");
            getData();
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log("err = ", err);
        });
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
            alert("Edit Success!");
            getData();
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log("err = ", err);
        });
    }
  };

  useEffect(() => {
    // get image
    // getDownloadURL(ref(storage, "some-child")).then((url) => {
    //   console.log("url = ", url);
    //   setImage(url);
    // });
  }, []);

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
      <View style={styles.itemBox}>
        <Text style={styles.itemTip}>Tap the map</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map", {screen: "Journal"});
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
});
