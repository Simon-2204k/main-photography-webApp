import React from 'react';

/**
 * StampCard - Pure Vintage Postage Stamp with HTML Typography & Clean Image Frame
 */
export const StampCard = ({ stamp, onClick, className = '' }) => {
  const { styleType, country, price, bgTint, thumbSrc, src, filename } = stamp;
  const imageSrc = thumbSrc || src;

  return (
    <div
      onClick={onClick}
      className={`stamp-card-frame relative select-none ${className}`}
    >
      {/* Stamp Outer Card Container with Scalloped Edge Mask */}
      <div 
        className="stamp-border-scalloped w-full h-full p-2 sm:p-3 pb-2.5 sm:pb-3.5 relative flex flex-col justify-between"
        style={{ backgroundColor: bgTint || '#f7f4ec' }}
      >
        {/* Inner Framing Border Line */}
        <div className="absolute inset-1.5 sm:inset-2 border border-stone-800/20 pointer-events-none z-10" />

        {/* --- STYLE 1: Top HTML Text Header (POLSKA 1.50) --- */}
        {styleType === 1 && (
          <div className="flex justify-between items-baseline px-1.5 sm:px-2 pt-0.5 sm:pt-1 pb-1 sm:pb-1.5 z-20">
            <h3 className="font-cinzel text-xs sm:text-lg font-extrabold tracking-widest text-stone-900 uppercase leading-none antialiased">
              {country}
            </h3>
            <span className="font-courier text-xs sm:text-base font-black text-stone-900 leading-none antialiased">
              {price}
            </span>
          </div>
        )}

        {/* --- STYLE 3: Top Country Header (DEUTSCHLAND) --- */}
        {styleType === 3 && (
          <div className="text-center px-1 pt-0.5 sm:pt-1 pb-0.5 sm:pb-1 z-20">
            <h3 className="font-cinzel text-xs sm:text-base font-extrabold tracking-[0.2em] text-stone-900 uppercase leading-none antialiased">
              {country}
            </h3>
          </div>
        )}

        {/* Clean Crisp Image Container */}
        <div className="relative flex-1 w-full my-0.5 overflow-hidden border border-stone-800/30 bg-stone-900 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={filename}
            draggable={false}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* --- STYLE 2: Bottom HTML Text Footer (GREAT BRITAIN 1.50) --- */}
        {styleType === 2 && (
          <div className="flex justify-between items-end px-1.5 sm:px-2 pt-0.5 sm:pt-1 z-20">
            <h3 className="font-cinzel text-[10px] sm:text-xs font-extrabold tracking-widest text-stone-900 uppercase leading-none antialiased">
              {country}
            </h3>
            <span className="font-courier text-xs sm:text-base font-black text-stone-900 leading-none antialiased">
              {price}
            </span>
          </div>
        )}

        {/* --- STYLE 3: Bottom-Right HTML Text Price (0,95) --- */}
        {styleType === 3 && (
          <div className="flex justify-end px-1.5 sm:px-2 pt-0.5 z-20">
            <span className="font-courier text-xs sm:text-base font-black text-stone-900 leading-none antialiased">
              {price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
