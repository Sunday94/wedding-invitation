
import React, { useState } from 'react';
import wishlistData from '../data/wishlist.json';

interface WishlistPopupProps {
    isOpen: boolean;
    onClose: () => void;
    accentColor: string;
    textPrimary: string;
    textSecondary: string;
    cardBg: string;
    cardBorder: string;
}

const CATEGORIES = ["All", "Kitchen Appliances", "Home Appliances", "Gift Money", "Bedding & Linen"];

const TAG_COLORS: Record<string, string> = {
    "Kitchen Appliances": "#f39c12",
    "Gift Money": "#1abc9c",
    "Bedding & Linen": "#ff7675",
    "Home Appliances": "#3498db"
};

const WishlistPopup: React.FC<WishlistPopupProps> = ({ isOpen, onClose, accentColor, textPrimary, textSecondary, cardBg, cardBorder }) => {
    const [activeCategory, setActiveCategory] = useState("All");

    if (!isOpen) return null;

    const filteredItems = activeCategory === "All"
        ? wishlistData
        : wishlistData.filter(item => item.category === activeCategory);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-300"
                style={{ backgroundColor: cardBg }}>
                {/* Header with Tabs */}
                <div className="p-6 border-b" style={{ borderColor: cardBorder }}>
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h2 className="serif-font text-2xl italic" style={{ color: textPrimary }}>Wedding Wishlist</h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
                            style={{ color: textSecondary }}
                        >
                            <span className="material-icons text-xl">close</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3 px-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest shrink-0" style={{ color: textSecondary, opacity: 0.6 }}>Category:</span>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {CATEGORIES.map((cat) => {
                                const icons: Record<string, string> = {
                                    "All": "",
                                    "Kitchen Appliances": "coffee_maker",
                                    "Home Appliances": "home",
                                    "Gift Money": "savings",
                                    "Bedding & Linen": "bed"
                                };
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all whitespace-nowrap flex items-center gap-1 border ${isActive
                                            ? 'shadow-md scale-105'
                                            : 'hover:opacity-80'
                                            }`}
                                        style={isActive
                                            ? { backgroundColor: textPrimary, color: cardBg, borderColor: textPrimary }
                                            : { backgroundColor: cardBg, color: textSecondary, borderColor: cardBorder }}
                                    >
                                        {icons[cat] && <span className="material-icons text-xs">{icons[cat]}</span>}
                                        {cat.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Items Grid */}
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                    <div className="grid grid-cols-1 gap-6">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border group flex flex-col"
                                style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                            >
                                {/* Image Section */}
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div
                                        className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white shadow-lg"
                                        style={{ backgroundColor: TAG_COLORS[item.category] || accentColor }}
                                    >
                                        {item.category}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="serif-font text-xl truncate" style={{ color: textPrimary }}>{item.title}</h3>
                                        {item.purchased && (
                                            <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>
                                        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>

                                    {/* Footer Actions */}
                                    <div className="mt-auto pt-6 border-t flex items-center justify-center" style={{ borderColor: cardBorder }}>
                                        <button className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:opacity-70"
                                            style={{ color: textSecondary }}>
                                            See more
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistPopup;
