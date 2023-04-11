import { View, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function RegularButton({ style, pressHandler, children }) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.buttonStyle,
          style,
          pressed ? styles.pressedStyle : null,
        ];
      }}
      onPress={pressHandler}
    >
      <View style={{ alignItems: "center" }}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: { justifyContent: "center", backgroundColor: "blue" },
  pressedStyle: { backgroundColor: "purple", opacity: 0.5 },
});
