'use client';

import { useState } from 'react';
import { auth } from '../../../utils/firebase';

interface CheckoutButtonProps {
    tier: 'ESSENTIAL' | 'PRO' | 'SCALE';
    label?: string;
    style?: string;
}

export default function CheckoutButton({ tier, label = 'Get Started', style = 'primary' }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const priceIds = {
        ESSENTIAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL,
        PRO: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
        SCALE: process.env.NEXT_PUBLIC_STRIPE_PRICE_SCALE,
    };

    const handleCheckout = async () => {
        const user = auth.currentUser;
        
        if (!user) {
            window.location.href = '/login?redirect=/pricing';
            return;
        }

        setLoading(true);

        try {
            const idToken = await user.getIdToken();
            const priceId = priceIds[tier];

            const response = await fetch('/api/stripe/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId,
                    idToken,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Failed to start checkout. Please try again.');
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`sb-component sb-component-block sb-component-button ${
                style === 'primary' ? 'sb-component-button-primary' : 'sb-component-button-secondary'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? 'Loading...' : label}
        </button>
    );
}
