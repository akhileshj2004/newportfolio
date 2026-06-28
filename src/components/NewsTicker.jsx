import React from 'react';
import MarqueeModule from 'react-fast-marquee';
import { Newspaper } from 'lucide-react';

const Marquee = (MarqueeModule && typeof MarqueeModule !== 'function' && MarqueeModule.default) ? MarqueeModule.default : MarqueeModule;

const newsItems = [
  "Project Update: Federated Multi-Agent RAG System optimized for GTX 1650 (4GB VRAM)",
  "Project Update: Graph-Based Route Planner System with A* and Prim's Algorithm",
  "Project Update: Packet Vision - ML-powered DDoS detection system deployed live",
  "Project Update: Interactive 3D Portfolio built with React, Framer Motion, and Tailwind CSS",
];

const NewsTicker = () => {
  return (
    <div className="relative z-20 w-full bg-cyber-lime/10 border-b border-cyber-lime/30 py-2 backdrop-blur-md scanline">
      <Marquee speed={50} gradient={false} className="overflow-hidden">
        {newsItems.map((news, index) => (
          <span key={index} className="flex items-center text-cyber-lime text-sm font-mono mx-8 drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
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
