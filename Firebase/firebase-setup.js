// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "@env";

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
export const storage = getStorage(CBTBuddy);
