import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DatetimePicker from "../../Components/DatetimePicker";
import { COLORS } from "../../color";
import Button from "../../Components/Button";

export default function AddDescription({
  navigation,
  situation,
  changeSituation,
  action,
  changeAction,
  address,
  partner,
  changePartner,
  emotion,
  changeEmotion,
  date,
  changeDate,
}) {
  const [page, setPage] = useState(1);
  const [currentSituation, setCurrentSituation] = useState(situation);
  const [currentAction, setCurrentAction] = useState(action);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [currentPartner, setCurrentPartner] = useState(partner);
  const [currentEmotion, setCurrentEmotion] = useState(emotion);
  const [currentDate, setCurrentDate] = useState(date);
  if (page == 1) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.tit}>What was the situation?</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={currentSituation}
          onChangeText={(newSituation) => {
            setCurrentSituation(newSituation);
            changeSituation(newSituation);
          }}
          placeholder="Type here..."
        />
        <Text style={styles.tit}>What were you doing?</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={currentAction}
          onChangeText={(newAction) => {
            setCurrentAction(newAction);
            changeAction(newAction);
          }}
          placeholder="Type here..."
        />
        <View style={styles.btnBox}>
          <Button
            onPress={() => {
              setPage(page + 1);
            }}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </Button>
        </View>
      </ScrollView>
    );
  } else if (page == 2) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.tit}>When did it happen?</Text>
        <Text style={styles.tip}>Enter the date and approximate time.</Text>
        <DatetimePicker
          changeDatetimeHandler={(newDate) => {
            setCurrentDate(newDate);
            changeDate(newDate);
          }}
        />
        <View style={styles.btnBox}>
          <Button
            onPress={() => {
              setPage(page - 1);
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Button>
          <Button
            onPress={() => {
              setPage(page + 1);
            }}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </Button>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView alwaysBounceVertical={true} style={styles.container}>
        <Text style={styles.tit}>Where were you?</Text>
        <View style={styles.btnBox}>
          <Button
            onPress={() => {
              navigation.navigate("Map");
            }}
            title="choose your location"
          />
        </View>
        {address && (
          <Text style={styles.description}>Your location: {address}</Text>
        )}
        <Text style={styles.tit}>Who were you with?</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={currentPartner}
          onChangeText={(newPartner) => {
            setCurrentPartner(newPartner);
            changePartner(newPartner);
          }}
          placeholder="Type here..."
        />
        <Text style={styles.tit}>What was your emotion?</Text>
        <Text style={styles.tip}>
          Recognize the emotion; try and capture it in one word - happy, sad or
          angry.
        </Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={currentPartner}
          onChangeText={(newEmotion) => {
            setCurrentEmotion(newEmotion);
            changeEmotion(newEmotion);
          }}
          placeholder="Type here..."
        />
        <View style={styles.btnBox}>
          <Button
            onPress={() => {
              setPage(page - 1);
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Cognitive Distortions");
            }}
          >
            <Text style={styles.btnText}>Continue</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tit: {
    fontSize: 20,
    textAlign: "center",
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
