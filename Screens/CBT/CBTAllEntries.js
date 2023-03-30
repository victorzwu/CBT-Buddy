import { View, Text, FlatList } from "react-native";
import React from "react";
import CBTEntry from "../../Components/CBTEntry";

export default function CBTAllEntries({ entries }) {
  return (
    <View>
      <FlatList
        data={entries}
        renderItem={({ entry }) => {
          return <CBTEntry entry={entry} />;
        }}
      />
    </View>
  );
}
