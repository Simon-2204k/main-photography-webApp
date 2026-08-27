import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HERO_MARQUEE_TEXT = "where light, shadows, and moments become stories with us overtake ";

export const ThisIsESEComponent = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade-in on scroll into Section 3 statement text
      gsap.fromTo(
        textRef.current,
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
      className="relative z-20 bg-black text-white pt-2 pb-32 lg:pt-4 lg:pb-48 px-0 overflow-hidden -mt-44 sm:-mt-52 select-none"
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
        className="w-full overflow-hidden -mt-8 sm:-mt-12 mb-16 sm:mb-24 pointer-events-none select-none transition-all duration-300 opacity-0 -translate-y-[10px] z-40 relative"
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
        CLEAN STATEMENT TEXT (Shifted downward with mt-24 sm:mt-32)
        ========================================================================
      */}
      <div className="max-w-5xl mx-auto text-center px-6 sm:px-12 lg:px-24 relative z-20 mt-24 sm:mt-32">
        <div ref={textRef}>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse inline-block shadow-[0_0_8px_#fbbf24]" />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 font-semibold">
              ✦ SIMON PHOTOGRAPHY ARCHIVE
            </span>
          </div>

          <h2 className="font-sans font-normal text-3xl sm:text-5xl lg:text-[52px] leading-[1.2] tracking-tight text-white select-none">
            Concept-driven, atmospheric and cinematic. Our visual laboratory creates enduring imagery for visionary brands and authentic people. In the disciplines of editorial campaigns, lookbooks, gallery exhibitions and medium format. Between analogue craft and contemporary vision. Frame it, preserve it, treasure it forever. This is <span className="font-extrabold text-white">SIMON Photography</span>.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 mt-8 border-t border-white/15 text-xs font-mono text-neutral-400 uppercase tracking-wider">
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
    </section>
  );
};

export const ThisIsESE = memo(ThisIsESEComponent);
export default ThisIsESE;
