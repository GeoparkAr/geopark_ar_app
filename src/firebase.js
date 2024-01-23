// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1aFAvYEicl_SUtKX116VW4slDIpJCTqI",
  authDomain: "app-rn-fb.firebaseapp.com",
  projectId: "app-rn-fb",
  storageBucket: "app-rn-fb.appspot.com",
  messagingSenderId: "1085259751406",
  appId: "1:1085259751406:web:b929f4931c7aed711778ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };