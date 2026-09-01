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
      duration: 0.25,
      ease: 'power3.out',
    });

    // 2. Animate preview image position vertically centered to hovered row
    const previewHeight = preview.offsetHeight || 360;
    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      y: targetCenterY - previewHeight / 2,
      duration: 0.45,
      ease: 'power3.out',
    });

    // 3. Directional ClipPath polygon wipe reveal (power4.inOut)
    if (incomingImgRef.current && currentImgRef.current) {
      const isMovingDown = prevIndex === null || index >= prevIndex;
      const newSrc = ITEMS[index].image;

      incomingImgRef.current.src = newSrc;

      const startClip = isMovingDown
        ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
      const endClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

      gsap.killTweensOf(incomingImgRef.current);
      gsap.fromTo(
        incomingImgRef.current,
        { clipPath: startClip },
        {
          clipPath: endClip,
          duration: 0.5,
          ease: 'power4.inOut',
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
      className="relative w-full h-screen min-h-screen text-black select-none overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 px-6 sm:px-12 lg:px-20 z-30"
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

      {/* Floating Image Preview Card (Anchored at top-0, right side, elevated at z-30) */}
      <div
        ref={previewRef}
        className="absolute top-0 right-[6%] sm:right-[10%] lg:right-[14%] w-[200px] sm:w-[260px] md:w-[310px] aspect-[3/4] z-30 pointer-events-none opacity-0 shadow-2xl overflow-hidden bg-neutral-200 will-change-transform rounded-sm"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Base / Current Image */}
        <img
          ref={currentImgRef}
          src={ITEMS[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Incoming Image for Directional ClipPath Wipe */}
        <img
          ref={incomingImgRef}
          src={ITEMS[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>

      {/* Top Spacer for balanced vertical layout */}
      <div className="w-full flex-shrink-0" />

      {/* Main 5-Option Stacked Typography List (Balanced Size, No Top Clipping) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto">
        {ITEMS.map((item, idx) => {
          const isHovered = activeIndex === idx;

          return (
            <div
              key={item.id}
              ref={(el) => (rowRefs.current[idx] = el)}
              onMouseEnter={() => handleMouseEnter(idx)}
              className="relative w-full flex items-center justify-center py-0.5 sm:py-1 cursor-pointer group"
            >
              <h2
                className={`font-sans font-black text-6xl sm:text-6xl md:text-7xl lg:text-[5.6vw] xl:text-[6.2vw] tracking-[-0.04em] uppercase leading-[0.9] text-center transition-colors duration-150 ${isHovered ? 'text-white' : 'text-black'
                  }`}
              >
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Centered Bottom Bio Block in Normal Sentence Case & Small Font */}
      <div className="relative z-20 w-full max-w-2xl mx-auto text-center font-sans text-[11px] sm:text-xs tracking-normal leading-relaxed text-neutral-600 pb-2 space-y-1">
        <p>
          Lumen Archive® operates at the intersection of optical physics and documentary visuals, producing ultra-high resolution mono prints.
          Sub-Atmospheric® is a visual practice focusing on low-light perspectives, unretouched emulsion archives, and spatial composition.
        </p>

      </div>
    </section>
  );
});

export default DulcedoMenu;
