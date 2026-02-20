
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
}

const WelcomeVariant2: React.FC<WelcomeVariantProps> = ({ onOpen }) => {
    return (
        <div className="relative h-full w-full bg-white p-4 flex flex-col">
            {/* Inner Border Frame */}
            <div className="h-full w-full border border-gray-200 flex flex-col items-center justify-between py-12 px-6 overflow-y-auto">

                {/* Top Section */}
                <div className="w-full flex flex-col items-center space-y-4">
                    <p className="uppercase tracking-[0.2em] text-[10px] text-gray-500 font-sans">
                        Together with their families
                    </p>
                    <div className="flex items-center w-full max-w-[200px] gap-4">
                        <div className="h-[1px] flex-1 bg-gray-300"></div>
                        <span className="font-serif text-gray-400 text-xs tracking-widest uppercase">Invite</span>
                        <div className="h-[1px] flex-1 bg-gray-300"></div>
                    </div>
                </div>

                {/* Names Section */}
                <div className="flex flex-col items-center text-center space-y-4 my-8">
                    <h1 className="font-serif italic text-6xl text-gray-900 leading-tight">
                        {data.couple.fullNames.partner1}
                    </h1>
                    <span className="font-serif italic text-3xl text-gray-400">&</span>
                    <h1 className="font-serif italic text-6xl text-gray-900 leading-tight">
                        {data.couple.fullNames.partner2}
                    </h1>
                </div>

                {/* Date & Venue */}
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="space-y-2">
                        <p className="uppercase tracking-[0.15em] text-sm text-gray-800 font-serif">
                            {data.wedding.dateString}
                        </p>
                        <div className="w-12 h-[1px] bg-gray-300 mx-auto"></div>
                    </div>

                    <div className="space-y-1">
                        <p className="uppercase tracking-[0.1em] text-xl text-gray-800 font-serif">
                            {data.wedding.venue.name}
                        </p>
                        <p className="uppercase tracking-[0.15em] text-[10px] text-gray-500 font-sans">
                            {data.wedding.venue.location}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={onOpen}
                    className="mt-12 w-full max-w-xs bg-[#1a1a1a] text-white py-4 px-8 flex items-center justify-center gap-3 hover:bg-black transition-colors group"
                >
                    <span className="uppercase tracking-[0.25em] text-[11px] font-medium">Open Invitation</span>
                    <span className="material-icons text-xs group-hover:translate-x-1 transition-transform">east</span>
                </button>

                {/* Spacer for bottom layout */}
                <div className="flex-grow"></div>

                {/* Bottom Attire */}
                <div className="mt-8 flex items-center gap-4 w-full max-w-[200px]">
                    <div className="h-[1px] flex-1 bg-gray-300"></div>
                    <p className="uppercase tracking-[0.2em] text-[10px] text-gray-400 font-sans whitespace-nowrap">
                        Formal Attire
                    </p>
                    <div className="h-[1px] flex-1 bg-gray-300"></div>
                </div>
            </div>


        </div>
    );
};

export default WelcomeVariant2;
