import { View, Text, TextInput } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import RegularButton from "../../Components/RegularButton";

export default function AddChallenge({ navigation, solution, changeSolution }) {
  const [currentSolution, setCurrentSolution] = useState(solution);
  return (
    <View>
      <Text>How can you reframe or redirect this thought</Text>
      <TextInput
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        value={currentSolution}
        onChangeText={(newSolution) => {
          setCurrentSolution(newSolution);
          changeSolution(newSolution);
        }}
        placeholder="Type here..."
      />
      <RegularButton
        pressHandler={() => {
          navigation.navigate("Review");
        }}
      >
        <Text>continue</Text>
      </RegularButton>
    </View>
  );
}
