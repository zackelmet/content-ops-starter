"use client";
import Lottie from "lottie-react";
import foxAnimation from "@/public/animations/fox_lottie.json";

export default function FoxAnimation() {
    return (
        <div className="flex justify-center items-center">
            <Lottie
                animationData={foxAnimation}
                loop
                autoplay
                style={{ width: 300, height: 300 }}
            />
        </div>
    );
}
