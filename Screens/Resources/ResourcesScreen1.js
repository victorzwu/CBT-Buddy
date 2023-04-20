import { View, Text, Pressable, StyleSheet, Button, Alert } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { COLORS } from "../../color";
// import { cityVanApiKey } from "@env";
import { getFromDB } from "../../Firebase/firestore";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { addFavoriteResource, deleteFavoriteResource } from "../../Firebase/fireStoreHelper";

export default function ResourcesScreen1({ navigation, route }) {
  cityVanApiKey = "421b202f7b30e206d48c0d91ac5c412b31e84539fb4d2b97e938b24a";
  const [resources, setResources] = useState([]);
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {
    findLocation();
  }, [permissionResponse]);

  const verifyPermission = async () => {
    if (permissionResponse) {
      if (permissionResponse.granted) {
        return true;
      }
      const permissionResult = await requestPermission();
      return permissionResult.granted;
    }
  };

  async function findLocation() {
    const permissionReceived = verifyPermission();
    if (permissionReceived) {
      try {
        const result = await Location.getCurrentPositionAsync();
        setLocation({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });
        // console.log(location);
      } catch (err) {
        console.log("location handler: ", err);
      }
    } else {
      Alert.alert("need location permission");
    }
  }

  useEffect(() => {
    if (route.params) {
      // console.log(route.params);
      setLocation({
        latitude: route.params.coordinate.latitude,
        longitude: route.params.coordinate.longitude,
      });
    }
  }, [route]);

  useEffect(() => {
    const fetchResources = async () => {
      function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c; // Distance in km
        return distance;
      }

      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
      try {
        const response = await fetch(
          "https://opendata.vancouver.ca/api/v2/catalog/datasets/business-licences/records?where=geom%20IS%20NOT%20NULL&limit=100&offset=0&refine=status%3AIssued&refine=businesssubtype%3ACounselling&timezone=UTC",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              // "Content-Type": "application/json",
              Authorization: cityVanApiKey,
            },
          }
        );
        const data = await response.json();
        const businesses = data.records.map((business) => {
          // console.log(business.record.fields.geo_point_2d);
          return {
            name: business.record.fields.businesstradename
              ? business.record.fields.businesstradename
              : business.record.fields.businessname,
            city: business.record.fields.city,
            localarea: business.record.fields.localarea,
            // location: business.record.fields.geo_point_2d,
            address: [
              business.record.fields.unit
                ? business.record.fields.unit + "-"
                : null,
              business.record.fields.house,
              business.record.fields.street + ",",
              business.record.fields.city + ",",
              business.record.fields.province + ",",
              business.record.fields.postalcode,
            ]
              .filter(function (val) {
                return val;
              })
              .join(" "),
            distance: location
              ? calculateDistance(
                  business.record.fields.geo_point_2d.lat,
                  business.record.fields.geo_point_2d.lon,
                  location.latitude,
                  location.longitude
                )
              : 0,
            favorite: false,
          };
        });
        businesses.sort((a, b) => a.distance - b.distance);
        setResources(businesses);
      } catch (err) {
        console.log("api error: ", err);
      }
    };
    fetchResources();
  }, [location]);

  function details(item) {
    navigation.navigate("Resource Details", item);
  }

  function starPressed(item) {
    addFavoriteResource(item);
    Alert.alert("Added to your favorites")
  }

  return (
    <View>
      {location && (
        <FlatList
          style={{ backgroundColor: COLORS.background }}
          data={resources}
          renderItem={({ item }) => {
            return (
              <Pressable style={styles.pressable} onPress={() => details(item)}>
                <View style={styles.card}>
                  <View style={styles.cardWordContainer}>
                    <Text style={styles.nameText}>
                      <Text>{item.name}</Text>
                    </Text>
                    <Text style={{ fontSize: 2 }}> {"\n"}</Text>
                    <Text style={styles.addressText}>{item.address}</Text>

                    <Text>
                      <Text style={styles.boldText}>{"\n"}Local Area: </Text>
                      <Text>{item.localarea}</Text>
                    </Text>

                    <Text>
                      <Text style={styles.boldText}>Distance: </Text>
                      <Text>{item.distance.toFixed(2)} km</Text>
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Ionicons
                      name="add"
                      size={24}
                      color={"black"}
                      onPress={() => starPressed(item)}
                    />
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
    borderWidth: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 8,
    },
    marginHorizontal: 30,
    marginVertical: 15,
    padding: 30,
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 16,
    borderRadius: 15,
    flex: 1,
  },
  card: { flexDirection: "row", flex: 1 },
  cardWordContainer: { flexDirection: "column", flex: 8 },
  nameText: {
    fontSize: 25,
    fontWeight: 900,
    fontFamily: "Futura",
  },
  boldText: {
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 12,
    color: COLORS.darksilver,
  },
});
