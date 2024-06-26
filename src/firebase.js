import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyBwLD5BMJMvpQZxWCA6YL0_2aBI3QcnT00",
  authDomain: "crypto-app-e943e.firebaseapp.com",
  projectId: "crypto-app-e943e",
  storageBucket: "crypto-app-e943e.appspot.com",
  messagingSenderId: "698696777014",
  appId: "1:698696777014:web:f98938dda62adec5738797"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)