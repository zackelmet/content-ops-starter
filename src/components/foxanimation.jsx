"use client";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function FoxAnimation() {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        let mounted = true;
        // Prefer the newly added animation file if present. Use encodeURI to handle spaces in filenames.
        const preferred = '/animations/Fox Animation.json';
        const fallback = '/animations/fox_lottie.json';

        fetch(encodeURI(preferred))
            .then((res) => {
                if (!res.ok) throw new Error('preferred not found');
                return res.json();
            })
            .catch(() => fetch(fallback).then((r) => r.json()))
            .then((data) => {
                if (mounted) setAnimationData(data);
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error('Failed to load fox animation', err);
            });

        return () => {
            mounted = false;
        };
    }, []);

    if (!animationData) {
        return <div className="flex justify-center items-center" aria-hidden="true" />;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] transition-transform duration-500 hover:scale-105 drop-shadow-2xl">
                <Lottie animationData={animationData} loop autoplay style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    );
}
