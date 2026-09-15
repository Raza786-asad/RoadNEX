import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

let app = null;
let auth = null;
let googleProvider = null;

// Only initialize if a valid non-empty API key is provided
if (apiKey && typeof apiKey === 'string' && apiKey.trim().length > 10 && apiKey !== 'your-firebase-api-key') {
  try {
    const firebaseConfig = {
      apiKey,
      authDomain: authDomain || `${projectId || 'roadguard'}.firebaseapp.com`,
      projectId: projectId || 'roadguard',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    };
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn('[Firebase] Initialization skipped:', error.message);
  }
}

export { app, auth, googleProvider };
