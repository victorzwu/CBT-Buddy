import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function writeToCBT(entry) {
    try {
      const docRef = await addDoc(collection(firestore, "CBTentries"), entry);
    } catch (error) {
      console.log(error);
    }
  }

  export async function deleteFromCBT(id) {
    try {
      await deleteDoc(doc(firestore, "CBTentries", id));
    } catch (err) {
      console.log(err);
    }
  }


  export async function editFromCBT(id) {
    try {
      await updateDoc(doc(firestore, "CBTentries", id), {overLimit: false});
    } catch (err) {
      console.log(err);
    }
  }