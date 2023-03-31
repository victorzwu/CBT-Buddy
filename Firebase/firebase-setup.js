// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
// } from "@env";
const apiKey="AIzaSyD4Cwq-HbRp3LplJZBgOQUukJ0GONfMxRw"
const authDomain="journal-5dfda.firebaseapp.com"
const projectId="journal-5dfda"
const storageBucket="journal-5dfda.appspot.com"
const messagingSenderId="723135617894"
const appId="1:723135617894:web:5c54a5b821ce8757f106a7"
const measurementId="G-8K380JR0VJ"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const CBTBuddy = initializeApp(firebaseConfig);
export const firestore = getFirestore(CBTBuddy);

//create authentication token
export const auth = initializeAuth(CBTBuddy, {
  persistence: getReactNativePersistence(AsyncStorage),
});

//export storage
export const storage = getStorage(CBTBuddy, "gs://journal-5dfda.appspot.com");
