
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
    showImage?: boolean;
}

const WelcomeVariant10: React.FC<WelcomeVariantProps> = ({ onOpen, showImage = true }) => {
    // Split names for stacked layout
    const [p1First, p1Middle] = data.couple.fullNames.partner1.split(' ');
    const [p2First, p2Middle] = data.couple.fullNames.partner2.split(' ');

    return (
        <div className="relative h-full w-full bg-[#2F4F4F] flex flex-col items-center justify-between py-10 px-6 overflow-hidden">

            {/* Background Image (conditionally rendered) */}
            {showImage && (
                <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
                    <img
                        src={data.wedding.welcomeImage}
                        alt="Wedding couple"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Elegant Border */}
            <div className="absolute inset-4 border border-[#C5A059]/40 pointer-events-none z-10" />

            {/* Inner Border */}
            <div className="absolute inset-5 border-[0.5px] border-[#C5A059]/30 pointer-events-none z-10" />

            <div className="relative z-20 w-full h-full flex flex-col items-center justify-between py-8 text-center">

                <div>
                    <p className="uppercase tracking-[0.3em] text-[10px] font-sans text-[#C5A059] opacity-90 mb-10">
                        Together with their families
                    </p>

                    <div className="flex flex-col items-center leading-[0.85]">
                        <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-md">{p1First}</h1>
                        <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-md pl-12">{p1Middle}</h1>

                        <span className="font-script text-4xl text-[#C5A059] my-6">&</span>

                        <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-md">{p2First}</h1>
                        <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-md pl-12">{p2Middle}</h1>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center gap-6">

                    {/* Date Block */}
                    <div className="border-t border-b border-[#C5A059]/30 py-4 w-full max-w-[280px]">
                        <p className="uppercase tracking-[0.25em] text-sm font-serif text-white/90">
                            {data.wedding.dateString}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-serif uppercase tracking-widest text-[#F0E6D2]">
                            {data.wedding.venue.name}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-sans">
                            {data.wedding.venue.location}
                        </p>
                    </div>

                    {/* Button - Gradient Gold */}
                    <button
                        onClick={onOpen}
                        className="mt-4 w-full max-w-[280px] bg-gradient-to-r from-[#C5A059] to-[#E6C682] text-[#1a1a1a] px-8 py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs shadow-lg hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        Open Invitation
                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>

                    <div className="flex items-center gap-4 opacity-50 mt-2">
                        <div className="h-[0.5px] w-12 bg-[#C5A059]" />
                        <span className="uppercase text-[9px] tracking-[0.25em] text-[#C5A059]">Formal Attire</span>
                        <div className="h-[0.5px] w-12 bg-[#C5A059]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeVariant10;
