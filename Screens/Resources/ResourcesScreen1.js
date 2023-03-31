import { View, Text } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { cityVanApiKey } from "@env";

export default function ResourcesScreen1() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "https://opendata.vancouver.ca/api/v2/catalog/datasets/business-licences/records?limit=10&offset=0&refine=status%3AIssued&refine=businesssubtype%3ACounselling&timezone=UTC",
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
          return (
            {
            name: business.record.fields.businessname,
            city: business.record.fields.city,
            localarea: business.record.fields.localarea,
          });
        });

        await setResources(businesses);
      } catch (err) {
        console.log("api error: ", err);
      }
    };
    fetchResources();
  }, []);

  return (
    <View>
      {resources && (
        <FlatList
          data={resources}
          renderItem={(resource) => {
            return <Text>{resource.localarea}</Text>;
          }}
        />
      )}
      <Text>Hi</Text>
    </View>
  );
}
