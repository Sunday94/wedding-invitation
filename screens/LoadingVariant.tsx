
import React, { useEffect, useState } from 'react';
import { data } from '../data';
import LoadingVariant1 from './loading/LoadingVariant1';
import LoadingVariant2 from './loading/LoadingVariant2';
import LoadingVariant3 from './loading/LoadingVariant3';
import LoadingVariant4 from './loading/LoadingVariant4';
import LoadingVariant5 from './loading/LoadingVariant5';
import LoadingVariant6 from './loading/LoadingVariant6';

export interface LoadingTheme {
    bgColor: string;
    progressColor: string;
    iconName: string;             // Material icon name
    iconColor: string;
    titleText: string;
    subtitleText: string;
    ringColor: string;
}

export const LOADING_THEMES: Record<number, LoadingTheme> = {
    1: { bgColor: '#fdfbf7', progressColor: '#c8a96e', iconName: 'favorite', iconColor: '#c8a96e', titleText: 'Preparing our special day...', subtitleText: 'Please Wait', ringColor: 'rgba(200,169,110,0.3)' },
    2: { bgColor: '#fff0f0', progressColor: '#e8a0a0', iconName: 'local_florist', iconColor: '#e8a0a0', titleText: 'Petals falling into place...', subtitleText: 'Just a moment', ringColor: 'rgba(232,160,160,0.3)' },
    3: { bgColor: '#fffbe6', progressColor: '#ffd700', iconName: 'diamond', iconColor: '#ffd700', titleText: 'Polishing to perfection...', subtitleText: 'Almost there', ringColor: 'rgba(255,215,0,0.3)' },
    4: { bgColor: '#FFFCF7', progressColor: '#c8a96e', iconName: 'favorite', iconColor: '#c8a96e', titleText: 'Preparing our special day...', subtitleText: 'Please wait', ringColor: 'rgba(200,169,110,0.3)' },
    5: { bgColor: '#fff8ee', progressColor: '#d4813a', iconName: 'wb_sunny', iconColor: '#d4813a', titleText: 'The golden hour approaches...', subtitleText: 'Warming up', ringColor: 'rgba(212,129,58,0.3)' },
    6: { bgColor: '#0d1b2e', progressColor: '#4a9eff', iconName: 'star', iconColor: '#4a9eff', titleText: 'Stars aligning for you...', subtitleText: 'Standby', ringColor: 'rgba(74,158,255,0.3)' },
    7: { bgColor: '#f0f5f1', progressColor: '#7d9b76', iconName: 'eco', iconColor: '#7d9b76', titleText: 'Growing something beautiful...', subtitleText: 'Please wait', ringColor: 'rgba(125,155,118,0.3)' },
    8: { bgColor: '#fdf8ff', progressColor: '#9b88b4', iconName: 'auto_awesome', iconColor: '#9b88b4', titleText: 'Magic is happening...', subtitleText: 'Just a sec', ringColor: 'rgba(155,136,180,0.3)' },
    9: { bgColor: '#ffffff', progressColor: '#b0bec5', iconName: 'more_horiz', iconColor: '#b0bec5', titleText: 'Loading...', subtitleText: '', ringColor: 'rgba(176,190,197,0.2)' },
    10: { bgColor: '#fffdf0', progressColor: '#e8d5a3', iconName: 'celebration', iconColor: '#e8d5a3', titleText: 'The party is about to begin...', subtitleText: 'Pop the champagne', ringColor: 'rgba(232,213,163,0.3)' },
    11: { bgColor: '#fff5f2', progressColor: '#b5533c', iconName: 'card_giftcard', iconColor: '#b5533c', titleText: 'Unwrapping your invitation...', subtitleText: 'A moment please', ringColor: 'rgba(181,83,60,0.3)' },
    12: { bgColor: '#f4f6f8', progressColor: '#7ba7bc', iconName: 'hourglass_top', iconColor: '#7ba7bc', titleText: 'Time stands still for love...', subtitleText: 'Please hold', ringColor: 'rgba(123,167,188,0.3)' },
    13: { bgColor: '#fffef5', progressColor: '#c8a022', iconName: 'bubble_chart', iconColor: '#c8a022', titleText: 'Fizzing with excitement...', subtitleText: 'One moment', ringColor: 'rgba(200,160,34,0.3)' },
    14: { bgColor: '#f8fafd', progressColor: '#1e3a5f', iconName: 'anchor', iconColor: '#1e3a5f', titleText: 'Setting sail together...', subtitleText: 'Bon voyage', ringColor: 'rgba(30,58,95,0.2)' },
    15: { bgColor: '#0d0d0d', progressColor: '#ffffff', iconName: 'nights_stay', iconColor: '#cccccc', titleText: 'The night awaits you...', subtitleText: 'Entering', ringColor: 'rgba(255,255,255,0.1)' },
};

