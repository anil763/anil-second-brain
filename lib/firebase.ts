import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

let db: Database | null = null;
let isConfigured = false;

export function initializeFirebase() {
  // Check if Firebase is already initialized
  if (db) return db;

  // Check if env vars are configured
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.warn('Firebase not configured - using local storage only');
    isConfigured = false;
    return null;
  }

  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    isConfigured = true;
    console.log('Firebase initialized successfully');
    return db;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    isConfigured = false;
    return null;
  }
}

export function getFirebaseDB() {
  return db;
}

export function getFirebaseDatabase() {
  if (!db) {
    initializeFirebase();
  }
  return db;
}

export function isFirebaseConfigured(): boolean {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return false;
  }
  return isConfigured;
}
