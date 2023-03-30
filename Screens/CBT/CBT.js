import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CBTAllEntries from "./CBTAllEntries";
import CBTDetails from "./CBTDetails";
import CBTDescribe from "./CBTDescribe";
import CBTCognitiveDistortions from "./CBTCognitiveDistortions";
import CBTReframe from "./CBTReframe";
import CBTReview from "./CBTReview";

export default function CBT() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="CBT" component={CBTAllEntries} options={{ headerShown: false }} />
      <Stack.Screen name="Describe the Situation" component={CBTDescribe} options={{ headerShown: false }} />
      <Stack.Screen name="Cognitive Distortions" component={CBTCognitiveDistortions} options={{ headerShown: false }} />
      <Stack.Screen name="Challenge the Thought" component={CBTReframe} options={{ headerShown: false }} />
      <Stack.Screen name="Review" component={CBTReview} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={CBTDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
