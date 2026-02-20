
import React, { useEffect, useState } from 'react';
import { data } from '../data';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);

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
    <div className="relative h-full w-full bg-[#fdfbf7] dark:bg-background-dark flex flex-col items-center justify-between py-16 px-8">
      {/* Decorative Top */}
      <div className="w-full flex justify-center opacity-40">
        <img
          alt="Floral decoration"
          className="w-32 h-32 object-contain grayscale opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrgyfzECgi-yVOOEwCNDFI_2Q86Q38j_I_kF6y_568uwGJBrF9Np0ci_ZL4LMW2GtWDWHk7Jn8MwH-UDnlvHVHUOqK8XwS5yrx0z58-LBAUXatVPdKf_rbQhD73BqdhhkXxqfdNW4ld--QX2rzMzjnWMDt_9lHUoljWhav2dPzAc8wudbYkjlnVezaKQJ-fezs5fKpLYckuX1SOxyX0VlFKkHSVGz_NgX3PuaTgOEOt80y_uK78vYLXhEm7pJUJaq6KNGK72PzSIyd"
        />
      </div>

      <div className="flex flex-col items-center gap-12 w-full">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-40 h-40 bg-wedding-gold/10 rounded-full blur-2xl animate-subtle-pulse"></div>
          <div className="relative z-10 animate-float">
            <div className="w-24 h-24 border-2 border-wedding-gold/30 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-wedding-gold rounded-full shadow-lg flex items-center justify-center bg-white dark:bg-slate-800">
                <span className="material-icons text-wedding-gold text-4xl">favorite</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-2 border-wedding-gold/40 rounded-full bg-[#fdfbf7] dark:bg-background-dark shadow-sm"></div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="serif-font text-3xl italic text-wedding-charcoal dark:text-white leading-tight">
            Preparing our <br />special day...
          </h1>
          <p className="text-wedding-charcoal/60 dark:text-gray-400 text-xs tracking-widest uppercase font-bold">
            Please Wait
          </p>
        </div>
      </div>

      <div className="w-full space-y-10 flex flex-col items-center pb-8">
        <div className="w-48 h-[3px] bg-wedding-gold/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-wedding-gold transition-all duration-75"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-center">
          <p className="serif-font text-2xl text-wedding-gold tracking-widest">{data.couple.initials}</p>
          <div className="w-8 h-[1px] bg-wedding-gold/30 mx-auto mt-2"></div>
          <p className="text-[10px] text-wedding-charcoal/40 dark:text-gray-500 mt-3 tracking-[0.2em] uppercase font-bold">
            {data.wedding.dateString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
