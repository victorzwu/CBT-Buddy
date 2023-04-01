import { View, Text, Pressable } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
// import { cityVanApiKey } from "@env";

export default function ResourcesScreen1({ navigation }) {
  cityVanApiKey = "421b202f7b30e206d48c0d91ac5c412b31e84539fb4d2b97e938b24a";
  const [resources, setResources] = useState([]);

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
          return {
            name: business.record.fields.businessname,
            city: business.record.fields.city,
            localarea: business.record.fields.localarea,
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
    <View>
      <FlatList
        data={resources}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => details(item)}>
              <View>
                <Text>Name: {item.name}</Text>
                <Text>Local Area: {item.localarea}</Text>
                <Text>City: {item.city}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
