import { View, Text, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import RegularButton from "../../Components/RegularButton";
import { AntDesign } from "@expo/vector-icons";

export default function AddDescription({ navigation, route }) {
  const [page, setPage] = useState(1);
  const [situation, setSituation] = useState(
    (route.params && route.params.situation) || ""
  );
  const [action, setAction] = useState(
    (route.params && route.params.action) || ""
  );
  const [location, setLocation] = useState(
    (route.params && route.params.location) || ""
  );
  const [partner, setPartner] = useState(
    (route.params && route.params.partner) || ""
  );
  const [emotion, setEmotion] = useState(
    (route.params && route.params.emotion) || ""
  );
  const [date, setDate] = useState((route.params && route.params.date) || "");
  if (page == 1) {
    return (
      <View>
        <Text>What was the situation?</Text>
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
        <Text>What were you doing?</Text>
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
        <View>
          <TextInput
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            value={date}
            onChangeText={(newDate) => {
              setDate(newDate);
            }}
            placeholder="Type here..."
          />
        </View>
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
        <TextInput
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={location}
          onChangeText={(newLocation) => {
            setLocation(newLocation);
          }}
          placeholder="Type here..."
        />
        <Text>Who were you with?</Text>
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
        <Text>What emotion did you experience?</Text>
        <Text>
          Recognize the emotion; try and capture it in one word - happy, sad or
          angry.
        </Text>
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
        <RegularButton
          pressHandler={() => {
            setPage(page - 1);
          }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </RegularButton>
        <RegularButton
          pressHandler={() => {
            navigation.navigate("Cognitive Distortions", {
              situation: situation,
              action: action,
              location: location,
              emotion: emotion,
              partner: partner,
              date: date,
              ...route.params,
            });
          }}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </RegularButton>
      </View>
    );
  }
}
