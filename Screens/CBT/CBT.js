import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CBTScreen1 from "./CBTScreen1";

export default function CBT() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen 1" component={CBTScreen1} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
