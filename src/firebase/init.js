import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD1WCzE9LP5OZwBV8WnqgsopcChTQljROA",
  authDomain: "intomyc-2c473.firebaseapp.com",
  projectId: "intomyc-2c473",
  storageBucket: "intomyc-2c473.appspot.com",
  messagingSenderId: "784806974289",
  appId: "1:784806974289:web:698d57380858abfb273970",
};

const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
