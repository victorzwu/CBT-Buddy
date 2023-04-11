import { View, Text } from "react-native";
import React, { useState } from "react";
import Details from "./Details";
import EditCBTEntry from "./EditCBTEntry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { color } from "../../style/helper";
import Map from "./Map";

export default function EditEntry({ navigation, route }) {
  const entry = route.params.item;
  const Stack = createNativeStackNavigator();
  const [situation, setSituation] = useState(entry.situation);
  const [action, setAction] = useState(entry.action);
  const [location, setLocation] = useState(entry.location);
  const [address, setAddress] = useState(entry.address);
  const [partner, setPartner] = useState(entry.partner);
  const [emotion, setEmotion] = useState(entry.emotion);
  const [date, setDate] = useState(entry.date);
  const [selectedDistortions, setSelectedDistortions] = useState(
    entry.distortions
  );
  const [solution, setSolution] = useState(entry.solution);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.header,
        },
      }}
    >
      <Stack.Screen name="Edit CBT Entry">
        {(props) => (
          <EditCBTEntry
            originalSituation={situation}
            changeSituation={(newSituation) => {
              setSituation(newSituation);
            }}
            originalLocation={location}
            changeLocation={(newLocation) => setLocation(newLocation)}
            originalAction={action}
            changeAction={(newAction) => setAction(newAction)}
            originalAddress={address}
            changeAddress={(newAddress) => {
              setAddress(newAddress);
            }}
            originalDate={date}
            changeDate={(newDate) => {
              setDate(newDate);
            }}
            originalPartner={partner}
            changePartner={(newPartner) => setPartner(newPartner)}
            originalEmotion={emotion}
            changeEmotion={(newEmotion) => {
              setEmotion(newEmotion);
            }}
            originalSelectedDistortions={selectedDistortions}
            changeDistortions={(newDistortions) =>
              setSelectedDistortions(newDistortions)
            }
            originalSolution={solution}
            changeSolution={(newSolution) => {
              setSolution(newSolution);
            }}
            id={entry.id}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Map">
        {(props) => (
          <Map
            location={location}
            address={address}
            changeLocation={(newLocation) => setLocation(newLocation)}
            changeAddress={(newAddress) => {
              setAddress(newAddress);
            }}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
