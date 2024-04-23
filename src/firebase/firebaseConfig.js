import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAWXRX03Phzc3TIWgrocVRqs-We5DWheLo",
  authDomain: "echtzeitseinkuf-4de59.firebaseapp.com",
  projectId: "echtzeitseinkuf-4de59",
  storageBucket: "echtzeitseinkuf-4de59.appspot.com",
  messagingSenderId: "769617128451",
  appId: "1:769617128451:web:75db0f0ae2eb229213b236",
  measurementId: "G-K24HK64G02",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, analytics, auth };
