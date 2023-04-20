import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { auth } from "../../Firebase/firebase-setup";
import { useEffect, useState } from "react";
import { COLORS } from "../../color";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { deleteFavoriteResource } from "../../Firebase/fireStoreHelper";

export default function ResourceFavorites() {
  const navigation = useNavigation();

  const [favoriteResources, setFavoriteResources] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "favorites"),
        where("user", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setFavoriteResources([]);
        } else {
          let emptyArr = [];

          querySnapshot.docs.forEach((snap) => {
            // console.log(snap.data());
            emptyArr.push({ ...snap.data(), id: snap.id });
            // console.log(emptyArr);
          });
          setFavoriteResources(emptyArr);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  function details(item) {
    navigation.navigate("Resource Details", item);
  }

  function starPressed(item) {
    deleteFavoriteResource(item.id);
  }

  return (
    <View style = {styles.container}>
      {favoriteResources && (
        <FlatList
          style={{ backgroundColor: COLORS.background }}
          data={favoriteResources}
          renderItem={({ item }) => {
            return (
              <Pressable style={styles.pressable} onPress={() => details(item)}>
                <View style={styles.card}>
                  <View style={styles.cardWordContainer}>
                    <Text style={styles.nameText}>
                      <Text>{item.name}</Text>
                    </Text>
                    <Text style={{ fontSize: 2 }}> {"\n"}</Text>
                    <Text style={styles.addressText}>{item.address}</Text>

                    <Text>
                      <Text style={styles.boldText}>{"\n"}Local Area: </Text>
                      <Text>{item.localarea}</Text>
                    </Text>

                    <Text>
                      <Text style={styles.boldText}>Distance: </Text>
                      <Text>{item.distance.toFixed(2)} km</Text>
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Ionicons
                      name="remove"
                      size={24}
                      color="black"
                      onPress={() => starPressed(item)}
                    />
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  pressable: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
    borderWidth: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 8,
    },
    marginHorizontal: 30,
    marginVertical: 15,
    padding: 30,
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 16,
    borderRadius: 15,
    flex: 1,
  },
  card: { flexDirection: "row", flex: 1 },
  cardWordContainer: { flexDirection: "column", flex: 8 },
  nameText: {
    fontSize: 25,
    fontWeight: 900,
    fontFamily: "Futura",
  },
  boldText: {
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 12,
    color: COLORS.darksilver,
  },
});
