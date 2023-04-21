import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../color";

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
        <Text style={styles.tit}>Date</Text>
        <Text style={styles.description}>
          {new Date(entryContent.date.seconds * 1000).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Text>
        <Text style={styles.tit}>Situation</Text>
        {entryContent.situation ? (
          <Text style={styles.description}>{entryContent.situation}</Text>
        ) : (
          <Text style={styles.tip}>Empty</Text>
        )}
      </View>
      <Text style={styles.tit}>Cognitive Distortions</Text>
      {entryContent.distortions.length > 0 ? (
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", paddingTop: 10 }}
        >
          {entryContent.distortions.map((distortion) => (
            <View key={distortion.name} style={{ padding: 1 }}>
              <Image
                source={uris[distortion.uri]}
                style={{ width: 100, height: 100 }}
              />
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.tip}>None</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tit: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  itemBox: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.second,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    color: COLORS.textColor,
    height: 200,
    margin: 15,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    color: COLORS.primary,
    fontSize: 18,
  },
  tip: {
    fontSize: 15,
    paddingBottom: 5,
    color: COLORS.darksilver,
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },
});
