import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function ResourceDetails({ route }) {

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: route.params.location.lat,
          longitude: route.params.location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.location.lat,
            longitude: route.params.location.lon,
          }}
        />
      </MapView>
    </>
  );
}
