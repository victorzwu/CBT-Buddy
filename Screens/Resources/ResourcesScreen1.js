import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { COLORS } from "../../color";
// import { cityVanApiKey } from "@env";
import { getFromDB } from "../../Firebase/firestore";
import * as Location from "expo-location";

export default function ResourcesScreen1({ navigation, route }) {
  cityVanApiKey = "421b202f7b30e206d48c0d91ac5c412b31e84539fb4d2b97e938b24a";
  const [resources, setResources] = useState([]);
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  const findLocation = async () => {
    const permissionReceived = verifyPermission();
    if (permissionReceived) {
      try {
        const result = await Location.getCurrentPositionAsync();
        setLocation({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });
      } catch (err) {
        console.log("location handler: ", err);
      }
    } else {
      Alert.alert("need location permission");
    }
  };

  useEffect(()=>{
    if(route.params)
    {
      console.log(route.params)
      setLocation({latitude: route.params.coordinate.latitude, longitude: route.params.coordinate.longitude})
    }
  }, [route])

  useEffect(() => {
    const fetchResources = async () => {
      function calculateDistance(lat1, lon1, lat2, lon2) {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var radlon1 = (Math.PI * lon1) / 180;
        var radlon2 = (Math.PI * lon2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
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
            name: business.record.fields.businessname,
            city: business.record.fields.city,
            localarea: business.record.fields.localarea,
            // location: business.record.fields.geo_point_2d,
            address:
              business.record.fields.unit +
              "-" +
              business.record.fields.house +
              " " +
              business.record.fields.street +
              " " +
              business.record.fields.postalcode,
            distance: location
              ? calculateDistance(
                  business.record.fields.geo_point_2d.lat,
                  business.record.fields.geo_point_2d.lon,
                  location.latitude,
                  location.latitude
                )
              : 0,
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

  return (
    <View styles={styles.container}>
      <Button title="Locate Me" onPress={() => findLocation()} />
      <FlatList
        data={resources}
        renderItem={({ item }) => {
          return (
            <Pressable style={styles.pressable} onPress={() => details(item)}>
              <View>
                <Text>Name: {item.name}</Text>
                <Text>Local Area: {item.localarea}</Text>
                <Text>City: {item.city}</Text>
                {/* <Text>
                  Longitude: {item.location ? item.location.lon : "Unknown"}
                </Text>
                <Text>
                  Latitude: {item.location ? item.location.lat : "Unknown"}
                </Text> */}
                <Text> Distance: {item.distance}</Text>
                <Text>
                  Address:{" "}
                  {item.address !== "null-null null null"
                    ? item.address
                    : "Unknown"}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.second,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: COLORS.second,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 8,
    },
    margin: 10,
    padding: 30,
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 16,
    borderRadius: 4,
  },
});
