// src/firebaseConfig.js
import  { initializeApp } from "firebase/app";
import "firebase/messaging"; // Import the messaging service
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyAT11snOZq3zajd_8sZiGHKRPT8nhV2mVQ",
  authDomain: "nagaland-86b03.firebaseapp.com",
  projectId: "nagaland-86b03",
  storageBucket: "nagaland-86b03.appspot.com",
  messagingSenderId: "144382590692",
  appId: "1:144382590692:web:7bcf59a0d10f14b76c76f1",
  measurementId: "G-WT94RXXTSV"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
export { messaging, getToken, onMessage };
