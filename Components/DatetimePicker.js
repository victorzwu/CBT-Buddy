import { View, Text, Button } from "react-native";
import React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

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
      <Button onPress={showDatepicker} title="Select date" />
      <Button onPress={showTimepicker} title="Select time" />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Text>
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
