import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0kD1OrSGfAOsA7bzZRJslM1g_Zgvp_V0",
  authDomain: "velstaclone.firebaseapp.com",
  projectId: "velstaclone",
  storageBucket: "velstaclone.appspot.com",
  messagingSenderId: "759929175842",
  appId: "1:759929175842:web:3ffce98bb92023b89f6f7b",
  measurementId: "G-0GRHFKGJB3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)
const analytics = getAnalytics(app);

export {db, auth, storage};
