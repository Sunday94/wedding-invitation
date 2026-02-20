
import React, { useState } from 'react';
import { data } from '../data';
import { Dish, DietaryOption } from '../types';

interface MenuPopupProps {
    isOpen: boolean;
    onClose: () => void;
    accentColor: string;
    textPrimary: string;
    textSecondary: string;
    cardBg: string;
    cardBorder: string;
}

const MenuPopup: React.FC<MenuPopupProps> = ({ isOpen, onClose, accentColor, textPrimary, textSecondary, cardBg, cardBorder }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedDietary, setSelectedDietary] = useState<string>('all');

    if (!isOpen) return null;

    const filteredDishes = data.banquet.dishes.filter(dish => {
        const categoryMatch = selectedCategory === 'All' || dish.category === selectedCategory;
        const dietaryMatch = selectedDietary === 'all' || dish.dietary.includes(selectedDietary);
        return categoryMatch && dietaryMatch;
    });

    const getDietaryIcon = (dietaryId: string) => {
        return data.banquet.dietaryOptions.find(opt => opt.id === dietaryId)?.icon || 'help_outline';
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-300"
                style={{ backgroundColor: cardBg }}>
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: cardBorder }}>
                    <div>
                        <h2 className="serif-font text-2xl italic" style={{ color: textPrimary }}>Banquet Menu</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: textSecondary }}>Our Selected Delicacies</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        style={{ color: textSecondary }}
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="px-6 py-4 space-y-4" style={{ backgroundColor: accentColor + '08' }}>
                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {data.banquet.categories.map(cat => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${isActive
                                        ? 'shadow-md scale-105'
                                        : 'border hover:opacity-80'
                                        }`}
                                    style={isActive
                                        ? { backgroundColor: accentColor, color: cardBg }
                                        : { backgroundColor: cardBg, color: textSecondary, borderColor: cardBorder }}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Dietary Filters */}
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest shrink-0" style={{ color: textSecondary }}>Dietary:</span>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setSelectedDietary('all')}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${selectedDietary === 'all'
                                    ? 'text-white'
                                    : 'border'
                                    }`}
                                style={selectedDietary === 'all'
                                    ? { backgroundColor: textPrimary, color: cardBg }
                                    : { backgroundColor: cardBg, color: textSecondary, borderColor: cardBorder }}
                            >
                                ALL
                            </button>
                            {data.banquet.dietaryOptions.map(opt => {
                                const isActive = selectedDietary === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => setSelectedDietary(opt.id)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all whitespace-nowrap flex items-center gap-1 ${isActive
                                            ? 'text-white'
                                            : 'border'
                                            }`}
                                        style={isActive
                                            ? { backgroundColor: textPrimary, color: cardBg }
                                            : { backgroundColor: cardBg, color: textSecondary, borderColor: cardBorder }}
                                    >
                                        <span className="material-icons text-xs">{opt.icon}</span>
                                        {opt.label.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Dish List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                    {filteredDishes.length > 0 ? (
                        filteredDishes.map((dish) => (
                            <div key={dish.id} className="group relative">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: textSecondary }}>{dish.category}</span>
                                            {dish.isChefsChoice && (
                                                <span
                                                    className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                                                    style={{ backgroundColor: accentColor, color: cardBg }}
                                                >
                                                    Chef's Choice
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="serif-font text-xl" style={{ color: textPrimary }}>{dish.name}</h3>
                                    </div>
                                    <div className="flex -space-x-1">
                                        {dish.dietary.map(dId => (
                                            <div
                                                key={dId}
                                                className="w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-sm"
                                                title={dId}
                                                style={{ backgroundColor: accentColor + '10', borderColor: cardBg }}
                                            >
                                                <span className="material-icons text-xs" style={{ color: accentColor }}>{getDietaryIcon(dId)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed font-light italic pr-8" style={{ color: textSecondary }}>
                                    {dish.description}
                                </p>
                                <div className="mt-4 h-px w-full opacity-20 last:hidden" style={{ backgroundColor: cardBorder }} />
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12" style={{ color: textSecondary }}>
                            <span className="material-icons text-4xl mb-2 opacity-20">restaurant</span>
                            <p className="text-sm italic">No dishes found in this category</p>
                        </div>
                    )}
                </div>

                {/* Info Footer */}
                <div className="p-4 border-t flex items-center justify-center gap-6" style={{ backgroundColor: accentColor + '05', borderColor: cardBorder }}>
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-xs" style={{ color: textSecondary }}>info_outline</span>
                        <span className="text-[10px] font-medium" style={{ color: textSecondary }}>VIEW ONLY MODE</span>
                    </div>
                    <div className="w-px h-3 opacity-20" style={{ backgroundColor: textSecondary }} />
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-xs" style={{ color: textSecondary }}>favorite_border</span>
                        <span className="text-[10px] font-medium" style={{ color: textSecondary }}>MADE WITH LOVE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPopup;
