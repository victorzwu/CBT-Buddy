import { View, Text, StyleSheet, ScrollView } from "react-native";
import Button from "../../Components/Button";
import MapView from "react-native-maps";
import { COLORS } from "../../color";
import { update } from "../../Firebase/firestore";
import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase-setup";
import { addDoc, collection } from "firebase/firestore";
// import { MAP_API_KEY } from "@env";
const MAP_API_KEY="AIzaSyCB-LzTwbzYe4FNuj8VNoWQrS-PtJTQcPU"

export default function Com({ formData, setFormData, navigation, getData }) {
  const [address, setAddress] = useState(null);

  useEffect(() => {

  }, []);

  const handleMapPress = async (coordinate) => {
    const { latitude, longitude } = coordinate;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const address = data.results[0].formatted_address;
      setAddress(address);
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
            initialRegion={{
              latitude: 49.22796918780358,
              longitude: -123.00663209296373,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
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
