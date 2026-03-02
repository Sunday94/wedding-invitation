
import React from 'react';
import { data } from '../data';
import { WELCOME_THEMES } from './welcome/themes';
import Welcomevarianttext1 from './welcome/Welcomevarianttext1';
import Welcomevarianttext2 from './welcome/Welcomevarianttext2';
import Welcomevariantimage3 from './welcome/Welcomevariantimage3';
import Welcomevarianttext4 from './welcome/Welcomevarianttext4';
import Welcomevarianttext5 from './welcome/Welcomevarianttext5';
import Welcomevarianttext6 from './welcome/Welcomevarianttext6';
import Welcomevarianttext7 from './welcome/Welcomevarianttext7';
import Welcomevariantimage8 from './welcome/Welcomevariantimage8';
import Welcomevariantimage9 from './welcome/Welcomevariantimage9';
import Welcomevariantimage10 from './welcome/Welcomevariantimage10';
import Welcomevariantimage11 from './welcome/Welcomevariantimage11';
import Welcomevariantimage12 from './welcome/Welcomevariantimage12';
import Welcomevariantimage13 from './welcome/Welcomevariantimage13';
import Welcomevariantimage14 from './welcome/Welcomevariantimage14';
import { getWelcomeCopy } from './welcome/welcomeTextBindings';

interface WelcomeVariantProps {
    onOpen: () => void;
    variantId: number;
    showImage?: boolean;
}

const WelcomeVariant: React.FC<WelcomeVariantProps> = ({ onOpen, variantId, showImage = true }) => {
    const welcomeCopy = getWelcomeCopy();

    // Specific Layouts for 1-14
    if (variantId === 1) return <Welcomevarianttext1 onOpen={onOpen} />;
    if (variantId === 2) return <Welcomevarianttext2 onOpen={onOpen} />;
    if (variantId === 3) return <Welcomevariantimage3 onOpen={onOpen} />;
    if (variantId === 4) return <Welcomevarianttext4 onOpen={onOpen} />;
    if (variantId === 5) return <Welcomevarianttext5 onOpen={onOpen} />;
    if (variantId === 6) return <Welcomevarianttext6 onOpen={onOpen} />;
    if (variantId === 7) return <Welcomevarianttext7 onOpen={onOpen} />;
    if (variantId === 8) return <Welcomevariantimage8 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 9) return <Welcomevariantimage9 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 10) return <Welcomevariantimage10 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 11) return <Welcomevariantimage11 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 12) return <Welcomevariantimage12 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 13) return <Welcomevariantimage13 onOpen={onOpen} showImage={showImage} />;
    if (variantId === 14) return <Welcomevariantimage14 onOpen={onOpen} showImage={showImage} />;

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
                        {welcomeCopy.welcomeText}
                    </p>
                    <div className="flex flex-col items-center mt-4">
                        <h1 className={`${theme.titleFont} text-white text-[5.5rem] leading-[0.8] drop-shadow-lg`}>
                            {welcomeCopy.brideDisplayName}
                        </h1>
                        <span className="script-font text-white text-3xl my-4 italic opacity-80">&</span>
                        <h1 className={`${theme.titleFont} text-white text-[5.5rem] leading-[0.8] drop-shadow-lg`}>
                            {welcomeCopy.groomDisplayName}
                        </h1>
                    </div>
                </div>

                <div className="w-full space-y-8 flex flex-col items-center">
                    <div className="w-full max-w-[320px]">
                        <div className="border-t border-b border-white/40 py-3 mb-6">
                            <p className="text-white font-medium tracking-[0.15em] text-sm uppercase">
                                {welcomeCopy.eventDate}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-white text-lg font-bold tracking-widest uppercase">{welcomeCopy.weddingVenue}</p>
                            <p className="text-white/80 text-xs uppercase tracking-widest font-medium">{welcomeCopy.weddingAddress}</p>
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
                                {welcomeCopy.invitationLabel}
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
