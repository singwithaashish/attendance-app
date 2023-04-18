// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4NcZdW7q32xZ1saOH7sfPXNojD0D1A10",
  authDomain: "testing-apps-8af7f.firebaseapp.com",
  projectId: "testing-apps-8af7f",
  storageBucket: "testing-apps-8af7f.appspot.com",
  messagingSenderId: "118120186393",
  appId: "1:118120186393:web:83ff13925a74ab814ee088"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app, db}