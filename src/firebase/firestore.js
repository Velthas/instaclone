import { db } from "./firebase-config";
import { setDoc, getDoc, doc } from "firebase/firestore"

const createUserBucket = (name, username) => {
  const userData = {
    name: name,
    username: username,
    description: `Hello, my name is ${name}`,
    pfp: `users/df/pfp`, // reference to cloud storage default profile picture
    pbg: `users/df/pbg`, // same as above, but for background, will be updated when new pic is chosen.
    follows: ['damian'],
    followed: [],
  }
  const docRef = doc(db, "Users", username);
  setDoc(docRef, userData);
}

const getUserInfo = async (username) => {
  const docRef = doc(db, 'Users', username);
  const userDoc = await getDoc(docRef);
  return userDoc.data();
}

export { createUserBucket }