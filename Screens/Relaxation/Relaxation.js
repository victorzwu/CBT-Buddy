import { View, Text } from 'react-native'
import React from 'react'
import RelaxationScreen1 from './RelaxationScreen1';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Relaxation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options = {{headerShown: false}} name = "Relaxation Screen 1" component = {RelaxationScreen1}/>
    </Stack.Navigator>
  )
}