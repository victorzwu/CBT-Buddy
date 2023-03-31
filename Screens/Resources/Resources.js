import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResourcesScreen1 from "./ResourcesScreen1";
import {
  cityVanApiKey
} from "@env";


export default function Resources() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const fetchResources = async () => {
      fetch('https://opendata.vancouver.ca/api/v2/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: cityVanApiKey,
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        }),
      });
    };
    fetchResources();
  });

  // , {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: cityVanApiKey,
  //   },
  //   body: JSON.stringify({
  //     firstParam: 'yourValue',
  //     secondParam: 'yourOtherValue',
  //   });
  // }
  // ));
  return (
    <Stack.Navigator>
      <Stack.Screen name="Relaxation Screen 1" component={ResourcesScreen1} />
    </Stack.Navigator>
  );
}
