import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CBTAllEntries from "./CBTAllEntries";
import CBTDetails from "./CBTDetails";
import CBTDescribe from "./CBTDescribe";
import CBTCognitiveDistortions from "./CBTCognitiveDistortions";
import CBTReframe from "./CBTReframe";
import CBTReview from "./CBTReview";
import { deleteFromCBT, editFromCBT } from "../../Firebase/fireStoreHelper";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CBT() {
  const [entries, setEntries] = useState([]);

  const navigation = useNavigation();

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
        name="CBT Home"
        options={() => {
          return {
            headerRight: () => {
              return (
                <Pressable
                  onPress={() => navigation.navigate("Describe the Situation")}
                >
                  <Entypo name="plus" size={24} color="black" />
                </Pressable>
              );
            },
          };
        }}
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
