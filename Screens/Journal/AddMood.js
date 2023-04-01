import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../color";
import { update } from "../../Firebase/firestore";
import React, { useState } from "react";

export default function Com({ formData, setFormData, navigation, getData }) {
  const [listData, setListData] = useState([
    {
      icon: require("../../assets/emoji/general.png"),
      label: "General",
      checked: false,
    },
    {
      icon: require("../../assets/emoji/happy.png"),
      label: "Happy",
      checked: false,
    },
    {
      icon: require("../../assets/emoji/sad.png"),
      label: "Sad",
      checked: false,
    },
    {
      icon: require("../../assets/emoji/anger.png"),
      label: "Anger",
      checked: false,
    },
    {
      icon: require("../../assets/emoji/amazed.png"),
      label: "Amazed",
      checked: false,
    },
    {
      icon: require("../../assets/emoji/cry.png"),
      label: "Cry",
      checked: false,
    },
  ]);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tit}>How are you felling totay?</Text>

      <View style={styles.itemBox}>
        {listData.map((v, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                let deepData = [...listData];
                deepData.forEach((item) => {
                  item.checked = false;
                });
                deepData[i].checked = true;

                if (formData.id) {
                  update(formData.id, {
                    mood: deepData[i].label,
                  });
                  alert("Edit Success!");
                  getData();
                  navigation.goBack();
                } else {
                  navigation.navigate({
                    name: "AddDetail",
                  });
                }
                setFormData({
                  ...formData,
                  mood: deepData[i].label,
                });
                setListData(deepData);
              }}
              style={v.checked ? styles.itemActive : styles.item}
              key={v.label}
            >
              <Image style={styles.itemIcon} source={v.icon} />
              <Text style={styles.itemLabel}>{v.label}</Text>
            </TouchableOpacity>
          );
        })}
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
  itemIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.yellow,
  },
  itemActive: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
