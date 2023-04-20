import React, { useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../color";

export default function CountDownTimer() {
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
          setCountdown(3);
        } else if (cycle === 1) {
          setCountdown(4);
        } else if (cycle === 2) {
          setCountdown(5);
        }
        setCycle((cycle + 1) % 3);
      }
    }, 500);
  }, [countdown]);

  return (
    <View style={styles.container}>
      <View style = {styles.breathingContainer}>
        {countdown > 0 ? (
          <Text style={{ fontSize: 100 }}>{countdown}</Text>
        ) : cycle === 0 ? (
          <Text style={{ fontSize: 50 }}>Breathe In...</Text>
        ) : cycle === 1 ? (
          <Text style={{ fontSize: 30 }}>Hold Your Breath...</Text>
        ) : (
          <Text style={{ fontSize: 50 }}>Breathe out...</Text>
        )}
      </View>
      <View style = {styles.total}>
        <Text>Total time elapsed: {totalTime}</Text>
        <Text>Total breaths: {totalBreaths}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  breathingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 10,
  },
  total:
  {
    flex: 1,
    flexDirection: 'column-reverse'
  }
});
