import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { COLORS } from "../color";

export default function Distortion({ item, selected, onPress }) {
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
    <Pressable onPress={onPress} style={styles.listItem}>
      <View style={{ padding: 8 }}>
        <Image source={uris[item.uri]} style={{ width: 100, height: 100 }} />
        <Text style={{ fontSize: 22, color: "#fff" }}>{item.name}</Text>
        <Text style={{ color: "#989BA1" }}>{item.text}</Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  listItem: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,0,0,0.5)",
  },
});
