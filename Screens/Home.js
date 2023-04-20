import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../color";
import CBT from "./CBT/CBT";
import Journal from "./Journal/Journal";
import Relaxation from "./Relaxation/Relaxation";
import Resources from "./Resources/Resources";
import Profile from "./Profile/Profile";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

export default function Home() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        try {
          navigation.navigate("Journal");
        } catch (err) {
          console.log("linking err: ", err);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  return (
    <Tab.Navigator screenOptions={styles.tabBar}>
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Journal",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="journal-whills" size={30} color={color} />
          ),
        }}
        name="Journal"
        component={Journal}
      />
      <Tab.Screen
        name="CBT"
        component={CBT}
        options={{
          headerShown: false,
          title: "CBT",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="lightbulb" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Relaxation"
        component={Relaxation}
        options={{
          headerShown: false,
          title: "Relaxation",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="meditation" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Resources"
        component={Resources}
        options={{
          headerShown: false,
          title: "Resources",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    headerStyle: { backgroundColor: COLORS.primary },
    headerTintColor: COLORS.white,
    tabBarStyle: {
      backgroundColor: COLORS.primary,
      height: "12%",
      padding: 10,
      borderTopWidth: 0,
      borderTopColor: "transparent",
    },
    tabBarActiveTintColor: COLORS.yellow,
    tabBarInactiveTintColor: COLORS.white,
    tabBarLabelStyle: { fontSize: 15 },

  },
});
