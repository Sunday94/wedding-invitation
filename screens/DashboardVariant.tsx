
import React from 'react';
import TimelineItem from '../components/TimelineItem';
import Countdown from '../components/Countdown';
import MenuPopup from '../components/MenuPopup';
import RSVPPopup from '../components/RSVPPopup';
import WishlistPopup from '../components/WishlistPopup';
import CalendarPopup from '../components/CalendarPopup';
import { data } from '../data';

export interface DashboardTheme {
    bgColor: string;
    cardBg: string;
    cardBorder: string;
    heroOverlay: string;
    accentColor: string;
    textPrimary: string;
    textSecondary: string;
    footerBg: string;
    actionBtnBg: string;
    actionBtnBorder: string;
    actionIconColor: string;
}

export const DASHBOARD_THEMES: Record<number, DashboardTheme> = {
    1: { bgColor: '#fdfbf7', cardBg: '#ffffff', cardBorder: 'rgba(200,169,110,0.15)', heroOverlay: 'rgba(0,0,0,0.40)', accentColor: '#c8a96e', textPrimary: '#1a1a1a', textSecondary: '#888888', footerBg: 'rgba(255,255,255,0.95)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(200,169,110,0.2)', actionIconColor: '#c8a96e' },
    2: { bgColor: '#f2f2f2', cardBg: '#ffffff', cardBorder: 'rgba(58,58,58,0.12)', heroOverlay: 'rgba(0,0,0,0.50)', accentColor: '#3a3a3a', textPrimary: '#111111', textSecondary: '#666666', footerBg: 'rgba(255,255,255,0.96)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(0,0,0,0.1)', actionIconColor: '#3a3a3a' },
    3: { bgColor: '#f0f5f1', cardBg: '#ffffff', cardBorder: 'rgba(125,155,118,0.2)', heroOverlay: 'rgba(20,50,20,0.45)', accentColor: '#7d9b76', textPrimary: '#1a2e1a', textSecondary: '#6b8e6b', footerBg: 'rgba(240,245,241,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(125,155,118,0.2)', actionIconColor: '#7d9b76' },
    4: { bgColor: '#0d0d1a', cardBg: '#1a1a2e', cardBorder: 'rgba(200,169,110,0.3)', heroOverlay: 'rgba(5,5,20,0.65)', accentColor: '#c8a96e', textPrimary: '#ffffff', textSecondary: '#aaaaaa', footerBg: 'rgba(13,13,26,0.97)', actionBtnBg: '#1a1a2e', actionBtnBorder: 'rgba(200,169,110,0.3)', actionIconColor: '#c8a96e' },
    5: { bgColor: '#fff5f5', cardBg: '#ffffff', cardBorder: 'rgba(232,160,160,0.2)', heroOverlay: 'rgba(160,30,30,0.30)', accentColor: '#e8a0a0', textPrimary: '#2d0a0a', textSecondary: '#b07070', footerBg: 'rgba(255,245,245,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(232,160,160,0.25)', actionIconColor: '#e8a0a0' },
    6: { bgColor: '#ffffff', cardBg: '#f9f9f9', cardBorder: 'rgba(0,0,0,0.06)', heroOverlay: 'rgba(0,0,0,0.35)', accentColor: '#cccccc', textPrimary: '#111111', textSecondary: '#999999', footerBg: 'rgba(255,255,255,0.98)', actionBtnBg: '#f9f9f9', actionBtnBorder: 'rgba(0,0,0,0.08)', actionIconColor: '#555555' },
    7: { bgColor: '#f0f3f8', cardBg: '#ffffff', cardBorder: 'rgba(30,58,95,0.15)', heroOverlay: 'rgba(15,30,60,0.55)', accentColor: '#1e3a5f', textPrimary: '#0d1b2e', textSecondary: '#5a7a9a', footerBg: 'rgba(240,243,248,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(30,58,95,0.15)', actionIconColor: '#1e3a5f' },
    8: { bgColor: '#fdf5f2', cardBg: '#ffffff', cardBorder: 'rgba(181,83,60,0.15)', heroOverlay: 'rgba(80,20,10,0.45)', accentColor: '#b5533c', textPrimary: '#2d0f08', textSecondary: '#a06050', footerBg: 'rgba(253,245,242,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(181,83,60,0.2)', actionIconColor: '#b5533c' },
    9: { bgColor: '#fdf8ff', cardBg: '#ffffff', cardBorder: 'rgba(155,136,180,0.2)', heroOverlay: 'rgba(60,20,100,0.40)', accentColor: '#9b88b4', textPrimary: '#1a0d2e', textSecondary: '#8060a0', footerBg: 'rgba(253,248,255,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(155,136,180,0.2)', actionIconColor: '#9b88b4' },
    10: { bgColor: '#fff8ee', cardBg: '#ffffff', cardBorder: 'rgba(212,129,58,0.2)', heroOverlay: 'rgba(100,50,10,0.45)', accentColor: '#d4813a', textPrimary: '#2d1500', textSecondary: '#b07030', footerBg: 'rgba(255,248,238,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(212,129,58,0.2)', actionIconColor: '#d4813a' },
    11: { bgColor: '#f8fafd', cardBg: '#ffffff', cardBorder: 'rgba(123,167,188,0.2)', heroOverlay: 'rgba(30,60,100,0.40)', accentColor: '#7ba7bc', textPrimary: '#0d1e2e', textSecondary: '#6090b0', footerBg: 'rgba(248,250,253,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(123,167,188,0.2)', actionIconColor: '#7ba7bc' },
    12: { bgColor: '#f0f5f2', cardBg: '#ffffff', cardBorder: 'rgba(45,106,79,0.2)', heroOverlay: 'rgba(10,40,20,0.50)', accentColor: '#2d6a4f', textPrimary: '#0a1e14', textSecondary: '#507060', footerBg: 'rgba(240,245,242,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(45,106,79,0.2)', actionIconColor: '#2d6a4f' },
    13: { bgColor: '#f8f8f8', cardBg: '#ffffff', cardBorder: 'rgba(176,190,197,0.25)', heroOverlay: 'rgba(100,110,120,0.40)', accentColor: '#b0bec5', textPrimary: '#1a2030', textSecondary: '#8090a0', footerBg: 'rgba(248,248,248,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(176,190,197,0.2)', actionIconColor: '#b0bec5' },
    14: { bgColor: '#fffef8', cardBg: '#ffffff', cardBorder: 'rgba(200,160,34,0.2)', heroOverlay: 'rgba(120,100,10,0.35)', accentColor: '#c8a022', textPrimary: '#1e1600', textSecondary: '#906000', footerBg: 'rgba(255,254,248,0.97)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(200,160,34,0.2)', actionIconColor: '#c8a022' },
    15: { bgColor: '#0d0d0d', cardBg: '#1a1a1a', cardBorder: 'rgba(255,255,255,0.08)', heroOverlay: 'rgba(0,0,0,0.70)', accentColor: '#ffffff', textPrimary: '#ffffff', textSecondary: '#888888', footerBg: 'rgba(13,13,13,0.98)', actionBtnBg: '#1a1a1a', actionBtnBorder: 'rgba(255,255,255,0.1)', actionIconColor: '#ffffff' },
    16: { bgColor: '#fdfbf7', cardBg: '#ffffff', cardBorder: 'rgba(200,169,110,0.15)', heroOverlay: 'rgba(0,0,0,0.40)', accentColor: '#c8a96e', textPrimary: '#1a1a1a', textSecondary: '#888888', footerBg: 'rgba(255,255,255,0.95)', actionBtnBg: '#ffffff', actionBtnBorder: 'rgba(200,169,110,0.2)', actionIconColor: '#c8a96e' },
};

