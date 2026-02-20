
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
}

const WelcomeVariant7: React.FC<WelcomeVariantProps> = ({ onOpen }) => {
    return (
        <div className="relative h-full w-full bg-gradient-to-b from-[#cea08e] via-[#e3c792] to-[#c67142] flex flex-col items-center justify-between py-16 px-6 overflow-hidden text-white">

            {/* Top Tagline */}
            <div className="flex flex-col items-center space-y-4 pt-4">
                <p className="uppercase tracking-[0.25em] text-[10px] font-sans font-medium text-white/90">
                    Together with their families
                </p>
            </div>

            {/* Names */}
            <div className="flex flex-col items-center text-center space-y-2 -mt-4">
                <h1 className="font-serif italic text-6xl md:text-7xl leading-tight drop-shadow-sm">
                    {data.couple.fullNames.partner1}
                </h1>
                <span className="font-serif italic text-2xl my-2">&</span>
                <h1 className="font-serif italic text-6xl md:text-7xl leading-tight drop-shadow-sm">
                    {data.couple.fullNames.partner2}
                </h1>
            </div>

            {/* Date and Venue */}
            <div className="flex flex-col items-center text-center space-y-8 w-full">
                <div className="flex items-center justify-center gap-4 w-full">
                    <div className="h-[1px] w-12 bg-white/40"></div>
                    <div className="flex flex-col items-center">
                        <p className="uppercase tracking-[0.15em] text-xs font-serif text-white">
                            Saturday, October
                        </p>
                        <p className="uppercase tracking-[0.15em] text-xs font-serif text-white mt-1">
                            {data.wedding.dateString.split(',')[1]?.trim() || '26th, 2024'}
                        </p>
                    </div>
                    <div className="h-[1px] w-12 bg-white/40"></div>
                </div>

                <div className="space-y-2">
                    <p className="font-serif text-2xl uppercase tracking-wider text-white">
                        {data.wedding.venue.name}
                    </p>
                    <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-white/80">
                        {data.wedding.venue.location}
                    </p>
                </div>
            </div>

            {/* Button */}
            <div className="w-full flex flex-col items-center">
                <button
                    onClick={onOpen}
                    className="w-full max-w-[280px] bg-white/20 backdrop-blur-sm border border-white/40 text-white py-4 rounded-full shadow-lg hover:bg-white/30 transition-all font-bold uppercase tracking-[0.2em] text-[11px] flex justify-center items-center gap-2 group"
                >
                    Open Invitation
                    <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
            </div>

            {/* Bottom Attire */}
            <div className="flex flex-col items-center space-y-2 pb-4 opacity-70">
                <div className="flex items-center gap-4 w-full justify-center">
                    <div className="h-[1px] w-12 bg-white/40"></div>
                    <p className="uppercase tracking-[0.2em] text-[9px] text-white font-sans whitespace-nowrap">
                        Formal Attire
                    </p>
                    <div className="h-[1px] w-12 bg-white/40"></div>
                </div>
                {/* Down Arrow Indicator */}
                <span className="material-icons text-white/60 text-lg animate-bounce mt-2">keyboard_arrow_down</span>
            </div>

        </div>
    );
};

export default WelcomeVariant7;
