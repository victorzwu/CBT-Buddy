import { SafeAreaView, Text, Button, TextInput, StyleSheet, ImageBackground,   TouchableOpacity} from "react-native";
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
    <ImageBackground source={require("../../assets/background.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.label}>Email Address</Text> */}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter Email Address"
        />
        {/* <Text style={styles.label}>Password</Text> */}
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your Password"
          secureTextEntry={true}
        />
        {/* <Text style={styles.label}>Confirm password</Text> */}
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirm the Password"
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "100%",
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 18,
    marginBottom: 30,
    color: COLORS.text,
  },
  // label: {
  //   color: COLORS.text,
  //   fontSize: 18,
  //   marginBottom: 10,
  // },
  button: {
    // backgroundColor: COLORS.darksilver,
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