interface LoadingVariantProps {
    onFinished: () => void;
    variantId: number;
}

const LoadingVariant: React.FC<LoadingVariantProps> = ({ onFinished, variantId }) => {
    if (variantId === 1) {
        return <LoadingVariant1 onFinished={onFinished} />;
    }
    if (variantId === 2) {
        return <LoadingVariant2 onFinished={onFinished} />;
    }
    if (variantId === 3) {
        return <LoadingVariant3 onFinished={onFinished} />;
    }
    if (variantId === 4) {
        return <LoadingVariant4 onFinished={onFinished} />;
    }
    if (variantId === 5) {
        return <LoadingVariant5 onFinished={onFinished} />;
    }
    if (variantId === 6) {
        return <LoadingVariant6 onFinished={onFinished} />;
    }

    const [progress, setProgress] = useState(0);
    const theme = LOADING_THEMES[variantId] ?? LOADING_THEMES[1];
    const isDark = variantId === 6 || variantId === 15;

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinished, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 25);
        return () => clearInterval(timer);
    }, [onFinished]);

    return (
        <div
            className="relative h-full w-full flex flex-col items-center justify-between py-16 px-8"
            style={{ backgroundColor: theme.bgColor }}
        >
            <div className="w-full flex justify-center opacity-30">
                <div className="w-24 h-24 rounded-full" style={{ backgroundColor: theme.ringColor }} />
            </div>

            <div className="flex flex-col items-center gap-12 w-full">
                <div className="relative flex items-center justify-center">
                    <div
                        className="absolute w-40 h-40 rounded-full blur-2xl animate-subtle-pulse"
                        style={{ backgroundColor: theme.ringColor }}
                    />
                    <div className="relative z-10 animate-float">
                        <div
                            className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                            style={{ borderColor: `${theme.iconColor}30` }}
                        >
                            <div
                                className="w-20 h-20 rounded-full border-4 shadow-lg flex items-center justify-center"
                                style={{ borderColor: theme.iconColor, backgroundColor: theme.bgColor }}
                            >
                                <span className="material-icons text-4xl" style={{ color: theme.iconColor }}>
                                    {theme.iconName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h1
                        className="serif-font text-3xl italic leading-tight"
                        style={{ color: isDark ? '#ffffff' : '#3a3a3a' }}
                    >
                        {theme.titleText}
                    </h1>
                    {theme.subtitleText && (
                        <p
                            className="text-xs tracking-widest uppercase font-bold"
                            style={{ color: isDark ? '#aaaaaa' : '#9a9a9a' }}
                        >
                            {theme.subtitleText}
                        </p>
                    )}
                </div>
            </div>

            <div className="w-full space-y-10 flex flex-col items-center pb-8">
                <div
                    className="w-48 h-[3px] rounded-full overflow-hidden"
                    style={{ backgroundColor: `${theme.progressColor}20` }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-75"
                        style={{ width: `${progress}%`, backgroundColor: theme.progressColor }}
                    />
                </div>

                <div className="text-center">
                    <p className="serif-font text-2xl tracking-widest" style={{ color: theme.progressColor }}>
                        {data.couple.initials}
                    </p>
                    <div className="w-8 h-[1px] mx-auto mt-2" style={{ backgroundColor: `${theme.progressColor}40` }} />
                    <p
                        className="text-[10px] mt-3 tracking-[0.2em] uppercase font-bold"
                        style={{ color: isDark ? '#666666' : '#aaaaaa' }}
                    >
                        {data.wedding.dateString}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingVariant;
