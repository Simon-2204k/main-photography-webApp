import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const KeyholeParallaxMask = memo(() => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const keyholeRef = useRef(null);
  const parallaxImg1Ref = useRef(null);
  const parallaxImg2Ref = useRef(null);
  const parallaxImg3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const keyhole = keyholeRef.current;
      const text1 = text1Ref.current;
      const text2 = text2Ref.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.2,
        },
      });

      // 1. Staggered parallax scrolling of background B&W images
      if (parallaxImg1Ref.current && parallaxImg2Ref.current && parallaxImg3Ref.current) {
        tl.to(parallaxImg1Ref.current, { yPercent: -60, duration: 1, ease: 'none' }, 0);
        tl.to(parallaxImg2Ref.current, { yPercent: -90, duration: 1, ease: 'none' }, 0);
        tl.to(parallaxImg3Ref.current, { yPercent: -45, duration: 1, ease: 'none' }, 0);
      }

      // 2. Extra scroll pin pause for initial text "IN A WORLD FULL OF NOISE"
      tl.to({}, { duration: 0.4 });

      // 3. Keyhole appears small in center and expands outwards
      tl.fromTo(
        keyhole,
        { scale: 0.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      // 4. Keyhole expands massively to cover the whole screen, text1 fades out
      tl.to(
        text1,
        { opacity: 0, scale: 0.85, duration: 0.6, ease: 'power2.in' },
        '-=0.4'
      );

      tl.to(
        keyhole,
        {
          scale: 32, // Massive scale engulfing the screen
          duration: 1.6,
          ease: 'power3.inOut',
        },
        '-=0.3'
      );

      // 5. Triumphant text "BE THE ONE TO Stand Out" emerges over full-bleed portrait
      tl.fromTo(
        text2,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-white text-black overflow-hidden select-none flex items-center justify-center"
    >
      {/* SVG Definitions for Authentic Keyhole Geometry */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="keyholeClip" clipPathUnits="objectBoundingBox">
            {/* Keyhole path mapped to 0-1 coordinate space */}
            <path d="M 0.5 0.15 C 0.6 0.15, 0.68 0.23, 0.68 0.35 C 0.68 0.44, 0.62 0.51, 0.55 0.54 L 0.6 0.92 C 0.6 0.96, 0.56 0.98, 0.5 0.98 C 0.44 0.98, 0.4 0.96, 0.4 0.92 L 0.45 0.54 C 0.38 0.51, 0.32 0.44, 0.32 0.35 C 0.32 0.23, 0.4 0.15, 0.5 0.15 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Floating Parallax Background B&W Images */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Image 1: Left */}
        <div
          ref={parallaxImg1Ref}
          className="absolute left-[8%] sm:left-[12%] top-[30%] w-48 sm:w-64 aspect-[3/4] grayscale contrast-125 opacity-70 rounded-none shadow-xl overflow-hidden will-change-transform"
        >
          <img
            src="/images/section3/baptiste-merel--bYa_kDl_tk-unsplash.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2: Right */}
        <div
          ref={parallaxImg2Ref}
          className="absolute right-[8%] sm:right-[14%] top-[18%] w-56 sm:w-80 aspect-[3/4] grayscale contrast-125 opacity-70 rounded-none shadow-xl overflow-hidden will-change-transform"
        >
          <img
            src="/images/section2/alessandro-rodriguez-Z-hkVVWZiOI-unsplash.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 3: Bottom Center Left */}
        <div
          ref={parallaxImg3Ref}
          className="absolute left-[30%] bottom-[-10%] w-44 sm:w-56 aspect-[3/4] grayscale contrast-125 opacity-60 rounded-none shadow-xl overflow-hidden will-change-transform"
        >
          <img
            src="/images/section3/mahdi-bafande-niZ0qgwIEUk-unsplash.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Center Headline 1: IN A WORLD FULL OF NOISE */}
      <div
        ref={text1Ref}
        className="relative z-20 text-center max-w-4xl mx-auto px-6 will-change-transform"
      >
        <h2 className="font-sans font-black text-5xl sm:text-7xl lg:text-[85px] tracking-tight leading-[0.95] text-neutral-900 uppercase">
          IN A WORLD FULL <br /> OF NOISE
        </h2>
      </div>

      {/* Center Keyhole Mask Overlay (Scales up smoothly on scroll) */}
      <div
        ref={keyholeRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-30 will-change-transform"
        style={{
          transformOrigin: 'center center',
        }}
      >
        {/* Keyhole Cutout Element */}
        <div
          className="relative w-[340px] sm:w-[440px] md:w-[540px] aspect-[1/1.3] overflow-hidden"
          style={{
            clipPath: 'url(#keyholeClip)',
            WebkitClipPath: 'url(#keyholeClip)',
          }}
        >
          {/* Vibrant Colorful High-Fashion Portrait Inside Keyhole */}
          <img
            src="/images/section5/yunus-emre-mM5tCQ0uJo8-unsplash.webp"
            alt=""
            className="w-full h-full object-cover object-center transform scale-110"
          />
        </div>
      </div>

      {/* Headline 2: BE THE ONE TO Stand Out (Emerges over expanded full-bleed visual) */}
      <div
        ref={text2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none text-center px-6 opacity-0 will-change-transform"
      >
        <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-[75px] tracking-tight uppercase text-white drop-shadow-2xl leading-none">
          BE THE ONE TO
        </h2>
        <span className="font-serif italic text-5xl sm:text-7xl lg:text-[85px] text-white tracking-normal drop-shadow-2xl mt-2">
          Stand Out
        </span>
      </div>
    </section>
  );
});

export default KeyholeParallaxMask;
