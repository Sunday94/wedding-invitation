
import React from 'react';
import { data } from '../../data';
import { WELCOME_THEMES } from './themes';

interface WelcomeVariantProps {
    onOpen: () => void;
}

const WelcomeVariant1: React.FC<WelcomeVariantProps> = ({ onOpen }) => {
    const theme = WELCOME_THEMES[1];

    return (
        <div className="relative h-full w-full bg-[#FAFAF9] overflow-hidden flex flex-col items-center justify-center font-serif text-[#1c2e4a]">
            {/* Top Right Blob */}
            <div
                className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-[#E3E3DE] rounded-full opacity-60 mix-blend-multiply blur-xl animate-pulse-slow"
                style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
            />

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center text-center space-y-6 animate-fade-in-up">
                <p className="uppercase tracking-[0.3em] text-[10px] text-[#555] font-sans mb-4 opacity-80">
                    {theme.taglineText}
                </p>

                <div className="flex flex-col items-center">
                    <h1 className="text-5xl md:text-6xl font-serif text-[#1c2e4a] leading-tight">
                        {data.couple.fullNames.partner1}
                    </h1>
                    <span className="font-serif italic text-3xl text-gray-400 my-2">&</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-[#1c2e4a] leading-tight">
                        {data.couple.fullNames.partner2}
                    </h1>
                </div>

                <div className="mt-8 space-y-2">
                    <p className="uppercase tracking-[0.2em] text-xs text-[#555] font-sans font-medium">
                        {data.wedding.dateString}
                    </p>
                    <div className="h-4" /> {/* Spacer */}
                    <p className="font-serif italic text-xl text-[#6b705c]">
                        {data.wedding.venue.name}
                    </p>
                    <p className="uppercase tracking-[0.2em] text-[10px] text-[#888] font-sans">
                        {data.wedding.venue.location}
                    </p>
                </div>

                <button
                    onClick={onOpen}
                    className="mt-12 px-8 py-3 bg-transparent border border-[#a8a8a8] hover:bg-white hover:border-[#888] transition-all duration-300 flex items-center gap-3 group"
                >
                    <span className="uppercase tracking-[0.2em] text-[11px] text-[#444] font-sans">Open Invitation</span>
                    <span className="material-icons text-sm text-[#666] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
            </div>

            {/* Bottom Left Floral (SVG Placeholder) */}
            <div className="absolute -bottom-10 -left-10 w-80 h-80 opacity-20 pointer-events-none mix-blend-multiply text-[#6b705c]">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
                    <path d="M45.7,163.6 c-2.2-12.7,4.4-23.7,12.7-32.9 c11.3-12.5,25.3-22.3,40.6-29.6 c6.5-3.1,13.3-5.7,20.2-8 1.8-0.6,4.4-1.6,4.8,1.4 c0.3,2.5-2.2,3.3-3.9,4.2 c-11.2,6-21.3,13.7-30.8,22.3 c-9.9,9-18.4,19.5-24.8,31.4 c-2.4,4.5-4.4,9.2-6.5,13.9 C46.9,168.9,46.1,166.4,45.7,163.6 z M110.3,55.8 c3.7,15.6-2.5,29.8-11.4,42.2 c-10.7,14.9-24.9,26.4-41.2,34.7 c-7.3,3.7-15,6.7-22.7,9.3 c-1.9,0.7-5,1.8-5.4-1.6 c-0.4-2.8,2.4-3.7,4.3-4.7 c12.5-6.8,23.8-15.5,34.4-25.1 c10.9-9.9,20.2-21.6,27.1-34.9 c2.6-4.9,4.8-10.1,7.1-15.3 C103.8,58.3,107.4,56.3,110.3,55.8 z" />
                </svg>
            </div>

            {/* Bottom Styling - Attire */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-60">
                <div className="h-[1px] w-8 bg-[#888]" />
                <span className="uppercase tracking-[0.2em] text-[9px] text-[#666] font-sans whitespace-nowrap">
                    {theme.attireText}
                </span>
                <div className="h-[1px] w-8 bg-[#888]" />
            </div>


        </div>
    );
};

export default WelcomeVariant1;
