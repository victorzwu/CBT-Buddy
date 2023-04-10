import { View, Text, Pressable } from "react-native";
import React from "react";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResourcesScreen1 from "./ResourcesScreen1";
import ResourceDetails from "./ResourceDetails";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../color";

export default function Resources({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: COLORS.primary },
        tabBarActiveTintColor: COLORS.yellow,
        tabBarInactiveTintColor: COLORS.white,
      })}
    >
      <Stack.Screen
        name="Therapy Resources"
        component={ResourcesScreen1}
        options={() => {
          return {
            headerRight: () => {
              return (
                <Ionicons
                  name="location-outline"
                  size={24}
                  color="white"
                  onPress={() =>
                    navigation.navigate("Map", { screen: "Resources" })
                  }
                />
              );
            },
          };
        }}
      />
      <Stack.Screen name="Resource Details" component={ResourceDetails} />
    </Stack.Navigator>
  );
}
