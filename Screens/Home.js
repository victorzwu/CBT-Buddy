import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from '../color';
import CBT from "./CBT/CBT";
import Journal from "./Journal/Journal";
import Relaxation from "./Relaxation/Relaxation";
import Resources from "./Resources/Resources";
import Profile from "./Profile/Profile";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: COLORS.primary },
        tabBarActiveTintColor: COLORS.yellow,
        tabBarInactiveTintColor: COLORS.white,
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Journal",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="journal-whills" size={24} color={color} />
          ),
        }}
        name="Journal"
        component={Journal}
      />
      <Tab.Screen name="CBT" component={CBT} options={{ headerShown: false }} />
      <Tab.Screen name="Relaxation" component={Relaxation} />
      <Tab.Screen name="Resources" component={Resources} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
