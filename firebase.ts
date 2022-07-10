// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRiI_NZlN48sZZ8ZnxsEUtAiXXOS7P_n0",
  authDomain: "pokemon-87c16.firebaseapp.com",
  projectId: "pokemon-87c16",
  storageBucket: "pokemon-87c16.appspot.com",
  messagingSenderId: "1004510680568",
  appId: "1:1004510680568:web:556ff9b5d9d4557ba7f20d",
  measurementId: "G-BD0XGWM9NN",
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(appFirebase);
