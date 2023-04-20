import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function addCBTEntry(cbtEntry) {
  try {
    const docRef = await addDoc(collection(firestore, "CBTEntries"), cbtEntry);
    console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateCBTEntry(cbtEntryId, newEntry) {
  try {
    await updateDoc(doc(firestore, "CBTEntries", cbtEntryId), newEntry);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCBTEntry(cbtEntryId) {
  try {
    await deleteDoc(doc(firestore, "CBTEntries", cbtEntryId));
  } catch (err) {
    console.log(err);
  }
}

export async function addFavoriteResource(resource) {
  try {
    const docRef = await addDoc(collection(firestore, "favorites"), resource);
    console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFavoriteResource(resource) {
  try {
    await deleteDoc(doc(firestore, "favorites", resource));
  } catch (err) {
    console.log(err);
  }
}