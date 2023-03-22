import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CBT from "./Screens/CBT/CBT";
import Journal from "./Screens/Journal/Journal";
import Profile from "./Screens/Profile/Profile";
import Relaxation from "./Screens/Relaxation/Relaxation";
import Resources from "./Screens/Resources/Resources";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Journal">
          {(props) => <Journal {...props} />}
        </Tab.Screen>
        <Tab.Screen name="CBT">{(props) => <CBT {...props} />}</Tab.Screen>
        {/* <Tab.Screen name="Relaxation">
          {(props) => <Relaxation {...props} />}
        </Tab.Screen> */}
        <Tab.Screen name="Resources">
          {(props) => <Resources {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => <Profile {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
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
