import { View, Text, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import RegularButton from "../../Components/RegularButton";
import { AntDesign } from "@expo/vector-icons";
import DatetimePicker from "../../Components/DatetimePicker";

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
      <View>
        <Text>What was the situation?</Text>
        <TextInput
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
        <Text>What were you doing?</Text>
        <TextInput
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
        <RegularButton
          pressHandler={() => {
            setPage(page + 1);
          }}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </RegularButton>
      </View>
    );
  } else if (page == 2) {
    return (
      <View>
        <Text>When did it happen?</Text>
        <Text>Enter the date and approximate time.</Text>
        <DatetimePicker
          changeDatetimeHandler={(newDate) => {
            setCurrentDate(newDate);
            changeDate(newDate);
          }}
        />
        <RegularButton
          pressHandler={() => {
            setPage(page - 1);
          }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </RegularButton>
        <RegularButton
          pressHandler={() => {
            setPage(page + 1);
          }}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </RegularButton>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Where were you?</Text>
        <Button
          onPress={() => {
            navigation.navigate("Map");
          }}
          title="choose your location"
        />
        {address && <Text>{address}</Text>}
        <Text>Who were you with?</Text>
        <TextInput
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
        <Text>What emotion did you experience?</Text>
        <Text>
          Recognize the emotion; try and capture it in one word - happy, sad or
          angry.
        </Text>
        <TextInput
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
        <RegularButton
          pressHandler={() => {
            setPage(page - 1);
          }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </RegularButton>
        <RegularButton
          pressHandler={() => {
            navigation.navigate("Cognitive Distortions");
          }}
        >
          <Text>Continue</Text>
        </RegularButton>
      </View>
    );
  }
}
