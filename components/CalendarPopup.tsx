
import React from 'react';
import { data } from '../data';
import { generateGoogleCalendarUrl, generateOutlookUrl, downloadIcsFile, CalendarEvent } from '../utils/calendar';

interface CalendarPopupProps {
    isOpen: boolean;
    onClose: () => void;
    accentColor: string;
    textPrimary: string;
    textSecondary: string;
    cardBg: string;
    cardBorder: string;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({ isOpen, onClose, accentColor, textPrimary, textSecondary, cardBg, cardBorder }) => {
    if (!isOpen) return null;

    // Wedding Duration: Assuming 8 hours for the ceremony + reception
    const startDate = new Date(data.wedding.date);
    const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

    const event: CalendarEvent = {
        title: `${data.couple.names}'s Wedding`,
        description: data.wedding.calendarDescription,
        location: `${data.wedding.venue.name}, ${data.wedding.venue.address}`,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
    };

    const handleGoogle = () => {
        window.open(generateGoogleCalendarUrl(event), '_blank');
        onClose();
    };

    const handleOutlook = () => {
        window.open(generateOutlookUrl(event), '_blank');
        onClose();
    };

    const handleIcs = () => {
        downloadIcsFile(event);
        onClose();
    };

    const calendarOptions = [
        {
            name: 'Google Calendar',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
            onClick: handleGoogle
        },
        {
            name: 'Outlook Calendar',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg',
            onClick: handleOutlook
        },
        {
            name: 'Apple / Phone Calendar',
            icon: 'event', // Material icon for generic calendar
            isMaterial: true,
            onClick: handleIcs
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            <div className="relative w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 p-8"
                style={{ backgroundColor: cardBg }}>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="serif-font text-2xl italic" style={{ color: textPrimary }}>Add to Calendar</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
                        style={{ color: textSecondary }}
                    >
                        <span className="material-icons text-xl">close</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {calendarOptions.map((opt) => (
                        <button
                            key={opt.name}
                            onClick={opt.onClick}
                            className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] hover:opacity-80"
                            style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                        >
                            <div className="w-12 h-12 flex items-center justify-center shrink-0">
                                {opt.isMaterial ? (
                                    <span className="material-icons text-3xl" style={{ color: accentColor }}>{opt.icon}</span>
                                ) : (
                                    <img src={opt.icon} alt={opt.name} className="w-8 h-8 object-contain" />
                                )}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-sm" style={{ color: textPrimary }}>{opt.name}</p>
                                <p className="text-xs" style={{ color: textSecondary }}>Save to your {opt.name.split(' ')[0]} account</p>
                            </div>
                            <span className="material-icons ml-auto" style={{ color: textSecondary, opacity: 0.3 }}>chevron_right</span>
                        </button>
                    ))}
                </div>

                <p className="mt-8 text-center text-[10px] uppercase tracking-widest font-bold" style={{ color: textSecondary }}>
                    Mark your calendar for {data.wedding.dateString}
                </p>
            </div>
        </div>
    );
};

export default CalendarPopup;
