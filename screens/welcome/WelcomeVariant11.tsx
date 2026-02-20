
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
    showImage?: boolean;
}

const WelcomeVariant11: React.FC<WelcomeVariantProps> = ({ onOpen, showImage = true }) => {
    return (
        <div className={`relative h-full w-full overflow-hidden flex flex-col items-center justify-between py-12 px-6 ${!showImage ? 'bg-[#f4efe9]' : ''}`}>
            {/* Background Image (Faded/Light) */}
            {showImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.wedding.welcomeImage}
                        alt="Wedding couple"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-white/10" />
                    {/* Gradient from bottom to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pt-16 pb-8">

                {/* Header */}
                <p className="uppercase tracking-[0.25em] text-[10px] font-sans font-bold text-[#5c6851]">
                    Together with their families
                </p>

                {/* Names (Rust/Terracotta) */}
                <div className="flex flex-col items-center gap-0">
                    <h1 className="font-script text-[5rem] md:text-[6rem] text-[#C17C5F] drop-shadow-sm leading-none">
                        {data.couple.fullNames.partner1}
                    </h1>
                    <span className="font-script text-4xl text-[#8FBC8F] -my-2">&</span>
                    <h1 className="font-script text-[5rem] md:text-[6rem] text-[#C17C5F] drop-shadow-sm leading-none">
                        {data.couple.fullNames.partner2}
                    </h1>
                </div>

                {/* Info Block - Dark Text for contrast against light field */}
                <div className="w-full flex flex-col items-center gap-8 mb-4">

                    <div className="flex items-center gap-4 w-full justify-center">
                        <div className="h-[1px] w-12 bg-[#C17C5F]/40" />
                        <div className="text-center">
                            <p className="font-serif italic text-2xl text-[#2c3e50]">
                                {data.wedding.dateString}
                            </p>
                        </div>
                        <div className="h-[1px] w-12 bg-[#C17C5F]/40" />
                    </div>

                    <div className="text-center space-y-1">
                        <h2 className="text-2xl font-serif font-bold uppercase tracking-widest text-[#2c3e50]">
                            {data.wedding.venue.name}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d9b76] font-bold">
                            {data.wedding.venue.location}
                        </p>
                    </div>

                    {/* Button - White with Rust Text */}
                    <button
                        onClick={onOpen}
                        className="bg-white text-[#C17C5F] border border-[#C17C5F]/20 px-12 py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs shadow-xl hover:bg-[#C17C5F] hover:text-white transition-all duration-300 flex items-center gap-2 group w-full max-w-[280px] justify-center"
                    >
                        Open Invitation
                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>

                    <div className="flex items-center gap-4 opacity-60">
                        <div className="h-[0.5px] w-16 bg-[#555]" />
                        <span className="uppercase text-[9px] tracking-[0.25em] text-[#555] font-bold">Formal Attire</span>
                        <div className="h-[0.5px] w-16 bg-[#555]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeVariant11;
