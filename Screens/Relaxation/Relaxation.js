import { View, Text } from "react-native";
import React from "react";
import RelaxationScreen1 from "./RelaxationScreen1";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../../color";

export default function Relaxation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
        headerShadowVisible: false,
      })}
    >
      <Stack.Screen
        options={() => {
          return {
            title: "Relaxation",
            headerTitleAlign: "center",
          };
        }}
        name="Relaxation Screen 1"
        component={RelaxationScreen1}
      />
    </Stack.Navigator>
  );
}
