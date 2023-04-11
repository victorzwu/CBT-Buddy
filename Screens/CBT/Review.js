import { View, Text, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import { addCBTEntry } from "../../Firebase/fireStoreHelper";
import RegularButton from "../../Components/RegularButton";

export default function Review({ route, navigation }) {
  useEffect(() => {
    console.log("review:", route.params);
  });
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
          console.log(new Date(route.params.date));
          const newEntry = {
            situation: route.params.situation,
            location: route.params.location,
            address: route.params.address,
            solution: route.params.solution,
            emotion: route.params.emotion,
            partner: route.params.partner,
            date: new Date(route.params.date),
            distortions: route.params.distortions,
            action: route.params.action,
          };
          addCBTEntry(newEntry);
          navigation.navigate("CBT Entries");
        },
      },
    ]);
  }
  return (
    <View>
      <Text>What was the situation</Text>
      <Text>{route.params.situation}</Text>
      <Text>What were you doing</Text>
      <Text>{route.params.action}</Text>
      <Text>Where were you</Text>
      <Text>{route.params.address}</Text>
      <Text>Who were you with</Text>
      <Text>{route.params.partner}</Text>
      <Text>What emotion did you experience</Text>
      <Text>{route.params.emotion}</Text>
      <Text>When did it happen</Text>
      <Text>{route.params.date}</Text>
      <Text>Cognitive distortions</Text>
      {route.params.distortions.map((distortion) => (
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
      <Text>{route.params.solution}</Text>
      <RegularButton pressHandler={cancelHandler}>
        <Text>Cancel</Text>
      </RegularButton>
      <RegularButton
        pressHandler={() => {
          navigation.navigate("Describe the situation", { ...route.params });
        }}
      >
        <Text>Edit</Text>
      </RegularButton>
      <RegularButton pressHandler={confirmHandler}>
        <Text>Confirm</Text>
      </RegularButton>
    </View>
  );
}
