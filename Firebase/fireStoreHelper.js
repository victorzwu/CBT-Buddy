import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function writeToCBT(entry) {
    try {
      const docRef = await addDoc(collection(firestore, "CBTentries"), entry);
    } catch (error) {
      console.log(error);
    }
  }