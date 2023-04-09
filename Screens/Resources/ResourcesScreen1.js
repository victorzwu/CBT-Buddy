import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { COLORS } from "../../color";
// import { cityVanApiKey } from "@env";
import { getFromDB } from "../../Firebase/firestore";

export default function ResourcesScreen1({ navigation }) {
  cityVanApiKey = "421b202f7b30e206d48c0d91ac5c412b31e84539fb4d2b97e938b24a";
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function locationCheck() {
      const locationData = await getFromDB().location;
      if(!locationData)
      {
        navigation.navigate("Map");
      }
    }
    locationCheck();
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "https://opendata.vancouver.ca/api/v2/catalog/datasets/business-licences/records?limit=50&offset=0&refine=status%3AIssued&refine=businesssubtype%3ACounselling&timezone=UTC",
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
          console.log(business.record.fields.geo_point_2d );
          return {
            name: business.record.fields.businessname,
            city: business.record.fields.city,
            localarea: business.record.fields.localarea,
            location: business.record.fields.geo_point_2d,
            address: business.record.fields.unit + "-" + business.record.fields.house + " " + business.record.fields.street + " " +  business.record.fields.postalcode
          };
        });
        setResources(businesses);
      } catch (err) {
        console.log("api error: ", err);
      }
    };
    fetchResources();
  }, []);

  function details(item) {
    navigation.navigate("Resource Details", item);
  }

  return (
    <View styles={styles.container}>
      <FlatList
        data={resources}
        renderItem={({ item }) => {
          return (
            <Pressable style={styles.pressable} onPress={() => details(item)}>
              <View>
                <Text>Name: {item.name}</Text>
                <Text>Local Area: {item.localarea}</Text>
                <Text>City: {item.city}</Text>
                <Text>Longitude: {item.location ? item.location.lon : "Unknown" }</Text>
                <Text>Latitude: {item.location ? item.location.lat : "Unknown" }</Text>

                <Text>Address: {item.address !== "null-null null null" ? item.address : "Unknown"}</Text>
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
