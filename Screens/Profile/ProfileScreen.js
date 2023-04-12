import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../../Firebase/firebase-setup";
import { signOut } from "firebase/auth";
import Button from "../../Components/Button";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState("");

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
    backgroundColor: "#fff",
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