interface DashboardVariantProps {
    variantId: number;
}

const DashboardVariant: React.FC<DashboardVariantProps> = ({ variantId }) => {
    const theme = DASHBOARD_THEMES[variantId] ?? DASHBOARD_THEMES[1];
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isRSVPOpen, setIsRSVPOpen] = React.useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

    return (
        <div
            className="relative h-full w-full flex flex-col overflow-hidden"
            style={{ backgroundColor: theme.bgColor }}
        >
            <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                {/* Hero */}
                <div className="relative h-72 md:h-96 w-full overflow-hidden shrink-0 shadow-lg">
                    <img alt="Venue" className="w-full h-full object-cover" src={data.wedding.venue.image} />
                    <div className="absolute inset-0" style={{ backgroundColor: theme.heroOverlay }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
                        <h1 className="serif-font italic text-4xl mb-2 drop-shadow-lg">{data.couple.names}</h1>
                        <p className="text-[11px] tracking-[0.2em] uppercase opacity-90 font-bold drop-shadow-md">{data.wedding.dateString}</p>
                    </div>
                </div>

                {/* Main Content */}
                <main className={`relative z-10 max-w-2xl mx-auto w-full ${variantId === 16 ? 'px-6 mt-6' : 'pl-14 pr-5 -mt-8'} space-y-6`}>
                    {/* Story card */}
                    <section
                        className={`rounded-2xl shadow-xl p-8 relative ${variantId === 16 ? '' : 'sm:-ml-9'}`}
                        style={{ backgroundColor: theme.cardBg, borderWidth: 1, borderColor: theme.cardBorder }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full border-4 p-1 mb-6 shadow-md overflow-hidden"
                                style={{ borderColor: theme.accentColor + '60' }}>
                                <img alt="Couple" className="w-full h-full object-cover rounded-full" src={data.couple.story.image} />
                            </div>
                            <h2 className="serif-font text-3xl mb-2 italic" style={{ color: theme.textPrimary }}>
                                {data.couple.story.title}
                            </h2>
                            <div className="w-12 h-0.5 mb-6 opacity-40" style={{ backgroundColor: theme.accentColor }} />
                            <p className="text-sm leading-relaxed mb-8 px-2 font-light italic" style={{ color: theme.textSecondary }}>
                                "{data.couple.story.text}"
                            </p>
                        </div>
                        <div className="flex justify-between items-center pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
                            <div className="text-center flex-1">
                                <p className="text-[9px] font-bold uppercase tracking-widest mb-1 italic" style={{ color: theme.textSecondary }}>Met in</p>
                                <p className="serif-font text-xl" style={{ color: theme.accentColor }}>{data.couple.story.metYear}</p>
                            </div>
                            <div className="h-8 w-px" style={{ backgroundColor: theme.cardBorder }} />
                            <div className="text-center flex-1">
                                <p className="text-[9px] font-bold uppercase tracking-widest mb-1 italic" style={{ color: theme.textSecondary }}>Engaged in</p>
                                <p className="serif-font text-xl" style={{ color: theme.accentColor }}>{data.couple.story.engagedYear}</p>
                            </div>
                        </div>
                    </section>

                    {/* Venue Location card */}
                    <section
                        className={`rounded-2xl shadow-xl p-8 relative ${variantId === 16 ? '' : 'sm:-ml-9'}`}
                        style={{ backgroundColor: theme.cardBg, borderWidth: 1, borderColor: theme.cardBorder }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm"
                                style={{ backgroundColor: theme.accentColor + '10' }}>
                                <span className="material-icons" style={{ color: theme.accentColor }}>location_on</span>
                            </div>
                            <h2 className="serif-font text-2xl mb-1 italic" style={{ color: theme.textPrimary }}>
                                {data.wedding.venue.name}
                            </h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-4 italic" style={{ color: theme.textSecondary }}>
                                {data.wedding.venue.location}
                            </p>
                            <div className="w-12 h-0.5 mb-5 opacity-40" style={{ backgroundColor: theme.accentColor }} />
                            <p className="text-sm leading-relaxed mb-8 px-4 font-light italic" style={{ color: theme.textSecondary }}>
                                {data.wedding.venue.address}
                            </p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.wedding.venue.name + " " + data.wedding.venue.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: theme.accentColor,
                                    color: theme.cardBg,
                                    boxShadow: `0 4px 15px ${theme.accentColor}40`
                                }}
                            >
                                Get Directions
                            </a>
                        </div>
                    </section>

                    {/* Attire card */}
                    <section
                        className={`rounded-2xl shadow-xl p-8 relative ${variantId === 16 ? '' : 'sm:-ml-9'}`}
                        style={{ backgroundColor: theme.cardBg, borderWidth: 1, borderColor: theme.cardBorder }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm"
                                style={{ backgroundColor: theme.accentColor + '10' }}>
                                <span className="material-icons" style={{ color: theme.accentColor }}>checkroom</span>
                            </div>
                            <h2 className="serif-font text-2xl mb-1 italic" style={{ color: theme.textPrimary }}>
                                Dress Code
                            </h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-4 italic" style={{ color: theme.textSecondary }}>
                                {data.wedding.attire.title}
                            </p>
                            <div className="w-12 h-0.5 mb-5 opacity-40" style={{ backgroundColor: theme.accentColor }} />
                            <p className="text-sm leading-relaxed px-4 font-light italic" style={{ color: theme.textSecondary }}>
                                {data.wedding.attire.description}
                            </p>
                        </div>
                    </section>

                    {/* Timeline */}
                    <div className={`relative ${variantId === 16 ? 'px-2' : ''}`}>
                        {data.timeline.map((event, index) => (
                            <TimelineItem
                                key={index}
                                time={event.time}
                                title={event.title}
                                icon={event.icon}
                                location={event.location}
                                address={event.address}
                                imageSrc={event.image}
                                isLast={event.isLast}
                                details={event.details}
                                accentColor={theme.accentColor}
                                textPrimary={theme.textPrimary}
                                textSecondary={theme.textSecondary}
                                cardBg={theme.cardBg}
                                cardBorder={theme.cardBorder}
                            />
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <section className={`grid grid-cols-4 gap-2 pt-2 pb-6 ${variantId === 16 ? '' : 'sm:-ml-9'}`}>
                        {[
                            {
                                icon: 'how_to_reg',
                                label: 'RSVP',
                                onClick: () => setIsRSVPOpen(true)
                            },
                            {
                                icon: 'flatware',
                                label: 'Banquet\nMenu',
                                onClick: () => setIsMenuOpen(true)
                            },
                            {
                                icon: 'calendar_today',
                                label: 'Add to\nCalendar',
                                onClick: () => setIsCalendarOpen(true)
                            },
                            {
                                icon: 'card_giftcard',
                                label: 'Wish List',
                                onClick: () => setIsWishlistOpen(true)
                            },
                        ].map(({ icon, label, onClick }) => (
                            <button
                                key={icon}
                                onClick={onClick}
                                className="flex flex-col items-center gap-2 group outline-none"
                            >
                                <div
                                    className="w-14 h-14 rounded-full shadow-md flex items-center justify-center group-active:scale-90 transition-all duration-200"
                                    style={{ backgroundColor: theme.actionBtnBg, border: `1px solid ${theme.actionBtnBorder}` }}
                                >
                                    <span className="material-icons" style={{ color: theme.actionIconColor }}>{icon}</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-center leading-none whitespace-pre-line"
                                    style={{ color: theme.textSecondary }}>
                                    {label}
                                </span>
                            </button>
                        ))}
                    </section>
                </main>
            </div>

            {/* Sticky Footer */}
            <footer
                className="absolute bottom-0 left-0 right-0 backdrop-blur-md border-t px-6 pt-5 pb-8 z-50"
                style={{ backgroundColor: theme.footerBg, borderColor: theme.cardBorder }}
            >
                <div className="max-w-md mx-auto space-y-3">
                    <p className="text-center text-[9px] uppercase tracking-[0.25em] font-bold italic" style={{ color: theme.textSecondary }}>
                        Counting down to our big day
                    </p>
                    <Countdown
                        targetDate={data.wedding.date}
                        accentColor={theme.accentColor}
                        textPrimary={theme.textPrimary}
                        textSecondary={theme.textSecondary}
                    />
                </div>
            </footer>

            <MenuPopup
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                accentColor={theme.accentColor}
                textPrimary={theme.textPrimary}
                textSecondary={theme.textSecondary}
                cardBg={theme.cardBg}
                cardBorder={theme.cardBorder}
            />

            <RSVPPopup
                isOpen={isRSVPOpen}
                onClose={() => setIsRSVPOpen(false)}
                accentColor={theme.accentColor}
                textPrimary={theme.textPrimary}
                textSecondary={theme.textSecondary}
                cardBg={theme.cardBg}
                cardBorder={theme.cardBorder}
            />

            <WishlistPopup
                isOpen={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
                accentColor={theme.accentColor}
                textPrimary={theme.textPrimary}
                textSecondary={theme.textSecondary}
                cardBg={theme.cardBg}
                cardBorder={theme.cardBorder}
            />

            <CalendarPopup
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                accentColor={theme.accentColor}
                textPrimary={theme.textPrimary}
                textSecondary={theme.textSecondary}
                cardBg={theme.cardBg}
                cardBorder={theme.cardBorder}
            />
        </div>
    );
};

export default DashboardVariant;
