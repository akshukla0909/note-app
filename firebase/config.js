import { initializeApp } from "firebase/app";
import { getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA7mYGQzq4XJRZ5VTMBDNxxQemwtdNFB20",
    authDomain: "to-do-4decd.firebaseapp.com",
    projectId: "to-do-4decd",
    storageBucket: "to-do-4decd.appspot.com",
    messagingSenderId: "665899924478",
    appId: "1:665899924478:web:482a3c57584bc44df91eaf",
    measurementId: "G-EPZ8FNBVFN"
  };
  
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);