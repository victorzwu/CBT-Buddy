import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../color";

export default function Button({ title, onPress, children }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.container}>
          {children ? children : (
          <Text style={styles.title}>{title}</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  title: {
    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});