import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import CBTEntry from "../../Components/CBTEntry";
import { useState, useEffect } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { firestore, auth } from "../../Firebase/firebase-setup";
import { COLORS } from "../../color";

export default function CBTEntries({ navigation }) {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(firestore, "CBTEntries"),
        where("user", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setEntries([]);
        } else {
          let docs = [];
          querySnapshot.docs.forEach((snap) => {
            docs.push({ ...snap.data(), id: snap.id });
          });
          setEntries(docs);
        }
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      {entries.length > 0 ? (
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
      ) : (
        <Text>{" "}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 15,
  },
  scrollViewContentContainer: {
    alignItems: "center",
  },
  entryStyle: {
    width: 330,
    padding: 30,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
    borderWidth: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 8,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 16,
    borderRadius: 15,
  },
  pressedStyle: { backgroundColor: COLORS.primary, opacity: 0.5 },
});
