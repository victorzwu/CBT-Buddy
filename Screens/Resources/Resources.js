import { View, Text, Pressable } from "react-native";
import React from "react";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResourcesScreen1 from "./ResourcesScreen1";
import ResourceDetails from "./ResourceDetails";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../color";
import ResourceMap from "./ResourceMap";
import { EvilIcons } from "@expo/vector-icons";
import ResourceFavorites from "./ResourceFavorites";

export default function Resources({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
      })}
    >
      <Stack.Screen
        name="Therapy Resources"
        component={ResourcesScreen1}
        options={() => {
          return {
            headerRight: () => {
              return (
                <Ionicons
                  name="location-outline"
                  size={24}
                  color="white"
                  onPress={() =>
                    navigation.navigate("Resource Map", { screen: "Resources" })
                  }
                />
              );
            },
            headerLeft: () => {
              return (
                <EvilIcons
                  name="star"
                  size={24}
                  color="white"
                  onPress={() => navigation.navigate("Resource Favorites")}
                />
              );
            },
          };
        }}
      />
      <Stack.Screen name="Resource Map" component={ResourceMap} />
      <Stack.Screen name="Resource Details" component={ResourceDetails} />
      <Stack.Screen name="Resource Favorites" component={ResourceFavorites} />
    </Stack.Navigator>
  );
}
