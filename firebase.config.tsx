// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHkfqhxMn8p1Ym7cONVmMGcG4fvwLP7sQ",
  authDomain: "double-goal-383609.firebaseapp.com",
  projectId: "double-goal-383609",
  storageBucket: "double-goal-383609.appspot.com",
  messagingSenderId: "928493994002",
  appId: "1:928493994002:web:dfea2231b24cf1e2a118cb",
  measurementId: "G-90R753HMWL",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase };
