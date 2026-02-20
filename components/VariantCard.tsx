
import React from 'react';
import { DesignVariant } from '../types';

interface VariantCardProps {
    variant: DesignVariant;
    isSelected: boolean;
    onSelect: (id: number) => void;
    sectionNumber: number;
}

const VariantCard: React.FC<VariantCardProps> = ({ variant, isSelected, onSelect, sectionNumber }) => {
    return (
        <button
            onClick={() => onSelect(variant.id)}
            aria-label={`Select ${variant.label} design`}
            aria-pressed={isSelected}
            className={[
                'relative flex-shrink-0 w-28 rounded-xl overflow-hidden transition-all duration-200 text-left',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400',
                isSelected
                    ? 'ring-2 ring-offset-2 ring-yellow-400 scale-105 shadow-xl'
                    : 'hover:scale-[1.03] hover:shadow-md opacity-80 hover:opacity-100',
            ].join(' ')}
            style={{ borderColor: isSelected ? variant.accent : 'transparent' }}
        >
            {/* Colour swatch preview */}
            <div
                className="w-full h-16 flex items-center justify-center"
                style={{ backgroundColor: variant.accent }}
            >
                <span className="text-white text-xs font-bold opacity-80 tracking-widest uppercase">
                    #{sectionNumber}–{variant.id}
                </span>
            </div>

            {/* Label area */}
            <div className="bg-white dark:bg-slate-800 px-2 py-2">
                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate leading-tight">
                    {variant.label}
                </p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                    {variant.description}
                </p>
            </div>

            {/* Selected checkmark */}
            {isSelected && (
                <div
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: variant.accent }}
                >
                    <span className="material-icons text-white text-[13px]">check</span>
                </div>
            )}
        </button>
    );
};

export default VariantCard;
