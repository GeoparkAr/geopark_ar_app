// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO6j1ieNoX2uujxRuRldKwIjYicHrhp0s",
  authDomain: "geopark-ar-app.firebaseapp.com",
  projectId: "geopark-ar-app",
  storageBucket: "geopark-ar-app.appspot.com",
  messagingSenderId: "86576468544",
  appId: "1:86576468544:web:425e355ed0d523c84105a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };