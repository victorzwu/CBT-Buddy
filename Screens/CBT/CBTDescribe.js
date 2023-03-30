import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { useState } from "react";

export default function CBTDescribe({ setSituation, navigation }) {
  const [description, setDescription] = useState("");

  return (
    <View>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Pressable
        onPress={() => {
          setSituation(description);
          navigation.navigate("Cognitive Distortions");
        }}
      >
        <Text>Next</Text>
      </Pressable>
    </View>
  );
}
