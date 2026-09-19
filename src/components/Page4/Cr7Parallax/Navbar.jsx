import React from 'react';

export default function Navbar({ activeIndex, currentNumber }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 pointer-events-none mix-blend-difference">

      <div className="flex items-center gap-2">
        <span className="font-syne font-black text-2xl sm:text-5xl tracking-tight text-white uppercase select-none">
          SIMON
        </span>
      </div>

      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-white/90 uppercase select-none">
        <span>INDEX [{currentNumber || '01'} / 07]</span>
      </div>
    </header>
  );
}
