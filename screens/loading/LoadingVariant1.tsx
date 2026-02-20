import React, { useEffect, useState } from 'react';
import { data } from '../../data';

interface LoadingVariantProps {
    onFinished: () => void;
}

const LoadingVariant1: React.FC<LoadingVariantProps> = ({ onFinished }) => {
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
        }, 30); // ~3 seconds
        return () => clearInterval(timer);
    }, [onFinished]);

    return (
        <div className="relative h-full w-full bg-[#FAFAF9] flex flex-col items-center justify-between py-16 px-8 overflow-hidden font-serif text-[#1c2e4a]">
            {/* Top Faint Circle (Watermark/Decoration) */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#f5f5f0] rounded-full mix-blend-multiply opacity-60 blur-xl" />

            {/* Spacer for top alignment */}
            <div className="flex-1" />

            {/* Center Content: Loading Spinner & Heart */}
            <div className="flex flex-col items-center justify-center gap-12 w-full mb-12">
                <div className="relative flex items-center justify-center">
                    {/* Outer Rotating Loading Circle */}
                    <div className="absolute inset-0 m-auto w-24 h-24 rounded-full border-[1px] border-[#e8dcb5] opacity-40"></div>
                    <div
                        className="w-24 h-24 rounded-full border-[2px] border-transparent border-t-[#c8a96e] animate-spin"
                        style={{ animationDuration: '1.5s' }}
                    />

                    {/* Inner Static Circle & Heart */}
                    <div className="absolute inset-0 m-auto w-16 h-16 rounded-full border-[1.5px] border-[#c8a96e] flex items-center justify-center bg-white shadow-sm">
                        <span className="material-icons text-2xl text-[#c8a96e]">favorite</span>
                    </div>
                </div>

                <div className="text-center space-y-3 z-10">
                    <h1 className="text-3xl italic leading-tight text-[#1c2e4a]">
                        Preparing our special<br />day...
                    </h1>
                    <p className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold text-[#c8a96e] mt-4">
                        Please Wait
                    </p>
                </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom Content: Initials & Date */}
            <div className="w-full flex flex-col items-center gap-6 z-10">
                {/* Divider Line */}
                <div className="w-32 h-[1px] bg-[#c8a96e]/30" />

                <div className="text-center space-y-4">
                    <p className="text-3xl tracking-widest text-[#c8a96e] font-serif">
                        {data.couple.initials}
                    </p>

                    <div className="w-12 h-[1px] bg-[#c8a96e]/30 mx-auto" />

                    <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#6b705c]">
                        {data.wedding.dateString}
                    </p>
                </div>
            </div>

            {/* Bottom Left Loading Line (Optional/Hidden based on image, but maybe user wants it?)
                The image didn't show traditional bottom loading bar, just the circle spinner. 
            */}
        </div>
    );
};

export default LoadingVariant1;
