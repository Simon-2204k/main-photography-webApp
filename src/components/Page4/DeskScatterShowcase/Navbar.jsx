import React from 'react';

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between pointer-events-auto">
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-[0_2px_8px_rgba(255,87,34,0.6)]">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#FF5722" />
            <polygon points="50,5 95,25 50,50 5,25" fill="#FF8A65" opacity="0.9" />
            <polygon points="50,50 95,25 95,75 50,95" fill="#E64A19" opacity="0.95" />
            <polygon points="5,25 50,50 50,95 5,75" fill="#D84315" opacity="0.85" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-white/95 font-sans drop-shadow-md">
          Poly
        </span>
      </a>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        <button className="text-sm font-medium text-stone-300 hover:text-white transition-colors duration-200 drop-shadow">
          Login
        </button>
        <button className="relative group overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF5722] to-[#FF7043] text-white text-sm font-semibold shadow-lg shadow-[#FF5722]/30 hover:shadow-[#FF5722]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
          <span className="relative z-10">Join waitlist</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </header>
  );
}
