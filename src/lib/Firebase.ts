// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_ewsZPn6FuwpRQP3zzgqIbiJSFU4STxM",
  authDomain: "todo-83642.firebaseapp.com",
  projectId: "todo-83642",
  storageBucket: "todo-83642.appspot.com",
  messagingSenderId: "51301907060",
  appId: "1:51301907060:web:ce10d0f3ab7e6c39ab6f21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


export {db, auth, analytics};