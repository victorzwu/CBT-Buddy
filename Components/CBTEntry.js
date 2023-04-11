import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";

export default function CBTEntry({ entryContent }) {
  return (
    <View>
      <View>
        <Text>Date</Text>
        <Text>
          {new Date(entryContent.date.seconds * 1000).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Text>
        <Text>Situation</Text>
        <Text>{entryContent.situation}</Text>
      </View>
      <View>
        {entryContent.distortions.map((distortion) => (
          <View key={distortion.id}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2970/2970875.png",
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{distortion.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
