import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./ProfileScreen";
import { COLORS } from "../../color";

export default function Profile() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
      })}
    >
      <Stack.Screen name="Profile Screen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
