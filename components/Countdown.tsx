
import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';

interface CountdownProps {
  targetDate: string;
  accentColor: string;
  textPrimary: string;
  textSecondary: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, accentColor, textPrimary, textSecondary }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-around items-center w-full">
      <div className="text-center">
        <span className="block text-2xl serif-font font-bold" style={{ color: textPrimary }}>{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase font-medium" style={{ color: textSecondary }}>Days</span>
      </div>
      <span className="serif-font text-xl opacity-50 mb-4" style={{ color: accentColor }}>:</span>
      <div className="text-center">
        <span className="block text-2xl serif-font font-bold" style={{ color: textPrimary }}>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase font-medium" style={{ color: textSecondary }}>Hours</span>
      </div>
      <span className="serif-font text-xl opacity-50 mb-4" style={{ color: accentColor }}>:</span>
      <div className="text-center">
        <span className="block text-2xl serif-font font-bold" style={{ color: textPrimary }}>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase font-medium" style={{ color: textSecondary }}>Mins</span>
      </div>
      <span className="serif-font text-xl opacity-50 mb-4" style={{ color: accentColor }}>:</span>
      <div className="text-center">
        <span className="block text-2xl serif-font font-bold" style={{ color: textPrimary }}>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase font-medium" style={{ color: textSecondary }}>Secs</span>
      </div>
    </div>
  );
};

export default Countdown;
