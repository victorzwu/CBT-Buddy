import { Pressable } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function AddEntryButton({ pressHandler }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={pressHandler}
      style={{ paddingRight: 15 }}
    >
      <Entypo name="plus" size={24} color={isPressed ? "gray" : "white"} />
    </Pressable>
  );
}
