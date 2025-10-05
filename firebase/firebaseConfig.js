import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV4tSRSIU9BMjFGMSxVpN2Wx025uZ79JE",
  authDomain: "inewsapp.firebaseapp.com",
  projectId: "inewsapp",
  storageBucket: "inewsapp.firebasestorage.app",
  messagingSenderId: "226395431547",
  appId: "1:226395431547:web:00578f18c55e7eb84138de"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
