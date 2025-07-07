import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqUHZKAIfCzod_H-w67m0hJcvQy4ShLlI",
  authDomain: "nedexam-67198.firebaseapp.com",
  projectId: "nedexam-67198",
  storageBucket: "nedexam-67198.firebasestorage.app",
  messagingSenderId: "1055485404455",
  appId: "1:1055485404455:web:1f9863913628a53fdeb502",
  measurementId: "G-LVJMFZCH8S"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { app };
