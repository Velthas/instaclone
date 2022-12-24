import { storage } from "./firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const getPictureUrl = async (path) => {
  const imageRef = ref(storage, path);
  const url = await getDownloadURL(imageRef);
  return url;
};

const uploadPhoto = async (path, file) => {
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
}

export {getPictureUrl, uploadPhoto};