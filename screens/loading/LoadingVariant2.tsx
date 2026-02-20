import React, { useEffect, useState } from 'react';
import { data } from '../../data';

interface LoadingVariantProps {
    onFinished: () => void;
}

const LoadingVariant2: React.FC<LoadingVariantProps> = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // slightly slower to emphasize the filling effect
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinished, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 35);
        return () => clearInterval(timer);
    }, [onFinished]);

    return (
        <div className="relative h-full w-full bg-[#FAFAF9] flex flex-col items-center justify-between py-16 px-8 overflow-hidden font-serif text-[#1c2e4a]">
            {/* Top Faint Circle (Watermark/Decoration) */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#f5f5f0] rounded-full mix-blend-multiply opacity-60 blur-xl" />

            {/* Spacer for top alignment */}
            <div className="flex-1" />

            {/* Center Content: Filling Heart */}
            <div className="flex flex-col items-center justify-center gap-12 w-full mb-12">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Ring around the heart (Optional - keeping generic ring for structure if needed, or removing if just heart fill) 
                        The user asked for "design as same as the image" which HAS a ring. 
                        But specific instruction "loading is circle around the heart" was for Variant 1.
                        For Variant 2: "for the loading have it slowly fill in the heart". 
                        I will keep the outer ring statically or maybe remove the spinner aspect of it, 
                        and focus the animation on the heart.
                        Let's keep the static rings to match the visual "design as same as image".
                    */}

                    {/* Outer Static Rings to match image aesthetic */}
                    <div className="absolute inset-0 m-auto w-24 h-24 rounded-full border-[1px] border-[#e8dcb5] opacity-40"></div>

                    {/* The Heart Filling Animation */}
                    <div className="relative w-12 h-12">
                        {/* Background Empty Heart */}
                        <span className="material-icons text-5xl text-[#e8dcb5] opacity-50 absolute inset-0 flex items-center justify-center">
                            favorite
                        </span>

                        {/* Foreground Filling Heart */}
                        <div
                            className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-75 ease-linear flex items-end justify-center"
                            style={{ height: `${progress}%` }}
                        >
                            {/* We need the icon to stay fixed size and position relative to the main container 
                                so it reveals from bottom up. 
                                Since container is 12x12 (48px), icon is text-5xl (48px).
                            */}
                            <span className="material-icons text-5xl text-[#c8a96e] h-12 w-12 flex items-center justify-center absolute bottom-0">
                                favorite
                            </span>
                        </div>
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

        </div>
    );
};

export default LoadingVariant2;
