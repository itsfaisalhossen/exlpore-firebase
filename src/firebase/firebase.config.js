// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzaIUISbzSQ4jwtXkXinaqF_1ssNYnpFA",
  authDomain: "fir-fighter-fd435.firebaseapp.com",
  projectId: "fir-fighter-fd435",
  storageBucket: "fir-fighter-fd435.firebasestorage.app",
  messagingSenderId: "167886720863",
  appId: "1:167886720863:web:aca44e85443d264aabf0ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
