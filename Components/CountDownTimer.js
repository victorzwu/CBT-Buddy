import React, { useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../color";

export default function CountDownTimer({ pressedHandler }) {
  const [countdown, setCountdown] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
      setTotalTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (countdown < 0) {
        if (cycle === 0) {
          setTotalBreaths(totalBreaths + 1);
          setCountdown(4);
        } else if (cycle === 1) {
          setCountdown(7);
        } else if (cycle === 2) {
          setCountdown(8);
        }
        setCycle((cycle + 1) % 3);
      }
    }, 500);
  }, [countdown]);

  return (
    <View>
      <View style = {styles.container}>
        {countdown > 0 ? (
          <Text style={{ fontSize: 100 }}>{countdown}</Text>
        ) : cycle === 0 ? (
          <Text style={{ fontSize: 50 }}>Breathe In...</Text>
        ) : cycle === 1 ? (
          <Text style={{ fontSize: 50 }}>Hold Your Breath...</Text>
        ) : (
          <Text style={{ fontSize: 50 }}>Breathe out...</Text>
        )}
      </View>
      <View>
        <Text>Total time elapsed: {totalTime}</Text>
        <Text>Total breaths: {totalBreaths}</Text>
        <Pressable style={styles.pressable} onPress={() => pressedHandler()}>
          <Text>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});
