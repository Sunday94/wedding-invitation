
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
    showImage?: boolean;
}

const WelcomeVariant13: React.FC<WelcomeVariantProps> = ({ onOpen, showImage = true }) => {
    // Split names for stacked layout if needed, but image shows full names stacked
    // "SARAH EMILY"
    // "&"
    // "JAMES ARTHUR"

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-gray-900">
            {/* Background Image - Grayscale */}
            {showImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.wedding.welcomeImage}
                        alt="Wedding couple"
                        className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            )}

            {/* Top Content */}
            <div className="relative z-10 w-full flex flex-col items-center pt-8">
                <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-white mb-6 drop-shadow-md">
                    Together with their families
                </p>

                <div className="flex flex-col items-center">
                    <h1 className="font-display font-extrabold text-6xl md:text-8xl text-white uppercase leading-[0.9] text-center drop-shadow-xl tracking-tight">
                        {data.couple.fullNames.partner1}
                    </h1>

                    <div className="flex items-center gap-4 my-2 opacity-90">
                        <div className="h-[1px] w-12 bg-white/70" />
                        <span className="font-serif italic text-3xl text-white">&</span>
                        <div className="h-[1px] w-12 bg-white/70" />
                    </div>

                    <h1 className="font-display font-extrabold text-6xl md:text-8xl text-white uppercase leading-[0.9] text-center drop-shadow-xl tracking-tight">
                        {data.couple.fullNames.partner2}
                    </h1>
                </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 w-full flex flex-col items-center pb-8 space-y-8">

                {/* Date & Venue */}
                <div className="text-center space-y-6">
                    <p className="uppercase tracking-[0.2em] text-sm font-bold text-white drop-shadow-lg">
                        {data.wedding.dateString}
                    </p>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider drop-shadow-lg">
                            {data.wedding.venue.name}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/90 font-medium">
                            {data.wedding.venue.location}
                        </p>
                    </div>
                </div>

                {/* Primary Button */}
                <button
                    onClick={onOpen}
                    className="w-full max-w-[300px] bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-4 rounded-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between px-6 group"
                >
                    <span className="uppercase tracking-[0.2em] text-xs font-bold">Open Invitation</span>
                    <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>

                {/* Footer */}
                <div className="flex items-center gap-4 opacity-70">
                    <div className="h-[1px] w-8 bg-white" />
                    <p className="uppercase tracking-[0.25em] text-[9px] font-bold text-white">
                        Formal Attire
                    </p>
                    <div className="h-[1px] w-8 bg-white" />
                </div>
            </div>


        </div>
    );
};

export default WelcomeVariant13;
