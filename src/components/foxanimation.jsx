"use client";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function FoxAnimation(props) {
    const { elementId } = props || {};
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        let mounted = true;
        // Decide preferred animation based on elementId (allows swapping the fox for the live chatbot)
        // If the content indicates the live-chat hero, prefer the newly added 'Gem in clouds' animation
        const preferred = (elementId && String(elementId).toLowerCase().includes('chat'))
            ? '/animations/Gem in clouds.json'
            : '/animations/Fox Animation.json';
        const fallback = (elementId && String(elementId).toLowerCase().includes('chat'))
            ? '/animations/Live chatbot.json'
            : '/animations/fox_lottie.json';

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
            <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] transition-transform duration-500 hover:scale-105 drop-shadow-2xl">
                <Lottie animationData={animationData} loop autoplay style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    );
}
