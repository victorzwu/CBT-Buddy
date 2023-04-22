import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, storage } from "../../Firebase/firebase-setup";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../../Components/Button";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../color";
import { getTime } from "date-fns";

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState("");
  

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarUrl = await getDownloadURL(ref(storage, `avatars/${auth.currentUser.uid}`));
        setAvatar(avatarUrl);
      } catch (error) {
        console.log("Error fetching avatar:", error);
      }
    };
    fetchAvatar();
  }, []);

  const openImagePickerAsync = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
  
      // console.log('Image Picker Result:', result);
  
      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        console.log('Selected Asset:', asset);
  
        setAvatar(asset.uri);
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const timestamp = getTime(new Date());
        const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/${timestamp}`);

        // const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, blob);
      }
    } catch (error) {
      console.log('Error in openImagePickerAsync:', error);
    }
  };
  

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
