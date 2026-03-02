
import React from 'react';
import { data } from '../../data';
import { getWelcomeCopy } from './welcomeTextBindings';

interface WelcomeVariantProps {
    onOpen: () => void;
}

const Welcomevarianttext5: React.FC<WelcomeVariantProps> = ({ onOpen }) => {
    const welcomeCopy = getWelcomeCopy();

    return (
        <div className="relative h-full w-full bg-gradient-to-b from-[#d4a59a] to-[#a67c70] text-white flex flex-col items-center justify-between py-12 px-6">

            {/* Header */}
            <div className="flex flex-col items-center mt-8 space-y-4 text-center">
                <p className="uppercase tracking-[0.2em] text-[10px] text-white/90 font-sans opacity-70">
                    {welcomeCopy.welcomeText}
                </p>
            </div>

            {/* Center Names */}
            <div className="flex flex-col items-center text-center space-y-2 my-6">
                <h1 className="font-script text-7xl text-white leading-[0.9] drop-shadow-md transform -rotate-2">
                    {welcomeCopy.brideDisplayName}
                </h1>
                <span className="font-serif italic text-3xl text-white/50 my-2">&</span>
                <h1 className="font-script text-7xl text-white leading-[0.9] drop-shadow-md transform rotate-2">
                    {welcomeCopy.groomDisplayName}
                </h1>
            </div>

            {/* Date and Venue */}
            <div className="flex flex-col items-center text-center space-y-8">
                <div className="space-y-2 relative">
                    <p className="font-serif text-3xl italic text-white/90">
                        {welcomeCopy.eventDate}
                    </p>
                    <div className="w-16 h-[1px] bg-white/40 mx-auto mt-2"></div>
                </div>

                <div className="space-y-1">
                    <p className="uppercase tracking-[0.15em] text-lg font-bold text-white shadow-sm">
                        {welcomeCopy.weddingVenue}
                    </p>
                    <p className="uppercase tracking-[0.2em] text-[10px] text-white/70 font-sans">
                        {welcomeCopy.weddingAddress}
                    </p>
                </div>
            </div>

            {/* Button */}
            <button
                onClick={onOpen}
                className="mt-12 bg-[#7D5A44] text-white w-full max-w-[250px] py-4 rounded-md shadow-lg hover:bg-[#6c4e3b] transition-all font-serif italic text-lg tracking-wide border border-[#8e6e5a] flex items-center justify-center gap-2 group"
            >
                Enter
            </button>


            {/* Bottom Decor */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

            {/* Floral Outline (SVG) */}
            <div className="absolute bottom-4 right-4 w-40 h-40 opacity-20 pointer-events-none text-white mix-blend-overlay">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <circle cx="80" cy="80" r="40" />
                    <circle cx="40" cy="90" r="20" />
                </svg>
            </div>

        </div>
    );
};

export default Welcomevarianttext5;
