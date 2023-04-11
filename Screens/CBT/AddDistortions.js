import { View, Text, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import RegularButton from "../../Components/RegularButton";
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";
import Distortion from "../../Components/Distortion";

export default function AddDistortions({
  navigation,
  selectedDistortions,
  changeDistortions,
}) {
  useEffect(() => {
    console.log("distortion ", route.params);
  });
  const [allDistortions, setAllDistortions] = useState([]);
  const [currentSelectedDistortions, setCurrentSelectedDistortions] =
    useState(selectedDistortions);
  useEffect(() => {
    onSnapshot(collection(firestore, "CBTDistortions"), (querySnapshot) => {
      if (querySnapshot.empty) {
      } else {
        let docs = [];
        querySnapshot.docs.forEach((snap) => {
          docs.push({ ...snap.data(), id: snap.id });
        });
        setAllDistortions(docs);
      }
    });
  }, []);
  function handleOnPress(item) {
    const currentIds = currentSelectedDistortions.map((distortion) => {
      return distortion.id;
    });
    if (currentIds.includes(item.id)) {
      const newDistortions = currentSelectedDistortions.filter(
        (listItem) => listItem.id !== item.id
      );
      setCurrentSelectedDistortions([...newDistortions]);
      changeDistortions([...newDistortions]);
    } else {
      setCurrentSelectedDistortions([...currentSelectedDistortions, item]);
      changeDistortions([...currentSelectedDistortions, item]);
    }
  }
  return (
    <View>
      <Text>Are there any cognitive distortions?</Text>
      <FlatList
        data={allDistortions}
        renderItem={({ item }) => (
          <Distortion
            onPress={() => handleOnPress(item)}
            selected={currentSelectedDistortions
              .map((distortion) => {
                return distortion.id;
              })
              .includes(item.id)}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <RegularButton
        pressHandler={() => {
          navigation.navigate("Challenge");
        }}
      >
        <Text>Continue</Text>
      </RegularButton>
    </View>
  );
}
