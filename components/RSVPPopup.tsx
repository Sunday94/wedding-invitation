
import React, { useState, useEffect } from 'react';

interface RSVPPopupProps {
    isOpen: boolean;
    onClose: () => void;
    accentColor: string;
    textPrimary: string;
    textSecondary: string;
    cardBg: string;
    cardBorder: string;
}

const RSVPPopup: React.FC<RSVPPopupProps> = ({ isOpen, onClose, accentColor, textPrimary, textSecondary, cardBg, cardBorder }) => {
    const [name, setName] = useState('');
    const [groupType, setGroupType] = useState('Single');
    const [numPeople, setNumPeople] = useState('1');
    const [rsvpStatus, setRsvpStatus] = useState('Accept');
    const [reason, setReason] = useState('');
    const [dietary, setDietary] = useState<string[]>(['NONE']);

    // Auto-lock logic for Number of People
    useEffect(() => {
        if (groupType === 'Partner') {
            setNumPeople('2');
        } else if (groupType === 'Single') {
            setNumPeople('1');
        }
    }, [groupType]);

    if (!isOpen) return null;

    const dietaryOptions = [
        'NONE', 'VEGAN-FREE', 'VEGETARIAN-FREE', 'GLUTEN-FREE', 'NUT-FREE', 'CHICKEN-FREE', 'BEEF-FREE', 'FISH-FREE', 'SEAFOOD-FREE'
    ];

    const toggleDietary = (tag: string) => {
        if (tag === 'NONE') {
            setDietary(['NONE']);
            return;
        }

        let newDietary = [...dietary].filter(t => t !== 'NONE');
        if (newDietary.includes(tag)) {
            newDietary = newDietary.filter(t => t !== tag);
        } else {
            newDietary.push(tag);
        }

        if (newDietary.length === 0) {
            setDietary(['NONE']);
        } else {
            setDietary(newDietary);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we'd send data to an API
        console.log('RSVP Submitted:', { name, groupType, numPeople, rsvpStatus, reason, dietary });
        onClose();
    };

    const isLocked = groupType === 'Partner' || groupType === 'Single';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300"
                style={{ backgroundColor: cardBg }}>
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: cardBorder }}>
                    <div>
                        <h2 className="serif-font text-2xl italic" style={{ color: textPrimary }}>Wedding RSVP</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: textSecondary }}>Please confirm your attendance</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        style={{ color: textSecondary }}
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: textSecondary }}>Full Name</label>
                        <div className="relative">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-lg" style={{ color: textSecondary, opacity: 0.5 }}>person_outline</span>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-0 transition-all text-sm placeholder:opacity-30"
                                style={{ backgroundColor: cardBg, color: textPrimary, borderColor: cardBorder }}
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Group Type */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: textSecondary }}>Group Type</label>
                            <select
                                value={groupType}
                                onChange={(e) => setGroupType(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-0 transition-all text-sm appearance-none"
                                style={{ backgroundColor: cardBg, color: textPrimary, borderColor: cardBorder }}
                            >
                                <option value="Single">Single</option>
                                <option value="Partner">Partner</option>
                                <option value="Friends">Friends</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>

                        {/* Number of People */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: textSecondary }}>Total People</label>
                            <div className="relative">
                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-lg" style={{ color: textSecondary, opacity: 0.5 }}>groups</span>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={numPeople}
                                    onChange={(e) => !isLocked && setNumPeople(e.target.value)}
                                    disabled={isLocked}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-0 transition-all text-sm ${isLocked ? 'cursor-not-allowed border-dashed opacity-50' : ''}`}
                                    style={{ backgroundColor: cardBg, color: textPrimary, borderColor: cardBorder }}
                                />
                                {isLocked && (
                                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: textSecondary, opacity: 0.3 }}>lock</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RSVP Status */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: textSecondary }}>Will you attend?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Accept', 'Decline'].map((status) => {
                                const isActive = rsvpStatus === status;
                                return (
                                    <button
                                        key={status}
                                        type="button"
                                        onClick={() => setRsvpStatus(status)}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all font-bold text-xs uppercase tracking-widest ${isActive
                                            ? 'shadow-md scale-[1.02]'
                                            : 'hover:opacity-80'
                                            }`}
                                        style={isActive
                                            ? { backgroundColor: status === 'Accept' ? accentColor + '20' : '#fee2e2', borderColor: status === 'Accept' ? accentColor : '#ef4444', color: status === 'Accept' ? accentColor : '#ef4444' }
                                            : { backgroundColor: cardBg, color: textSecondary, borderColor: cardBorder }}
                                    >
                                        <span className="material-icons text-lg">{status === 'Accept' ? 'check_circle' : 'cancel'}</span>
                                        {status}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reason (Conditional) */}
                    {rsvpStatus === 'Decline' && (
                        <div className="space-y-2 animate-in slide-in-from-top-4 duration-300">
                            <label className="text-[11px] font-bold uppercase tracking-wider block text-red-500">Reason for Declining</label>
                            <textarea
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-red-100 focus:border-red-300 focus:ring-0 transition-all text-sm min-h-[80px]"
                                style={{ backgroundColor: cardBg, color: textPrimary }}
                                placeholder="Please let us know why you can't make it..."
                            />
                        </div>
                    )}

                    {/* Dietary Restrictions */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: textSecondary }}>Dietary Restrictions</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {dietaryOptions.map((tag) => {
                                const isSelected = dietary.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleDietary(tag)}
                                        className={`px-4 py-2.5 rounded-full text-[10px] font-bold transition-all border whitespace-nowrap shadow-sm hover:shadow-md ${isSelected
                                            ? 'text-white scale-105'
                                            : 'hover:opacity-80'
                                            }`}
                                        style={isSelected
                                            ? { backgroundColor: textPrimary, borderColor: textPrimary, color: cardBg }
                                            : { backgroundColor: cardBg, borderColor: cardBorder, color: textSecondary }}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </form>

                {/* Submit button */}
                <div className="p-6 border-t" style={{ backgroundColor: accentColor + '08', borderColor: cardBorder }}>
                    <button
                        onClick={handleSubmit}
                        disabled={!name}
                        className={`w-full py-4 rounded-2xl shadow-lg shadow-black/5 font-bold uppercase tracking-[0.2em] text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${!name ? 'cursor-not-allowed shadow-none opacity-50' : 'text-white'}`}
                        style={name ? { backgroundColor: accentColor, color: cardBg } : { backgroundColor: textSecondary, color: cardBg }}
                    >
                        <span>Submit RSVP</span>
                        <span className="material-icons text-xl">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RSVPPopup;
