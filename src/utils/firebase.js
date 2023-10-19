// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDm1iO_KmjvpZD7RcNVeuQ4-g2eBKA7wrc",
  authDomain: "netflix-gpt-1e0c3.firebaseapp.com",
  projectId: "netflix-gpt-1e0c3",
  storageBucket: "netflix-gpt-1e0c3.appspot.com",
  messagingSenderId: "704353308513",
  appId: "1:704353308513:web:688fe17b693b401934bf20",
  measurementId: "G-73D5ZCMR5Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
