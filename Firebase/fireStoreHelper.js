import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";

export async function addCBTEntry(cbtEntry) {
  try {
    const docRef = await addDoc(collection(firestore, "CBTEntry"), cbtEntry);
    console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateCBTEntry(cbtEntryId, newEntry) {
  try {
    await updateDoc(doc(firestore, "CBTEntry", cbtEntryId), newEntry);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCBTEntry(cbtEntryId) {
  try {
    await deleteDoc(doc(firestore, "CBTEntry", cbtEntryId));
  } catch (err) {
    console.log(err);
  }
}
