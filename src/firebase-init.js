import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAB5H4pXJm5HdEeMFnt7I8alfi67YEO2Ro",
  authDomain: "steelwise-consulting.firebaseapp.com",
  projectId: "steelwise-consulting",
  storageBucket: "steelwise-consulting.appspot.com",
  messagingSenderId: "926114575208",
  appId: "1:926114575208:web:c0acf0ba73b9877903dcdd",
  measurementId: "G-BP6WT1TK44"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
