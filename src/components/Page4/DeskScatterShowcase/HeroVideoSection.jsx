import React from 'react';

export default function HeroVideoSection() {
  return (
    <section className="relative w-full h-screen bg-[#000000] select-none flex items-center justify-center">
      {/* Simple Plain Text (No animations, no scroll triggers, full height & width) */}
      <div className="text-white text-2xl sm:text-4xl md:text-5xl font-mono font-light tracking-widest uppercase text-center px-4">
        SCROLL DUDE
      </div>
    </section>
  );
}
