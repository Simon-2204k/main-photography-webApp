import React, { useState, useRef, memo } from 'react';
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

    const targetTop = rowRect.top - containerRect.top;
    const targetHeight = rowRect.height;
    const targetCenterY = targetTop + targetHeight / 2;

    // 1. Animate full-width black highlight bar across the active row
    gsap.to(highlightBar, {
      opacity: 1,
      top: targetTop,
      height: targetHeight,
      duration: 0.3,
      ease: 'power3.out',
    });

    // 2. Animate preview image position vertically centered to hovered row
    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      y: targetCenterY - 170, // Centered vertically relative to the row
      duration: 0.4,
      ease: 'power3.out',
    });

    // 3. Directional ClipPath wipe reveal
    if (incomingImgRef.current && currentImgRef.current) {
      const isMovingDown = prevIndex === null || index >= prevIndex;
      const newSrc = ITEMS[index].image;

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
          duration: 0.45,
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
        scale: 0.96,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (highlightBarRef.current) {
      gsap.to(highlightBarRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-screen text-black select-none overflow-hidden flex flex-col justify-between py-10 sm:py-12 px-6 sm:px-12 lg:px-16 z-30"
      style={{
        backgroundColor: '#f4f4f4',
        isolation: 'isolate',
      }}
    >
      {/* 100% Full-Width Solid Black Highlight Bar across the hovered row */}
      <div
        ref={highlightBarRef}
        className="absolute left-0 w-full bg-black pointer-events-none opacity-0 z-10 transition-colors"
        style={{ top: 0, height: 0 }}
      />

      {/* Floating Image Preview Card (Positioned on the Right Side overlapping text like dulcedo.com) */}
      <div
        ref={previewRef}
        className="absolute right-[5%] sm:right-[8%] lg:right-[12%] w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px] aspect-[4/5] z-20 pointer-events-none opacity-0 shadow-2xl overflow-hidden bg-neutral-200 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Current Image */}
        <img
          ref={currentImgRef}
          src={ITEMS[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Incoming Image for ClipPath Wipe */}
        <img
          ref={incomingImgRef}
          src={ITEMS[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>

      {/* Spacer Top */}
      <div className="w-full flex-shrink-0" />

      {/* Main 5-Option Stacked Typography List (Tight, Massive Grotesque, exactly like dulcedo.com) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center my-auto">
        {ITEMS.map((item, idx) => {
          const isHovered = activeIndex === idx;

          return (
            <div
              key={item.id}
              ref={(el) => (rowRefs.current[idx] = el)}
              onMouseEnter={() => handleMouseEnter(idx)}
              className="relative w-full flex items-center justify-center py-0 my-0 cursor-pointer group"
            >
              <h2
                className={`font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.8vw] xl:text-[8.5vw] tracking-[-0.04em] uppercase leading-[0.88] text-center transition-colors duration-150 ${
                  isHovered ? 'text-white' : 'text-black'
                }`}
              >
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Centered Bottom Bio Block */}
      <div className="relative z-20 w-full max-w-4xl mx-auto text-center font-sans text-xs sm:text-sm tracking-wider uppercase leading-relaxed text-neutral-800 space-y-2 pb-2">
        <p className="font-semibold text-neutral-900">
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
