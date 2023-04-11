import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CBTEntries from "./CBTEntries";
import AddEntryButton from "../../Components/AddEntryButton";
import EditCBTEntry from "./EditCBTEntry";
import AddDescription from "./AddDescription";
import AddDistortions from "./AddDistortions";
import AddChallenge from "./AddChallenge";
import Review from "./Review";
import { useNavigation } from "@react-navigation/native";
import Details from "./Details";
import { COLORS } from "../../color";
import Map from "./Map";
import DetailsandEdit from "./EditEntry";
import EditEntry from "./EditEntry";

export default function CBT() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const [situation, setSituation] = useState("");
  const [action, setAction] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [partner, setPartner] = useState("");
  const [emotion, setEmotion] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedDistortions, setSelectedDistortions] = useState([]);
  const [solution, setSolution] = useState("");
  function reset() {
    setSituation("");
    setAction("");
    setLocation("");
    setAddress("");
    setPartner("");
    setEmotion("");
    setDate(new Date());
    setSelectedDistortions([]);
    setSolution("");
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="CBT Entries"
        component={CBTEntries}
        options={{
          headerRight: () => {
            return (
              <AddEntryButton
                pressHandler={() => {
                  navigation.navigate("Describe the situation");
                }}
              />
            );
          },
        }}
      />
      <Stack.Screen name="Edit CBT Entry" component={EditCBTEntry} />
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
      <Stack.Screen name="Edit Entry" component={EditEntry} />
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
      <Stack.Screen name="Review">
        {(props) => (
          <Review
            solution={solution}
            situation={situation}
            action={action}
            date={date}
            location={location}
            address={address}
            partner={partner}
            emotion={emotion}
            selectedDistortions={selectedDistortions}
            reset={reset}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Map">
        {(props) => (
          <Map
            location={location}
            address={address}
            changeLocation={(newLocation) => setLocation(newLocation)}
            changeAddress={(newAddress) => setAddress(newAddress)}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
