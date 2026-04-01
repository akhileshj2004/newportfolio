import React from 'react';
import MarqueeModule from 'react-fast-marquee';
import { Newspaper } from 'lucide-react';

const Marquee = (MarqueeModule && typeof MarqueeModule !== 'function' && MarqueeModule.default) ? MarqueeModule.default : MarqueeModule;

const newsItems = [
  "New Publication: A Holistic Approach to Diabetes Management (SMARTCOM 2026 / Springer LNNS)",
  "Research Update: RBI Compliance Assistant to be published in IJCACI 2025 / Springer LNNS",
  "Recently Published: Classification of Watermelons based on Ripeness (ITAI 2025)",
  "IEEE Xplore: Exploratory Data Analytics of COVID-19 Vaccination Drive in India (10847026)",
];

const NewsTicker = () => {
  return (
    <div className="relative z-20 w-full bg-cyber-lime/10 border-b border-cyber-lime/30 py-2 backdrop-blur-md">
      <Marquee speed={50} gradient={false} className="overflow-hidden">
        {newsItems.map((news, index) => (
          <span key={index} className="flex items-center text-cyber-lime text-sm font-mono mx-8">
            <Newspaper size={14} className="mr-2" />
            <span className="opacity-90">{news}</span>
            <span className="mx-8 opacity-50">///</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default NewsTicker;
