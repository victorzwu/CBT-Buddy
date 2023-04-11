import { View, Text, TextInput, FlatList, Alert, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { updateCBTEntry } from "../../Firebase/fireStoreHelper";
import Distortion from "../../Components/Distortion";
import RegularButton from "../../Components/RegularButton";
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";
import DatetimePicker from "../../Components/DatetimePicker";

export default function EditCBTEntry({ route, navigation }) {
  const item = route.params.item;
  const [situation, setSituation] = useState(item.situation);
  const [action, setAction] = useState(item.action);
  const [location, setLocation] = useState(
    route.params.location || item.location
  );
  const [address, setAddress] = useState(route.params.address || item.address);
  const [partner, setPartner] = useState(item.partner);
  const [emotion, setEmotion] = useState(item.emotion);
  const [date, setDate] = useState(item.date);
  // const [distortions, setDistortions] = useState(item.distortions);
  const [solution, setSolution] = useState(item.solution);
  const [allDistortions, setAllDistortions] = useState([]);
  const [selectedDistortions, setSelectedDistortions] = useState(
    item.distortions.map((distortion) => distortion.id)
  );
  useEffect(() => {
    onSnapshot(collection(firestore, "CBTDistortions"), (querySnapshot) => {
      if (querySnapshot.empty) {
      } else {
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          docs.push({ ...snap.data(), id: snap.id });
        });
        setAllDistortions(docs);
      }
    });
  }, []);
  function handleOnPress(item) {
    if (selectedDistortions.includes(item.id)) {
      const newDistortions = selectedDistortions.filter(
        (listItem) => listItem !== item.id
      );
      setSelectedDistortions([...newDistortions]);
    } else {
      setSelectedDistortions([...selectedDistortions, item.id]);
    }
  }
  function editHandler() {
    Alert.alert("Important", "Are you sure you want to edit this entry?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          updateCBTEntry(item.id, {
            situation: situation,
            action: action,
            location: location,

            partner: partner,
            emotion: emotion,
            date: date,
            distortions: allDistortions.filter((distortion) =>
              selectedDistortions.includes(distortion.id)
            ),
            solution: solution,
          });
          navigation.navigate("CBT Entries");
        },
      },
    ]);
  }
  return (
    <View>
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
          navigation.navigate("Map", {
            name: "Edit CBT Entry",
            location: location,
            address: address,
            ...route.params,
          });
        }}
        title="choose your location"
      />
      <Text>{address}</Text>
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
      <FlatList
        data={allDistortions}
        renderItem={({ item }) => (
          <Distortion
            onPress={() => handleOnPress(item)}
            selected={selectedDistortions.includes(item.id)}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
      <RegularButton pressHandler={() => editHandler(item.id)}>
        <Text>Confirm</Text>
      </RegularButton>
    </View>
  );
}
