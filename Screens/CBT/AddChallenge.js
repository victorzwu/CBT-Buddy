import { View, Text, TextInput } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import RegularButton from "../../Components/RegularButton";

export default function AddChallenge({ route, navigation }) {
  useEffect(() => {
    console.log("challenge ", route.params);
  });
  const [solution, setSolution] = useState(
    (route.params && route.params.solution) || ""
  );
  return (
    <View>
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
          navigation.navigate("Review", {
            solution: solution,
            ...route.params,
          });
        }}
      >
        <Text>continue</Text>
      </RegularButton>
    </View>
  );
}
