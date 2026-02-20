
import React from 'react';
import { data } from '../../data';

interface WelcomeVariantProps {
    onOpen: () => void;
    showImage?: boolean;
}

const WelcomeVariant14: React.FC<WelcomeVariantProps> = ({ onOpen, showImage = true }) => {
    return (
        <div className="relative h-full w-full flex flex-col items-center justify-between p-4 bg-[#0B1221] overflow-hidden">
            {/* Decorative Border Frame */}
            <div className="absolute inset-3 border border-[#C5A059]/30 pointer-events-none z-0">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C5A059]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C5A059]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]" />

                {/* Inner Border */}
                <div className="absolute inset-2 border border-[#C5A059]/60" />
            </div>

            {/* Background Image (Low opacity for texture) or just color */}
            {showImage && (
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <img
                        src={data.wedding.welcomeImage}
                        alt="Background texture"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
            )}

            {/* Main Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-6">

                {/* Top Section */}
                <div className="flex flex-col items-center space-y-12">
                    <p className="uppercase tracking-[0.25em] text-[10px] font-medium text-[#C5A059] mt-8">
                        Together with their families
                    </p>

                    <div className="flex flex-col items-center space-y-2">
                        <h1 className="font-script text-7xl md:text-8xl text-[#C5A059] drop-shadow-lg text-center leading-none">
                            {data.couple.fullNames.partner1}
                        </h1>
                        <span className="font-script text-3xl text-[#C5A059] my-1">&</span>
                        <h1 className="font-script text-7xl md:text-8xl text-[#C5A059] drop-shadow-lg text-center leading-none">
                            {data.couple.fullNames.partner2}
                        </h1>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center gap-8 w-full max-w-sm pb-6">
                    {/* Date & Location */}
                    <div className="text-center space-y-4">
                        <p className="font-serif uppercase tracking-[0.15em] text-sm text-[#C5A059]">
                            {data.wedding.dateString}
                        </p>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-serif font-bold text-[#C5A059] uppercase tracking-wider">
                                {data.wedding.venue.name}
                            </h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/80 font-sans">
                                {data.wedding.venue.location}
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onOpen}
                        className="w-full bg-white hover:bg-[#fafafa] text-[#0B1221] py-4 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_25px_rgba(197,160,89,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between px-2 pl-8 group border border-[#C5A059]/20"
                    >
                        <span className="font-serif font-bold tracking-[0.15em] text-xs uppercase">Open Invitation</span>
                        <div className="w-10 h-10 rounded-full bg-[#f4e6d6] flex items-center justify-center group-hover:bg-[#C5A059] transition-colors">
                            <span className="material-icons text-sm text-[#0B1221] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                        </div>
                    </button>

                    {/* Footer */}
                    <div className="flex items-center gap-4 opacity-60">
                        <div className="h-[0.5px] w-12 bg-[#C5A059]" />
                        <p className="uppercase tracking-[0.25em] text-[9px] font-medium text-[#C5A059]">
                            Formal Attire
                        </p>
                        <div className="h-[0.5px] w-12 bg-[#C5A059]" />
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Corner Lines (Visual match for the gold frame in design 2) */}
            {/* Already added via the absolute inset-3 border setup */}
        </div>
    );
};

export default WelcomeVariant14;
