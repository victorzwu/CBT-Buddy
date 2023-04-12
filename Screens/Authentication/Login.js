import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground } from "react-native";
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
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Welcome CBT-Buddy!</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signUp}>
            <Text style={styles.signupText}>
              Not registered yet? Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  form: {
    width: "80%",
    alignItems: "center",
    marginTop: "1%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    color: COLORS.text,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    borderRadius: 20,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "100%",
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
