import React, { useEffect, useState } from 'react';
import { data } from '../../data';

interface LoadingVariantProps {
    onFinished: () => void;
}

const LoadingVariant5: React.FC<LoadingVariantProps> = ({ onFinished }) => {
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

    // Sun vertical position (rising)
    // Starts low (below horizon) and rises up
    const sunY = 100 - (progress * 0.8); // Moves from 100 to 20

    // Sun opacity - fades in as it rises
    const sunOpacity = Math.min(1, progress / 30);

    // Rays opacity - appears later
    const raysOpacity = Math.max(0, (progress - 40) / 60);

    // Horizon line opacity
    const horizonOpacity = Math.min(1, progress / 20);

    return (
        <div className="relative h-full w-full bg-[#fff8ee] flex flex-col items-center justify-between py-12 px-6 overflow-hidden font-serif">
            {/* Background Gradient Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-50 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, transparent, rgba(212, 129, 58, ${progress / 200}))`
                }}
            />

            {/* Top Text */}
            <div className={`text-center space-y-3 z-10 mt-16 transition-opacity duration-1000 ${progress > 10 ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-3xl italic leading-tight text-[#d4813a]">
                    Preparing our special<br />day...
                </h1>
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#d4813a] opacity-70 mt-4">
                    Please Wait
                </p>
            </div>

            {/* Center Animation: Sunrise */}
            <div className="relative flex items-center justify-center flex-1 w-full z-10">
                <div className="relative w-64 h-64 flex items-center justify-center">

                    {/* Sun Rays (Rotating) */}
                    <div
                        className="absolute inset-0 flex items-center justify-center animate-spin"
                        style={{
                            opacity: raysOpacity,
                            transition: 'opacity 1s ease-out',
                            animationDuration: '20s'
                        }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-32 bg-[#d4813a] origin-bottom rounded-full"
                                style={{
                                    transform: `rotate(${i * 30}deg) translateY(-40px)`,
                                    opacity: 0.2
                                }}
                            />
                        ))}
                    </div>

                    {/* Sun */}
                    <div
                        className="absolute w-20 h-20 rounded-full bg-[#d4813a] shadow-[0_0_40px_rgba(212,129,58,0.6)] flex items-center justify-center transition-all duration-300 ease-out animate-[spin_10s_linear_infinite]"
                        style={{
                            transform: `translateY(${sunY - 50}px) rotate(${progress * 2}deg)`,
                            opacity: sunOpacity
                        }}
                    >
                        <span className="material-icons text-white text-4xl opacity-80">wb_sunny</span>
                    </div>

                    {/* Horizon Line */}
                    <div
                        className="absolute w-48 h-[2px] bg-[#d4813a] opacity-30 bottom-24 rounded-full"
                        style={{
                            opacity: horizonOpacity * 0.3,
                            transform: `scaleX(${Math.min(1, progress / 30)})`,
                            transition: 'all 0.5s ease-out'
                        }}
                    />

                    {/* Water/Reflection Effect */}
                    <div
                        className="absolute bottom-10 w-full h-12 flex flex-col items-center gap-1 overflow-hidden"
                        style={{ opacity: raysOpacity }}
                    >
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[2px] bg-[#d4813a] rounded-full opacity-40 animate-pulse"
                                style={{
                                    width: `${40 - (i * 10)}px`,
                                    animationDelay: `${i * 0.2}s`
                                }}
                            />
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom Content: Initials & Date */}
            <div className={`w-full flex flex-col items-center gap-1 mb-12 z-10 transition-opacity duration-700 ${progress > 80 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center">
                    <p className="serif-font text-4xl tracking-widest text-[#d4813a] italic">
                        {data.couple.initials}
                    </p>
                    <div className="w-8 h-[1px] mx-auto mt-2 bg-[#d4813a] opacity-40" />
                    <p className="text-[10px] mt-3 tracking-[0.2em] uppercase font-bold text-[#d4813a] opacity-60">
                        {data.wedding.dateString}
                    </p>
                </div>
            </div>

            {/* Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#d4813a] opacity-10">
                <div
                    className="h-full bg-[#d4813a] transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default LoadingVariant5;
