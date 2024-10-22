// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Hl1OL4zC8k4TKMPkRZ39Fudf65F38dM",
  authDomain: "vite-contact-c2853.firebaseapp.com",
  projectId: "vite-contact-c2853",
  storageBucket: "vite-contact-c2853.appspot.com",
  messagingSenderId: "1014722456831",
  appId: "1:1014722456831:web:378cf54e078540ea83b0ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 