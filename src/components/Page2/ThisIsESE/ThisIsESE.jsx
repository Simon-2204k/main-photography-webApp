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
      className="relative z-20 bg-black text-white pt-10 pb-28 sm:pt-16 sm:pb-36 lg:pt-20 lg:pb-40 px-0 overflow-hidden -mt-44 sm:-mt-52 select-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 200px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 200px, black 100%)',
      }}
    >
      {/* 
        ========================================================================
        SINGLE UNIFIED MARQUEE ELEMENT (Z-INDEX z-40)
        ========================================================================
      */}
      <div
        id="unified-marquee"
        className="w-full overflow-hidden mb-10 sm:mb-16 pointer-events-none select-none transition-all duration-300 opacity-0 -translate-y-[10px] z-40 relative pt-12 sm:pt-16"
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
        MAIN SECTION 3 CONTAINER: 2-ROW ARCHITECTURE
        ========================================================================
      */}
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-20 pt-10 sm:pt-16"
      >
        {/* ROW 1: Eyebrow + Full-Width Headline */}
        <div className="w-full mb-10 sm:mb-14 text-left">
          {/* Monospace Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse inline-block shadow-[0_0_8px_#fbbf24]" />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 font-semibold">
              ✦ SIMON PHOTOGRAPHY ARCHIVE
            </span>
          </div>

          {/* Giant Headline */}
          <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-[76px] leading-[0.95] tracking-tighter text-white uppercase">
            <span className="inline font-black tracking-tight text-white">MASTER OF LIGHT &amp; </span>
            <span className="inline font-serif font-normal italic tracking-normal text-white text-5xl sm:text-7xl lg:text-[84px] capitalize drop-shadow-md">
              Perspective
            </span>
          </h2>
        </div>

        {/* ROW 2: Side-by-Side Content Split (50% Specs Left / 50% Narrative Right) */}
        <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-14 items-start justify-between text-left">
          {/* Left Side: 4 Photography Optics & Craft Cards */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-3.5 font-mono text-xs">
            <div className="bg-white/[0.04] p-4 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                MEDIUM
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm">
                120 Film &amp; Medium Format
              </span>
            </div>

            <div className="bg-white/[0.04] p-4 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                OPTICS
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm">
                Hasselblad HC &amp; Leica
              </span>
            </div>

            <div className="bg-white/[0.04] p-4 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                EMULSION
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm">
                Tri-X 400 &amp; Portra 800
              </span>
            </div>

            <div className="bg-white/[0.04] p-4 rounded-xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">
                ATMOSPHERE
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm">
                Chiaroscuro &amp; Grain
              </span>
            </div>
          </div>

          {/* Right Side: Narrative Editorial Statement & Meta Bar */}
          <div className="w-full md:w-1/2 flex flex-col justify-between pt-1">
            <p className="font-sans font-normal text-lg sm:text-xl lg:text-[23px] leading-[1.4] tracking-tight text-neutral-200 mb-6">
              Concept-driven, atmospheric and cinematic. Our visual laboratory creates enduring imagery for visionary brands and authentic people. In the disciplines of editorial campaigns, lookbooks, gallery exhibitions and medium format. Between analogue craft and contemporary vision. Frame it, preserve it, treasure it forever. This is <span className="font-extrabold text-white underline decoration-amber-400/50 decoration-2 underline-offset-4">SIMON Photography</span>.
            </p>

            {/* Bottom Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-white/15 text-xs font-mono text-neutral-400 uppercase tracking-wider">
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
