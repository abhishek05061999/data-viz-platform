import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import type { User } from '../types';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmT1lYha4-wCeSHW2mUz8D_30WvVqqeOg",
  authDomain: "datavisualization-d1def.firebaseapp.com",
  projectId: "datavisualization-d1def",
  storageBucket: "datavisualization-d1def.firebasestorage.app",
  messagingSenderId: "786811238908",
  appId: "1:786811238908:web:526521b659742716585a79",
  measurementId: "G-Z7T1164NR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    // For development: Create a mock user if Firebase is not configured
    if (firebaseConfig.apiKey.includes('AIzaSyBdZEfHAPiT')) {
      console.log('Using mock authentication for development');
      return {
        uid: 'mock-user-id',
        email: 'demo@example.com',
        displayName: 'Demo User',
        photoURL: '',
      } as User;
    }
    
    const result = await signInWithPopup(auth, googleProvider);
    return result.user as User;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    // For development: Create a mock user if Firebase is not configured
    if (firebaseConfig.apiKey.includes('AIzaSyBdZEfHAPiT')) {
      console.log('Using mock authentication for development');
      return {
        uid: 'mock-user-id',
        email: email,
        displayName: 'Demo User',
        photoURL: '',
      } as User;
    }
    
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user as User;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

// Create a new user with email and password
export const createUser = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export { auth };