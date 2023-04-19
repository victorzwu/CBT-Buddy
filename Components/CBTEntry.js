import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";

export default function CBTEntry({ entryContent }) {
  const uris = {
    FILTERING: require("../assets/distortions/FILTERING.png"),
    CATASTROPHIZING: require("../assets/distortions/CATASTROPHIZING.png"),
    POLARIZED_THINKING: require("../assets/distortions/POLARIZED_THINKING.png"),
    "HEAVEN'S_REWARD_FALLACY": require("../assets/distortions/HEAVEN'S_REWARD_FALLACY.png"),
    CONTROL_FALLACIES: require("../assets/distortions/CONTROL_FALLACIES.png"),
    ALWAYS_BEING_RIGHT: require("../assets/distortions/ALWAYS_BEING_RIGHT.png"),
    FALLACY_OF_FAIRNESS: require("../assets/distortions/FALLACY_OF_FAIRNESS.png"),
    PERSONALIZATION: require("../assets/distortions/PERSONALIZATION.png"),
    OVERGENERALIZATION: require("../assets/distortions/OVERGENERALIZATION.png"),
    JUMPING_TO_CONCLUSIONS: require("../assets/distortions/JUMPING_TO_CONCLUSIONS.png"),
    EMOTIONAL_REASONING: require("../assets/distortions/EMOTIONAL_REASONING.png"),
    BLAMING: require("../assets/distortions/BLAMING.png"),
    FALLACY_OF_CHANGE: require("../assets/distortions/FALLACY_OF_CHANGE.png"),
    GLOBAL_LABELLING: require("../assets/distortions/GLOBAL_LABELLING.png"),
    SHOULDS: require("../assets/distortions/SHOULDS.png"),
  };
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
          <View key={distortion.name}>
            <Image
              source={uris[distortion.uri]}
              style={{ width: 100, height: 100 }}
            />
            <Text>{distortion.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
