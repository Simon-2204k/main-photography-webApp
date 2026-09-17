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
      className="relative z-20 text-white w-full min-h-screen flex flex-col justify-center items-center px-0 overflow-hidden select-none"
      style={{
        backgroundColor: '#000000',
        paddingTop: 'clamp(80px, 10vh, 120px)',
        paddingBottom: 'clamp(40px, 6vh, 70px)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 140px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 140px, black 100%)',
      }}
    >

      {/* 
        ========================================================================
        SINGLE UNIFIED MARQUEE ELEMENT (Z-INDEX z-40)
        ========================================================================
      */}
      <div
        id="unified-marquee"
        className="w-full overflow-hidden pointer-events-none select-none transition-all duration-300 opacity-0 -translate-y-[10px] z-40 absolute top-8 sm:top-12 left-0"
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
        RESPONSIVE CONTENT: COLUMN ON MOBILE/TABLET, 50/50 ON DESKTOP & 1024x1366
        ========================================================================
      */}
      <div
        ref={contentRef}
        className="w-full relative z-20 px-6 sm:px-12 lg:px-20 flex items-center justify-center my-auto"
      >
        <div className="w-full flex flex-col mt-4 sm:mt-12 xl:mt-8 lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-8">
          {/* LEFT COLUMN */}
          <div
            className="w-full lg:w-1/2 pr-0 lg:pr-10 xl:pr-14 flex flex-col justify-start text-left"
          >
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse inline-block" />
              <span className="text-[11px] sm:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-300 font-semibold">
                ✦ SIMON PHOTOGRAPHY ARCHIVE
              </span>
            </div>

            {/* Stacked Headline */}
            <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-[52px] xl:text-[64px] leading-[0.95] tracking-tighter text-white uppercase mb-6 sm:mb-8">
              <span className="block font-black tracking-tight text-white">MASTER OF</span>
              <span className="block font-black tracking-tight text-white">LIGHT &amp;</span>
              <span className="block font-serif font-normal italic tracking-normal text-white text-4xl sm:text-6xl lg:text-[58px] xl:text-[70px] capitalize mt-1">
                Perspective
              </span>
            </h2>

            {/* 4 Optics Specs Cards in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs w-full max-w-lg">
              <div className="bg-white/[0.04] p-2.5 sm:p-3.5 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px] mb-1">
                  MEDIUM
                </span>
                <span className="text-white font-semibold text-[11px] sm:text-sm">
                  120 Film &amp; Medium Format
                </span>
              </div>

              <div className="bg-white/[0.04] p-2.5 sm:p-3.5 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px] mb-1">
                  OPTICS
                </span>
                <span className="text-white font-semibold text-[11px] sm:text-sm">
                  Hasselblad HC &amp; Leica
                </span>
              </div>

              <div className="bg-white/[0.04] p-2.5 sm:p-3.5 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px] mb-1">
                  EMULSION
                </span>
                <span className="text-white font-semibold text-[11px] sm:text-sm">
                  Tri-X 400 &amp; Portra 800
                </span>
              </div>

              <div className="bg-white/[0.04] p-2.5 sm:p-3.5 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px] mb-1">
                  ATMOSPHERE
                </span>
                <span className="text-white font-semibold text-[11px] sm:text-sm">
                  Chiaroscuro &amp; Grain
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            className="w-full lg:w-1/2 pl-0 lg:pl-10 xl:pl-14 flex flex-col justify-between text-left pt-0 sm:pt-4"
          >
            <p className="font-sans font-normal text-base sm:text-xl lg:text-[22px] xl:text-[26px] leading-[1.38] tracking-tight text-neutral-200 mb-8">
              Concept-driven, atmospheric and cinematic. Our visual laboratory creates enduring imagery for visionary brands and authentic people. In the disciplines of editorial campaigns, lookbooks, gallery exhibitions and medium format. Between analogue craft and contemporary vision. Frame it, preserve it, treasure it forever. This is <span className="font-extrabold text-white underline decoration-amber-400/50 decoration-2 underline-offset-4">SIMON Photography</span>.
            </p>

            {/* Bottom Photography Meta Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-6 pb-6 border-t border-white/15 text-xs font-mono text-neutral-400 uppercase tracking-wider">
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
