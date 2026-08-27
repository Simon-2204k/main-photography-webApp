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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
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
      className="relative z-20 bg-[#0a0a0c] text-white pt-6 pb-32 lg:pt-10 lg:pb-44 px-0 overflow-hidden select-none"
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
        SINGLE UNIFIED MARQUEE ELEMENT (Z-INDEX z-40)
        ========================================================================
      */}
      <div
        id="unified-marquee"
        className="w-full overflow-hidden mb-12 sm:mb-16 pointer-events-none select-none transition-all duration-300 opacity-0 -translate-y-[10px] z-40 relative"
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
        PUSHED DOWN 50VH TO GUARANTEE ZERO MARQUEE OVERLAP WITH HERO TEXT
        ========================================================================
      */}
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-20 mt-[45vh] lg:mt-[50vh]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stacked Mixed Typography & Photography Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse inline-block shadow-[0_0_8px_#fbbf24]" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 font-semibold">
                ✦ SIMON PHOTOGRAPHY ARCHIVE
              </span>
            </div>

            {/* Giant 3-Line Mixed Typography Headline (Matching Image 2 WORLD DRIVERS' CHAMPION font contrast) */}
            <h2 className="font-sans font-black text-5xl sm:text-7xl lg:text-[80px] leading-[0.94] tracking-tighter text-white uppercase mb-8">
              <span className="block font-black tracking-tight text-white">MASTER OF</span>
              <span className="block font-black tracking-tight text-white">LIGHT &amp;</span>
              <span className="block font-serif font-normal italic tracking-normal text-white text-6xl sm:text-8xl lg:text-[88px] capitalize mt-1 drop-shadow-md">
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

          {/* Right Column: 5-Image Composition in 9:16 Aspect Ratio (400px Main, 200px Satellites from /images) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[560px]">
            {/* 1. Top-Left Satellite Card: 200px (9:16) */}
            <div
              className="absolute top-2 left-0 sm:left-4 w-[112px] h-[200px] aspect-[9/16] rounded-xl overflow-hidden border border-white/25 shadow-[0_15px_35px_rgba(0,0,0,0.85)] transform -rotate-6 z-10 transition-transform duration-500 hover:rotate-0 hover:scale-105"
            >
              <img
                src="/images/pexels-fidan-nazim-qizi-134456769-12414434.jpg"
                alt="Archive Photography Print 1"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                <span className="text-[8px] font-mono tracking-widest text-neutral-300 uppercase font-semibold">
                  ARCHIVE 01
                </span>
              </div>
            </div>

            {/* 2. Top-Right Satellite Card: 200px (9:16) */}
            <div
              className="absolute top-0 right-2 sm:right-6 w-[112px] h-[200px] aspect-[9/16] rounded-xl overflow-hidden border border-amber-400/40 shadow-[0_15px_40px_rgba(212,175,55,0.2)] transform rotate-6 z-10 transition-transform duration-500 hover:rotate-0 hover:scale-105"
            >
              <img
                src="/images/pexels-ekam-juneja-61080223-32379941.jpg"
                alt="Archive Photography Print 2"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                <span className="text-[8px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
                  GOLDEN LAB
                </span>
              </div>
            </div>

            {/* 3. Primary Center Main Card: 400px (9:16) */}
            <div
              className="relative w-[225px] h-[400px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/30 shadow-[0_30px_70px_rgba(0,0,0,0.95)] z-20 transform -rotate-1 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
            >
              <img
                src="/images/pexels-elina-araja-1743227-3343318.jpg"
                alt="Main Cinematic Photography"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                  EDITORIAL SERIES
                </span>
                <span className="font-sans font-bold text-sm text-white">
                  SHADOWS &amp; LIGHT
                </span>
              </div>
            </div>

            {/* 4. Bottom-Left Satellite Card: 200px (9:16) */}
            <div
              className="absolute -bottom-4 sm:bottom-0 left-4 sm:left-10 w-[112px] h-[200px] aspect-[9/16] rounded-xl overflow-hidden border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.85)] transform -rotate-3 z-30 transition-transform duration-500 hover:rotate-0 hover:scale-105"
            >
              <img
                src="/images/pexels-ilham-munawar-wijaksana-312593206-13568050.jpg"
                alt="Archive Photography Print 3"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                <span className="text-[8px] font-mono tracking-widest text-white uppercase font-bold">
                  RAW 120
                </span>
              </div>
            </div>

            {/* 5. Bottom-Right Satellite Card: 200px (9:16) */}
            <div
              className="absolute -bottom-4 sm:bottom-0 right-4 sm:right-10 w-[112px] h-[200px] aspect-[9/16] rounded-xl overflow-hidden border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.85)] transform rotate-3 z-30 transition-transform duration-500 hover:rotate-0 hover:scale-105"
            >
              <img
                src="/images/pexels-sevil-yeva-1175061542-29209493.jpg"
                alt="Archive Photography Print 4"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                <span className="text-[8px] font-mono tracking-widest text-white uppercase font-bold">
                  CINEMA N° 04
                </span>
              </div>
            </div>

            {/* Gold Foil Badge Stamp (Matching LN1 Badge in Image 2) */}
            <div className="absolute -bottom-7 right-0 sm:right-4 bg-gradient-to-br from-[#ffd700] via-[#dfb15b] to-[#996515] p-[1.5px] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] transform rotate-6 z-40 pointer-events-none">
              <div className="bg-[#121214] px-4 py-2.5 rounded-2xl flex flex-col items-center">
                <span className="font-sans font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-tight">
                  SIMON
                </span>
                <span className="text-[8px] font-mono tracking-widest text-amber-300/90 uppercase font-semibold">
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
