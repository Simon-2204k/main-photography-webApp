import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, CornerDownLeft, Sparkles, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VisualSearchSection() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const targetCardRef = useRef(null);
  const searchBarRef = useRef(null);
  const searchInputTextRef = useRef(null);
  const searchInputBadgeRef = useRef(null);
  const initialMediaGroupRef = useRef(null);
  const resultsMediaGroupRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    const targetCard = targetCardRef.current;
    const searchBar = searchBarRef.current;
    const initialMedia = initialMediaGroupRef.current;
    const resultsMedia = resultsMediaGroupRef.current;

    if (!section || !cursor || !targetCard) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Initial images slide in onto the desk
      tl.fromTo(
        '.initial-card',
        { y: 300, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.6, ease: 'power2.out' }
      );

      // 2. Cursor moves in towards targetCard (upcycled_shoot04.jpg)
      tl.fromTo(
        cursor,
        { x: 350, y: -150, opacity: 0 },
        { x: 70, y: 140, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      // 3. Highlight target card with orange focus border & slight tilt
      tl.to(targetCard, {
        boxShadow: '0 0 0 3px #FF5722, 0 20px 40px rgba(255,87,34,0.3)',
        scale: 1.05,
        duration: 0.2,
      });

      // Cursor click pulse
      tl.to(cursor, { scale: 0.85, duration: 0.15, yoyo: true, repeat: 1 });

      // 4. Cursor grabs target card and drags it upwards towards the search bar
      tl.to(
        targetCard,
        {
          x: 40,
          y: -190,
          scale: 0.45,
          rotation: 3,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'drag'
      );
      tl.to(
        cursor,
        {
          x: 75,
          y: -170,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'drag'
      );

      // 5. Card drops into the search bar, disappears/absorbs, cursor leaves
      tl.to(targetCard, { opacity: 0, scale: 0.2, duration: 0.2 }, 'absorb');
      tl.to(cursor, { opacity: 0, y: -250, duration: 0.3 }, 'absorb');

      // Search bar receives the badge
      tl.to(
        searchInputTextRef.current,
        { opacity: 0, x: -10, duration: 0.2 },
        'absorb'
      );
      tl.to(
        searchInputBadgeRef.current,
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' },
        'absorb+=0.1'
      );

      // 6. Old media fades slightly, and new random search results burst in from various Y & X offsets
      tl.to('.initial-card:not(.target-card)', { opacity: 0.3, y: 60, duration: 0.4 }, 'burst');
      tl.fromTo(
        '.result-card',
        { 
          y: (i) => (i % 2 === 0 ? 350 : -350), 
          x: (i) => (i % 3 === 0 ? -300 : 300), 
          opacity: 0, 
          scale: 0.8,
          rotation: (i) => (i % 2 === 0 ? -15 : 15) 
        },
        { 
          y: 0, 
          x: 0, 
          opacity: 1, 
          scale: 1, 
          rotation: (i) => (i % 2 === 0 ? -4 : 6),
          stagger: 0.08, 
          duration: 0.8, 
          ease: 'power3.out' 
        },
        'burst+=0.2'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen wood-bg overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Background shadow overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Header text */}
      <div className="relative z-10 text-center mb-6 px-4">
        <div className="flex items-center justify-center gap-2 text-2xl sm:text-4xl md:text-5xl font-serif text-white/95 drop-shadow-md">
          <span>Your search doesn't just end there.</span>
          <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 fill-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.8)] animate-pulse" />
        </div>
      </div>

      {/* Modern Glassmorphic Search Bar */}
      <div
        ref={searchBarRef}
        className="relative z-30 w-full max-w-xl mx-auto px-4 mb-8"
      >
        <div className="relative flex items-center justify-between px-4 py-3 rounded-2xl glass-search">
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <Search className="w-5 h-5 text-stone-300 shrink-0" />
            
            {/* Initial search text */}
            <span
              ref={searchInputTextRef}
              className="text-stone-100 font-sans text-sm sm:text-base tracking-wide"
            >
              Urban Upcycled Clothing
            </span>

            {/* Absorbed badge after drop */}
            <div
              ref={searchInputBadgeRef}
              className="opacity-0 scale-75 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-[#FF5722]/50 text-white text-xs font-mono shadow-md"
            >
              <img
                src="/assets/items/item_4.jpg"
                alt="thumbnail"
                className="w-4 h-4 object-cover rounded"
              />
              <span className="text-[#FF7043] font-semibold">upcycled_shoot04.jpg</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-stone-800/80 text-stone-400 border border-stone-700/50">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Desk Canvas Area with Floating Items */}
      <div className="relative w-full max-w-5xl h-[420px] flex items-center justify-center">
        
        {/* Initial Media Items Layer */}
        <div ref={initialMediaGroupRef} className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-8 px-6">
          {/* Card 1: Jackets */}
          <div className="initial-card flex flex-col items-center gap-1.5 -translate-y-2">
            <div className="paper-shadow w-28 sm:w-36 h-36 sm:h-44 rounded bg-stone-900/80 p-1 border border-white/10">
              <img
                src="/assets/items/item_15.jpg"
                alt="Jackets upcycled"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-stone-300">
              jackets_upcycled.jpg
            </span>
          </div>

          {/* Card 2: 35mm Film Strip */}
          <div className="initial-card flex flex-col items-center gap-1.5 translate-y-4">
            <div className="film-frame w-32 sm:w-40 h-36 sm:h-44 rounded p-1">
              <img
                src="/assets/items/item_16.jpg"
                alt="re-use film"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-stone-300">
              re-use_film.mp4
            </span>
          </div>

          {/* Card 3: Target Selected Card (upcycled_shoot04.jpg) */}
          <div
            ref={targetCardRef}
            className="initial-card target-card flex flex-col items-center gap-1.5 -translate-y-1 z-20 will-change-transform"
          >
            <div className="paper-shadow w-32 sm:w-44 h-40 sm:h-52 rounded-md bg-stone-900 p-1 border border-white/20">
              <img
                src="/assets/items/item_4.jpg"
                alt="upcycled shoot 04"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <span className="px-2 py-0.5 rounded bg-[#FF5722] text-white text-[10px] font-mono font-medium shadow-md">
              upcycled_shoot04.jpg
            </span>
          </div>

          {/* Card 4: Magazine Cover */}
          <div className="initial-card flex flex-col items-center gap-1.5 translate-y-2">
            <div className="paper-shadow w-32 sm:w-40 h-44 sm:h-56 rounded bg-stone-100 p-2 text-stone-900 border border-stone-300">
              <div className="w-full h-full border border-stone-800 flex flex-col justify-between p-1 bg-white">
                <span className="text-[10px] font-serif font-black tracking-widest uppercase">
                  Upcycling
                </span>
                <img
                  src="/assets/items/item_17.jpg"
                  alt="Upcycling fashion"
                  className="w-full h-24 object-cover"
                />
                <span className="text-[7px] font-sans text-stone-500">MARCH 2026 ISSUE</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-stone-300">
              fashion_mag.pdf
            </span>
          </div>
        </div>

        {/* Dynamic Search Results Burst Layer */}
        <div ref={resultsMediaGroupRef} className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Result 1: Left Document */}
          <div className="result-card absolute left-4 sm:left-12 -top-6 paper-shadow w-28 sm:w-36 bg-stone-50 p-2 text-stone-800 rounded opacity-0">
            <div className="text-[7px] font-mono border-b pb-1 mb-1 font-bold">RESEARCH PAPER</div>
            <p className="text-[6px] line-clamp-4 text-stone-600">
              Sustainable approaches to upcycled Japanese denim and garment construction methods.
            </p>
          </div>

          {/* Result 2: Top Right Film Card */}
          <div className="result-card absolute right-6 sm:right-16 -top-10 film-frame w-32 sm:w-40 h-40 rounded opacity-0">
            <img src="/assets/items/item_18.jpg" alt="result film" className="w-full h-full object-cover" />
          </div>

          {/* Result 3: Bottom Left Streetwear */}
          <div className="result-card absolute left-8 sm:left-20 bottom-0 paper-shadow w-32 sm:w-44 h-40 rounded bg-stone-900 p-1 border border-white/20 opacity-0">
            <img src="/assets/items/item_19.jpg" alt="result photo" className="w-full h-full object-cover rounded" />
          </div>

          {/* Result 4: Bottom Right Editorial */}
          <div className="result-card absolute right-10 sm:right-24 bottom-2 polaroid-card w-32 sm:w-36 opacity-0">
            <img src="/assets/items/item_20.jpg" alt="result polaroid" className="w-full aspect-square object-cover" />
            <div className="text-[8px] font-mono mt-1 text-stone-700">LOOKBOOK_RAW.PNG</div>
          </div>
        </div>

        {/* Animated Virtual Cursor */}
        <div
          ref={cursorRef}
          className="absolute z-50 pointer-events-none transition-transform will-change-transform"
        >
          <div className="relative">
            {/* Custom Sleek Hand/Pointer Cursor */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] filter"
            >
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z"
                fill="#ffffff"
                stroke="#111111"
                strokeWidth="1.5"
              />
            </svg>
            <div className="absolute -bottom-5 left-4 px-2 py-0.5 rounded-full bg-[#FF5722] text-[9px] font-mono text-white whitespace-nowrap shadow-lg">
              Virtual Cursor
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
