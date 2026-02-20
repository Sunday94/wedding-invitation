
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
}

const WelcomeVariant6: React.FC<WelcomeVariantProps> = ({ onOpen }) => {
    return (
        <div className="relative h-full w-full bg-[#fcf8f0] p-6 flex flex-col justify-between overflow-hidden">
            {/* Top Left Leaf */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none text-[#e8cba3]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full fill-current">
                    <path d="M264 48C132.8 48 24 163.2 24 304c0 10.9 2.5 21.2 6.9 20.6l23.5-3.3c-2.3-10-3.9-20.2-4.4-30.8C54 205.8 48.5 76 264 48z M488 304c0-140.8-108.8-256-240-256c-17.6 0-35 1.5-52 4.4C411.5 76 458 205.8 462 290.5c-.5 10.6-2.1 20.8-4.4 30.8l23.5 3.3c4.4-9.4 6.9-19.7 6.9-30.6z" />
                    <path d="M424.3 361.3c8.5-.7 16.9-2.1 25-4.2-1.9-8.4-4.8-16.5-8.5-24.3C425.2 268.4 397.6 211 359 164c-35.3-43-80.1-75.7-129-94.2-22.3-8.5-45.7-12.8-69.8-12.8-10.9 0-21.7.9-32.2 2.6C122.9 61.2 120 63.3 118.8 66c-1.3 2.7-.4 5.9 2 7.7 78.4 57.8 135 142.1 161.4 235.4 3.7 13.1 6.5 26.5 8.3 40.1.3 2.2.6 4.4.9 6.6 2.3 17 3.5 34.3 3.6 51.6 0 2.9 2.4 5.3 5.3 5.3h35.3c2.9 0 5.3-2.4 5.3-5.3 0-14.8-.8-29.4-2.5-43.8-.5-3.8-1.5-7.5-2.8-11.2 29.5-2.2 59.2.7 88.7 8.9z" />
                </svg>
            </div>

            {/* Bottom Right Leaf */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none text-[#e8cba3] rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full fill-current">
                    <path d="M264 48C132.8 48 24 163.2 24 304c0 10.9 2.5 21.2 6.9 20.6l23.5-3.3c-2.3-10-3.9-20.2-4.4-30.8C54 205.8 48.5 76 264 48z M488 304c0-140.8-108.8-256-240-256c-17.6 0-35 1.5-52 4.4C411.5 76 458 205.8 462 290.5c-.5 10.6-2.1 20.8-4.4 30.8l23.5 3.3c4.4-9.4 6.9-19.7 6.9-30.6z" />
                    <path d="M424.3 361.3c8.5-.7 16.9-2.1 25-4.2-1.9-8.4-4.8-16.5-8.5-24.3C425.2 268.4 397.6 211 359 164c-35.3-43-80.1-75.7-129-94.2-22.3-8.5-45.7-12.8-69.8-12.8-10.9 0-21.7.9-32.2 2.6C122.9 61.2 120 63.3 118.8 66c-1.3 2.7-.4 5.9 2 7.7 78.4 57.8 135 142.1 161.4 235.4 3.7 13.1 6.5 26.5 8.3 40.1.3 2.2.6 4.4.9 6.6 2.3 17 3.5 34.3 3.6 51.6 0 2.9 2.4 5.3 5.3 5.3h35.3c2.9 0 5.3-2.4 5.3-5.3 0-14.8-.8-29.4-2.5-43.8-.5-3.8-1.5-7.5-2.8-11.2 29.5-2.2 59.2.7 88.7 8.9z" />
                </svg>
            </div>

            {/* Content Centered */}
            <div className="z-10 flex flex-col items-center justify-center h-full text-center">
                {/* Top Tagline */}
                <div className="flex flex-col items-center mb-8 space-y-4">
                    <p className="uppercase tracking-[0.25em] text-[10px] text-gray-400 font-sans font-medium">
                        Invitation
                    </p>
                    <div className="flex items-center w-full max-w-[200px] gap-4">
                        <div className="h-[1px] flex-1 bg-[#d4af37]/30"></div>
                        <span className="font-serif text-[#d4af37] text-xs tracking-widest uppercase">Wedding</span>
                        <div className="h-[1px] flex-1 bg-[#d4af37]/30"></div>
                    </div>
                </div>

                {/* Names */}
                <div className="flex flex-col items-center my-6 space-y-4">
                    <h1 className="font-script text-6xl md:text-7xl text-[#333] drop-shadow-sm leading-tight">
                        {data.couple.fullNames.partner1}
                    </h1>
                    <span className="font-serif italic text-3xl text-[#d4af37]">&</span>
                    <h1 className="font-script text-6xl md:text-7xl text-[#333] drop-shadow-sm leading-tight">
                        {data.couple.fullNames.partner2}
                    </h1>
                </div>

                {/* Center Date */}
                <div className="flex flex-col items-center space-y-2 mb-10">
                    <p className="font-serif uppercase tracking-[0.1em] text-lg text-gray-700 font-medium border-b border-[#d4af37]/20 pb-1">
                        {data.wedding.dateString}
                    </p>
                </div>

                {/* Venue */}
                <div className="space-y-1 mb-12">
                    <p className="font-serif uppercase tracking-[0.1em] text-2xl text-gray-800 font-bold">
                        {data.wedding.venue.name}
                    </p>
                    <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-gray-400">
                        {data.wedding.venue.location}
                    </p>
                </div>

                {/* Button - Outlined Gold */}
                <button
                    onClick={onOpen}
                    className="w-full max-w-[220px] bg-transparent border border-[#d4af37] text-[#d4af37] py-3 rounded-full hover:bg-[#d4af37] hover:text-white transition-all font-bold uppercase tracking-[0.2em] text-[10px] flex justify-center items-center gap-2 group"
                >
                    Open Invitation
                    <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>



        </div>
    );
};

export default WelcomeVariant6;
