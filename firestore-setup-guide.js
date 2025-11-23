// Firestore Schema Setup Guide
// Execute this in your browser console on Firebase Console's Firestore page
// Or use this as a reference to manually create the structure

/*
Collection: users
Document ID: {uid} (your Firebase Auth user ID)

Example structure:
*/

const exampleUserDocument = {
  uid: "YOUR_FIREBASE_UID_HERE",
  email: "user@example.com",
  stripeCustomerId: "cus_123456789", // Set by Stripe webhook
  subscriptionId: "sub_987654321", // Set by Stripe webhook
  planTier: "pro", // Options: "basic", "pro", "premium"
  monthlyLimit: 200, // 50 for basic, 200 for pro, 999999 for premium
  scansUsed: 0, // Incremented on each scan
  cycleStart: new Date(), // Timestamp - start of billing cycle
  lastResetAt: new Date(), // Timestamp - when scansUsed was last reset
  subscriptionStatus: "active" // Options: "active", "trialing", "inactive", "canceled"
};

/*
To set up in Firebase Console:

1. Go to: https://console.firebase.google.com
2. Select your project
3. Click "Firestore Database" in the left sidebar
4. Click "Start collection"
5. Collection ID: "users"
6. Document ID: Use your Firebase Auth UID (get it from Authentication tab)
7. Add these fields:
   - uid (string): your Firebase Auth UID
   - email (string): your email
   - planTier (string): "basic" or "pro" or "premium"
   - monthlyLimit (number): 50 (basic), 200 (pro), or 999999 (premium)
   - scansUsed (number): 0
   - subscriptionStatus (string): "active"
   - cycleStart (timestamp): Click "Use current time"
   - lastResetAt (timestamp): Click "Use current time"
   - stripeCustomerId (string): Leave empty for now (webhook will set)
   - subscriptionId (string): Leave empty for now (webhook will set)

8. Click "Save"
*/
