import { storage } from "./firebase-config";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Currently unused, leaving this here just in case
// Extracts url from a picture uploaded to storage. 
const getPictureUrl = async (path: string) => {
  const imageRef = ref(storage, path);
  const url = await getDownloadURL(imageRef);
  return url;
};

// Used for profile edits and new posts
const uploadPhoto = async (path: string, file: File) => {
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
};

// Used when post is deleted
const deletePostPhoto = async (username: string, id: string) => {
  const imageRef = ref(storage, `users/${username}/${id}`);
  await deleteObject(imageRef);
};

export { getPictureUrl, uploadPhoto, deletePostPhoto };
