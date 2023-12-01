import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAXEYKKKJkwktA_RL2hur1rX16E0frE4gY",
//   authDomain: "sendotp-ff6eb.firebaseapp.com",
//   projectId: "sendotp-ff6eb",
//   storageBucket: "sendotp-ff6eb.appspot.com",
//   messagingSenderId: "1083865544214",
//   appId: "1:1083865544214:web:a1df08551f7556eeafe737",
//   measurementId: "G-7K9VTTC4VK",
// };

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// export { auth, firebase };

import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXEYKKKJkwktA_RL2hur1rX16E0frE4gY",
  authDomain: "sendotp-ff6eb.firebaseapp.com",
  databaseURL:
    "https://sendotp-ff6eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sendotp-ff6eb",
  storageBucket: "sendotp-ff6eb.appspot.com",
  messagingSenderId: "1083865544214",
  appId: "1:1083865544214:web:a1df08551f7556eeafe737",
  measurementId: "G-7K9VTTC4VK",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase };

export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
