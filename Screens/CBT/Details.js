import { View, Text, Image, Alert } from "react-native";
import React from "react";
import RegularButton from "../../Components/RegularButton";
import { deleteCBTEntry } from "../../Firebase/fireStoreHelper";

export default function Details({ route, navigation }) {
  const item = route.params.entry;
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
    <View>
      <Text>What was the situation</Text>
      <Text>{item.situation}</Text>
      <Text>What were you doing</Text>
      <Text>{item.action}</Text>
      <Text>Where were you</Text>
      <Text>{item.address}</Text>
      <Text>Who were you with</Text>
      <Text>{item.partner}</Text>
      <Text>What emotion did you experience</Text>
      <Text>{item.emotion}</Text>
      <Text>When did it happen</Text>
      <Text>
        {new Date(item.date.seconds * 1000).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Text>
      <Text>Cognitive distortions</Text>
      {item.distortions.map((distortion) => (
        <View key={distortion.id}>
          <Image
            source={uris[distortion.uri]}
            style={{ width: 100, height: 100 }}
          />
          <Text>{distortion.text}</Text>
        </View>
      ))}
      <Text>How can you reframe or redirect this thought</Text>
      <Text>{item.solution}</Text>
      <RegularButton
        pressHandler={() => {
          navigation.navigate("Edit Entry", {
            item: item,
          });
        }}
      >
        <Text>Edit</Text>
      </RegularButton>
      <RegularButton pressHandler={() => deleteHandler(item.id)}>
        <Text>Delete</Text>
      </RegularButton>
    </View>
  );
}
