import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { COLORS } from "../../color";
import Button from "../../Components/Button";
import { update } from "../../Firebase/firestore";
import React, { useState } from "react";

export default function Com({ formData, setFormData, navigation, getData }) {
  const [value, onChangeText] = useState("");
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tit}>What do you want to say today</Text>

      <View style={styles.itemBox}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          multiline
          numberOfLines={20}
        />
      </View>

      <View style={styles.btnBox}>
        <Button
          onPress={() => {
            setFormData({
              ...formData,
              detail: value,
            });
            if (formData.id) {
              update(formData.id, {
                detail: value,
              });
              alert("Edit Success!");
              getData();
              navigation.goBack();
            } else {
              navigation.navigate({
                name: "AddPhotoAndLocation",
              });
            }
          }}
          title={formData.id ? "Edit" : "Next"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 400,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
});
