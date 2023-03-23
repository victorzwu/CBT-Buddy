import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Login from "./Screens/Authentication/Login";
import SignUp from "./Screens/Authentication/SignUp";

export default function App() {
  const Stack = createNativeStackNavigator();

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen name="Home" component={Home} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {AppStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
