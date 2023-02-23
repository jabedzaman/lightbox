import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI7WSJkNlncqtlH3mmgOif2vQ08VptvfU",
  authDomain: "flow-hackathon-blaze.firebaseapp.com",
  projectId: "flow-hackathon-blaze",
  storageBucket: "flow-hackathon-blaze.appspot.com",
  messagingSenderId: "77107203545",
  appId: "1:77107203545:web:1a4173fe15e7c1903cddc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };