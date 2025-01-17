import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyCfZpbYamm8sKtJ_zjeajnjAFpFQWC0qsc",
    authDomain: "summative-9a0b1.firebaseapp.com",
    projectId: "summative-9a0b1",
    storageBucket: "summative-9a0b1.firebasestorage.app",
    messagingSenderId: "771000646814",
    appId: "1:771000646814:web:9fcab7974e55c53fe4cf8f"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };