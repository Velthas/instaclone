import { storage } from "./firebase-config";
import { ref } from "firebase/storage";

const getProfileAndBackgroundPic = (path) => {
  const imageRef = ref(storage, path); // the path comes from db's user pfp property.
  const bgImage = ref(storage, path); // by default they point to the default pfp and bg.
  return [imageRef, bgImage];
};