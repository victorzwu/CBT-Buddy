import { View, Text, Image, Alert } from "react-native";
import React from "react";
import RegularButton from "../../Components/RegularButton";
import { deleteCBTEntry } from "../../Firebase/fireStoreHelper";

export default function Details({ route, navigation }) {
  const item = route.params.entry;
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
      <Text>{item.location}</Text>
      <Text>Who were you with</Text>
      <Text>{item.partner}</Text>
      <Text>What emotion did you experience</Text>
      <Text>{item.emotion}</Text>
      <Text>When did it happen</Text>
      <Text>{item.date}</Text>
      <Text>Cognitive distortions</Text>
      {item.distortions.map((distortion) => (
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
      <Text>How can you reframe or redirect this thought</Text>
      <Text>{item.solution}</Text>
      <RegularButton
        pressHandler={() => {
          navigation.navigate("Edit CBT Entry", {
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
