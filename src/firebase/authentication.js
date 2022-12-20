import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const createUser = async (mail, password, username) => {
  signOut(auth); //TODO Remember to take this out after testing is done
  const response = await createUserWithEmailAndPassword(auth, mail, password);
  const user = response.user;
  await updateProfile(user, {displayName: username})
};

const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const getUsernameAndPhoto = async () => {
  const user = auth.currentUser
  return {username: user.displayName, photo: user.photoURL}
};

export { createUser, loginUser };