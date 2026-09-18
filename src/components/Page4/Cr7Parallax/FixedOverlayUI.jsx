import React from 'react';

export default function FixedOverlayUI({ currentProject }) {
  return (
    <>
      {/* Bottom Left Navigation Menu */}
      <nav aria-label="Main Navigation" className="fixed bottom-8 left-8 z-40 flex flex-col items-start gap-1 font-syne text-xs font-bold uppercase tracking-wider text-white mix-blend-difference pointer-events-auto">
        <a 
          href="#works" 
          className="flex items-center gap-2 group text-white hover:text-blue-400 transition-colors"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform"></span>
          WORKS
        </a>
        <a 
          href="#about" 
          className="pl-3.5 text-white/70 hover:text-white transition-colors"
        >
          ABOUT
        </a>
        <a 
          href="#contact" 
          className="pl-3.5 text-white/70 hover:text-white transition-colors"
        >
          CONTACT
        </a>
      </nav>

      {/* Bottom Right Floating Badge: Blue Dot + KEEP SCROLLING / DISCOVER Badge */}
      <div className="fixed bottom-8 right-8 z-40 flex items-center gap-3 pointer-events-auto">
        {/* Pulsing Vibrant Blue Circle Dot */}
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
        </div>

        {/* Action Button Badge */}
        <a
          href={currentProject?.link || "#"}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-syne font-extrabold text-[11px] uppercase tracking-widest transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30 flex items-center gap-1.5 group"
        >
          <span>{currentProject?.title ? 'DISCOVER' : 'KEEP SCROLLING'}</span>
          <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </>
  );
}
