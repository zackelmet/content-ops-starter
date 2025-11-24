import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check which env vars are available (without exposing values)
    const envCheck = {
        STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
        NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
        FIREBASE_ADMIN_PROJECT_ID: !!process.env.FIREBASE_ADMIN_PROJECT_ID,
        FIREBASE_ADMIN_CLIENT_EMAIL: !!process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        FIREBASE_ADMIN_PRIVATE_KEY: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
        NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL,
        NEXT_PUBLIC_STRIPE_PRICE_PRO: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
        NEXT_PUBLIC_STRIPE_PRICE_SCALE: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_SCALE,
    };

    return res.status(200).json({
        environment: process.env.NODE_ENV,
        netlifyContext: process.env.CONTEXT || 'unknown',
        envVarsPresent: envCheck,
        allEnvVarsSet: Object.values(envCheck).every(v => v === true),
    });
}
