import { View, Text, StyleSheet, ScrollView, TextInput, Alert} from "react-native";
import { COLORS } from "../../color";
import Button from "../../Components/Button";
import { update } from "../../Firebase/firestore";
import React, { useState } from "react";
import { useJournal } from "../../Contexts/JournalContext";

export default function AddDetail({navigation}) {
  const [value, onChangeText] = useState("");
  const { formData, setFormData, data, getData } = useJournal();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tit}>What do you want to say today?</Text>

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
              // Alert.alert("Edit Success!");
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
    backgroundColor: COLORS.background,
  },
  tit: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 20,
    color: COLORS.darksilver
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    fontSize: 20,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
});
