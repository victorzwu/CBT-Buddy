import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../color";
import JournalList from "./JournalList";
import AddMood from "./AddMood";
import AddDetail from "./AddDetail";
import AddPhotoAndLocation from "./AddPhotoAndLocation";
import JournalEdit from "./JournalEdit";
import Map from "./Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFromDB } from "../../Firebase/firestore";
import NotificationButton from "../../Components/NotificationButton";

export default function Journal({ navigation }) {
  const [formData, setFormData] = useState({
    mood: "",
    detail: "",
    photo: "",
    location: "",
    date: "",
  });
  const [data, setData] = useState([]);

  const getData = () => {
    getFromDB().then((res) => {
      // console.log("res = ", res);
      setData(res);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
        headerShadowVisible: false
      })}
    >
      <Stack.Screen
        name="JournalList"
        options={() => {
          return {
            headerRight: () => {
              return <NotificationButton />;
            },
            title: "Journal",
            headerTitleAlign: "center",
          };
        }}
      >
        {(props) => (
          <JournalList
            data={data}
            getData={getData}
            setData={setData}
            formData={formData}
            setFormData={setFormData}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="JournalEdit"
        options={{
          title: "Edit",
        }}
      >
        {(props) => (
          <JournalEdit
            data={data}
            getData={getData}
            setData={setData}
            formData={formData}
            setFormData={setFormData}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="AddMood"
        options={{
          title: "Mood",
        }}
      >
        {(props) => (
          <AddMood
            data={data}
            getData={getData}
            setData={setData}
            formData={formData}
            setFormData={setFormData}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="AddDetail"
        options={{
          title: "Detail",
        }}
      >
        {(props) => (
          <AddDetail
            data={data}
            setData={setData}
            getData={getData}
            formData={formData}
            setFormData={setFormData}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AddPhotoAndLocation"
        options={{
          title: "Photo And Location",
        }}
      >
        {(props) => (
          <AddPhotoAndLocation
            data={data}
            getData={getData}
            setData={setData}
            formData={formData}
            setFormData={setFormData}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Map"
        options={{
          title: "Map",
        }}
      >
        {(props) => (
          <Map
            data={data}
            setData={setData}
            getData={getData}
            formData={formData}
            setFormData={setFormData}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
