import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const createUser = async (mail, password, username, setUser) => {
  const response = await createUserWithEmailAndPassword(auth, mail, password);
  const user = response.user;
  await updateProfile(user, {displayName: username});
  setUser({...auth.currentUser}); // bypasses problem: when the user is signed up
  // they are logged in by default, and their info stored before displayName change takes place
  // this means their profile cannot be displayed on first login. 
};

const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const authenticationListener = (setUser) => {
  const unsub = onAuthStateChanged(auth, (user) => {setUser(user)});
  return unsub;
}

const signOutCurrentUser = () => signOut(auth);

const getCurrentUserUsername = () => auth.currentUser ? auth.currentUser.displayName : null;

export { createUser, loginUser, authenticationListener, signOutCurrentUser, getCurrentUserUsername };