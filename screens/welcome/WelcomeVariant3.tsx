
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
}

const WelcomeVariant3: React.FC<WelcomeVariantProps> = ({ onOpen }) => {
    return (
        <div className="relative h-full w-full flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Background Image (Blurred) */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40 blur-lg scale-110"
                style={{ backgroundImage: `url(${data.wedding.welcomeImage})` }}
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-0 pointer-events-none" />

            {/* Main Card */}
            <div className="relative z-10 w-[85%] max-w-[400px] bg-[#f2f2ed] rounded-[3rem] shadow-2xl p-8 flex flex-col items-center justify-between min-h-[500px] text-center">
                {/* Top Tagline */}
                <div className="flex flex-col items-center mt-4 space-y-2">
                    <p className="uppercase tracking-[0.25em] text-[10px] text-gray-500 font-sans font-bold">
                        Together with their families
                    </p>
                </div>

                {/* Names (Gold Script) */}
                <div className="flex flex-col items-center my-6 space-y-4">
                    <h1 className="font-script text-5xl md:text-6xl text-[#D4AF37] drop-shadow-sm leading-tight">
                        {data.couple.fullNames.partner1}
                    </h1>
                    <span className="font-serif italic text-2xl text-gray-400">&</span>
                    <h1 className="font-script text-5xl md:text-6xl text-[#D4AF37] drop-shadow-sm leading-tight">
                        {data.couple.fullNames.partner2}
                    </h1>
                </div>

                {/* Date/Time */}
                <div className="flex flex-col items-center space-y-3 mb-6">
                    <p className="font-serif uppercase tracking-[0.1em] text-sm text-[#1c2e4a] font-bold">
                        {data.wedding.dateString}
                    </p>
                    <div className="w-8 h-[1px] bg-gray-300"></div>
                    <div className="space-y-1">
                        <p className="font-serif uppercase tracking-[0.15em] text-sm text-[#1c2e4a] font-bold">
                            {data.wedding.venue.name}
                        </p>
                        <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-gray-500">
                            {data.wedding.venue.location}
                        </p>
                    </div>
                </div>


                {/* Button */}
                <button
                    onClick={onOpen}
                    className="w-full bg-[#D4AF37] text-white py-4 rounded-full shadow-lg hover:bg-[#b08d2b] transition-all transform hover:scale-105 group flex items-center justify-center gap-2 mb-4"
                >
                    <span className="uppercase tracking-[0.2em] text-[11px] font-bold pl-2">Open Invitation</span>
                    <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>

                {/* Bottom Attire */}
                <div className="flex items-center gap-3 w-full justify-center opacity-60 mb-2">
                    <div className="h-[1px] w-6 bg-gray-400"></div>
                    <p className="uppercase tracking-[0.2em] text-[9px] text-gray-400 font-sans">
                        Formal Attire
                    </p>
                    <div className="h-[1px] w-6 bg-gray-400"></div>
                </div>
            </div>


        </div>
    );
};

export default WelcomeVariant3;
