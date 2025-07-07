'use server';

/**
 * @fileOverview Manages the global visibility of the admit card page using Firebase Firestore.
 * 
 * - getAdmitCardVisibility - Retrieves the current visibility status from Firestore.
 * - setAdmitCardVisibility - Sets the visibility status in Firestore.
 */

import { firestore } from '@/lib/firebaseAdmin';

const CONFIG_COLLECTION = 'config';
const VISIBILITY_DOC = 'admitCard';


export async function getAdmitCardVisibility(): Promise<boolean> {
    try {
        const docRef = firestore.collection(CONFIG_COLLECTION).doc(VISIBILITY_DOC);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            console.log("Admit card visibility config not found in Firestore. Defaulting to visible.");
            return true;
        }
        
        return doc.data()?.isVisible !== false;
    } catch (error: any) {
        console.error('Error getting admit card visibility from Firestore:', error.message);
        // Default to true in case of error to not block users.
        return true;
    }
}

export async function setAdmitCardVisibility(isVisible: boolean): Promise<{ success: boolean; message: string }> {
     try {
        const docRef = firestore.collection(CONFIG_COLLECTION).doc(VISIBILITY_DOC);
        await docRef.set({ isVisible: isVisible }, { merge: true });
        
        return { success: true, message: `Admit card visibility set to ${isVisible}.` };
    } catch (error: any) {
        console.error('Error setting admit card visibility in Firestore:', error.message);
        return { success: false, message: `Database connection failed: ${error.message}. Please check server logs and ensure Firebase credentials are correct.` };
    }
}
