// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAffSd2EJFohMtAR_hylBy-CGIt7N1B-4k",
  authDomain: "nyra-8383e.firebaseapp.com",
  projectId: "nyra-8383e",
  storageBucket: "nyra-8383e.firebasestorage.app",
  messagingSenderId: "795092486941",
  appId: "1:795092486941:web:7f6bf78c31100dd259eff4",
  measurementId: "G-GY46Y0KTF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);
export  const db=getFirestore(app);
export default app;