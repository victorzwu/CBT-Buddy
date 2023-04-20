import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { COLORS } from "../../color";
import Button from "../../Components/Button";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { deleteFromDB } from "../../Firebase/firestore";
import moment from "moment";
import { storageBucket } from "@env";

export default function Com({ navigation, route, data, getData, setFormData }) {
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
      <View style={styles.btnBox}>
        <Button
          onPress={() => {
            setFormData({
              mood: "",
              detail: "",
              photo: "",
              location: "",
              date: moment().format("YYYY-MM-DD HH:ss:mm"),
            });
            navigation.navigate({
              name: "AddMood",
            });
          }}
          title="Add Entry"
        />
      </View>
      <View style={styles.cardBox}>
        {data.length == 0 && <Text style={styles.noData}>no data</Text>}
        {data.map((v) => {
          return (
            <View key={v.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.cardLeft}>
                  <View style={styles.cardLeftTop}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      source={moodObj[v.mood]}
                    />
                    <Text style={styles.cardDate}>
                      {moment(v.date).format("DD/MM")}
                    </Text>
                  </View>
                  <View style={styles.cardLeftBottom}>
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                      }}
                      source={{
                        uri: `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${v.photo}?alt=media&token=51e171f8-7b37-4a62-9144-25606b929148`,
                      }}
                    />
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <Text style={styles.location}>{v.location}</Text>
                  <Text style={styles.cardDesc}>{v.detail}</Text>
                </View>
              </View>
              <View style={styles.optBox}>
                <Button
                  onPress={() => {
                    setFormData({
                      ...v,
                    });
                    navigation.navigate({
                      name: "JournalEdit",
                    });
                  }}
                >
                  <FontAwesome name="pencil" size={20} color="white" />
                </Button>
                <View style={styles.paddingRight} />
                <Button
                  onPress={async () => {
                    await deleteFromDB(v.id);
                    getData();
                  }}
                >
                  <MaterialIcons name="delete" size={20} color="white" />
                </Button>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cardBox: {
    alignItems: "center",
  },
  card: {
    width: "80%",
    borderWidth: 2,
    borderColor: COLORS.grey,
    borderRadius: 10,
    marginBottom: 30,
    padding: 15,
    backgroundColor: COLORS.white,
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 1,
      height: 8,
    },
  },
  cardTop: {
    flexDirection: "row",
  },
  cardDate: {
    marginLeft: 5,
  },
  cardLeft: {},
  cardLeftTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardRight: {
    flex: 1,
    marginLeft: 10,
  },
  cardDesc: {
    color: COLORS.textColor,
    fontSize: 13,
  },
  optBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  paddingRight: {
    width: 20,
  },
  noData: {
    color: COLORS.textColor,
  },
  location: {
    fontSize: 10,
    paddingBottom: 5,
    color: COLORS.darksilver,
  },
});
