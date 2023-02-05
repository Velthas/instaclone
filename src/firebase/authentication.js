import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const createUser = async (mail, password, username, setUser) => {
  const response = await createUserWithEmailAndPassword(auth, mail, password);
  const user = response.user;
  await updateProfile(user, { displayName: username });
  setUser({ ...auth.currentUser }); // bypasses problem: when the user is signed up
  // they are logged in by default, and their info stored before displayName change takes place
  // this means their profile cannot be displayed on first login.
};

// Paired with login form, logs in users.
const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// Used to provide a 'free user' for project exploration
const loginTestUser = async () => {
  await signInWithEmailAndPassword(auth, "test@mail.com", "Thisisatest1");
};

// I have this listener on the App component.
// Prevents signed users from going into the auth section
// and unsigned from accessing the app.
const authenticationListener = (setUser) => {
  const unsub = onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return unsub;
};

const signOutCurrentUser = () => signOut(auth);

// Used for a variety of checks, mostly to see if the user viewing a post/comment
// is not the user who made it. This way we can decide when to display follow and other things.
const getCurrentUserUsername = () =>
  auth.currentUser ? auth.currentUser.displayName : null;

export {
  createUser,
  loginUser,
  authenticationListener,
  signOutCurrentUser,
  getCurrentUserUsername,
  loginTestUser,
};
