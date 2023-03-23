import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RelaxationScreen1 from '../Relaxation/RelaxationScreen1';

export default function Profile() {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name = "Relaxation Screen 1" component = {RelaxationScreen1}/>
      </Stack.Navigator>
    )
}