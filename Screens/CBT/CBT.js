import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CBTAllEntries from "./CBTAllEntries";
import CBTDetails from "./CBTDetails";
import CBTDescribe from "./CBTDescribe";
import CBTCognitiveDistortions from "./CBTCognitiveDistortions";
import CBTReframe from "./CBTReframe";
import CBTReview from "./CBTReview";
import {
  deleteFromCBT,
  editFromCBT,
  writeToCBT,
} from "../../Firebase/fireStoreHelper";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";

export default function CBT() {
  const [entries, setEntries] = useState([]);

  const navigation = useNavigation();

  const Stack = createNativeStackNavigator();

  const [confirmed, setConfirmed] = useState(false);

  const [situation, setSituation] = useState("");

  const [distortion, setDistortion] = useState("");

  const [reframe, setReframe] = useState("");

  const [date, setDate] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "CBTentries"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setEntries([]);
        } else {
          let arr = [];
          querySnapshot.docs.forEach((snap) =>
            arr.push({ ...snap.data(), id: snap.id })
          );
          setEntries(arr);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(async () => {
    await addEntry(situation, distortion, reframe, date);
    await resetEntry();
  }, [confirmed]);

  async function resetEntry()
  {
    setConfirmed(false);
    setSituation("");
    setDistortion("");
    setReframe("");
    setDate("");
  }

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
        options={{}}
      />
      <Stack.Screen
        name="Cognitive Distortions"
        component={CBTCognitiveDistortions}
        options={{}}
      />
      <Stack.Screen
        name="Challenge the Thought"
        component={CBTReframe}
        options={{}}
      />
      <Stack.Screen name="Review" component={CBTReview} options={{}} />
      <Stack.Screen name="Details" component={CBTDetails} options={{}} />
    </Stack.Navigator>
  );
}
