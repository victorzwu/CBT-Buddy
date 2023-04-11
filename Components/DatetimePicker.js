import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../color";

export default function DatetimePicker({ changeDatetimeHandler }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    changeDatetimeHandler(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode("date");
  };

  const showTimepicker = () => {
    setShow(true);
    showMode("time");
  };

  return (
    <View>
      <View style={styles.btnBox}>
        <Button onPress={showDatepicker} title="Select date" />
        <Button onPress={showTimepicker} title="Select time" />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Text style={styles.description}>
        selected:{" "}
        {date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  description: {
    marginTop: 20,
    color: COLORS.textColor,
    fontSize: 13,
  },
  tip: {
    fontSize: 15,
    paddingBottom: 5,
    color: COLORS.grey,
  },
});
