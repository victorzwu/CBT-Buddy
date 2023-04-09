import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";

export async function verifyPermission() {
  const permission = await Notifications.getPermissionsAsync();
  if (permission.granted === true) {
    return true;
  }

  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

export default function NotificationButton() {
  const scheduleNotificationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("Need to grant permission");
      return;
    }
    try {
        // const trigger = new Date(Date.now() + 60 * 60 * 1000);
        // trigger.setMinutes(0);
        // trigger.setSeconds(0);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "CBT Buddy",
          body: "It's time to write in your journal.",
          data: { url: "https://www.google.com" },
        },
        trigger: { seconds: 5 },
      });
    } catch (err) {
      console.log("notification err:", err);
    }
  };

  return (
      <Pressable title="Notify" onPress={scheduleNotificationHandler}>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </Pressable>
  );
}
