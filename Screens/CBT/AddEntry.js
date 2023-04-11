import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Review from "./Review";
import AddChallenge from "./AddChallenge";
import AddDistortions from "./AddDistortions";
import AddDescription from "./AddDescription";
import Map from "./Map";

export default function AddEntry() {
  const Stack = createNativeStackNavigator();
  const [situation, setSituation] = useState("");
  const [action, setAction] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [partner, setPartner] = useState("");
  const [emotion, setEmotion] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedDistortions, setSelectedDistortions] = useState([]);
  const [solution, setSolution] = useState("");
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.header,
        },
      }}
    >
      <Stack.Screen name="Describe the situation">
        {(props) => (
          <AddDescription
            situation={situation}
            changeSituation={(newSituation) => {
              setSituation(newSituation);
            }}
            location={location}
            changeLocation={(newLocation) => setLocation(newLocation)}
            action={action}
            changeAction={(newAction) => setAction(newAction)}
            address={address}
            changeAddress={(newAddress) => {
              setAddress(newAddress);
            }}
            date={date}
            changeDate={(newDate) => {
              setDate(newDate);
            }}
            partner={partner}
            changePartner={(newPartner) => setPartner(newPartner)}
            emotion={emotion}
            changeEmotion={(newEmotion) => {
              setEmotion(newEmotion);
            }}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Cognitive Distortions">
        {(props) => (
          <AddDistortions
            selectedDistortions={selectedDistortions}
            changeDistortions={(newDistortions) =>
              setSelectedDistortions(newDistortions)
            }
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Challenge">
        {(props) => (
          <AddChallenge
            solution={solution}
            changeSolution={(newSolution) => {
              setSolution(newSolution);
            }}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
