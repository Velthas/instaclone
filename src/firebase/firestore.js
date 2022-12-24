import { db } from "./firebase-config";
import { setDoc, getDoc, updateDoc, getDocs, doc, collection } from "firebase/firestore";

const createUserBucket = (name, username) => {
  const defaultPfp = 'https://firebasestorage.googleapis.com/v0/b/velstaclone.appspot.com/o/users%2Fdf%2Fpfp.jpg?alt=media&token=4a70d3ec-47bf-4971-a99b-c3d50cedd702';
  const defaultBgp = 'https://firebasestorage.googleapis.com/v0/b/velstaclone.appspot.com/o/users%2Fdf%2Fpbg.jpg?alt=media&token=075d5ee9-bc57-4b63-b3dc-19eb4a47590b';
  const userData = {
    name: name,
    username: username,
    description: `Hello, my name is ${name}`,
    pfp: defaultPfp,
    pbg: defaultBgp, 
    follows: ['damian'],
    followed: [],
  }
  const docRef = doc(db, "Users", username);
  setDoc(docRef, userData);
}

const getUserInfo = async (username) => {
  const docRef = doc(db, 'Users', username);
  const userDoc = await getDoc(docRef);
  const data = userDoc.data();
  return data;
}

const getPosts = async (username) => {
  const colRef = collection(db, 'Users', username, 'Posts');
  const posts = await getDocs(colRef);
  if(posts.empty) return [];
  else return posts.map(doc => doc.data());
}

const updateDocument = async (username, payload) => {
  const docRef = doc(db, 'Users', username);
  await updateDoc(docRef, payload);
}

export { createUserBucket, getUserInfo, getPosts, updateDocument}