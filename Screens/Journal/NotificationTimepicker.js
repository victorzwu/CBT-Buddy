import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../color";
import Button from "../../Components/Button";
import * as Notifications from "expo-notifications";

export async function verifyPermission() {
  const permission = await Notifications.getPermissionsAsync();
  if (permission.granted === true) {
    return true;
  }

  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

export default function NotificationTimepicker({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  async function scheduleNotificationHandler () {
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
        trigger: {
          hour: date.getHours(),
          minute: date.getMinutes(),
          repeats: true,
        },
      })
        .then(
          Alert.alert(
            "Notification set for " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              "."
          )
        )
        .then(navigation.goBack());
    } catch (err) {
      console.log("notification err:", err);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (Platform.OS === "android") {
      setShow(false);
    }
    setIsPressed(false);
    setDate(currentDate);
  };

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tip}>Choose the time of notification:</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          onChange={onChange}
        />
      )}
      {Platform.OS === "android" && (
        <View>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setShow(true)}
          >
            <Text
              style={[
                styles.description,
                { color: isPressed ? "green" : COLORS.textColor },
              ]}
            >
              {date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}{" "}
              (Press to edit)
            </Text>
          </Pressable>
        </View>
      )}
      <View style={styles.btnBox}>
        <Button onPress={() => scheduleNotificationHandler()} title="Confirm" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    marginBottom: 30,
  },
  description: {
    marginTop: 20,
    color: COLORS.textColor,
    fontSize: 13,
  },
  tip: {
    fontSize: 25,
    paddingBottom: 15,
    color: COLORS.primary,
  },
});
