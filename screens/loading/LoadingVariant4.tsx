import React, { useEffect, useState } from 'react';
import { data } from '../../data';

interface LoadingVariantProps {
    onFinished: () => void;
}

const LoadingVariant4: React.FC<LoadingVariantProps> = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinished, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        return () => clearInterval(timer);
    }, [onFinished]);

    // Calculate flower blooming stages based on progress
    // Scale from 0.5 to 1.0
    const scale = 0.5 + (progress / 100) * 0.5;
    // Opacity for petals
    const opacity = progress / 100;
    // Stem grows up
    const stemHeight = progress;

    return (
        <div className="relative h-full w-full bg-[#FFFCF7] flex flex-col items-center justify-between py-12 px-6 overflow-hidden font-serif">
            {/* Status Bar Spacer */}
            <div className="h-6 w-full" />

            {/* Top Text */}
            <div className="text-center space-y-3 z-10 mt-8">
                <h1 className="text-3xl italic leading-tight text-[#1c2e4a]">
                    Preparing our special<br />day...
                </h1>
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#c8a96e] mt-4">
                    Please Wait
                </p>
            </div>

            {/* Center Content */}
            <div className="relative flex items-center justify-center flex-1 w-full">
                {/* Concentric Circles */}
                <div className="absolute w-72 h-72 rounded-full border border-[#c8a96e] opacity-10 animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute w-56 h-56 rounded-full border border-[#c8a96e] opacity-20 animate-pulse" style={{ animationDuration: '2s' }} />

                {/* Animated Flower (Replacing Button) */}
                <div className="relative z-20 transform scale-150">
                    <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
                        {/* Stem - Draws upward first 0-40% */}
                        <path
                            d="M20,80 C22,60 18,45 20,35"
                            stroke="#C8A96E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="60"
                            strokeDashoffset={Math.max(0, 60 - (Math.min(1, progress / 40) * 60))}
                        />

                        {/* Base Dot */}
                        <circle cx="20" cy="80" r="2" fill="#C8A96E" />

                        {/* Leaves - Appear 30-60% */}
                        <g style={{
                            transformOrigin: '20px 60px',
                            opacity: progress > 30 ? Math.min(1, (progress - 30) / 30) : 0,
                            transform: `scale(${progress > 30 ? Math.min(1, (progress - 30) / 30) : 0})`,
                            transition: 'all 0.3s ease-out'
                        }}>
                            <path d="M20,60 C12,60 8,50 18,55" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M19,48 C27,48 31,38 21,43" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" />
                        </g>

                        {/* Flower Head Group - Blooms 50-100% */}
                        <g style={{
                            transformOrigin: '20px 35px',
                            opacity: progress > 50 ? Math.min(1, (progress - 50) / 50) : 0,
                            transform: `scale(${progress > 50 ? 0.2 + ((progress - 50) / 50) * 0.8 : 0})`,
                            transition: 'all 0.5s ease-out'
                        }}>
                            {/* Full Bloom Petals */}
                            <path d="M20,35 C15,25 10,15 20,5 C30,15 25,25 20,35" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            <path d="M20,35 C15,35 0,25 5,15 C10,15 20,25 20,35" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            <path d="M20,35 C25,35 40,25 35,15 C30,15 20,25 20,35" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                            {/* Inner Details */}
                            <path d="M20,35 V15" stroke="#C8A96E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                            <path d="M20,35 C18,30 18,25 15,20" stroke="#C8A96E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                            <path d="M20,35 C22,30 22,25 25,20" stroke="#C8A96E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />

                            {/* Center Dot */}
                            <circle cx="20" cy="35" r="1.5" fill="#C8A96E" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* Bottom Content */}
            <div className="w-full flex flex-col items-center gap-1 mb-8 z-10">

                <div className="flex items-center gap-4">
                    <div className="w-16 h-[1px] bg-[#c8a96e]/30" />
                    <p className="text-3xl tracking-widest text-[#c8a96e] font-serif italic font-bold">
                        {data.couple.initials}
                    </p>
                    <div className="w-16 h-[1px] bg-[#c8a96e]/30" />
                </div>

                <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-bold text-[#6b705c] mt-6">
                    {data.wedding.dateString}
                </p>
            </div>

        </div>
    );
};

export default LoadingVariant4;
