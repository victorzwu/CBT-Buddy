import { View, Text, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import { addCBTEntry } from "../../Firebase/fireStoreHelper";
import RegularButton from "../../Components/RegularButton";

export default function Review({
  route,
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
  return (
    <View>
      <Text>What was the situation</Text>
      <Text>{situation}</Text>
      <Text>What were you doing</Text>
      <Text>{action}</Text>
      <Text>Where were you</Text>
      <Text>{address}</Text>
      <Text>Who were you with</Text>
      <Text>{partner}</Text>
      <Text>What emotion did you experience</Text>
      <Text>{emotion}</Text>
      <Text>When did it happen</Text>
      <Text>
        {date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Text>
      <Text>Cognitive distortions</Text>
      {selectedDistortions.map((distortion) => (
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
      <Text>{solution}</Text>
      <RegularButton pressHandler={cancelHandler}>
        <Text>Cancel</Text>
      </RegularButton>
      <RegularButton
        pressHandler={() => {
          navigation.navigate("Describe the situation");
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
