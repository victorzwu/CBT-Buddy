import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import CBTEntry from "../../Components/CBTEntry";
import { color } from "../../style/helper";
import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";

export default function CBTEntries({ navigation }) {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    onSnapshot(collection(firestore, "CBTEntries"), (querySnapshot) => {
      if (querySnapshot.empty) {
        setEntries([]);
      } else {
        console.log("start");
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          docs.push({ ...snap.data(), id: snap.id });
        });
        setEntries(docs);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollViewContentContainer}
        data={entries}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.entryStyle,
                  pressed ? styles.pressedStyle : null,
                ];
              }}
              onPress={() => {
                navigation.navigate("Details", {
                  entry: item,
                });
              }}
            >
              <CBTEntry entryContent={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcd",
    paddingTop: 15,
  },
  scrollViewContentContainer: {
    alignItems: "center",
  },
  entryStyle: {
    backgroundColor: color.entry,
    width: 300,
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
  },
  pressedStyle: { backgroundColor: "purple", opacity: 0.5 },
});
