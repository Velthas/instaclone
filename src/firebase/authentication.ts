import { auth } from "./firebase-config";
import * as authFunc from "firebase/auth";
import { FirebaseUser } from "../utils/types";

const createUser = async (
  mail: string,
  password: string,
  username: string,
  setUser: (user: FirebaseUser | null) => void
) => {
  const response = await authFunc.createUserWithEmailAndPassword(
    auth,
    mail,
    password
  );
  const user = response.user;
  await authFunc.updateProfile(user, { displayName: username });
  if (auth.currentUser) await auth.currentUser.reload();
  setUser({ ...auth.currentUser } as FirebaseUser); // Bypasses problem:
  // When user registers, they are logged in automatically
  // and their info stored before displayName is changed.
};

// Function paired with log in form.
const loginUser = async (email: string, password: string) => {
  try {
    await authFunc.signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    return err
  }
};

// Used to provide a 'free user' for project exploration
const loginTestUser = async () => {
  await authFunc.signInWithEmailAndPassword(
    auth,
    "test@mail.com",
    "Thisisatest1"
  );
};

// Used to prevent unsigned users from accessing main app
// Redirects to home when logged user attempts accessing auth
const authenticationListener = (
  setUser: (user: FirebaseUser | null) => void
) => {
  const unsub = authFunc.onAuthStateChanged(auth, (user) => {
    if (user) setUser(user as FirebaseUser);
    else setUser(null);
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
