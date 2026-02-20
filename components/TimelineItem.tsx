
import React from 'react';

interface TimelineItemProps {
  time: string;
  title: string;
  icon: string;
  location: string;
  address: string;
  details?: { label: string; value: string; subValue?: string; icon: string }[];
  imageSrc?: string;
  isLast?: boolean;
  accentColor: string;
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  cardBorder: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  time, title, icon, location, address, details, imageSrc, isLast,
  accentColor, textPrimary, textSecondary, cardBg, cardBorder
}) => {
  return (
    <div className="relative pl-8 mb-10 last:mb-0">
      {/* Vertical line connector */}
      {!isLast && <div className="absolute left-[12px] top-6 bottom-[-40px] w-[1px]" style={{ backgroundColor: accentColor + '33' }}></div>}

      {/* Dot */}
      <div className="absolute left-[8px] top-2.5 w-[9px] h-[9px] rounded-full z-10 shadow-sm" style={{ backgroundColor: accentColor }}></div>

      {/* Time label */}
      <div className="absolute -left-12 top-0.5 w-12 text-right pr-4">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-tighter whitespace-pre-wrap block" style={{ color: accentColor }}>
          {time.replace(' ', '\n')}
        </span>
      </div>

      <section className="rounded-xl shadow-sm border overflow-hidden" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-icons text-xl" style={{ color: accentColor }}>{icon}</span>
            <h2 className="serif-font text-xl" style={{ color: textPrimary }}>{title}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider mb-1" style={{ color: textSecondary, opacity: 0.7 }}>Location</p>
              <p className="text-base font-semibold" style={{ color: textPrimary }}>{location}</p>
              <p className="text-sm" style={{ color: textSecondary }}>{address}</p>
            </div>

            {imageSrc && (
              <div className="w-full h-40 rounded-lg overflow-hidden border relative group cursor-pointer" style={{ borderColor: cardBorder }}>
                <img alt="Map" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" src={imageSrc} />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-full shadow-md border flex items-center gap-2"
                    style={{ backgroundColor: cardBg + 'f0', borderColor: cardBorder }}>
                    <span className="material-icons text-sm" style={{ color: accentColor }}>location_pin</span>
                    <span className="text-[10px] font-bold tracking-tight" style={{ color: textPrimary }}>OPEN MAPS</span>
                  </div>
                </div>
              </div>
            )}

            {details && details.map((detail, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor + '15' }}>
                  <span className="material-icons text-lg" style={{ color: accentColor }}>{detail.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: textSecondary, opacity: 0.7 }}>{detail.label}</p>
                  <p className="text-sm font-semibold" style={{ color: textPrimary }}>{detail.value}</p>
                  {detail.subValue && <p className="text-xs" style={{ color: textSecondary }}>{detail.subValue}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimelineItem;
