import { View, Text, TextInput, Button, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase-setup";
import { COLORS } from "../../color";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log("login err ", err);
    }
  };
  function signUp() {
    navigation.replace("SignUp");
  }

  return (
    <SafeAreaView style = {styles.container}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter Email"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter Password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={login} />
      <Button title="Not registered? Make an account" onPress={signUp} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.second,
  },
});