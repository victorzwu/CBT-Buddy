import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { auth } from "../../Firebase/firebase-setup";
import { signOut } from "firebase/auth";
import { COLORS } from "../../color";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>
        <Text style={styles.boldText}>Email: </Text>
        <Text>{auth.currentUser.email}</Text>
      </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // alignItems: "center",
    // justifyContent: "center",
  },
  pressable: {
    backgroundColor: COLORS.grey,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 8,
    },
    marginHorizontal: 30,
    marginVertical: 15,
    padding: 30,
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 16,
    borderRadius: 4,
  },
  normalText: {
    fontSize: 30,
    fontFamily: "Futura",
    color: COLORS.white,
  },
  boldText: {
    fontWeight: "bold",
  },
});
