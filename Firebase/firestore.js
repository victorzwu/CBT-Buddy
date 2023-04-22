import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc
} from "firebase/firestore";
import { firestore } from "./firebase-setup";
import { auth } from "./firebase-setup";


export async function getFromDB() {
  // console.log("aaa = ", auth.currentUser.email)
  try {
    let data = [];
    const collectionUsers = collection(firestore, "journals");
    const q = query(collectionUsers, where("email", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return data;
    }
    querySnapshot.forEach((doc) => {
      // console.log("doc = ", doc)
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function writeToDB({ data, detail, location, mood, photo }) {
  try {
    await addDoc(collection(firestore, "journals"), {
      data: data,
      detail: detail,
      location: location,
      mood: mood,
      photo: photo,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function uploadAvatar(uri, uid) {
  try {
    const data = {
      uri: uri
    };
    
    const docRef = doc(firestore, "avatar", uid);
    await setDoc(docRef, data);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(key) {
  try {
    await deleteDoc(doc(firestore, "journals", key));
  } catch (err) {
    console.log(err);
  }
}

export async function update(key, obj) {
  try {
    const docRef = doc(firestore, "journals", key);
    await updateDoc(docRef, obj);
  } catch (err) {
    console.log(err);
  }
}
