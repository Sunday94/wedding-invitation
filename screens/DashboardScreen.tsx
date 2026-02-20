
import React from 'react';
import TimelineItem from '../components/TimelineItem';
import Countdown from '../components/Countdown';
import { data } from '../data';

const DashboardScreen: React.FC = () => {
  return (
    <div className="relative h-full w-full flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32">
      {/* Top Venue Hero */}
      <div className="relative h-72 w-full overflow-hidden shrink-0 shadow-lg">
        <img
          alt="Venue"
          className="w-full h-full object-cover"
          src={data.wedding.venue.image}
        />
        {/* Updated overlay for better centered text legibility */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Centered text container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
          <h1 className="serif-font italic text-4xl mb-2 drop-shadow-lg">{data.couple.names}</h1>
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-90 font-bold drop-shadow-md">{data.wedding.dateString}</p>
        </div>
      </div>

      {/* Main Content Scrollable Area */}
      <main className="relative z-10 pl-14 pr-5 -mt-8 space-y-6">
        {/* Story Card */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-wedding-gold/10 p-8 relative -ml-9 mr-0">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-4 border-champagne p-1 mb-6 shadow-md overflow-hidden">
              <img
                alt="Couple"
                className="w-full h-full object-cover rounded-full"
                src={data.couple.story.image}
              />
            </div>
            <h2 className="serif-font text-3xl text-slate-900 dark:text-white mb-2 italic">{data.couple.story.title}</h2>
            <div className="w-12 h-0.5 bg-wedding-gold mb-6 opacity-40"></div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 px-2 font-light italic">
              "{data.couple.story.text}"
            </p>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center flex-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 italic">Met in</p>
              <p className="serif-font text-xl text-wedding-gold">{data.couple.story.metYear}</p>
            </div>
            <div className="h-8 w-px bg-slate-100 dark:bg-slate-800"></div>
            <div className="text-center flex-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 italic">Engaged in</p>
              <p className="serif-font text-xl text-wedding-gold">{data.couple.story.engagedYear}</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <div className="relative">
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
            />
          ))}

        </div>

        {/* Quick Actions Section - Reduced bottom padding to tighten the gap */}
        <section className="grid grid-cols-4 gap-2 pt-2 pb-6 -ml-9 mr-0">
          <button className="flex flex-col items-center gap-2 group outline-none">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-md border border-wedding-gold/20 flex items-center justify-center group-active:scale-90 transition-all duration-200">
              <span className="material-icons text-wedding-gold">how_to_reg</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">RSVP</span>
          </button>

          <button className="flex flex-col items-center gap-2 group outline-none">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-md border border-wedding-gold/20 flex items-center justify-center group-active:scale-90 transition-all duration-200">
              <span className="material-icons text-wedding-gold">flatware</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter text-center leading-none">Food<br />Allergy</span>
          </button>

          <button className="flex flex-col items-center gap-2 group outline-none">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-md border border-wedding-gold/20 flex items-center justify-center group-active:scale-90 transition-all duration-200">
              <span className="material-icons text-wedding-gold">calendar_today</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter text-center leading-none">Add to<br />Calendar</span>
          </button>

          <button className="flex flex-col items-center gap-2 group outline-none">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-md border border-wedding-gold/20 flex items-center justify-center group-active:scale-90 transition-all duration-200">
              <span className="material-icons text-wedding-gold">card_giftcard</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Wish List</span>
          </button>
        </section>
      </main>

      {/* Sticky Footer Countdown - Adjusted padding for a tighter fit */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 pt-5 pb-8 z-50">
        <div className="max-w-md mx-auto space-y-3">
          <p className="text-center text-[9px] uppercase tracking-[0.25em] text-slate-400 font-bold italic">
            Counting down to our big day
          </p>
          <Countdown targetDate={data.wedding.date} />
        </div>
      </footer>
    </div>
  );
};

export default DashboardScreen;
