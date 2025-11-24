import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    
    if (!privateKey) {
        throw new Error('FIREBASE_ADMIN_PRIVATE_KEY is not set');
    }
    
    // Handle both escaped newlines and actual newlines
    const formattedKey = privateKey.includes('\\n') 
        ? privateKey.replace(/\\n/g, '\n')
        : privateKey;
    
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey: formattedKey,
        }),
    });
}

export const auth = admin.auth();
export const db = admin.firestore();
