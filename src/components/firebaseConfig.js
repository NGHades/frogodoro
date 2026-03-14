// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXGRYy45eqxgLv3Fupe02ZWcoHku6N8Oc",
  authDomain: "frogodoro-246b8.firebaseapp.com",
  projectId: "frogodoro-246b8",
  storageBucket: "frogodoro-246b8.firebasestorage.app",
  messagingSenderId: "511876594026",
  appId: "1:511876594026:web:01edbdb8bd614caa71cd13",
  measurementId: "G-BHJDZ039W8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("Multiple tabs open, Firestore persistence disabled");
  } else if (err.code === "unimplemented") {
    console.warn("Browser doesn't support Firestore persistence");
  }
});
