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
import { update } from "../../Firebase/firestore";
import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase-setup";
import { addDoc, collection } from "firebase/firestore";
import { MAP_API_KEY } from "@env";
import * as Location from "expo-location";

export default function Map({ formData, setFormData, navigation, getData }) {
  const [address, setAddress] = useState(null);
  const [coordinate, setCoordinate] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {}, []);

  const handleMapPress = async (coordinate) => {
    const { latitude, longitude } = coordinate;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const address = data.results[0].formatted_address;
      setAddress(address);
      setCoordinate(coordinate);
      if (!formData.id) {
        setFormData({
          ...formData,
          location: address,
        });
      }
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
      setCoordinate({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
      const { latitude, longitude } = result.coords;
      console.log(latitude);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const address = data.results[0].formatted_address;
      setAddress(address);
      if (!formData.id) {
        setFormData({
          ...formData,
          location: address,
        });
      }
    } catch (err) {
      console.log("location handler ", err);
    }
  }

  // const getCurrentLocation = async () => {
  //   console.log(navigator.geolocation);
  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`;

  //       try {
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         const address = data.results[0].formatted_address;
  //         setAddress(address);
  //         setCoordinate({ latitude, longitude });
  //         if (!formData.id) {
  //           setFormData({
  //             ...formData,
  //             location: address,
  //           });
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     },
  //     (error) => {
  //       console.error(error);
  //     },
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.box}>
        <Text style={styles.tit}>Click on the map to select a location</Text>
        <View style={styles.curAddressBox}>
          <Text style={styles.curAddress}>
            {address ? address : "no select"}
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
            onPress={async () => {
              try {
                if (formData.id) {
                  update(formData.id, {
                    location: address,
                  });
                  setFormData({
                    ...formData,
                    location: address,
                  });
                  alert("Edit Success!");
                  getData();
                  navigation.goBack();
                } else {
                  await addDoc(collection(firestore, "journals"), {
                    ...formData,
                  });
                  alert("ADD Success!");
                  getData();
                  navigation.navigate({
                    name: "JournalList",
                  });
                }
              } catch (e) {
                console.error("Error adding document: ", e);
              }
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
            {coordinate && <Marker coordinate={coordinate} title={address} />}
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
