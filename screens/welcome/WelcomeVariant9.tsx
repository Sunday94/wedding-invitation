
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
    showImage?: boolean;
}

const WelcomeVariant9: React.FC<WelcomeVariantProps> = ({ onOpen, showImage = true }) => {
    return (
        <div className="relative h-full w-full bg-[#FFFCF7] flex flex-col items-center justify-between py-8 px-6 overflow-hidden">

            {/* Border Frame - Inset */}
            <div className="absolute inset-4 border border-[#C5A059]/40 pointer-events-none" />

            {/* Inner Border Frame - Thinner */}
            <div className="absolute inset-5 border border-[#C5A059]/20 pointer-events-none" />

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center space-y-6">

                {/* Top Text */}
                <p className="uppercase tracking-[0.3em] text-[9px] font-sans text-[#C5A059] mt-8">
                    Together with their families
                </p>

                {/* Names */}
                <div className="flex flex-col items-center -space-y-3">
                    <h1 className="font-script text-6xl md:text-7xl text-[#C5A059] drop-shadow-sm">
                        {data.couple.fullNames.partner1}
                    </h1>
                    <span className="font-serif italic text-2xl text-[#C5A059] my-2 opacity-80">&</span>
                    <h1 className="font-script text-6xl md:text-7xl text-[#C5A059] drop-shadow-sm">
                        {data.couple.fullNames.partner2}
                    </h1>
                </div>

                {/* Circle Image - Larger */}
                {showImage && (
                    <div className="relative w-[260px] h-[260px] my-6 shrink-0">
                        <div className="absolute inset-0 rounded-full border-[1px] border-[#C5A059]/30 scale-105" />
                        <div className="absolute inset-0 rounded-full border-[4px] border-[#C5A059] shadow-xl overflow-hidden">
                            <img
                                src={data.wedding.welcomeImage}
                                alt="Couple"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Wedding Info */}
                <div className="flex flex-col items-center gap-4 w-full">
                    {/* Date with Lines */}
                    <div className="w-full flex items-center justify-center gap-4 text-[#C5A059]/60">
                        <div className="h-[0.5px] w-12 bg-[#C5A059]" />
                        <p className="uppercase tracking-[0.2em] text-xs font-serif font-bold text-[#555]">
                            {data.wedding.dateString}
                        </p>
                        <div className="h-[0.5px] w-12 bg-[#C5A059]" />
                    </div>

                    {/* Venue */}
                    <div className="space-y-1">
                        <h2 className="text-xl font-serif uppercase tracking-widest text-[#1a1a1a]">
                            {data.wedding.venue.name}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#888]">
                            {data.wedding.venue.location}
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onOpen}
                        className="mt-4 bg-[#C5A059] hover:bg-[#b08d4d] text-white px-10 py-3 rounded-full font-bold uppercase tracking-[0.15em] text-[11px] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
                    >
                        Open Invitation
                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                </div>
            </div>


        </div>
    );
};

export default WelcomeVariant9;
