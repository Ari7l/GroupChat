// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8BIvSAh0Z8M0JL2ToBief2HZ-XfrfJv8",
  authDomain: "groupchat-b2b0a.firebaseapp.com",
  projectId: "groupchat-b2b0a",
  storageBucket: "groupchat-b2b0a.appspot.com",
  messagingSenderId: "392908148739",
  appId: "1:392908148739:web:805f925187cbcaacba7e36",
  measurementId: "G-V6NQESYJ2G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
const analytics = getAnalytics(app);