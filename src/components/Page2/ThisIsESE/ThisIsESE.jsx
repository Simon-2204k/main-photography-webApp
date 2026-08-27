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
      // Smooth fade-in on scroll into Section 2 statement text
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
      className="relative z-20 bg-black text-white pt-12 pb-32 lg:pt-16 lg:pb-48 px-0 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 140px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 140px, black 100%)',
      }}
    >
      {/* 
        ========================================================================
        SINGLE UNIFIED MARQUEE ELEMENT (Z-INDEX z-40 above mask layers)
        ========================================================================
      */}
      <div
        id="unified-marquee"
        className="w-full overflow-hidden mb-16 sm:mb-24 pointer-events-none select-none z-40 relative opacity-100"
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
              {HERO_MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Centered Main HTML Statement Text */}
      <div className="max-w-5xl mx-auto text-center px-6 sm:px-12 lg:px-24 relative z-20 mt-12 sm:mt-16">
        <div ref={textRef}>
          <h2 className="font-sans font-normal text-3xl sm:text-5xl lg:text-[52px] leading-[1.2] tracking-tight text-white select-none">
            Culture-driven, creative and competitive. Our digital agency creates impact for brands. In the disciplines Websites, social media, content marketing, campaigning and branding. Between timeless and zeitgeist. When we communicate: Effectively. Quick witted. Ambitious. This is ESE Agency.
          </h2>
        </div>
      </div>
    </section>
  );
};

export const ThisIsESE = memo(ThisIsESEComponent);
export default ThisIsESE;
