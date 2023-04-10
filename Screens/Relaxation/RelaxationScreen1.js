import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import CountDownTimer from "../../Components/CountDownTimer";
import { useState } from "react";
import { COLORS } from "../../color";

export default function RelaxationScreen1() {
  const [pressed, setPressed] = useState(false);

  function pressedHandler() {
    setPressed(!pressed);
  }

  return (
    <View style = {styles.container}>
      {!pressed && (
        <Pressable style = {styles.pressable} onPress={() => pressedHandler()}>
          <Text style = {styles.pressableText}>Click Here to Practice Deep Breathing</Text>
        </Pressable>
      )}
      {pressed && (
        <CountDownTimer seconds={10} pressedHandler={pressedHandler} />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: COLORS.darksilver,
    backgroundColor: COLORS.darksilver,
  },
  pressableText:
  {
    color: COLORS.white
  }
});