import React, { useState, useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import './DulcedoMenu.css';

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
  const mobileImageRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      const isMob = window.innerWidth <= 1024;
      setIsMobileOrTablet(isMob);
      if (!isMob) {
        setActiveIndex(null);
        prevIndexRef.current = null;
      }
    };
    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
      setActiveIndex(null);
      prevIndexRef.current = null;
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (index) => {
    const prevIndex = prevIndexRef.current;
    setActiveIndex(index);

    const targetRow = rowRefs.current[index];
    const container = containerRef.current;
    const preview = previewRef.current;
    const highlightBar = highlightBarRef.current;

    if (!targetRow || !container || !highlightBar) return;

    const rowRect = targetRow.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const targetTop = rowRect.top - containerRect.top;
    const targetHeight = rowRect.height;
    const targetCenterY = targetTop + targetHeight / 2;

    // 1. Smooth highlight bar tracking (Desktop only)
    if (!isMobileOrTablet) {
      gsap.to(highlightBar, {
        opacity: 1,
        top: targetTop,
        height: targetHeight,
        duration: 0.32,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    // 2. Luxurious vertical glide for desktop preview container
    if (preview) {
      const previewHeight = 420;
      gsap.to(preview, {
        opacity: 1,
        scale: 1,
        y: targetCenterY - previewHeight / 2,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    // 3. Buttery-smooth directional clipPath wipe for desktop & mobile decks
    if (prevIndex !== index) {
      const isMovingDown = prevIndex === null || index > prevIndex;

      const triggerWipe = (refs) => {
        if (!refs.current) return;
        const currentImg = prevIndex !== null ? refs.current[prevIndex] : null;
        const nextImg = refs.current[index];

        if (nextImg) {
          if (currentImg) {
            gsap.set(currentImg, { zIndex: 2, clipPath: 'inset(0% 0% 0% 0%)' });
          }
          gsap.set(nextImg, { zIndex: 5 });

          refs.current.forEach((img, i) => {
            if (img && i !== index && i !== prevIndex) {
              gsap.set(img, { zIndex: 1 });
            }
          });

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
              duration: 0.55,
              ease: 'power3.inOut',
              overwrite: 'auto',
              onComplete: () => {
                gsap.set(nextImg, { zIndex: 2 });
                if (currentImg) {
                  gsap.set(currentImg, { zIndex: 1, clipPath: 'inset(0% 0% 100% 0%)' });
                }
              },
            }
          );
        }
      };

      triggerWipe(imageRefs);
      triggerWipe(mobileImageRefs);
    }

    prevIndexRef.current = index;
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) return;
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
      className={`relative w-full text-white select-none overflow-hidden flex flex-col ${
        isMobileOrTablet ? 'justify-center items-center' : 'justify-between'
      } px-4 sm:px-12 lg:px-20 z-30`}
      style={{
        backgroundColor: '#000000',
        isolation: 'isolate',
        minHeight: isMobileOrTablet ? '100vh' : '150vh',
        height: isMobileOrTablet ? 'auto' : '150vh',
        paddingTop: isMobileOrTablet ? 'clamp(28px, 4.5vh, 48px)' : 'clamp(4rem, 8vh, 8rem)',
        paddingBottom: isMobileOrTablet ? 'clamp(24px, 4vh, 40px)' : 'clamp(3rem, 6vh, 6rem)',
      }}
    >
      {/* 100% Full-Width Solid White Highlight Bar across the hovered row (Desktop Only) */}
      <div
        ref={highlightBarRef}
        className="absolute left-0 w-full bg-white pointer-events-none opacity-0 z-10 transition-colors"
        style={{ top: 0, height: 0, display: isMobileOrTablet ? 'none' : 'block' }}
      />

      {/* Desktop Floating Image Preview Card (> 1024px) */}
      <div
        ref={previewRef}
        className="dulcedo-desktop-preview"
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

      {/* Mobile Top Viewfinder Frame (<= 1024px / iPhone SE, Pixel, Galaxy, iPad) */}
      <div className="dulcedo-mobile-viewfinder">
        {/* Viewfinder Images Deck */}
        {ITEMS.map((item, idx) => (
          <img
            key={`mob-${item.id}`}
            ref={(el) => (mobileImageRefs.current[idx] = el)}
            src={item.image}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: (activeIndex === null && idx === 0) || activeIndex === idx ? 5 : 1,
              clipPath: (activeIndex === null && idx === 0) || activeIndex === idx ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
              willChange: 'clip-path',
            }}
          />
        ))}

        {/* Viewfinder Corner Brackets */}
        <div className="absolute inset-2 pointer-events-none z-30">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/70" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/70" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/70" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/70" />
        </div>
      </div>

      {/* Main 5-Option Stacked Typography List */}
      <div
        className={`relative z-20 w-full ${
          isMobileOrTablet ? 'max-w-xl my-0 py-1 sm:py-3' : 'max-w-6xl my-auto py-2 sm:py-8'
        } mx-auto flex flex-col items-center justify-center`}
      >
        {ITEMS.map((item, idx) => {
          const isHovered = activeIndex === idx;

          return (
            <div
              key={item.id}
              ref={(el) => (rowRefs.current[idx] = el)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onClick={() => handleMouseEnter(idx)}
              style={{
                padding: isMobileOrTablet
                  ? 'clamp(3px, 0.7vh, 6px) 0'
                  : 'clamp(4px, 0.8vh, 8px) 0',
              }}
              className="relative w-full flex items-center justify-center cursor-pointer group"
            >
              <h2
                style={{
                  fontSize: isMobileOrTablet
                    ? 'clamp(1.55rem, 5.4vw, 2.5rem)'
                    : 'clamp(2.2rem, 5.6vw, 6.2rem)',
                  lineHeight: 1.15,
                }}
                className={`font-sans font-black tracking-[-0.03em] uppercase text-center transition-colors duration-150 ${
                  isHovered ? (isMobileOrTablet ? 'text-amber-400' : 'text-black') : 'text-white'
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
        style={{
          fontSize: isMobileOrTablet ? 'clamp(11px, 2.8vw, 13px)' : 'clamp(11px, 1.1vw, 13px)',
          marginTop: isMobileOrTablet ? 'clamp(10px, 1.8vh, 18px)' : '1rem',
          marginBottom: isMobileOrTablet ? '0px' : '1rem',
          maxWidth: isMobileOrTablet ? '340px' : '48rem',
        }}
        className="relative z-20 w-full mx-auto text-center font-sans tracking-normal leading-relaxed text-neutral-400 space-y-1 px-4"
      >
        <p>
          Lumen Archive® operates at the intersection of optical physics and documentary visuals, producing ultra-high resolution mono prints.
        </p>
      </div>
    </section>
  );
});

export default DulcedoMenu;
