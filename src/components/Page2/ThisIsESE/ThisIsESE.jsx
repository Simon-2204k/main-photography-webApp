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
        { opacity: 0, y: 40 },
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
      className="relative z-20 bg-[#0a0a0c] text-white pt-2 pb-28 lg:pt-4 lg:pb-40 px-0 overflow-hidden -mt-44 sm:-mt-52 select-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 180px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 180px, black 100%)',
      }}
    >
      {/* Subtle Topographical Background Vector Curves (Image 2 style) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path
          d="M-100,200 C300,50 600,350 1000,150 C1300,0 1500,400 1600,250"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
        />
        <path
          d="M-100,380 C350,180 550,520 950,280 C1250,120 1450,550 1600,400"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        <path
          d="M-100,560 C400,320 700,680 1100,420 C1380,260 1500,700 1600,580"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
        <path
          d="M-100,740 C280,500 800,820 1200,580 C1420,440 1550,850 1600,720"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
        />
      </svg>

      {/* 
        ========================================================================
        SINGLE UNIFIED MARQUEE ELEMENT (Z-INDEX z-40 above mask layers)
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
        LANDO NORRIS INSPIRED EDITORIAL PHOTOGRAPHY HERO LAYOUT (IMAGE 2)
        ========================================================================
      */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stacked Mixed Typography & Photography Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-400">
                ✦ SIMON PHOTOGRAPHY ARCHIVE
              </span>
            </div>

            {/* Giant 3-Line Mixed Typography Headline (Matching Image 2 WORLD DRIVERS' CHAMPION font contrast) */}
            <h2 className="font-sans font-black text-5xl sm:text-7xl lg:text-[84px] leading-[0.92] tracking-tighter text-white uppercase mb-8">
              <span className="block font-black tracking-tight text-white">MASTER OF</span>
              <span className="block font-black tracking-tight text-white">LIGHT &amp;</span>
              <span className="block font-serif font-normal italic tracking-normal text-white text-6xl sm:text-8xl lg:text-[92px] capitalize mt-1.5 drop-shadow-md">
                Perspective
              </span>
            </h2>

            {/* Narrative Editorial Copy */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-lg mb-10 font-normal">
              Concept-driven, atmospheric and cinematic. Our visual laboratory creates enduring imagery for visionary brands and authentic people. Between analogue craft and contemporary vision. Frame it, preserve it, treasure it forever.
            </p>

            {/* Bottom Photography Meta Bar */}
            <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/15 text-xs font-mono text-neutral-400 uppercase tracking-wider">
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

          {/* Right Column: Layered Floating Editorial Photography Cards (Image 2 Composition) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px] lg:min-h-[580px]">
            {/* Top-Right Tilted Metallic Gold Photo Card */}
            <div
              className="absolute top-0 right-2 sm:right-6 w-48 sm:w-60 aspect-[4/3] rounded-xl overflow-hidden border border-amber-400/40 shadow-[0_20px_50px_rgba(212,175,55,0.22)] transform rotate-6 z-20 transition-transform duration-500 hover:rotate-3 hover:scale-105"
            >
              <img
                src="/img4.jpeg"
                alt="Golden Hour Canvas Series"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
                  GOLDEN HOUR LAB
                </span>
              </div>
            </div>

            {/* Center Main Large Framed Portrait */}
            <div
              className="relative w-64 sm:w-80 lg:w-96 aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 transform -rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
            >
              <img
                src="/img2.jpg"
                alt="Main Cinematic Photography Series"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
                  EDITORIAL SERIES
                </span>
                <span className="font-sans font-bold text-lg text-white">
                  SHADOWS &amp; CINEMA
                </span>
              </div>
            </div>

            {/* Bottom-Left Floating Foreground Card */}
            <div
              className="absolute -bottom-4 sm:bottom-0 left-0 sm:left-4 w-44 sm:w-56 aspect-square rounded-xl overflow-hidden border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] transform -rotate-6 z-30 transition-transform duration-500 hover:rotate-0 hover:scale-105"
            >
              <img
                src="/img1.jpg"
                alt="Archive Photography Print"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">
                  ARCHIVE N° 01
                </span>
              </div>
            </div>

            {/* Bottom-Right Golden Foil Badge Stamp (Matching LN1 Badge in Image 2) */}
            <div className="absolute -bottom-6 right-4 sm:right-10 bg-gradient-to-br from-[#ffd700] via-[#dfb15b] to-[#996515] p-[1.5px] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] transform rotate-3 z-40">
              <div className="bg-[#121214] px-5 py-3 rounded-2xl flex flex-col items-center">
                <span className="font-sans font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-tight">
                  SIMON
                </span>
                <span className="text-[9px] font-mono tracking-widest text-amber-300/90 uppercase font-semibold">
                  N°1 ARCHIVE
                </span>
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
