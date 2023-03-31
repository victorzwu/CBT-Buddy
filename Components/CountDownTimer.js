import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

export default function CountDownTimer({ seconds }) {
  const [countdown, setCountdown] = useState(0); // Set initial countdown time to 10 seconds
    const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval when component unmounts
  }, []);

  useEffect(() => {
    if (countdown < 0) {
      setTimeout(() => {
        setCountdown(11);
      }, 1000);
    }
  }, [countdown]);

  return (
    <View>
      {countdown > 0 ? (
        <Text style={{ fontSize: 24 }}>{countdown}</Text>
      ) : cycle === 0 ? (
        <Text>Breathe Out... {countdown}</Text>
      ) : (
        <Text style={{ fontSize: 24 }}>
          Breathe in...
          {countdown}
        </Text>
      )}
    </View>
  );
}
