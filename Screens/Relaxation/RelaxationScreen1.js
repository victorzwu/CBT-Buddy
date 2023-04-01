import { View, Text, Pressable } from "react-native";
import React from "react";
import CountDownTimer from "../../Components/CountDownTimer";
import { useState } from "react";

export default function RelaxationScreen1() {
  const [pressed, setPressed] = useState(false);

  function pressedHandler() {
    setPressed(!pressed);
  }

  return (
    <View>
      {!pressed && (
        <Pressable onPress={() => pressedHandler()}>
          <Text>Click Here to Practice Deep Breathing</Text>
        </Pressable>
      )}
      {pressed && (
        <CountDownTimer seconds={10} pressedHandler={pressedHandler} />
      )}
    </View>
  );
}
