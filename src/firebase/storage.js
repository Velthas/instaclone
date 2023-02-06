import { storage } from "./firebase-config";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Use this to extract an url from an existing file in the storage
// Pictures are stored on their database 'sockets' by url
const getPictureUrl = async (path) => {
  const imageRef = ref(storage, path);
  const url = await getDownloadURL(imageRef);
  return url;
};

// Used to load photos onto the database
// Both for profile and new posts.
const uploadPhoto = async (path, file) => {
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
}

// Used to delete post picture from database
const deletePostPhoto = async (username, id) => {
  const imageRef = ref(storage, `users/${username}/${id}`);
  await deleteObject(imageRef);
}

export {getPictureUrl, uploadPhoto, deletePostPhoto};