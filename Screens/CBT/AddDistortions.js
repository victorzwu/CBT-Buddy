import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Button from "../../Components/Button";
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";
import Distortion from "../../Components/Distortion";
import { COLORS } from "../../color";
import { distortions } from "../../Contexts/DistortionsContext";

export default function AddDistortions({
  navigation,
  selectedDistortions,
  changeDistortions,
}) {
  const [allDistortions, setAllDistortions] = useState(distortions);
  const [currentSelectedDistortions, setCurrentSelectedDistortions] =
    useState(selectedDistortions);
  function handleOnPress(item) {
    const currentIds = currentSelectedDistortions.map((distortion) => {
      return distortion.name;
    });
    if (currentIds.includes(item.name)) {
      const newDistortions = currentSelectedDistortions.filter(
        (listItem) => listItem.name !== item.name
      );
      setCurrentSelectedDistortions([...newDistortions]);
      changeDistortions([...newDistortions]);
    } else {
      setCurrentSelectedDistortions([...currentSelectedDistortions, item]);
      changeDistortions([...currentSelectedDistortions, item]);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.tit}>Are there any cognitive distortions?</Text>
      <FlatList
        data={allDistortions}
        renderItem={({ item }) => (
          <Distortion
            onPress={() => handleOnPress(item)}
            selected={currentSelectedDistortions
              .map((distortion) => {
                return distortion.name;
              })
              .includes(item.name)}
            item={item}
          />
        )}
        keyExtractor={(item) => item.name}
      />
      <View style={styles.btnBox}>
        <Button
          onPress={() => {
            navigation.navigate("Challenge");
          }}
        >
          <Text style={styles.btnText}>Continue</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.background
  },
  tit: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 20,
  },
  itemBox: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.second,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    color: COLORS.textColor,
    height: 200,
    margin: 15,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    color: COLORS.textColor,
    fontSize: 13,
  },
  tip: {
    fontSize: 15,
    paddingBottom: 5,
    color: COLORS.grey,
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },
});
