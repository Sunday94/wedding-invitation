
import React from 'react';
import { data } from '../data';
import { WELCOME_THEMES } from './welcome/themes';
import WelcomeVariant1 from './welcome/WelcomeVariant1';
import WelcomeVariant2 from './welcome/WelcomeVariant2';
import WelcomeVariant3 from './welcome/WelcomeVariant3';
import WelcomeVariant4 from './welcome/WelcomeVariant4';
import WelcomeVariant5 from './welcome/WelcomeVariant5';
import WelcomeVariant6 from './welcome/WelcomeVariant6';
import WelcomeVariant7 from './welcome/WelcomeVariant7';
import WelcomeVariant8 from './welcome/WelcomeVariant8';
import WelcomeVariant9 from './welcome/WelcomeVariant9';
import WelcomeVariant10 from './welcome/WelcomeVariant10';
import WelcomeVariant11 from './welcome/WelcomeVariant11';
import WelcomeVariant12 from './welcome/WelcomeVariant12';
import WelcomeVariant13 from './welcome/WelcomeVariant13';
import WelcomeVariant14 from './welcome/WelcomeVariant14';

interface WelcomeVariantProps {
    onOpen: () => void;
    variantId: number;
    showImage?: boolean;
}

const WelcomeVariant: React.FC<WelcomeVariantProps> = ({ onOpen, variantId, showImage = true }) => {

    // Specific Layouts for 1-14
    if (variantId === 1) return <WelcomeVariant1 onOpen={onOpen} />;
    if (variantId === 2) return <WelcomeVariant2 onOpen={onOpen} />;
    if (variantId === 3) return <WelcomeVariant3 onOpen={onOpen} />;
    if (variantId === 4) return <WelcomeVariant4 onOpen={onOpen} />;
    if (variantId === 5) return <WelcomeVariant5 onOpen={onOpen} />;
    if (variantId === 6) return <WelcomeVariant6 onOpen={onOpen} />;
    if (variantId === 7) return <WelcomeVariant7 onOpen={onOpen} />;
    if (variantId === 8) return <WelcomeVariant8 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 9) return <WelcomeVariant9 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 10) return <WelcomeVariant10 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 11) return <WelcomeVariant11 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 12) return <WelcomeVariant12 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 13) return <WelcomeVariant13 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 14) return <WelcomeVariant14 onOpen={onOpen} showImage={showImage} />;

    // Generic Layout for 15+ (Legacy Fallback)
    const theme = WELCOME_THEMES[variantId] ?? WELCOME_THEMES[1];

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-between py-16 px-8 text-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    alt="Wedding couple"
                    className="w-full h-full object-cover"
                    src={data.wedding.welcomeImage}
                />
                <div className="absolute inset-0" style={{ backgroundColor: theme.overlayColor }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full w-full max-w-2xl mx-auto">
                <div className="pt-12">
                    <p className="text-white uppercase tracking-[0.3em] text-[11px] font-bold mb-10 opacity-90">
                        {theme.taglineText}
                    </p>
                    <div className="flex flex-col items-center mt-4">
                        <h1 className={`${theme.titleFont} text-white text-[5.5rem] leading-[0.8] drop-shadow-lg`}>
                            {data.couple.fullNames.partner1}
                        </h1>
                        <span className="script-font text-white text-3xl my-4 italic opacity-80">&</span>
                        <h1 className={`${theme.titleFont} text-white text-[5.5rem] leading-[0.8] drop-shadow-lg`}>
                            {data.couple.fullNames.partner2}
                        </h1>
                    </div>
                </div>

                <div className="w-full space-y-8 flex flex-col items-center">
                    <div className="w-full max-w-[320px]">
                        <div className="border-t border-b border-white/40 py-3 mb-6">
                            <p className="text-white font-medium tracking-[0.15em] text-sm uppercase">
                                {data.wedding.dateString}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-white text-lg font-bold tracking-widest uppercase">{data.wedding.venue.name}</p>
                            <p className="text-white/80 text-xs uppercase tracking-widest font-medium">{data.wedding.venue.location}</p>
                        </div>
                    </div>

                    <div className="w-full max-w-[280px]">
                        <button
                            onClick={onOpen}
                            className={`w-full ${theme.buttonStyle} font-bold py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group mb-8`}
                        >
                            <span className="uppercase tracking-[0.2em] text-[12px] pl-4">Open Invitation</span>
                            <span className="material-icons text-lg group-hover:translate-x-1 transition-transform">chevron_right</span>
                        </button>
                        <div className="flex justify-center items-center space-x-4">
                            <div className="h-[0.5px] w-12 bg-white/40" />
                            <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">
                                {theme.attireText}
                            </p>
                            <div className="h-[0.5px] w-12 bg-white/40" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeVariant;
