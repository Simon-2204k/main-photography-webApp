import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 49;

export const HeroCanvasComponent = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  // Helper to format frame file path
  const getFramePath = (index) => {
    const frameNum = String(index + 1).padStart(2, '0');
    return `/assets/ese-hero-sequence${frameNum}.webp`;
  };

  // Canvas render function maintaining cover aspect ratio
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Set canvas internal resolution to window bounds
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Calculate aspect ratio cover math
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      drawX = 0;
      drawY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      drawX = (width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Preload all 49 image frames & setup GSAP ScrollTrigger
  useEffect(() => {
    const loadedImages = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      if (i === 0) {
        img.onload = () => {
          renderFrame(0);
        };
      }
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // Render frame 0 if already cached
    renderFrame(0);

    const sequenceState = { frame: 0 };

    const ctx = gsap.context(() => {
      // Pin hero & scrub canvas sequence
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * TOTAL_FRAMES)
          );
          sequenceState.frame = frameIndex;
          renderFrame(frameIndex);

          // Control the single unified marquee element (#unified-marquee)
          const marqueeEl = document.getElementById('unified-marquee');
          const textNodes = document.querySelectorAll('.marquee-text-node');

          if (marqueeEl && textNodes.length > 0) {
            if (frameIndex < 29) {
              // Before Frame 30 (index 29): Hidden & translated y: -10px (hides when scrolling back up)
              marqueeEl.style.opacity = '0';
              marqueeEl.style.transform = 'translateY(-10px)';
            } else if (frameIndex >= 29 && frameIndex < 48) {
              // Frames 30 to 48: Stroke outline text & translates y: -10px -> 0px
              const progress = (frameIndex - 29) / 19; // 0 to 1
              marqueeEl.style.opacity = `${0.35 + progress * 0.5}`;
              marqueeEl.style.transform = `translateY(${-10 + progress * 10}px)`;
              textNodes.forEach((node) => {
                node.style.color = 'transparent';
                node.style.webkitTextStroke = '1.5px rgba(255, 255, 255, 0.85)';
              });
            } else {
              // Frame 49: Solid white filled text with no stroke & y: 0px, 100% visible
              marqueeEl.style.opacity = '1';
              marqueeEl.style.transform = 'translateY(0px)';
              textNodes.forEach((node) => {
                node.style.color = '#ffffff';
                node.style.webkitTextStroke = '0px transparent';
              });
            }
          }
        },
      });
    }, containerRef);

    // Handle Window Resize
    const handleResize = () => {
      renderFrame(sequenceState.frame);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} id="hero-sequence-section" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Option 1 Alpha Gradient Masking on Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
        }}
      />

      {/* Hero Marquee Element: Positioned cleanly above bottom edge */}
      <div
        id="unified-marquee"
        className="absolute bottom-24 sm:bottom-28 left-0 right-0 w-full overflow-hidden pointer-events-none select-none transition-all duration-300 opacity-0 -translate-y-[10px] z-50"
      >
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-8">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="marquee-text-node font-syne font-black text-4xl sm:text-6xl md:text-8xl lg:text-[100px] leading-none text-transparent tracking-tighter shrink-0"
              style={{
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.85)',
              }}
            >
              where light, shadows, and moments become stories with us overtake 
            </span>
          ))}
        </div>
      </div>

      {/* Floating Subtitle Tags: Shifted UPWARD & Pure Text (MODERN / HIGH QUALITY / FRESH) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full flex items-center justify-between text-xs sm:text-sm font-medium tracking-widest text-white uppercase px-4 sm:px-12 -mt-16 sm:-mt-20">
          <span className="select-none">
            modern
          </span>
          <span className="select-none font-semibold">
            high quality
          </span>
          <span className="select-none">
            fresh
          </span>
        </div>
      </div>
    </section>
  );
};

export const HeroCanvas = memo(HeroCanvasComponent);
export default HeroCanvas;
