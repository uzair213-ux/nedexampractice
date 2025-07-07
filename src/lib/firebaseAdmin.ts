import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// Explicitly load environment variables from .env file.
// This is a crucial step to ensure credentials are available
// in any server-side execution context.
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env') });

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // The private key can have newlines, so we replace the escaped newlines with actual newlines.
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Check if credentials are all present before attempting to initialize.
if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  const errorMessage = "Firebase Admin credentials are not fully set in the environment. Please check your .env file and server configuration.";
  console.error("🔴 CRITICAL:", errorMessage);
  // Throwing an error here is important because the app cannot function without it.
  throw new Error(errorMessage);
}

// Initialize the app only if it hasn't been initialized yet.
// Using getApps().length is the recommended way to check for existing initializations.
if (!getApps().length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    console.error("🔴 CRITICAL: Firebase Admin SDK initialization failed.", error);
    // Propagate the error to stop the application from running in a broken state.
    throw new Error(`Firebase Admin SDK initialization failed: ${error.message}`);
  }
}

// Export the initialized firestore instance for use in other parts of the app.
const firestore = admin.firestore();

export { firestore };
