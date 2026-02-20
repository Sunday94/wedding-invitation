import React, { useEffect, useState } from 'react';
import { data } from '../../data';

interface LoadingVariantProps {
    onFinished: () => void;
}

const LoadingVariant3: React.FC<LoadingVariantProps> = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animation duration approx 4-5 seconds to be "slowly"
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinished, 300);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);
        return () => clearInterval(timer);
    }, [onFinished]);

    // Calculate scale to fill the screen
    // Start small (scale 1 = 10px), end huge.
    // Use a quartic easing curve (x^4) to keep the circle smaller for longer,
    // ensuring it visually completes filling the screen right as it hits 100%.
    const scale = 1 + Math.pow(progress / 100, 4) * 400;

    return (
        <div className="relative h-full w-full bg-[#0a0a0a] flex flex-col justify-between p-8 overflow-hidden font-serif">

            {/* Background hints/faint image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
                style={{
                    backgroundImage: `url(${data.wedding.welcomeImage})`,
                    filter: 'grayscale(100%) contrast(1.2)'
                }}
            />
            {/* Dark overlay to ensure text contrast and premium feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

            {/* The Expanding Dot */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
                <div
                    className="w-3 h-3 rounded-full bg-[#F2F0E9] shadow-[0_0_20px_rgba(242,240,233,0.6)]"
                    style={{
                        transform: `scale(${scale})`,
                        transition: 'transform 0.05s linear',
                        willChange: 'transform'
                    }}
                />
            </div>

            {/* Top Text */}
            <div className="relative z-10 pt-4">
                <h1 className="text-4xl italic text-white leading-tight font-serif">
                    Preparing our special day...
                </h1>
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-gray-400 mt-3 font-medium">
                    PLEASE WAIT
                </p>
            </div>

            {/* Bottom Right Text */}
            <div className="relative z-10 flex flex-col items-end pb-4">
                <div className="flex flex-row items-baseline gap-1">
                    <span className="text-5xl text-[#C8A022] font-serif">
                        {data.couple.initials.split('&')[0]}
                    </span>
                    <span className="text-2xl text-[#C8A022] font-serif italic opacity-80">&</span>
                    <span className="text-5xl text-[#C8A022] font-serif">
                        {data.couple.initials.split('&')[1]}
                    </span>
                </div>

                <div className="w-12 h-[1px] bg-[#C8A022]/40 my-3" />

                <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-white/90 font-medium">
                    {data.wedding.dateString}
                </p>
            </div>

            {/* Theme Toggle Button Position (Optional, keeping consistent if exists in others) */}
            {/* Not explicitly asked for but good for consistency? Variant 2 has it. I'll omit to keep clean unless requested. */}
        </div>
    );
};

export default LoadingVariant3;
