import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Button from "../../Components/Button";
import MapView, { Marker } from "react-native-maps";
import { COLORS } from "../../color";
import React, { useState, useEffect } from "react";
import { MAPS_API_KEY } from "@env";
import * as Location from "expo-location";

export default function Map({
  navigation,
  route,
  address,
  changeAddress,
  location,
  changeLocation,
}) {
  const [currentaAddress, setCurrentAddress] = useState(address);
  const [coordinate, setCoordinate] = useState(location);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  const handleMapPress = async (coordinate) => {
    const { latitude, longitude } = coordinate;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const theAddress = data.results[0].formatted_address;
      setCurrentAddress(theAddress);
      setCoordinate(coordinate);
      changeAddress(theAddress);
      changeLocation(coordinate);
    } catch (error) {
      console.error(error);
    }
  };

  async function verifyPermission() {
    console.log(permissionResponse);
    if (permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // // this will be user's choice:
    return permissionResult.granted;
  }
  async function getCurrentLocation() {
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give location permission");
      return;
    }
    try {
      const result = await Location.getCurrentPositionAsync();
      setCoordinate(result.coords);
      changeLocation(result.coords);
      const { latitude, longitude } = result.coords;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const theAddress = data.results[0].formatted_address;
      setCurrentAddress(theAddress);
      changeAddress(theAddress);
    } catch (err) {
      console.log("location handler ", err);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.box}>
        <Text style={styles.tit}>Click on the map to select a location</Text>
        <View style={styles.curAddressBox}>
          <Text style={styles.curAddress}>
            {currentaAddress ? currentaAddress : "no select"}
          </Text>
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity
            onPress={() => {
              getCurrentLocation();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Find My Location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnBox}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            title="Confirm"
          />
        </View>

        <View style={styles.mapBox}>
          <MapView
            onPress={(e) => {
              handleMapPress(e.nativeEvent.coordinate);
            }}
            style={styles.mapView}
            region={{
              latitude: coordinate ? coordinate.latitude : 49.22796918780358,
              longitude: coordinate
                ? coordinate.longitude
                : -123.00663209296373,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {coordinate && (
              <Marker
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                }}
                title={address}
              />
            )}
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  box: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  tit: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 20,
  },
  mapBox: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  curAddressBox: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  curAddress: {
    color: COLORS.primary,
    textAlign: "center",
  },
});
