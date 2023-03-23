import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CBT from "./CBT/CBT";
import Journal from "./Journal/Journal";
import Relaxation from "./Relaxation/Relaxation";
import Resources from "./Resources/Resources";
import Profile from "./Profile/Profile";

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="CBT" component={CBT} options={{ headerShown: false }}/>
      <Tab.Screen name="Journal" component={Journal}/>
      <Tab.Screen name="Relaxation" component={Relaxation}/>
      <Tab.Screen name="Resources" component={Resources}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  );
}
