import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";

export default function Distortion({ item, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.listItem}>
      <View style={{ padding: 8 }}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2970/2970875.png",
          }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontSize: 22, color: "#fff" }}>{item.name}</Text>
        <Text style={{ color: "#989BA1" }}>{item.text}</Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  listItem: {
    backgroundColor: "#252628",
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,0,0,0.5)",
  },
});
