import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { auth } from "../../Firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const login = () => {
    navigation.replace("Login");
  };

  const signUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("The passwords don't match");
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log("Auth error ", err);
    }
  };

  return (
    <View>
      <Text>Email Address</Text>
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
      />
      <Text>Confirm password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholder="Confirm Password"
      />
      <Button title="Register" onPress={signUp} />
      <Button title="Already Registered? Login" onPress={login} />
    </View>
  );
}
