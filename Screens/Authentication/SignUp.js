import {
  SafeAreaView,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../Firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { COLORS } from "../../color";

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={login}>
          <Text style={styles.signupText}>
          Already Registered? Login
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    marginRight: 225,
    color: COLORS.white,
  },
  input: {
    width: "80%",
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  label: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 8,
  },
  
  button: {
    backgroundColor: COLORS.primary,
    width: "80%",
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: COLORS.white,
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
