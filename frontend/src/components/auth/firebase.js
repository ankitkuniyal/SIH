import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDoYLO2nt6YeLt02zdH74BcBi1fdkwYL6Q",
  authDomain: "krishi-sakhi-6c4e0.firebaseapp.com",
  projectId: "krishi-sakhi-6c4e0",
  storageBucket: "krishi-sakhi-6c4e0.firebasestorage.app",
  messagingSenderId: "393527477473",
  appId: "1:393527477473:web:b6abda6c14825be5b2e3a0",
  measurementId: "G-RD7YG5MDPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);