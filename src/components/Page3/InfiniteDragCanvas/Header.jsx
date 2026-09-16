import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';

export const Header = ({ isExpanded, onToggleExpand }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (!iconRef.current) return;

    gsap.to(iconRef.current, {
      rotation: isExpanded ? 45 : 0,
      duration: 0.5,
      ease: 'power4.out',
      overwrite: 'auto'
    });
  }, [isExpanded]);

  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex items-center justify-center w-12 h-12 rounded-none bg-black/50 text-white shadow-2xl backdrop-blur-md border border-white/20 cursor-pointer transition-colors hover:bg-black/80"
          title={isExpanded ? "Close Gallery" : "Spread Gallery"}
        >
          <div ref={iconRef} className="flex items-center justify-center will-change-transform">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
    </header>
  );
};
