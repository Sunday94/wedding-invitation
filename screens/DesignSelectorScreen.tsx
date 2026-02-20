
import React from 'react';
import designsData from '../data/designs.json';
import { DesignSelection, DesignVariant } from '../types';
import { useDesign } from '../context/DesignContext';
import VariantCard from '../components/VariantCard';

interface SectionProps {
    number: number;
    title: string;
    icon: string;
    slot: keyof DesignSelection;
    variants: DesignVariant[];
}

const SelectionSection: React.FC<SectionProps> = ({ number, title, icon, slot, variants }) => {
    const { selection, setSlot } = useDesign();
    const selected = selection[slot];

    return (
        <div className="w-full">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-3 px-4">
                <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-yellow-600 text-[16px]">{icon}</span>
                </div>
                <div className="flex-1">
                    <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">Step {number}</p>
                    <h2 className="text-sm md:text-base font-bold text-slate-800 dark:text-white leading-tight">{title}</h2>
                </div>
                {selected && (
                    <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        <span className="material-icons text-green-500 text-[13px]">check_circle</span>
                        <span className="text-[10px] text-green-600 dark:text-green-400 font-bold">
                            {variants.find(v => v.id === selected)?.label}
                        </span>
                    </div>
                )}
            </div>

            {/* Scrollable row of variant cards */}
            <div className="flex gap-3 overflow-x-auto pb-3 px-4 scrollbar-hide snap-x snap-mandatory">
                {variants.map(variant => (
                    <div key={variant.id} className="snap-start">
                        <VariantCard
                            variant={variant}
                            isSelected={selected === variant.id}
                            onSelect={(id) => setSlot(slot, id)}
                            sectionNumber={number}
                        />
                    </div>
                ))}
            </div>

            {/* Conditional "Show Image" Toggle for Welcome Variants 8-12 */}
            {slot === 'welcome' && [8, 9, 10, 11, 12].includes(selected as number) && (
                <div className="px-4 mt-2">
                    <div className="flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-500">
                                <span className="material-icons text-sm">image</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Show Photo</p>
                                <p className="text-[10px] text-slate-400">Display couple photo in background</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={selection.showWelcomeImage !== false} // Default to true if undefined
                                onChange={(e) => setSlot('showWelcomeImage', e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────

interface DesignSelectorScreenProps {
    onConfirm: () => void;
}

const DesignSelectorScreen: React.FC<DesignSelectorScreenProps> = ({ onConfirm }) => {
    const { isComplete, confirm, selection, setSlot } = useDesign();

    const handleConfirm = () => {
        if (!isComplete) return;
        confirm();
        onConfirm();
    };

    const completedCount = [selection.welcome, selection.loading, selection.dashboard].filter(
        v => typeof v === 'number'
    ).length;

    return (
        <div className="relative h-full w-full flex flex-col bg-[#fdfbf7] dark:bg-slate-900 overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-4 pt-10 pb-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="material-icons text-yellow-500 text-3xl">auto_awesome</span>
                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight">Choose Your Design</h1>
                        <p className="text-[11px] md:text-sm text-slate-400 dark:text-slate-400">
                            Select one style for each section of your invitation
                        </p>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                            style={{ width: `${(completedCount / 3) * 100}%` }}
                        />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">{completedCount}/3</span>
                </div>
            </div>

            {/* Scrollable sections */}
            <div className="flex-1 overflow-y-auto py-5 space-y-6">
                {/* Welcome Screen - Split Categories */}
                <div className="w-full">
                    {/* Main Step Header */}
                    <div className="flex items-center gap-3 mb-3 px-4">
                        <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                            <span className="material-icons text-yellow-600 text-[16px]">waving_hand</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">Step 1</p>
                            <h2 className="text-sm md:text-base font-bold text-slate-800 dark:text-white leading-tight">Welcome Screen</h2>
                        </div>
                    </div>

                    {/* Text Design Category (IDs 1-7) */}
                    <div className="mb-4">
                        <p className="px-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Text Design</p>
                        <div className="flex gap-3 overflow-x-auto pb-3 px-4 scrollbar-hide snap-x snap-mandatory">
                            {(designsData.welcome as DesignVariant[]).filter(v => v.id <= 7).map(variant => (
                                <div key={variant.id} className="snap-start">
                                    <VariantCard
                                        variant={variant}
                                        isSelected={selection.welcome === variant.id}
                                        onSelect={(id) => setSlot('welcome', id)}
                                        sectionNumber={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Design Category (IDs 8-15) */}
                    <div>
                        <p className="px-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Image Design</p>
                        <div className="flex gap-3 overflow-x-auto pb-3 px-4 scrollbar-hide snap-x snap-mandatory">
                            {(designsData.welcome as DesignVariant[]).filter(v => v.id >= 8).map(variant => (
                                <div key={variant.id} className="snap-start">
                                    <VariantCard
                                        variant={variant}
                                        isSelected={selection.welcome === variant.id}
                                        onSelect={(id) => setSlot('welcome', id)}
                                        sectionNumber={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4" />
                <SelectionSection
                    number={2}
                    title="Loading Screen"
                    icon="hourglass_top"
                    slot="loading"
                    variants={designsData.loading as DesignVariant[]}
                />
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4" />
                {/* Main Page - Split Categories */}
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-3 px-4">
                        <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                            <span className="material-icons text-yellow-600 text-[16px]">dashboard</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">Step 3</p>
                            <h2 className="text-sm md:text-base font-bold text-slate-800 dark:text-white leading-tight">Main Page</h2>
                        </div>
                    </div>

                    {/* Colour Category (IDs 1-15) */}
                    <div className="mb-4">
                        <p className="px-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Colour</p>
                        <div className="flex gap-3 overflow-x-auto pb-3 px-4 scrollbar-hide snap-x snap-mandatory">
                            {(designsData.dashboard as DesignVariant[]).filter(v => v.id <= 15).map(variant => (
                                <div key={variant.id} className="snap-start">
                                    <VariantCard
                                        variant={variant}
                                        isSelected={selection.dashboard === variant.id}
                                        onSelect={(id) => setSlot('dashboard', id)}
                                        sectionNumber={3}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Layout Category (IDs 16+) */}
                    <div>
                        <p className="px-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Layout</p>
                        <div className="flex gap-3 overflow-x-auto pb-3 px-4 scrollbar-hide snap-x snap-mandatory">
                            {(designsData.dashboard as DesignVariant[]).filter(v => v.id >= 16).map(variant => (
                                <div key={variant.id} className="snap-start">
                                    <VariantCard
                                        variant={variant}
                                        isSelected={selection.dashboard === variant.id}
                                        onSelect={(id) => setSlot('dashboard', id)}
                                        sectionNumber={3}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Bottom padding for button */}
                <div className="h-6" />
            </div>

            {/* Sticky confirm button */}
            <div className="flex-shrink-0 px-5 pb-8 pt-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
                <button
                    onClick={handleConfirm}
                    disabled={!isComplete}
                    className={[
                        'w-full py-4 rounded-full font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2',
                        isComplete
                            ? 'bg-yellow-400 text-white shadow-lg hover:scale-[1.02] active:scale-95 hover:bg-yellow-500'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed',
                    ].join(' ')}
                >
                    {isComplete ? (
                        <>
                            <span className="material-icons text-lg">celebration</span>
                            Preview Our Invitation
                            <span className="material-icons text-lg">chevron_right</span>
                        </>
                    ) : (
                        <>
                            <span className="material-icons text-lg">touch_app</span>
                            Select All 3 Designs to Continue
                        </>
                    )}
                </button>
                {isComplete && (
                    <p className="text-center text-[10px] text-slate-400 mt-2 tracking-wider">
                        You can change your design later
                    </p>
                )}
            </div>
        </div>
    );
};

export default DesignSelectorScreen;
