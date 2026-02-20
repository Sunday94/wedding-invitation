
import React from 'react';

interface WelcomeScreenProps {
  onOpen: () => void;
}

import { data } from '../data';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-between py-16 px-8 text-center overflow-hidden">
      {/* Full-Bleed Background */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Wedding couple"
          className="w-full h-full object-cover"
          src={data.wedding.welcomeImage}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
        {/* Header Text */}
        <div className="pt-12">
          <p className="text-white uppercase tracking-[0.3em] text-[11px] font-bold mb-10 opacity-90">Together with their families</p>

          <div className="flex flex-col items-center mt-4">
            <h1 className="script-font text-white text-[5.5rem] leading-[0.8] drop-shadow-lg">{data.couple.fullNames.partner1}</h1>
            <span className="script-font text-white text-3xl my-4 italic opacity-80">&</span>
            <h1 className="script-font text-white text-[5.5rem] leading-[0.8] drop-shadow-lg">{data.couple.fullNames.partner2}</h1>
          </div>
        </div>

        {/* Date and Location */}
        <div className="w-full space-y-8 flex flex-col items-center">
          <div className="w-full max-w-[320px]">
            <div className="border-t border-b border-white/40 py-3 mb-6">
              <p className="text-white font-medium tracking-[0.15em] text-sm uppercase">{data.wedding.dateString}</p>
            </div>

            <div className="space-y-1">
              <p className="text-white text-lg font-bold tracking-widest uppercase">{data.wedding.venue.name}</p>
              <p className="text-white/80 text-xs uppercase tracking-widest font-medium">{data.wedding.venue.location}</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full max-w-[280px]">
            <button
              onClick={onOpen}
              className="w-full bg-white text-primary font-bold py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group mb-8"
            >
              <span className="uppercase tracking-[0.2em] text-[12px] pl-4">Open Invitation</span>
              <span className="material-icons text-lg group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>

            {/* Bottom Decoration */}
            <div className="flex justify-center items-center space-x-4">
              <div className="h-[0.5px] w-12 bg-white/40"></div>
              <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">Formal Attire</p>
              <div className="h-[0.5px] w-12 bg-white/40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
