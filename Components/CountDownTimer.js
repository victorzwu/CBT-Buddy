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
    setTimeout(() => {
      if (countdown < 0) {
        if(cycle === 0)
        {
            setCountdown(4);
        }
        else if (cycle ===1)
        {
            setCountdown(7);
        }
        else if (cycle === 2)
        {
            setCountdown(8);
        }
        setCycle((cycle + 1) % 3);
      }
    }, 500);
  }, [countdown]);

  return (
    <View>
      {countdown > 0 ? (
        <Text style={{ fontSize: 24 }}>{countdown}</Text>
      ) : cycle === 0 ? (
        <Text>Breathe In...</Text>
      ) : cycle === 1 ? (<Text style={{ fontSize: 24 }}>
        Hold Your Breath...
      </Text>): (
        <Text style={{ fontSize: 24 }}>
          Breathe out...
        </Text>
      )}
    </View>
  );
}
