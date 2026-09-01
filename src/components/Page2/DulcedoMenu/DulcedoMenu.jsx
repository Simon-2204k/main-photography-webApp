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
  const imageRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(null);
  const prevIndexRef = useRef(null);

  const handleMouseEnter = (index) => {
    const prevIndex = prevIndexRef.current;
    setActiveIndex(index);

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

    // 1. Smooth highlight bar tracking
    gsap.to(highlightBar, {
      opacity: 1,
      top: targetTop,
      height: targetHeight,
      duration: 0.32,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    // 2. Luxurious vertical glide for preview container
    const previewHeight = 420;
    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      y: targetCenterY - previewHeight / 2,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    // 3. Buttery-smooth directional clipPath wipe
    if (prevIndex !== index) {
      const isMovingDown = prevIndex === null || index > prevIndex;
      const currentImg = prevIndex !== null ? imageRefs.current[prevIndex] : null;
      const nextImg = imageRefs.current[index];

      if (nextImg) {
        // Keep the current image visible underneath as a solid floor
        if (currentImg) {
          gsap.set(currentImg, { zIndex: 2, clipPath: 'inset(0% 0% 0% 0%)' });
        }

        // Put incoming image on top
        gsap.set(nextImg, { zIndex: 5 });

        // Clean up all other background layers
        imageRefs.current.forEach((img, i) => {
          if (img && i !== index && i !== prevIndex) {
            gsap.set(img, { zIndex: 1 });
          }
        });

        // Directional reveal:
        // Moving down -> unveils from top to bottom
        // Moving up   -> unveils from bottom to top
        const startClip = isMovingDown ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)';

        gsap.killTweensOf(nextImg);
        gsap.fromTo(
          nextImg,
          {
            clipPath: startClip,
            scale: 1.05,
            opacity: 1,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 0.65, // Ultra-smooth silky transition
            ease: 'power3.inOut',
            overwrite: 'auto',
            onComplete: () => {
              // Once fully revealed, nextImg becomes the solid floor
              gsap.set(nextImg, { zIndex: 2 });
              if (currentImg) {
                gsap.set(currentImg, { zIndex: 1, clipPath: 'inset(0% 0% 100% 0%)' });
              }
            },
          }
        );
      }
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
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (highlightBarRef.current) {
      gsap.to(highlightBarRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="relative w-full text-white select-none overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 px-6 sm:px-12 lg:px-20 z-30"
      style={{
        backgroundColor: '#000000',
        isolation: 'isolate',
        minHeight: '150vh',
        height: '150vh',
      }}
    >
      {/* 100% Full-Width Solid White Highlight Bar across the hovered row */}
      <div
        ref={highlightBarRef}
        className="absolute left-0 w-full bg-white pointer-events-none opacity-0 z-10 transition-colors"
        style={{ top: 0, height: 0 }}
      />

      {/* Floating Image Preview Card (All 5 images pre-mounted for 0ms lag) */}
      <div
        ref={previewRef}
        className="absolute top-0 pointer-events-none opacity-0 shadow-2xl overflow-hidden bg-neutral-900 will-change-transform rounded-sm"
        style={{
          transformOrigin: 'center center',
          right: '10%',
          width: '320px',
          height: '420px',
          zIndex: 40,
        }}
      >
        {ITEMS.map((item, idx) => (
          <img
            key={item.id}
            ref={(el) => (imageRefs.current[idx] = el)}
            src={item.image}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: idx === 0 ? 2 : 1,
              clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
              willChange: 'clip-path',
            }}
          />
        ))}
      </div>

      {/* Top Spacer for balanced vertical layout */}
      <div className="w-full flex-shrink-0" />

      {/* Main 5-Option Stacked Typography List */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto">
        {ITEMS.map((item, idx) => {
          const isHovered = activeIndex === idx;

          return (
            <div
              key={item.id}
              ref={(el) => (rowRefs.current[idx] = el)}
              onMouseEnter={() => handleMouseEnter(idx)}
              style={{ padding: '4px 0' }}
              className="relative w-full flex items-center justify-center cursor-pointer group"
            >
              <h2
                style={{ fontSize: '7vw', lineHeight: 1.1 }}
                className={`font-sans font-black tracking-[-0.04em] uppercase text-center transition-colors duration-150 ${isHovered ? 'text-black' : 'text-white'
                  }`}
              >
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Centered Bottom Bio Block */}
      <div
        style={{ fontSize: '13px', marginBottom: '2.5rem' }}
        className="relative z-20 w-full max-w-3xl mx-auto text-center font-sans tracking-normal leading-relaxed text-neutral-400 space-y-1"
      >
        <p>
          Lumen Archive® operates at the intersection of optical physics and documentary visuals, producing ultra-high resolution mono prints.
        </p>
      </div>
    </section>
  );
});

export default DulcedoMenu;
