import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase-setup";
import { COLORS } from "../../color";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [biometricFailed, setBiometricFailed] = useState(false);
  const [biometricFailText, setBiometricFailText] = useState(false);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginFailed(true);
      console.log("login err ", err);
    }
  };

  function signUp() {
    navigation.replace("SignUp");
  }

  async function onBiometric() {
    try {
      const isCompatible = await LocalAuthentication.hasHardwareAsync();
      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        throw new Error("No Faces / Fingers found.");
      }

      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        const storedData = await SecureStore.getItemAsync("user");
        const userData = JSON.parse(storedData);
        if (userData !== null) {
          await signInWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          );
        }
      }
    } catch (err) {
      setBiometricFailed(true);
      setBiometricFailText(err.message);
      console.log("biometric error", err);
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
          <Text style={styles.title}>Welcome to CBT Buddy!</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (loginFailed) {
                setLoginFailed(false);
              }
              if (biometricFailed) {
                setBiometricFailed(false);
              }
            }}
            placeholder="Email"
          />
          <View style={styles.failureContainer}>
            {loginFailed && (
              <Text style={styles.failureText}>
                Your email or password is incorrect.
              </Text>
            )}
          </View>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (loginFailed) {
                setLoginFailed(false);
              }
              if (biometricFailed) {
                setBiometricFailed(false);
              }
            }}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onBiometric}>
            <Text style={styles.buttonText}>Biometric Authentiation</Text>
          </TouchableOpacity>

          <View style={styles.failureContainer}>
            {biometricFailed && (
              <Text style={styles.failureText}>{biometricFailText}</Text>
            )}
          </View>

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
  icon: { width: 80, height: 80, margin: 30 },
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
    color: COLORS.textColor,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 5,
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
  failureContainer: {
    flexDirection: "row",
    width: "100%",
  },
  failureText: {
    color: COLORS.white,
  },

  signupText: {
    color: COLORS.white,
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
