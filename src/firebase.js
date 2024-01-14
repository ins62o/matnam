// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTkOa4eULb6zBhMj-sQRQilXYAhxc8BdA",
  authDomain: "matnam-a9ebe.firebaseapp.com",
  projectId: "matnam-a9ebe",
  storageBucket: "matnam-a9ebe.appspot.com",
  messagingSenderId: "823570708162",
  appId: "1:823570708162:web:d6735f8023f54c28582d5b",
  measurementId: "G-0BWWQB1XMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);
