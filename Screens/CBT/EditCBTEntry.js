import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { updateCBTEntry } from "../../Firebase/fireStoreHelper";
import Distortion from "../../Components/Distortion";
import Button from "../../Components/Button";
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";
import DatetimePicker from "../../Components/DatetimePicker";
import { distortions } from "../../Contexts/DistortionsContext";
import { COLORS } from "../../color";

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
        <Text style={styles.tit}>What was the situation</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={situation}
          onChangeText={(newSituation) => {
            setSituation(newSituation);
          }}
          placeholder="Type here..."
        />
        <Text style={styles.tit}>What were you doing</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={action}
          onChangeText={(newAction) => {
            setAction(newAction);
          }}
          placeholder="Type here..."
        />
        <Text style={styles.tit}>Where were you</Text>
        <View style={styles.btnBox}>
          <Button
            onPress={() => {
              navigation.navigate("Map");
            }}
            title="choose your location"
          />
        </View>
        <Text>{originalAddress}</Text>
        <Text style={styles.tit}>Who were you with</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={partner}
          onChangeText={(newPartner) => {
            setPartner(newPartner);
          }}
          placeholder="Type here..."
        />
        <Text style={styles.tit}>What emotion did you experience</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={emotion}
          onChangeText={(newEmotion) => {
            setEmotion(newEmotion);
          }}
          placeholder="Type here..."
        />
        <Text style={styles.tit}>When did it happen</Text>
        <DatetimePicker changeDatetimeHandler={(date) => setDate(date)} />
        <Text style={styles.tit}>Cognitive distortions</Text>
        <View>
          <FlatList
            data={allDistortions}
            horizontal
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
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
              </View>
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
        <Text style={styles.tit}>
          How can you reframe or redirect this thought
        </Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={solution}
          onChangeText={(newSolution) => {
            setSolution(newSolution);
          }}
          placeholder="Type here..."
        />
        <View style={styles.btnBox}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </Button>
          <Button onPress={() => editHandler(id)}>
            <Text style={styles.btnText}>Confirm</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tit: {
    textAlign: "center",
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
    color: COLORS.textColor,
    fontSize: 13,
  },
  tip: {
    fontSize: 15,
    paddingBottom: 5,
    color: COLORS.grey,
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },
});
