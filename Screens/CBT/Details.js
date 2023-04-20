import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { deleteCBTEntry } from "../../Firebase/fireStoreHelper";
import { COLORS } from "../../color";

export default function Details({ route, navigation }) {
  const item = route.params.entry;
  const [distortions, setDistortions] = useState(
    route.params.entry.distortions
  );
  useEffect(() => {
    console.log(distortions);
  }, []);
  const uris = {
    FILTERING: require("../../assets/distortions/FILTERING.png"),
    CATASTROPHIZING: require("../../assets/distortions/CATASTROPHIZING.png"),
    POLARIZED_THINKING: require("../../assets/distortions/POLARIZED_THINKING.png"),
    "HEAVEN'S_REWARD_FALLACY": require("../../assets/distortions/HEAVEN'S_REWARD_FALLACY.png"),
    CONTROL_FALLACIES: require("../../assets/distortions/CONTROL_FALLACIES.png"),
    ALWAYS_BEING_RIGHT: require("../../assets/distortions/ALWAYS_BEING_RIGHT.png"),
    FALLACY_OF_FAIRNESS: require("../../assets/distortions/FALLACY_OF_FAIRNESS.png"),
    PERSONALIZATION: require("../../assets/distortions/PERSONALIZATION.png"),
    OVERGENERALIZATION: require("../../assets/distortions/OVERGENERALIZATION.png"),
    JUMPING_TO_CONCLUSIONS: require("../../assets/distortions/JUMPING_TO_CONCLUSIONS.png"),
    EMOTIONAL_REASONING: require("../../assets/distortions/EMOTIONAL_REASONING.png"),
    BLAMING: require("../../assets/distortions/BLAMING.png"),
    FALLACY_OF_CHANGE: require("../../assets/distortions/FALLACY_OF_CHANGE.png"),
    GLOBAL_LABELLING: require("../../assets/distortions/GLOBAL_LABELLING.png"),
    SHOULDS: require("../../assets/distortions/SHOULDS.png"),
  };
  function deleteHandler(deleteId) {
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteCBTEntry(deleteId);
          navigation.goBack();
        },
      },
    ]);
  }
  return (
    <ScrollView>
      <Text style={styles.tit}>What was the situation</Text>
      {item.situation ? (
        <Text style={styles.description}>{item.situation}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>What were you doing</Text>
      {item.action ? (
        <Text style={styles.description}>{item.action}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>Where were you</Text>
      {item.address ? (
        <Text style={styles.description}>{item.address}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>Who were you with</Text>
      {item.partner ? (
        <Text style={styles.description}>{item.partner}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>What emotion did you experience</Text>
      {item.emotion ? (
        <Text style={styles.description}>{item.emotion}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>When did it happen</Text>
      <Text style={styles.description}>
        {new Date(item.date.seconds * 1000).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Text>
      <Text style={styles.tit}>Cognitive distortions</Text>
      {item.distortions.length > 0 ? (
        <FlatList
          data={item.distortions}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.disBox}>
              <Image
                source={uris[item.uri]}
                style={{ width: 100, height: 100 }}
              />
              <Text style={{ fontSize: 22, color: COLORS.primary }}>
                {item.name}
              </Text>
              <Text>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <Text style={styles.tip}>None</Text>
      )}
      <Text style={styles.tit}>
        How can you reframe or redirect this thought
      </Text>
      {item.solution ? (
        <Text style={styles.description}>{item.solution}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <View style={styles.btnBox}>
        <Button
          onPress={() => {
            navigation.navigate("Edit Entry", {
              item: item,
            });
          }}
        >
          <Text style={styles.btnText}>Edit</Text>
        </Button>
        <Button onPress={() => deleteHandler(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </Button>
      </View>
    </ScrollView>
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
  disBox: {
    marginRight: 15,
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
