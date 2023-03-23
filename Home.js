import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CBT from "./Screens/CBT/CBT";
import Journal from "./Screens/Journal/Journal";
import Profile from "./Screens/Profile/Profile";
import Relaxation from "./Screens/Relaxation/Relaxation";
import Resources from "./Screens/Resources/Resources";

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Journal">
        {(props) => <Journal {...props} />}
      </Tab.Screen>
      <Tab.Screen name="CBT">{(props) => <CBT {...props} />}</Tab.Screen>
      <Tab.Screen name="Relaxation">
        {(props) => <Relaxation {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Resources">
        {(props) => <Resources {...props} />}
      </Tab.Screen>
      {/* <Tab.Screen name="Profile">
        {(props) => <Profile {...props} />}
      </Tab.Screen> */}
    </Tab.Navigator>
  );
}
