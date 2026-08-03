// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi1YLctSop8-QzATQBVOyJwuCacp5uy-I",
  authDomain: "anna-5180b.firebaseapp.com",
  projectId: "anna-5180b",
  storageBucket: "anna-5180b.firebasestorage.app",
  messagingSenderId: "842315027703",
  appId: "1:842315027703:web:db79b9c4aa1c0de54e6ff2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {app, auth, storage, db};