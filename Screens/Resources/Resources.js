import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResourcesScreen1 from './ResourcesScreen1';

export default function Resources() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Relaxation Screen 1" component = {ResourcesScreen1}/>
    </Stack.Navigator>
  )
}