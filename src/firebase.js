// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'med-board.firebaseapp.com',
  projectId: 'med-board',
  storageBucket: 'med-board.appspot.com',
  messagingSenderId: '225279677735',
  appId: '1:225279677735:web:412a6e2895cc2b3a430502',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
