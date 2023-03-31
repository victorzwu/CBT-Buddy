import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../color";
import React, { useState } from "react";
import moment from "moment";

export default function Com({
  navigation,
  route,
  data,
  getData,
  formData,
  setFormData,
}) {
  console.log("formData = ", formData);
  const moodObj = {
    General: require("../../assets/emoji/general.png"),
    Happy: require("../../assets/emoji/happy.png"),
    Sad: require("../../assets/emoji/sad.png"),
    Anger: require("../../assets/emoji/anger.png"),
    Amazed: require("../../assets/emoji/amazed.png"),
    Cry: require("../../assets/emoji/cry.png"),
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardBox}>
        <View style={styles.dateBox}>
          <Text style={styles.date}>
            {moment(formData.date).format("LLLL")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: "AddMood",
            });
          }}
          style={styles.moodBox}
        >
          <Image style={styles.mood} source={moodObj[formData.mood]} />
          <Text style={styles.moodTxt}>{formData.mood}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: "Map",
            });
          }}
          style={styles.locatonBox}
        >
          <Text style={styles.locaton}>{formData.location}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: "AddPhotoAndLocation",
            });
          }}
          style={styles.coverBox}
        >
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/journal-5dfda.appspot.com/o/${
                formData.photo
              }?alt=media&token=51e171f8-7b37-4a62-9144-25606b929148`,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: "AddDetail",
            });
          }}
          style={styles.detailBox}
        >
          <Text style={styles.detail}>{formData.detail}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  cardBox: {
    alignItems: "center",
  },
  dateBox: {
    alignItems: "center",
    paddingVertical: 20,
    flexDirection: "row",
  },
  mood: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
  },
  locatonBox: {},
  locaton: {
    color: COLORS.grey,
  },
  coverBox: {
    paddingVertical: 20,
  },
  detail: {
    color: COLORS.textColor,
    fontSize: 14,
  },
  moodBox: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  moodTxt: {
    color: COLORS.textColor,
  },
});
