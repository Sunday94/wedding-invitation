
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
    showImage?: boolean; // New prop
}

const WelcomeVariant8: React.FC<WelcomeVariantProps> = ({ onOpen, showImage = true }) => {
    // Split names for stacked layout
    const [p1First, p1Middle] = data.couple.fullNames.partner1.split(' ');
    const [p2First, p2Middle] = data.couple.fullNames.partner2.split(' ');

    return (
        <div className={`relative h-full w-full overflow-hidden flex flex-col items-center justify-between py-12 px-6 ${!showImage ? 'bg-[#1e3a5f]' : ''}`}>
            {/* Background Image */}
            {showImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.wedding.welcomeImage}
                        alt="Wedding couple"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pt-10 pb-6">

                {/* Header */}
                <p className="uppercase tracking-[0.25em] text-[10px] font-sans font-medium text-white/90 drop-shadow-md">
                    Together with their families
                </p>

                {/* Names - Stacked */}
                <div className="flex flex-col items-center leading-[0.85]">
                    <h1 className="font-script text-[5.5rem] md:text-8xl text-white drop-shadow-xl">{p1First}</h1>
                    <h1 className="font-script text-[5.5rem] md:text-8xl text-white drop-shadow-xl pl-12">{p1Middle}</h1>

                    <span className="font-script text-4xl text-white/90 my-2">&</span>

                    <h1 className="font-script text-[5.5rem] md:text-8xl text-white drop-shadow-xl">{p2First}</h1>
                    <h1 className="font-script text-[5.5rem] md:text-8xl text-white drop-shadow-xl pl-12">{p2Middle}</h1>
                </div>

                {/* Info Block */}
                <div className="w-full flex flex-col items-center gap-6">

                    {/* Date Divider */}
                    <div className="w-full flex items-center justify-center gap-4">
                        <div className="h-[1px] w-16 md:w-24 bg-white/60" />
                        <p className="uppercase tracking-[0.2em] text-sm font-bold text-white drop-shadow-md">
                            {data.wedding.dateString}
                        </p>
                        <div className="h-[1px] w-16 md:w-24 bg-white/60" />
                    </div>

                    {/* Venue */}
                    <div className="text-center space-y-1">
                        <h2 className="text-2xl font-serif text-white uppercase tracking-widest drop-shadow-md">
                            {data.wedding.venue.name}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/90 font-sans shadow-black/50">
                            {data.wedding.venue.location}
                        </p>
                    </div>

                    {/* Button - White Pill, Blue Text */}
                    <button
                        onClick={onOpen}
                        className="bg-white hover:bg-white/90 text-[#1e3a5f] px-10 py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group mt-2 w-full max-w-[280px] justify-center"
                    >
                        Open Invitation
                        <span className="material-icons text-sm text-[#1e3a5f] group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>

                    {/* Footer - Formal Attire */}
                    <div className="flex items-center gap-4 opacity-80 mt-2">
                        <div className="h-[0.5px] w-12 bg-white" />
                        <span className="uppercase text-[9px] tracking-[0.25em] text-white font-semibold">Formal Attire</span>
                        <div className="h-[0.5px] w-12 bg-white" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default WelcomeVariant8;
