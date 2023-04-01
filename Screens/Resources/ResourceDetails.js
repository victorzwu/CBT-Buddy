import { View, Text } from 'react-native'
import React from 'react'

export default function ResourceDetails({route}) {
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  )
}