import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HERO_MARQUEE_TEXT = "where light, shadows, and moments become stories with us overtake ";

export const ThisIsESEComponent = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade-in on scroll into Section 3
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.1, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 bg-black text-white pt-2 pb-28 lg:pt-4 lg:pb-40 px-0 overflow-hidden -mt-44 sm:-mt-52 select-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 180px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 180px, black 100%)',
      }}
    >
      {/* 
        ========================================================================
        SINGLE UNIFIED MARQUEE ELEMENT (Z-INDEX z-40)
        ========================================================================
      */}
      <div
        id="unified-marquee"
        className="w-full overflow-hidden -mt-8 sm:-mt-12 mb-12 sm:mb-20 pointer-events-none select-none transition-all duration-300 opacity-0 -translate-y-[10px] z-40 relative"
      >
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-8">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="marquee-text-node font-syne font-black text-4xl sm:text-6xl md:text-8xl lg:text-[100px] leading-none text-transparent tracking-tighter shrink-0"
            >
              {HERO_MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* 
        ========================================================================
        2-COLUMN PHOTOGRAPHY EDITORIAL LAYOUT (50% LEFT / 50% RIGHT)
        ========================================================================
      */}
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-20 mt-14 sm:mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start text-left">
          {/* Left Column: Photography Manifesto & Optics Technical Grid */}
          <div className="flex flex-col justify-start">
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse inline-block shadow-[0_0_8px_#fbbf24]" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 font-semibold">
                ✦ SIMON PHOTOGRAPHY ARCHIVE
              </span>
            </div>

            {/* Giant Stacked Typography Headline */}
            <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-[64px] leading-[0.95] tracking-tighter text-white uppercase mb-8">
              <span className="block font-black tracking-tight text-white">MASTER OF</span>
              <span className="block font-black tracking-tight text-white">LIGHT &amp;</span>
              <span className="block font-serif font-normal italic tracking-normal text-white text-5xl sm:text-7xl lg:text-[72px] capitalize mt-1 drop-shadow-md">
                Perspective
              </span>
            </h2>

            {/* Photography Technical Craft Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-6 border-t border-white/15 text-xs font-mono">
              <div className="bg-white/[0.04] p-3.5 rounded-xl border border-white/10 flex flex-col justify-between">
                <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                  MEDIUM
                </span>
                <span className="text-white font-semibold text-xs sm:text-sm">
                  120 Film &amp; Medium Format
                </span>
              </div>

              <div className="bg-white/[0.04] p-3.5 rounded-xl border border-white/10 flex flex-col justify-between">
                <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                  OPTICS
                </span>
                <span className="text-white font-semibold text-xs sm:text-sm">
                  Hasselblad HC &amp; Leica
                </span>
              </div>

              <div className="bg-white/[0.04] p-3.5 rounded-xl border border-white/10 flex flex-col justify-between">
                <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                  EMULSION
                </span>
                <span className="text-white font-semibold text-xs sm:text-sm">
                  Tri-X 400 &amp; Portra 800
                </span>
              </div>

              <div className="bg-white/[0.04] p-3.5 rounded-xl border border-white/10 flex flex-col justify-between">
                <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                  ATMOSPHERE
                </span>
                <span className="text-white font-semibold text-xs sm:text-sm">
                  Chiaroscuro &amp; Grain
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fashion Narrative Statement */}
          <div className="flex flex-col justify-between h-full pt-1 sm:pt-2">
            <p className="font-sans font-normal text-xl sm:text-2xl lg:text-[28px] leading-[1.38] tracking-tight text-neutral-200 mb-8">
              Concept-driven, atmospheric and cinematic. Our visual laboratory creates enduring imagery for visionary brands and authentic people. In the disciplines of editorial campaigns, lookbooks, gallery exhibitions and medium format. Between analogue craft and contemporary vision. Frame it, preserve it, treasure it forever. This is <span className="font-extrabold text-white underline decoration-amber-400/50 decoration-2 underline-offset-4">SIMON Photography</span>.
            </p>

            {/* Bottom Photography Meta Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/15 text-xs font-mono text-neutral-400 uppercase tracking-wider">
              <div>
                <span className="text-neutral-500">DISCIPLINE:</span>{' '}
                <span className="text-white font-semibold">MEDIUM FORMAT &amp; 120 FILM</span>
              </div>
              <div>
                <span className="text-neutral-500">EDITION:</span>{' '}
                <span className="text-white font-semibold">EST. 2026 ARCHIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ThisIsESE = memo(ThisIsESEComponent);
export default ThisIsESE;
