import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import defaultpfp from '../assets/images/default.svg';

const createUser = async (mail, password, username) => {
  signOut(auth); //TODO Remember to take this out after testing is done
  const response = await createUserWithEmailAndPassword(auth, mail, password);
  const user = response.user;
  await updateProfile(user, {displayName: username, photoUrl: defaultpfp});
};

const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const authenticationListener = (setUser) => { // handles redirects when not authenticated/otherwise
  const unsub = onAuthStateChanged(auth, (user) => {setUser(user)});
  return unsub;
}

const getUsernameAndPhoto = async () => {
  const user = auth.currentUser
  return {username: user.displayName, photo: user.photoURL}
};

const signOutCurrentUser = () => signOut(auth)

export { createUser, loginUser, authenticationListener, signOutCurrentUser };