import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../color";
import JournalList from "./JournalList";
import AddMood from "./AddMood";
import AddDetail from "./AddDetail";
import AddPhotoAndLocation from "./AddPhotoAndLocation";
import JournalEdit from "./JournalEdit";
import Map from "./Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationButton from "../../Components/NotificationButton";
import NotificationTimepicker from "./NotificationTimepicker";
import { JournalProvider } from "../../Contexts/JournalContext";

export default function Journal({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <JournalProvider>
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
        headerShadowVisible: false,
      })}
    >

      <Stack.Screen
        name="JournalList"
        options={() => {
          return {
            headerRight: () => {
              return (
                <NotificationButton
                  pressHandler={() =>
                    navigation.navigate("Notification Timepicker")
                  }
                />
              );
            },
            title: "Journal",
            headerTitleAlign: "center",
          };
        }}
        component={JournalList}
      />

      <Stack.Screen
        name="Notification Timepicker"
        component={NotificationTimepicker}
      />
      <Stack.Screen
        name="JournalEdit"
        options={{
          title: "Edit an entry",
        }}
        component={JournalEdit}
      />

      <Stack.Screen
        name="AddMood"
        options={{
          title: "Mood",
        }}
        component={AddMood}
      />

      <Stack.Screen
        name="AddDetail"
        options={{
          title: "Detail",
        }}
        component={AddDetail}
      />
      <Stack.Screen
        name="AddPhotoAndLocation"
        options={{
          title: "Photo And Location",
        }}
        component={AddPhotoAndLocation}
      />

      <Stack.Screen
        name="Map"
        options={{
          title: "Map",
        }}
        component={Map}
      />
    </Stack.Navigator>
    </JournalProvider>
  );
}
