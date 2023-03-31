import { View, Text, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import RegularButton from "../../Components/RegularButton";
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase-setup";
import Distortion from "../../Components/Distortion";

export default function AddDistortions({ route, navigation }) {
  useEffect(() => {
    console.log("distortion ", route.params);
  });
  const [allDistortions, setAllDistortions] = useState([]);
  const [selectedDistortions, setSelectedDistortions] = useState(
    route.params.distortions
      ? route.params.distortions.map((distortion) => distortion.id)
      : []
  );
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
    if (selectedDistortions.includes(item.id)) {
      const newDistortions = selectedDistortions.filter(
        (listItem) => listItem !== item.id
      );
      setSelectedDistortions([...newDistortions]);
    } else {
      setSelectedDistortions([...selectedDistortions, item.id]);
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
            selected={selectedDistortions.includes(item.id)}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <RegularButton
        pressHandler={() => {
          navigation.navigate("Challenge", {
            distortions: allDistortions.filter((distortion) => {
              return selectedDistortions.includes(distortion.id);
            }),
            ...route.params,
          });
        }}
      >
        <AntDesign name="arrowright" size={24} color="white" />
      </RegularButton>
    </View>
  );
}
