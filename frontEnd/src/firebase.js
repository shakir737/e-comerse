// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz-OqesjHB3-55x-FBchYgYgXH_53C0lA",
  authDomain: "ecomerse-c711d.firebaseapp.com",
  projectId: "ecomerse-c711d",
  storageBucket: "ecomerse-c711d.appspot.com",
  messagingSenderId: "982646009021",
  appId: "1:982646009021:web:150c3175d6794282ef5bd4",
  measurementId: "G-G0MBCS3Q4Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);