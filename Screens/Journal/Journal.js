import { View, Text } from 'react-native'
import React from 'react'
import JournalScreen1 from './JournalScreen1';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Journal() {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen 1" component={JournalScreen1} />
    </Stack.Navigator>
  )
}