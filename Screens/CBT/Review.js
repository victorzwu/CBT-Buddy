import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { addCBTEntry } from "../../Firebase/fireStoreHelper";
import Button from "../../Components/Button";
import { COLORS } from "../../color";

export default function Review({
  navigation,
  situation,
  action,
  emotion,
  location,
  date,
  address,
  partner,
  selectedDistortions,
  reset,
  solution,
}) {
  function cancelHandler() {
    Alert.alert(
      "Cancel adding",
      "Are you sure you want to cancel adding the entry?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("CBT Entries");
          },
        },
      ]
    );
  }
  function confirmHandler() {
    Alert.alert("Add an entry", "Are you sure you want to add this entry?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          const newEntry = {
            situation: situation,
            location: location,
            address: address,
            solution: solution,
            emotion: emotion,
            partner: partner,
            date: date,
            distortions: selectedDistortions,
            action: action,
          };
          reset();
          addCBTEntry(newEntry);
          navigation.navigate("CBT Entries");
        },
      },
    ]);
  }
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
  return (
    <ScrollView style = {styles.container}>
      <Text style={styles.tit}>What was the situation</Text>
      {situation ? (
        <Text style={styles.description}>{situation}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>What were you doing</Text>
      {action ? (
        <Text style={styles.description}>{action}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>Where were you</Text>
      {address ? (
        <Text style={styles.description}>{address}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>Who were you with</Text>
      {partner ? (
        <Text style={styles.description}>{partner}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>What emotion did you experience</Text>
      {emotion ? (
        <Text style={styles.description}>{emotion}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>When did it happen</Text>
      {date ? (
        <Text style={styles.description}>
          {date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <Text style={styles.tit}>Cognitive distortions</Text>
      {selectedDistortions.length > 0 ? (
        <FlatList
          data={selectedDistortions}
          horizontal
          renderItem={({ item }) => (
            <View key={item.name} style={{ paddingRight: 10 }}>
              <Image
                source={uris[item.uri]}
                style={{ width: 100, height: 100 }}
              />
              <Text style={{ fontSize: 22, color: COLORS.textColor }}>
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
      {solution ? (
        <Text style={styles.description}>{solution}</Text>
      ) : (
        <Text style={styles.tip}>Empty</Text>
      )}
      <View style={styles.btnBox}>
        <Button onPress={cancelHandler}>
          <Text style={styles.btnText}>Cancel</Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Describe the situation");
          }}
        >
          <Text style={styles.btnText}>Edit</Text>
        </Button>
        <Button onPress={confirmHandler}>
          <Text style={styles.btnText}>Continue</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.background
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
    color: COLORS.white,
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
