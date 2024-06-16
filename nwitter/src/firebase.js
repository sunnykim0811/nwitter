// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-nRjfavcK6C-ZuW95BMZVVdHFtXnA2HQ",
  authDomain: "nwitter-a12ab.firebaseapp.com",
  projectId: "nwitter-a12ab",
  storageBucket: "nwitter-a12ab.appspot.com",
  messagingSenderId: "322791067931",
  appId: "1:322791067931:web:eb47b679f01174cd1e03be",
  measurementId: "G-PY72JL87VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;
