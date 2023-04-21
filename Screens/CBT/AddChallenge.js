import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import Button from "../../Components/Button";
import { COLORS } from "../../color";

export default function AddChallenge({ navigation, solution, changeSolution }) {
  const [currentSolution, setCurrentSolution] = useState(solution);
  return (
    <View style={styles.container}>
      <Text style={styles.tit}>
        How can you reframe or redirect this thought
      </Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        value={currentSolution}
        onChangeText={(newSolution) => {
          setCurrentSolution(newSolution);
          changeSolution(newSolution);
        }}
        placeholder="Type here..."
      />
      <View style={styles.btnBox}>
        <Button
          onPress={() => {
            navigation.navigate("Review");
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
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.white,
    fontSize: 25
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
