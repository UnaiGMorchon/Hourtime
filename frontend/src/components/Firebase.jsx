// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJEgNFlWR_8x2LA5j0vcqfr02I5f581j4",
  authDomain: "pruebas-login-e3266.firebaseapp.com",
  projectId: "pruebas-login-e3266",
  storageBucket: "pruebas-login-e3266.appspot.com",
  messagingSenderId: "1023110451329",
  appId: "1:1023110451329:web:cba226ab5d5966cfe8bd80",
};

export const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
