import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResourcesScreen1 from "./ResourcesScreen1";
import ResourceDetails from "./ResourceDetails";

export default function Resources() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Therapy Resources" component={ResourcesScreen1} />
      <Stack.Screen name="Resource Details" component={ResourceDetails} />
    </Stack.Navigator>
  );
}
