import { auth } from "./firebase-config";
import * as authFunc from "firebase/auth";

const createUser = async (mail, password, username, setUser) => {
  const response = await authFunc.createUserWithEmailAndPassword(auth, mail, password);
  const user = response.user;
  await authFunc.updateProfile(user, { displayName: username });
  await auth.currentUser.reload();
  setUser({ ...auth.currentUser }); // Bypasses problem:
  // When user registers, they are logged in automatically
  // and their info stored before displayName is changed.
};

// Function paired with log in form.
const loginUser = async (email, password) => {
  await authFunc.signInWithEmailAndPassword(auth, email, password);
};

// Used to provide a 'free user' for project exploration
const loginTestUser = async () => {
  await authFunc.signInWithEmailAndPassword(auth, "test@mail.com", "Thisisatest1");
};

// Used to prevent unsigned users from accessing main app
// Redirects to home when logged user attempts accessing auth
const authenticationListener = (setUser) => {
  const unsub = authFunc.onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return unsub;
};

const signOutCurrentUser = () => authFunc.signOut(auth);

// Simply get the displayName of current user.
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
