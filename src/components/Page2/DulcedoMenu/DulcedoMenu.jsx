import React, { useState, useRef, useEffect, memo } from 'react';
import gsap from 'gsap';

const ITEMS = [
  {
    id: 1,
    title: 'CHRONICLE (+)',
    image: '/images/section1/pexels-ekam-juneja-61080223-32379941.webp',
  },
  {
    id: 2,
    title: 'OBSERVATIONAL',
    image: '/images/section1/pexels-elina-araja-1743227-3343318.webp',
  },
  {
    id: 3,
    title: 'ENVIRONMENTAL',
    image: '/images/section1/pexels-fidan-nazim-qizi-134456769-12414434.webp',
  },
  {
    id: 4,
    title: 'ISOLATION',
    image: '/images/section1/pexels-ilham-munawar-wijaksana-312593206-13568050.webp',
  },
  {
    id: 5,
    title: 'PERSPECTIVE',
    image: '/images/section1/pexels-sevil-yeva-1175061542-29209493.webp',
  },
];

export const DulcedoMenu = memo(() => {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);
  const previewRef = useRef(null);
  const highlightBarRef = useRef(null);
  const currentImgRef = useRef(null);
  const incomingImgRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const prevIndexRef = useRef(null);

  // Initialize and handle transitions
  const handleMouseEnter = (index) => {
    setActiveIndex(index);

    const prevIndex = prevIndexRef.current;
    const targetRow = rowRefs.current[index];
    const container = containerRef.current;
    const preview = previewRef.current;
    const highlightBar = highlightBarRef.current;

    if (!targetRow || !container || !preview || !highlightBar) return;

    const rowRect = targetRow.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const targetY = rowRect.top - containerRect.top + rowRect.height / 2;

    // 1. Animate black highlight bar across the hovered row
    gsap.to(highlightBar, {
      opacity: 1,
      top: rowRect.top - containerRect.top,
      height: rowRect.height,
      duration: 0.35,
      ease: 'power3.out',
    });

    // 2. Animate preview container Y position centered to hovered row
    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      y: targetY - 180, // Offset so it centers nicely on the row
      duration: 0.45,
      ease: 'power3.out',
    });

    // 3. ClipPath wipe animation for the incoming image
    if (incomingImgRef.current && currentImgRef.current) {
      const isMovingDown = prevIndex === null || index >= prevIndex;
      const newSrc = ITEMS[index].image;

      // Set incoming image source
      incomingImgRef.current.src = newSrc;

      const startClip = isMovingDown
        ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
      const endClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

      gsap.fromTo(
        incomingImgRef.current,
        { clipPath: startClip },
        {
          clipPath: endClip,
          duration: 0.55,
          ease: 'power3.inOut',
          onComplete: () => {
            if (currentImgRef.current) {
              currentImgRef.current.src = newSrc;
            }
          },
        }
      );
    }

    prevIndexRef.current = index;
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    prevIndexRef.current = null;

    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    if (highlightBarRef.current) {
      gsap.to(highlightBarRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-white text-black py-28 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Dynamic Black Highlight Bar that tracks the active row */}
      <div
        ref={highlightBarRef}
        className="absolute left-0 w-full bg-black pointer-events-none opacity-0 z-10 transition-colors"
        style={{ top: 0, height: 0 }}
      />

      {/* Floating Image Preview Card with Directional ClipPath */}
      <div
        ref={previewRef}
        className="absolute right-[8%] sm:right-[12%] lg:right-[15%] w-[220px] sm:w-[280px] md:w-[330px] aspect-[3/4] z-20 pointer-events-none opacity-0 shadow-2xl overflow-hidden bg-neutral-100 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Base / Current Image */}
        <img
          ref={currentImgRef}
          src={ITEMS[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Incoming Image for ClipPath Wipe Reveal */}
        <img
          ref={incomingImgRef}
          src={ITEMS[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>

      {/* Main 5-Option Stacked Typography List */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto">
        {ITEMS.map((item, idx) => {
          const isHovered = activeIndex === idx;

          return (
            <div
              key={item.id}
              ref={(el) => (rowRefs.current[idx] = el)}
              onMouseEnter={() => handleMouseEnter(idx)}
              className="relative w-full flex items-center justify-center py-2 sm:py-3 cursor-pointer group"
            >
              <h2
                className={`font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-[95px] xl:text-[110px] tracking-tighter uppercase leading-[0.92] text-center transition-colors duration-200 ${
                  isHovered ? 'text-white' : 'text-black'
                }`}
              >
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Bottom Bio Block (Exact User Copy) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto pt-16 sm:pt-20 text-center font-mono text-xs sm:text-sm tracking-wider uppercase leading-relaxed text-neutral-800 space-y-4">
        <p className="font-semibold">
          LUMEN ARCHIVE® OPERATES AT THE INTERSECTION OF OPTICAL PHYSICS AND DOCUMENTARY VISUALS, PRODUCING ULTRA-HIGH RESOLUTION MONO PRINTS.
        </p>
        <p className="font-semibold text-neutral-600">
          SUB-ATMOSPHERIC® IS A VISUAL PRACTICE FOCUSING ON LOW-LIGHT PERSPECTIVES, UNRETOUCHED EMULSION ARCHIVES, AND SPATIAL COMPOSITION.
        </p>
      </div>
    </section>
  );
});

export default DulcedoMenu;
