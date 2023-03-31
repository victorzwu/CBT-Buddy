import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CBTEntries from "./CBTEntries";
import AddEntryButton from "../../Components/AddEntryButton";
import EditCBTEntry from "./EditCBTEntry";
import AddDescription from "./AddDescription";
import AddDistortions from "./AddDistortions";
import AddChallenge from "./AddChallenge";
import Review from "./Review";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../style/helper";
import Details from "./Details";

export default function CBT() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.header,
        },
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
      <Stack.Screen name="Describe the situation" component={AddDescription} />
      <Stack.Screen name="Cognitive Distortions" component={AddDistortions} />
      <Stack.Screen name="Challenge" component={AddChallenge} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
