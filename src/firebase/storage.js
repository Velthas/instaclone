import { storage } from "./firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

const getPictureUrl = async (path) => {
  const imageRef = ref(storage, path);
  const url = await getDownloadURL(imageRef);
  return url;
};

export {getPictureUrl};