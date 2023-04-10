import { View, Text, Pressable, StyleSheet, Image } from "react-native";
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
          <Image style = {styles.icon} source={require("../../assets/icons/breathing.png")}/>
          <Text style = {styles.pressableText}>Deep Breathing</Text>
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
    height: 200,
    width: 200,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  pressableText:
  {
    color: COLORS.white
  },
  icon:
  {
    height: 100,
    width: 100,
    margin: 20,
    marginRight: 30,
  }
});