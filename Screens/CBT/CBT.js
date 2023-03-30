import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CBTAllEntries from "./CBTAllEntries";
import CBTDetails from "./CBTDetails";
import CBTDescribe from "./CBTDescribe";
import CBTCognitiveDistortions from "./CBTCognitiveDistortions";
import CBTReframe from "./CBTReframe";
import CBTReview from "./CBTReview";
import { deleteFromCBT, editFromCBT } from "../../Firebase/fireStoreHelper";

export default function CBT() {
  const [entries, setEntries] = useState([]);

  const Stack = createNativeStackNavigator();

  function addEntry(situation, distortion, reframe, date) {
    let entry = {
      situation: situation,
      distortion: distortion,
      reframe: reframe,
      date: date,
    };
    writeToCBT(entry);
  }

  function editEntry(id, situation, distortion, reframe, date) {
    let entry = {
      situation: situation,
      distortion: distortion,
      reframe: reframe,
      date: date,
    };
    editFromCBT(id, entry);
  }

  function deleteEntry(id) {
    deleteFromCBT(id);
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CBT"
        component={CBTAllEntries}
        options={{ headerShown: false }}
      >
        {(props) => <CBTAllEntries {...props} entries={entries} />}
      </Stack.Screen>
      <Stack.Screen
        name="Describe the Situation"
        component={CBTDescribe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cognitive Distortions"
        component={CBTCognitiveDistortions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Challenge the Thought"
        component={CBTReframe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Review"
        component={CBTReview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={CBTDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
