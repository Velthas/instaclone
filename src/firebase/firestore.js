import { db } from "./firebase-config";
import {
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  doc,
  collection,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

const createUserBucket = (name, username) => {
  const defaultPfp =
    "https://firebasestorage.googleapis.com/v0/b/velstaclone.appspot.com/o/users%2Fdf%2Fpfp.jpg?alt=media&token=4a70d3ec-47bf-4971-a99b-c3d50cedd702";
  const defaultBgp =
    "https://firebasestorage.googleapis.com/v0/b/velstaclone.appspot.com/o/users%2Fdf%2Fpbg.jpg?alt=media&token=075d5ee9-bc57-4b63-b3dc-19eb4a47590b";

  const userData = {
    name: name,
    username: username,
    description: `Hello, my name is ${name}`,
    pfp: defaultPfp,
    pbg: defaultBgp,
    follows: ["damian"],
    followed: [],
  };
  const docRef = doc(db, "Users", username);
  setDoc(docRef, userData);
};

const getUserInfo = async (username) => {
  const docRef = doc(db, "Users", username);
  const userDoc = await getDoc(docRef);
  const data = userDoc.data();
  return data;
};

const getPosts = async (username) => {
  const colRef = collection(db, "Users", username, "Posts");
  const posts = await getDocs(colRef);
  if (posts.empty) return [];
  else return posts.docs.map((doc) => doc.data());
};

//TODO: Change this in a more specific name, use this to change profile settings
const updateDocument = async (username, payload) => {
  const docRef = doc(db, "Users", username);
  await updateDoc(docRef, payload);
};

const getPostDocReference = async (username) => {
  const docRef = doc(collection(db, "Users", username, "Posts"));
  return docRef;
};

const getCommentDocReference = async (post) => {
  const docRef = doc(collection(db, "Users", post.username, "Posts", post.id, "Comments"));
  return docRef;
}

const createPost = async (ref, payload) => {
  await setDoc(ref, payload);
};

const getPostInfo = async (username, postId) => {
  const docRef = doc(db, "Users", username, "Posts", postId);
  const document = await getDoc(docRef);
  return document.data();
};

const getComments = async (username, postId) => {
  const colRef = collection(db, 'Users', username, 'Posts', postId, 'Comments')
  const comments = await getDocs(colRef);
  if (comments.empty) return [];
  else return comments.docs.map(comment => comment.data());
}

const updateLikes = async (path, username, liked) => {
  const docRef = doc(db, path);
  if (liked) updateDoc(docRef, { likedby: arrayUnion(username) });
  else updateDoc(docRef, { likedby: arrayRemove(username) });
};

const addComment = async (ref, comment) => {
  setDoc(ref, comment);
};

const deletePost = async (post) => {
  const docRef = doc(db, "Users", post.username, "Posts", post.id);
  await deleteDoc(docRef);
};

export {
  createUserBucket,
  getUserInfo,
  updateDocument,
  getPostDocReference,
  getCommentDocReference,
  getPosts,
  getComments,
  createPost,
  getPostInfo,
  deletePost,
  updateLikes,
  addComment,
};
