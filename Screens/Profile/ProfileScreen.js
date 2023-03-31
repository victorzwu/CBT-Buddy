import { View, Text, Pressable } from "react-native";
import React from "react";
import { auth } from "../../Firebase/firebase-setup";
import { signOut } from "firebase/auth";


export default function ProfileScreen() {
  return (
    <View>
      <Text>Email: {auth.currentUser.email}</Text>
      <Pressable
        onPress={() => {
          signOut(auth);
        }}
      >
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}
