import { View, Text } from 'react-native'
import React from 'react'
import Map from '../Journal/Map'

export default function ResourceMap({route, navigation}) {
  return (
    <Map route = {route} navigation = {navigation} />
  )
}