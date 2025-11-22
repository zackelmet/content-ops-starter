// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvbOFN9SMRQ82D6Q_DoDAZwLnXfwzM7Os",
  authDomain: "hosted-scanners-30b84.firebaseapp.com",
  projectId: "hosted-scanners-30b84",
  storageBucket: "hosted-scanners-30b84.firebasestorage.app",
  messagingSenderId: "635858390506",
  appId: "1:635858390506:web:62f918faf4f9143cdf7693",
  measurementId: "G-7107KHBD8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);

export { app, analytics, auth };
