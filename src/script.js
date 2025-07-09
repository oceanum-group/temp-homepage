import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAB5H4pXJm5HdEeMFnt7I8alfi67YEO2Ro",
  authDomain: "steelwise-consulting.firebaseapp.com",
  databaseURL: "https://steelwise-consulting-default-rtdb.firebaseio.com",
  projectId: "steelwise-consulting",
  storageBucket: "steelwise-consulting.firebasestorage.app",
  messagingSenderId: "926114575208",
  appId: "1:926114575208:web:c0acf0ba73b9877903dcdd",
  measurementId: "G-BP6WT1TK44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const analytics = getAnalytics(app);
