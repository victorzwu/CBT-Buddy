import { View, Text } from 'react-native'
import React from 'react'
import CountDownTimer from '../../Components/CountDownTimer'

export default function RelaxationScreen1() {
  return (
    <View>
      <CountDownTimer seconds = {10}/>
    </View>
  )
}