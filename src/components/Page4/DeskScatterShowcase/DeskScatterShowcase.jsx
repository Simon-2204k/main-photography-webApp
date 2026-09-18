import React from 'react';
import DeskScatterSection from './DeskScatterSection';

export default function DeskScatterShowcase() {
  return (
    <div id="specsheet-section-5" className="relative min-h-screen bg-black text-stone-100 selection:bg-white selection:text-black">
      <main className="w-full bg-black">
        {/* Unified Desk Scatter Master Storyline */}
        <div id="section-desk" className="relative bg-black">
          <DeskScatterSection />
        </div>
      </main>
    </div>
  );
}
