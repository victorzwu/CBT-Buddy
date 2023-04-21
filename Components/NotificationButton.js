import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export async function verifyPermission() {
  const permission = await Notifications.getPermissionsAsync();
  if (permission.granted === true) {
    return true;
  }

  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

export default function NotificationButton() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const scheduleNotificationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("Need to grant permission");
      return;
    }
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "CBT Buddy",
          body: "It's time to write in your journal",
        },
        trigger: { hour: hour, minute: minute, repeats: true },
      }).then(
        Alert.alert("Notification set for " + { hour } + ":" + { minute } + ".")
      );
    } catch (err) {
      console.log("notification err:", err);
    }
  };

  return (
    <Ionicons
      name="notifications-outline"
      size={24}
      color="white"
      onPress={() => {
        scheduleNotificationHandler();
      }}
    />
  );
}
