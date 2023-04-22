import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert} from "react-native";
import { auth, storage } from "../../Firebase/firebase-setup";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../../Components/Button";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../color";
import { getTime } from "date-fns";

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

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

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        console.log('Selected Asset:', asset);

        setNewAvatar(asset.uri);
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const timestamp = getTime(new Date());
        const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/${timestamp}`);

        setLoading(true);
        await uploadBytes(storageRef, blob);
        const newAvatarUrl = await getDownloadURL(storageRef);
        setAvatar(newAvatarUrl);
        setNewAvatar(null);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error in openImagePickerAsync:', error);
    }
  };

  const changeAvatar = () => {
    Alert.alert(
      "Change Avatar",
      "Are you sure you want to change your avatar?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => openImagePickerAsync() },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={changeAvatar} disabled={loading}>
          {newAvatar ? (
            <Image source={{ uri: newAvatar }} style={styles.avatarImage} />
          ) : (
            avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>Photo</Text>
              </View>
            )
          )}
          {loading && <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />}
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
    position: "relative",
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
    loadingIndicator: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    },
    });
