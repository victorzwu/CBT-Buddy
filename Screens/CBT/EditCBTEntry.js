import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { updateCBTEntry } from "../../Firebase/fireStoreHelper";
import Distortion from "../../Components/Distortion";
import RegularButton from "../../Components/RegularButton";
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";
import DatetimePicker from "../../Components/DatetimePicker";
import { distortions } from "../../Contexts/DistortionsContext";

export default function EditCBTEntry({
  id,
  originalSituation,
  changeSituation,
  originalAction,
  changeAction,
  originalAddress,
  originalPartner,
  changePartner,
  originalEmotion,
  changeEmotion,
  originalDate,
  changeDate,
  originalSelectedDistortions,
  changeDistortions,
  originalSolution,
  changeSolution,
  originalLocation,
  navigation,
}) {
  const [situation, setSituation] = useState(originalSituation);
  const [action, setAction] = useState(originalAction);
  const [location, setLocation] = useState(originalLocation);
  const [partner, setPartner] = useState(originalPartner);
  const [emotion, setEmotion] = useState(originalEmotion);
  const [date, setDate] = useState(originalDate);
  // const [distortions, setDistortions] = useState(item.distortions);
  const [solution, setSolution] = useState(originalSolution);
  const [allDistortions, setAllDistortions] = useState(distortions);
  const [selectedDistortions, setSelectedDistortions] = useState(
    originalSelectedDistortions
  );
  function handleOnPress(item) {
    if (
      selectedDistortions
        .map((item) => {
          return item.name;
        })
        .includes(item.name)
    ) {
      const newDistortions = selectedDistortions.filter(
        (listItem) => listItem.name !== item.name
      );
      setSelectedDistortions([...newDistortions]);
    } else {
      setSelectedDistortions([...selectedDistortions, item]);
    }
  }
  function editHandler(id) {
    Alert.alert("Important", "Are you sure you want to edit this entry?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          updateCBTEntry(id, {
            situation: situation,
            action: action,
            location: location,
            partner: partner,
            emotion: emotion,
            date: date,
            distortions: selectedDistortions,
            address: originalAddress,
            solution: solution,
          });
          navigation.navigate("CBT Entries");
        },
      },
    ]);
  }
  return (
    <View>
      <ScrollView>
        <Text>What was the situation</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={situation}
          onChangeText={(newSituation) => {
            setSituation(newSituation);
          }}
          placeholder="Type here..."
        />
        <Text>What were you doing</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={action}
          onChangeText={(newAction) => {
            setAction(newAction);
          }}
          placeholder="Type here..."
        />
        <Text>Where were you</Text>
        <Button
          onPress={() => {
            navigation.navigate("Map");
          }}
          title="choose your location"
        />
        <Text>{originalAddress}</Text>
        <Text>Who were you with</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={partner}
          onChangeText={(newPartner) => {
            setPartner(newPartner);
          }}
          placeholder="Type here..."
        />
        <Text>What emotion did you experience</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={emotion}
          onChangeText={(newEmotion) => {
            setEmotion(newEmotion);
          }}
          placeholder="Type here..."
        />
        <Text>When did it happen</Text>
        <DatetimePicker changeDatetimeHandler={(date) => setDate(date)} />
        <Text>Cognitive distortions</Text>
        {allDistortions.map((item) => {
          return (
            <Distortion
              onPress={() => handleOnPress(item)}
              selected={selectedDistortions
                .map((item) => {
                  return item.name;
                })
                .includes(item.name)}
              item={item}
              key={item.name}
            />
          );
        })}
        <Text>How can you reframe or redirect this thought</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={solution}
          onChangeText={(newSolution) => {
            setSolution(newSolution);
          }}
          placeholder="Type here..."
        />
        <RegularButton
          pressHandler={() => {
            navigation.goBack();
          }}
        >
          <Text>Cancel</Text>
        </RegularButton>
        <RegularButton pressHandler={() => editHandler(id)}>
          <Text>Confirm</Text>
        </RegularButton>
      </ScrollView>
    </View>
  );
}
