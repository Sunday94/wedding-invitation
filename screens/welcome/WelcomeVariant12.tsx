
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
    showImage?: boolean;
}

const WelcomeVariant12: React.FC<WelcomeVariantProps> = ({ onOpen, showImage = true }) => {
    // Split names
    const [p1First, p1Middle] = data.couple.fullNames.partner1.split(' ');
    const [p2First, p2Middle] = data.couple.fullNames.partner2.split(' ');

    return (
        <div className="relative h-full w-full bg-[#1e2a3b] flex flex-col items-center justify-between py-12 px-6 overflow-hidden">

            {/* Background Texture - Navy */}
            <div className="absolute inset-0 bg-[#0f172a]" />

            {/* Background Image (conditionally rendered) */}
            {showImage && (
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                    <img
                        src={data.wedding.welcomeImage}
                        alt="Wedding couple"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Gold Corner Borders (L-Shapes) */}
            <div className="absolute inset-6 pointer-events-none z-10">
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-24 h-[1px] bg-[#D4AF37]" />
                <div className="absolute top-0 left-0 w-[1px] h-24 bg-[#D4AF37]" />

                {/* Top Right */}
                <div className="absolute top-0 right-0 w-24 h-[1px] bg-[#D4AF37]" />
                <div className="absolute top-0 right-0 w-[1px] h-24 bg-[#D4AF37]" />

                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-[#D4AF37]" />
                <div className="absolute bottom-0 left-0 w-[1px] h-24 bg-[#D4AF37]" />

                {/* Bottom Right */}
                <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-[#D4AF37]" />
                <div className="absolute bottom-0 right-0 w-[1px] h-24 bg-[#D4AF37]" />
            </div>

            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center pb-8 pt-12">

                {/* Top Decoration */}
                <div className="flex items-center gap-4 mb-8 opacity-80">
                    <div className="h-[1px] w-12 bg-[#D4AF37]" />
                    <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
                    <div className="h-[1px] w-12 bg-[#D4AF37]" />
                </div>

                <p className="uppercase tracking-[0.25em] text-[10px] font-sans text-[#D4AF37]">
                    Together with their families
                </p>

                {/* Names - Stacked with grand script */}
                <div className="flex flex-col items-center leading-[0.8] my-8">
                    <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-lg">{p1First}</h1>
                    <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-lg pl-12">{p1Middle}</h1>

                    <div className="relative py-4">
                        <span className="font-script text-5xl text-[#D4AF37] italic pr-4">&</span>
                    </div>

                    <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-lg">{p2First}</h1>
                    <h1 className="font-script text-7xl md:text-8xl text-white drop-shadow-lg pl-12">{p2Middle}</h1>
                </div>

                {/* Details */}
                <div className="w-full flex flex-col items-center gap-8 mt-4">

                    <div className="space-y-2 w-full border-t border-b border-[#D4AF37]/20 py-5 max-w-xs">
                        <p className="uppercase tracking-[0.25em] text-sm text-[#D4AF37] font-bold">
                            {data.wedding.dateString}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-serif uppercase tracking-widest text-[#F5F5F5]">
                            {data.wedding.venue.name}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans mt-2">
                            {data.wedding.venue.location}
                        </p>
                    </div>

                    {/* Button - Gold */}
                    <button
                        onClick={onOpen}
                        className="mt-4 bg-[#D4AF37] hover:bg-[#b5952f] text-[#1a1a1a] px-12 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center gap-3 group"
                    >
                        Open Invitation
                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>

                    {/* Bottom Decoration */}
                    <div className="flex items-center gap-4 mt-2 opacity-60">
                        <div className="h-[1px] w-8 bg-[#D4AF37]" />
                        <p className="uppercase text-[9px] tracking-[0.25em] text-[#D4AF37]">
                            Formal Attire
                        </p>
                        <div className="h-[1px] w-8 bg-[#D4AF37]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeVariant12;
