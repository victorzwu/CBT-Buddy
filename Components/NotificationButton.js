import React from "react";

import { Ionicons } from "@expo/vector-icons";

export default function NotificationButton({ pressHandler }) {
  return (
    <Ionicons
      name="notifications-outline"
      size={24}
      color="white"
      onPress={pressHandler}
    />
  );
}
