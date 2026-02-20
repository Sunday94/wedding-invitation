
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
}

const WelcomeVariant4: React.FC<WelcomeVariantProps> = ({ onOpen }) => {
    return (
        <div className="relative h-full w-full bg-gradient-to-b from-[#A07050] to-[#503020] text-white flex flex-col items-center justify-between py-12 px-6">

            {/* Top Bar (Status Icon) */}
            <div className="absolute top-4 right-4 flex items-center gap-2 text-white/80">
                <span className="material-icons text-sm">signal_cellular_alt</span>
                <span className="material-icons text-sm">wifi</span>
                <span className="material-icons text-sm">battery_full</span>
            </div>

            {/* Header */}
            <div className="flex flex-col items-center mt-12 space-y-4 text-center">
                <p className="uppercase tracking-[0.2em] text-[10px] text-white/70 font-sans">
                    Together with their families
                </p>
            </div>

            {/* Center Names */}
            <div className="flex flex-col items-center text-center space-y-4 my-8">
                <h1 className="font-serif italic text-7xl text-white leading-[0.85] tracking-tight drop-shadow-md">
                    {data.couple.fullNames.partner1}
                </h1>
                <span className="font-serif italic text-3xl text-white/60 -my-2">&</span>
                <h1 className="font-serif italic text-7xl text-white leading-[0.85] tracking-tight drop-shadow-md">
                    {data.couple.fullNames.partner2}
                </h1>
            </div>

            {/* Date and Venue */}
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex items-center gap-4 w-full justify-center">
                    <div className="h-[1px] w-8 bg-white/40"></div>
                    <p className="uppercase tracking-[0.15em] text-xs font-serif text-white/90">
                        {data.wedding.dateString}
                    </p>
                    <div className="h-[1px] w-8 bg-white/40"></div>
                </div>

                <div className="space-y-1">
                    <p className="font-serif uppercase tracking-[0.1em] text-xl text-white">
                        {data.wedding.venue.name}
                    </p>
                    <p className="font-sans uppercase tracking-[0.15em] text-[10px] text-white/60">
                        {data.wedding.venue.location}
                    </p>
                </div>
            </div>

            {/* Button */}
            <button
                onClick={onOpen}
                className="mt-12 bg-white text-[#503020] w-full max-w-[280px] py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all font-bold uppercase tracking-[0.15em] text-[11px] flex justify-center items-center gap-2 group"
            >
                Open Invitation
                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>


            {/* Bottom Attire */}
            <div className="flex items-center gap-4 w-full max-w-[200px] mb-8 opacity-60">
                <div className="h-[1px] flex-1 bg-white/40"></div>
                <p className="uppercase tracking-[0.2em] text-[9px] text-white font-sans whitespace-nowrap">
                    Formal Attire
                </p>
                <div className="h-[1px] flex-1 bg-white/40"></div>
            </div>

        </div>
    );
};

export default WelcomeVariant4;
