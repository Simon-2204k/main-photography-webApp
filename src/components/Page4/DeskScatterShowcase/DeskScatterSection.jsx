import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, CornerDownLeft, Sparkles, MessageSquare } from 'lucide-react';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';

gsap.registerPlugin(ScrollTrigger);

const PHOTO_TITLES = [
  "Silver Halide Plate", "Medium Format 120", "Kodak Tri-X Monochrome", "Fujichrome Velvia 50",
  "Cyanotype Nocturne", "Leica M Noctilux", "Hasselblad 500C/M", "Gelatin Silver Contact",
  "Chiaroscuro Silhouette", "Anamorphic Flare Study", "Contax T2 Chromogenic", "Large Format 4×5",
  "Golden Hour Latent Scan", "Ilford HP5 Plus Exposure", "Darkroom Selenium Tone", "Platinum Palladium Print"
];

const PHOTO_DESCS = [
  "Analog darkroom development exposed on 35mm silver halide negative emulsion.",
  "Medium format natural daylight capture utilizing vintage Carl Zeiss optics.",
  "Selenium toned gelatin silver archival print framed under museum anti-reflective glass.",
  "Hand-pulled darkroom contact sheet analyzing grain density and exposure latitude."
];

// 100 items distributed across 4 cycles (25 items per cycle)
const ALL_100_ITEMS = Array.from({ length: 100 }, (_, i) => {
  const cycle = Math.floor(i / 25); // 0, 1, 2, 3
  const itemInCycle = i % 25;
  const imgIdx = (i % 56) + 1;

  // Entry and Exit off-screen trajectories
  const entrySide = itemInCycle % 4; // 0=left, 1=right, 2=top, 3=bottom
  let initialX = 0;
  let initialY = 0;
  let exitX = 0;
  let exitY = 0;

  if (entrySide === 0) {
    initialX = -1300 - (itemInCycle * 40);
    initialY = (itemInCycle % 2 === 0 ? -1 : 1) * (120 + (itemInCycle * 25));
    exitX = 1400 + (itemInCycle * 35);
    exitY = (itemInCycle % 2 === 0 ? 1 : -1) * (140 + (itemInCycle * 25));
  } else if (entrySide === 1) {
    initialX = 1300 + (itemInCycle * 40);
    initialY = (itemInCycle % 2 === 0 ? 1 : -1) * (140 + (itemInCycle * 25));
    exitX = -1400 - (itemInCycle * 35);
    exitY = (itemInCycle % 2 === 0 ? -1 : 1) * (120 + (itemInCycle * 25));
  } else if (entrySide === 2) {
    initialX = (itemInCycle % 2 === 0 ? -1 : 1) * (200 + (itemInCycle * 35));
    initialY = -1100 - (itemInCycle * 35);
    exitX = (itemInCycle % 2 === 0 ? 1 : -1) * (220 + (itemInCycle * 35));
    exitY = 1200 + (itemInCycle * 35);
  } else {
    initialX = (itemInCycle % 2 === 0 ? 1 : -1) * (200 + (itemInCycle * 35));
    initialY = 1100 + (itemInCycle * 35);
    exitX = (itemInCycle % 2 === 0 ? -1 : 1) * (220 + (itemInCycle * 35));
    exitY = -1200 - (itemInCycle * 35);
  }

  // Full-Page Natural Scatter (Spread randomly across ENTIRE screen)
  const seedX = Math.sin(i * 17.9898 + 45.12 + (cycle * 13.1)) * 10000;
  const randX = (seedX - Math.floor(seedX)) * 2 - 1; // -1 to +1

  const seedY = Math.cos(i * 43.233 + 12.89 + (cycle * 19.3)) * 10000;
  const randY = (seedY - Math.floor(seedY)) * 2 - 1; // -1 to +1

  // Full viewport spread across the entire desk page (-620px to +620px X, -360px to +360px Y)
  const targetX = randX * 620;
  const targetY = randY * 360;

  const rot = ((i % 11) - 5) * 5; // -25 to +25 deg
  const title = PHOTO_TITLES[i % PHOTO_TITLES.length];
  const desc = PHOTO_DESCS[i % PHOTO_DESCS.length];
  const category = ["ANALOG CRAFT", "MEDIUM FORMAT", "SILVER HALIDE", "CONTACT SHEET"][i % 4];
  const metaBadge = ["50mm ƒ/1.2", "35mm ƒ/1.4", "85mm ƒ/1.4", "28mm ƒ/2.0", "ISO 400", "1/500s", "ƒ/2.8", "ISO 100"][i % 8];

  return {
    id: i + 1,
    src: `/assets/items/item_${imgIdx}.jpg`,
    cycle,
    title,
    desc,
    category,
    metaBadge,
    initialX,
    initialY,
    targetX,
    targetY,
    exitX,
    exitY,
    rot,
  };
});

// Trailing stack cards for the snake motion
const TRAILING_STACK_CARDS = [
  { id: 't1', title: 'SILVER_HALIDE_ROLL04.RAW', type: 'negative', src: '/assets/items/item_8.jpg', offset: 1 },
  { id: 't2', title: 'LEICA_50MM_STUDY.DNG', type: 'contact', src: '/assets/items/item_12.jpg', offset: 2 },
  { id: 't3', title: 'MEDIUM_FORMAT_LOOKBOOK.RAW', type: 'exposure', src: '/assets/items/item_22.jpg', offset: 3 },
  { id: 't4', title: 'DARKROOM_EXPOSURE_LOG.PDF', type: 'darkroom_log', src: '/assets/items/item_31.jpg', offset: 4 },
  { id: 't5', title: 'PLATINUM_PALLADIUM_PRINT.TIFF', type: 'platinum_print', src: '/assets/items/item_45.jpg', offset: 5 },
];

export default function DeskScatterSection() {
  const sectionRef = useRef(null);

  // Phase container refs
  const scatterContainerRef = useRef(null);
  const textFindRef = useRef(null);
  const searchSectionRef = useRef(null);
  const searchBarRef = useRef(null);
  const initialRowRef = useRef(null);
  const replacementRowRef = useRef(null);
  const cursorRef = useRef(null);
  const draggedCardRef = useRef(null);
  const filmReelSectionRef = useRef(null);
  const aiChatSectionRef = useRef(null);
  const stackSectionRef = useRef(null);
  const leaderCardRef = useRef(null);
  const trailingChainRef = useRef(null);

  useLandoTextReveal(sectionRef, '.desk-find-title', {
    theme: 'dark',
    start: 'top 80%',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. ScrollTrigger timeline setup for Desk Section (Smoothed pinning & +40% scroll depth)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=728%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 0,
        },
      });

      /* ----------------------------------------------------
         PHASE 1: 4-Group Scatter Sequence (25 items per group across 4 cycles = 100 total)
         ---------------------------------------------------- */
      // Cycles 0, 1, 2: Enter and reverse back in same direction
      for (let c = 0; c < 3; c++) {
        const cycleSelector = `.cycle-${c}`;
        masterTl.fromTo(
          cycleSelector,
          {
            x: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].initialX,
            y: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].initialY,
            rotation: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].rot * 1.5,
          },
          {
            x: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].targetX,
            y: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].targetY,
            rotation: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].rot,
            ease: 'power2.out',
            duration: 1,
          }
        );
        masterTl.to(cycleSelector, {
          x: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].initialX,
          y: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].initialY,
          rotation: (i) => ALL_100_ITEMS.filter((it) => it.cycle === c)[i].rot * 1.5,
          ease: 'power2.in',
          duration: 1,
        });
      }

      // Cycle 3 (4th group): Enters, then ALL FLY UPWARDS off the top!
      const cycle3Selector = '.cycle-3';
      masterTl.fromTo(
        cycle3Selector,
        {
          x: (i) => ALL_100_ITEMS.filter((it) => it.cycle === 3)[i].initialX,
          y: (i) => ALL_100_ITEMS.filter((it) => it.cycle === 3)[i].initialY,
          rotation: (i) => ALL_100_ITEMS.filter((it) => it.cycle === 3)[i].rot * 1.5,
        },
        {
          x: (i) => ALL_100_ITEMS.filter((it) => it.cycle === 3)[i].targetX,
          y: (i) => ALL_100_ITEMS.filter((it) => it.cycle === 3)[i].targetY,
          rotation: (i) => ALL_100_ITEMS.filter((it) => it.cycle === 3)[i].rot,
          ease: 'power2.out',
          duration: 1,
        }
      );

      // 1. Synchronized 3-Way Parallel Transition (NO empty desk gap):
      // Cycle 3 images fly UPWARDS, center text fades OUT, 4 row cards enter from BOTTOM,
      // and Search Bar + Headline fade in seamlessly
      masterTl.to(cycle3Selector, {
        y: -1300,
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1.2,
      });

      masterTl.to(textFindRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
      }, '<');

      masterTl.to(searchSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '<');

      masterTl.fromTo(
        '.initial-row-card',
        { y: 850, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: 'power3.out',
          duration: 1.2,
        },
        '<'
      );

      // 2. Virtual cursor glides in to upcycled_shoot04.jpg (card 3 in row)
      masterTl.to(cursorRef.current, {
        x: 90,
        y: 60,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      });

      // 3. Highlight 3rd card and smoothly drag & scale it down directly into the LEFT slot of the search bar
      masterTl.to('.card-target-drop', {
        scale: 1.05,
        boxShadow: '0 0 35px rgba(255,255,255,0.7)',
        duration: 0.3,
      });

      masterTl.to([cursorRef.current, '.card-target-drop'], {
        x: () => {
          const card = document.querySelector('.card-target-drop');
          const bar = searchBarRef.current;
          if (!card || !bar) return -140;
          const cR = card.getBoundingClientRect();
          const bR = bar.getBoundingClientRect();
          return (bR.left + 140) - (cR.left + cR.width / 2);
        },
        y: () => {
          const card = document.querySelector('.card-target-drop');
          const bar = searchBarRef.current;
          if (!card || !bar) return -165;
          const cR = card.getBoundingClientRect();
          const bR = bar.getBoundingClientRect();
          return (bR.top + bR.height / 2) - (cR.top + cR.height / 2);
        },
        scale: 0.12, // Scales down directly into the search bar left slot
        duration: 1.1,
        ease: 'power2.inOut',
      });

      // 4. Search bar absorbs card: left-aligned chip appears seamlessly
      masterTl.to('.search-placeholder', { opacity: 0, duration: 0.15 });
      masterTl.to('.search-chip-badge', { opacity: 1, scale: 1, duration: 0.25 }, '<');
      masterTl.to(['.card-target-drop', cursorRef.current], { opacity: 0, duration: 0.15 }, '<');

      // 5. Remaining row cards scatter outward completely off-screen (fade to 0 so no stray cards peek)
      masterTl.to('.row-card-other', {
        x: (i) => (i % 2 === 0 ? -2500 : 2500),
        y: (i) => (i < 2 ? -650 : 650),
        opacity: 0,
        rotation: (i) => (i % 2 === 0 ? -25 : 25),
        duration: 1,
        ease: 'power2.inOut',
      });

      // 6. Simultaneously 2nd set of 4 cards comes from below (card 2 in orange)
      masterTl.fromTo(
        '.replacement-row-card',
        { y: 900, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: 'power2.out',
        },
        '<'
      );

      /* ----------------------------------------------------
         PHASE 3: 35mm Reel Entrance & Search Phase Physical Exit
         ---------------------------------------------------- */
      masterTl.to('.replacement-film-card', {
        scale: 1.08,
        borderColor: '#000000',
        boxShadow: '0 0 35px rgba(255,255,255,0.7)',
        duration: 0.4,
      });

      masterTl.to(filmReelSectionRef.current, {
        opacity: 1,
        duration: 0.6,
      });

      // 35mm frames glide in on scroll straight from right to left (rotation: 0, no tilt)
      masterTl.fromTo(
        ['.film-split-left', '.film-center-frame', '.film-split-right'],
        { x: '100vw', rotation: 0 },
        { x: 0, rotation: 0, duration: 2, ease: 'none' }
      );

      // Search cards physical exit (opacity: 1, NO opacity: 0)
      masterTl.to('.replacement-film-card', { opacity: 0, duration: 0.4 }, '<+=0.8');
      masterTl.to(searchSectionRef.current, { y: -800, duration: 0.8 }, '<');
      masterTl.to('.replacement-non-film', {
        x: (i) => (i === 0 ? -1600 : 1600),
        duration: 0.8,
      }, '<');

      /* ----------------------------------------------------
         PHASE 4: True Reel Split -> Outer 35mm Mounts Fly Off with OPACITY 1
         ---------------------------------------------------- */
      // 1. Central selected 35mm mount straightens up to rotation: 0 and anchors on left
      masterTl.to('.film-center-frame', {
        x: -220,
        y: 0,
        rotation: 0,
        scale: 1.15,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
      });

      // 2. Outer 35mm split mounts fly off-screen left & right (STRICT: MAINTAIN OPACITY 1)
      masterTl.to('.film-split-left', {
        x: -1600,
        rotation: -10,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.in',
      }, '<');

      masterTl.to('.film-split-right', {
        x: 1600,
        rotation: 10,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.in',
      }, '<');

      // AI Chat Conversation bubbles appear sequentially on the right
      masterTl.to(aiChatSectionRef.current, {
        opacity: 1,
        duration: 0.4,
      }, '<');

      masterTl.fromTo(
        '.ai-chat-bubble-1',
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );

      masterTl.fromTo(
        '.ai-chat-bubble-2',
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
        '+=0.2'
      );

      masterTl.fromTo(
        '.ai-chat-bubble-3',
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
        '+=0.2'
      );

      masterTl.fromTo(
        '.ai-chat-bubble-4',
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
        '+=0.2'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center select-none"
      style={{ touchAction: 'pan-y' }}
    >
      {/* ----------------------------------------------------
          PHASE 1: Headline 'Find your files naturally.' (Clean & Small, z-50 Fixed Over Scatter)
          ---------------------------------------------------- */}
      <div
        ref={textFindRef}
        className="absolute z-50 text-center px-4 max-w-xl pointer-events-none"
      >
        <h2 className="desk-find-title text-xl sm:text-2xl md:text-3xl font-serif text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] tracking-normal font-normal">
          Find your negatives naturally.
        </h2>
      </div>

      {/* ----------------------------------------------------
          PHASE 1: 56 Landscape Images - Drastically reduced compact size
          ---------------------------------------------------- */}
      <div
        ref={scatterContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        {ALL_100_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`cycle-${item.cycle} absolute origin-center will-change-transform`}
            style={{
              transform: `translate(${item.initialX}px, ${item.initialY}px) rotate(${item.rot}deg)`,
              opacity: 1,
            }}
          >
            {/* Sized +20% More: Bold, sleek photocard stamp in Pure White & Pure Black text */}
            <div className="w-40 sm:w-44 bg-white border border-stone-300 p-2 rounded-none flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Top Image Thumbnail (Enlarged +20%) */}
              <div className="w-full h-24 sm:h-28 overflow-hidden bg-black rounded-none">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Bottom Metadata Content */}
              <div className="flex flex-col pt-1.5 pb-0.5 text-left">
                <h3 className="text-[11px] sm:text-[12px] font-bold text-black tracking-tight truncate">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-black/15">
                  <span className="text-[7px] font-mono font-bold uppercase tracking-wider text-stone-700">
                    {item.category}
                  </span>
                  <span className="text-[7px] font-mono font-bold text-black border border-black/30 bg-black/5 px-1 py-0.2 rounded-none">
                    {item.metaBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------
          PHASE 2: Search Bar & Staggered Row Drag-and-Drop
          ---------------------------------------------------- */}
      <div
        ref={searchSectionRef}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none opacity-0 translate-y-10"
      >
        {/* Search Bar - Solid, centered, unbroken pill */}
        <div
          ref={searchBarRef}
          style={{ maxWidth: '520px' }}
          className="w-[90%] h-12 rounded-full bg-[#141418] border border-white/20 shadow-2xl flex items-center px-4 justify-between mb-8 z-20 pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            {/* Left-Aligned Search Chip (Monochrome styling in pure white) */}
            <div className="search-chip-badge opacity-0 scale-75 flex items-center gap-1.5 bg-white border border-black/20 px-2.5 py-0.5 rounded-full">
              <img src="/assets/items/item_3.jpg" alt="Contact Sheet Thumbnail" className="w-4 h-4 rounded-full object-cover" />
              <span className="text-[11px] font-mono font-bold text-black truncate">contact_sheet_roll04.raw</span>
            </div>
            <span className="search-placeholder text-stone-300 font-sans text-xs sm:text-sm truncate">
              Search raw negatives, contact sheets, silver halide prints...
            </span>
          </div>
          <div className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-stone-400 text-[10px] font-mono shrink-0 flex items-center">
            ↵
          </div>
        </div>

        {/* Initial Row of 4 Cards - Pure White Background & Pure Black Text */}
        <div ref={initialRowRef} className="flex items-center justify-center gap-3 sm:gap-4 mt-2 w-full max-w-6xl px-4">
          {/* Card 1: Leica 35mm */}
          <div className="initial-row-card row-card-other w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border border-stone-300 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[11px] text-black pb-1.5 border-b border-black/15">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold text-black tracking-wider">LEICA M11</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-semibold text-stone-700">50mm ƒ/1.2</span>
              </div>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_1.jpg" alt="Leica M11 35mm Frame" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">KODAK TRI-X 400</span>
              <span className="text-stone-700 font-semibold">ƒ/1.4 • 1/1000s</span>
            </div>
          </div>

          {/* Card 2: Hasselblad Medium Format */}
          <div className="initial-row-card row-card-other w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border border-stone-300 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[11px] text-black pb-1.5 border-b border-black/15">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold text-black tracking-wider">HASSELBLAD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-semibold text-stone-700">80mm ƒ/2.8</span>
              </div>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_2.jpg" alt="Hasselblad Medium Format Frame" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">PORTRA 800</span>
              <span className="text-stone-700 font-semibold">ƒ/2.8 • 1/250s</span>
            </div>
          </div>

          {/* Card 3: Contax T2 (Target Drop Card) */}
          <div className="initial-row-card card-target-drop w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border-2 border-black flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[11px] text-black pb-1.5 border-b border-black/15">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold text-black tracking-wider">CONTAX T2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-semibold text-stone-700">38mm ƒ/2.8</span>
              </div>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_3.jpg" alt="Contax T2 Negative Frame" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black font-semibold pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">ILFORD HP5+</span>
              <span className="text-stone-700 font-semibold">ƒ/4.0 • 1/500s</span>
            </div>
          </div>

          {/* Card 4: Linhof Large Format */}
          <div className="initial-row-card row-card-other w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border border-stone-300 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[11px] text-black pb-1.5 border-b border-black/15">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold text-black tracking-wider">LINHOF 4×5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-semibold text-stone-700">150mm ƒ/5.6</span>
              </div>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_4.jpg" alt="Linhof 4x5 Sheet Film" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">FUJI VELVIA 50</span>
              <span className="text-stone-700 font-semibold">ƒ/8.0 • 1/125s</span>
            </div>
          </div>
        </div>

        {/* Replacement Row of 4 Cards (Pure White Background & Pure Black Text) */}
        <div ref={replacementRowRef} className="absolute bottom-16 flex items-center justify-center gap-3 sm:gap-4 w-full max-w-6xl px-4">
          {/* Replacement Card 1 */}
          <div className="replacement-row-card replacement-non-film w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border border-stone-300 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[10px] text-black pb-1.5 border-b border-black/15">
              <span className="font-mono text-[9px] font-bold text-black">ARCHIVE: #04</span>
              <span className="font-mono text-[9px] font-semibold text-stone-700">ROLL: 120-B</span>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_5.jpg" alt="Gelatin Silver Archive 120-B" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">GELATIN SILVER</span>
              <span className="text-stone-700 font-semibold">PROVIA 100F</span>
            </div>
          </div>

          {/* Replacement Card 2 (Film Highlight Card in Pure White & Bold Black) */}
          <div className="replacement-row-card replacement-film-card w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border-2 border-black flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[10px] text-black pb-1.5 border-b border-black/15">
              <span className="font-mono text-[9px] font-bold text-black">FUJI-21</span>
              <span className="font-mono text-[9px] font-semibold text-stone-700">RDPII</span>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_6.jpg" alt="Fuji Chrome Slide 5600K" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black font-semibold pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">CHROME SLIDE</span>
              <span className="text-stone-700 font-semibold">DAYLIGHT 5600K</span>
            </div>
          </div>

          {/* Replacement Card 3 */}
          <div className="replacement-row-card replacement-non-film w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border border-stone-300 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[10px] text-black pb-1.5 border-b border-black/15">
              <span className="font-mono text-[9px] font-bold text-black">ARCHIVE: #08</span>
              <span className="font-mono text-[9px] font-semibold text-stone-700">ROLL: 35-A</span>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_7.jpg" alt="Selenium Tone Tri-X 400" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">SELENIUM TONE</span>
              <span className="text-stone-700 font-semibold">TRI-X 400</span>
            </div>
          </div>

          {/* Replacement Card 4 */}
          <div className="replacement-row-card replacement-non-film w-48 sm:w-52 bg-white rounded-none overflow-hidden shadow-2xl p-2.5 border border-stone-300 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[10px] text-black pb-1.5 border-b border-black/15">
              <span className="font-mono text-[9px] font-bold text-black">ARCHIVE: #14</span>
              <span className="font-mono text-[9px] font-semibold text-stone-700">ROLL: 120-D</span>
            </div>
            <div className="my-2 aspect-[16/10] rounded-none overflow-hidden bg-black">
              <img src="/assets/items/item_8.jpg" alt="Platinum Print Delta 3200" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-mono text-black pt-1 flex items-center justify-between border-t border-black/15">
              <span className="font-bold text-black">PLATINUM PRINT</span>
              <span className="text-stone-700 font-semibold">DELTA 3200</span>
            </div>
          </div>
        </div>

        {/* Virtual Cursor */}
        <div
          ref={cursorRef}
          className="absolute z-50 pointer-events-none opacity-0 flex items-center gap-1 drop-shadow-2xl"
          style={{ transform: 'translate(0px, 0px)' }}
        >
          <svg className="w-8 h-8 text-white filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] fill-white" viewBox="0 0 24 24">
            <path d="M4 2l16 12.5-6.5 1.5 4 8-3 1.5-4-8-4.5 4.5V2z" />
          </svg>
        </div>
      </div>

      {/* ----------------------------------------------------
          PHASE 3 & 4: 7 Independent 35mm Slide Mounts, Split & AI Chat (z-[100])
          ---------------------------------------------------- */}
      <div
        ref={filmReelSectionRef}
        className="absolute inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none opacity-0"
      >
        {/* 7 Standalone 35mm Slide Mounts (Continuous film reel with gap-0) */}
        <div className="relative flex items-center justify-center gap-0 px-12">
          {/* Frame 1: Kodak Tri-X */}
          <div className="film-split-left w-52 sm:w-60 h-[260px] bg-black p-2.5 rounded-none overflow-hidden border border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>KODAK TRI-X</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>18</span>
            </div>
            <img src="/assets/items/item_14.jpg" alt="Kodak Tri-X 35mm Reel Frame 18" className="w-full h-44 object-cover rounded-none my-1" />
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>▷17A</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>18</span>
            </div>
          </div>

          {/* Frame 2: Ilford HP5 */}
          <div className="film-split-left w-52 sm:w-60 h-[260px] bg-black p-2.5 rounded-none overflow-hidden border border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>ILFORD HP5+</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>19</span>
            </div>
            <img src="/assets/items/item_9.jpg" alt="Ilford HP5 35mm Reel Frame 19" className="w-full h-44 object-cover rounded-none my-1" />
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>▷18A</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>19</span>
            </div>
          </div>

          {/* Frame 3: Kodak Portra */}
          <div className="film-split-left w-52 sm:w-60 h-[260px] bg-black p-2.5 rounded-none overflow-hidden border border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>PORTRA 400</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>20</span>
            </div>
            <img src="/assets/items/item_10.jpg" alt="Kodak Portra 35mm Reel Frame 20" className="w-full h-44 object-cover rounded-none my-1" />
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>▷19A</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>20</span>
            </div>
          </div>

          {/* Frame 4: Central Active Fujichrome Velvia 50 Frame */}
          <div className="film-center-frame w-64 sm:w-72 h-[275px] bg-black p-2.5 rounded-none overflow-hidden border-2 border-white shadow-[0_0_25px_rgba(255,255,255,0.15)] flex flex-col justify-between shrink-0 z-20">
            <div className="flex items-center justify-between text-[9px] font-mono text-stone-300 font-medium px-1">
              <span>VELVIA 50</span>
              <div className="flex items-center gap-1.5">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/95 rounded-none"></div>
                ))}
              </div>
              <span>21</span>
            </div>
            <img src="/assets/items/item_6.jpg" alt="Fujichrome Velvia 35mm Master Exposure Frame 21" className="w-full h-48 object-cover rounded-none my-1" />
            <div className="flex items-center justify-between text-[9px] font-mono text-stone-300 font-medium px-1">
              <span>▷20A</span>
              <div className="flex items-center gap-1.5">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/95 rounded-none"></div>
                ))}
              </div>
              <span>21</span>
            </div>
          </div>

          {/* Frame 5: CineStill 800T */}
          <div className="film-split-right w-52 sm:w-60 h-[260px] bg-black p-2.5 rounded-none overflow-hidden border border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>CINESTILL 800T</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>22</span>
            </div>
            <img src="/assets/items/item_11.jpg" alt="CineStill 800T 35mm Reel Frame 22" className="w-full h-44 object-cover rounded-none my-1" />
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>▷21A</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>22</span>
            </div>
          </div>

          {/* Frame 6: Kodak Ektachrome E100 */}
          <div className="film-split-right w-52 sm:w-60 h-[260px] bg-black p-2.5 rounded-none overflow-hidden border border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>EKTACHROME 100</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>23</span>
            </div>
            <img src="/assets/items/item_12.jpg" alt="Kodak Ektachrome 35mm Reel Frame 23" className="w-full h-44 object-cover rounded-none my-1" />
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>▷22A</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>23</span>
            </div>
          </div>

          {/* Frame 7: Ilford Delta 3200 */}
          <div className="film-split-right w-52 sm:w-60 h-[260px] bg-black p-2.5 rounded-none overflow-hidden border border-white/25 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>DELTA 3200</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>24</span>
            </div>
            <img src="/assets/items/item_13.jpg" alt="Ilford Delta 35mm Reel Frame 24" className="w-full h-44 object-cover rounded-none my-1" />
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-300 px-1">
              <span>▷23A</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-white/90 rounded-none"></div>
                ))}
              </div>
              <span>24</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Speech Bubbles Container (Elevated to z-[150] & Styled in Pure Dark Monochrome) */}
      <div
        ref={aiChatSectionRef}
        className="absolute inset-0 z-[150] flex items-center justify-center pointer-events-none opacity-0 px-4"
      >
        <div className="flex flex-col gap-3.5 max-w-md ml-72">
          {/* Photographer Message 1 */}
          <div className="ai-chat-bubble-1 bg-[#121216] border border-white/20 rounded-none p-3.5 shadow-2xl text-xs sm:text-sm text-stone-200 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-none bg-stone-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">P</div>
            <div>
              <div className="text-[10px] text-stone-400 font-semibold mb-0.5">Photographer</div>
              Can you locate the raw medium format contact sheet for this frame? Check the archive 'Dolomites Autumn'.
            </div>
          </div>

          {/* AI Response 1 with Thumbnail Chip */}
          <div className="ai-chat-bubble-2 bg-[#1a1a20] border border-white/20 rounded-none p-3.5 shadow-2xl text-xs sm:text-sm text-stone-100 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-stone-200 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-stone-300" /> Darkroom Assistant
            </div>
            <span className="text-xs text-stone-300">
              Scanned the 'Dolomites Autumn' negative archive. Located matching high-density silver halide negative scan in Roll 04.
            </span>
            <div className="flex items-center gap-2 bg-[#121216] border border-white/20 p-2 rounded-none mt-0.5">
              <img src="/assets/items/item_6.jpg" alt="Dolomites Negative Raw Scan" className="w-8 h-8 rounded-none object-cover" />
              <span className="text-xs font-mono text-stone-200">Dolomites_Negative_Frame04.raw</span>
            </div>
          </div>

          {/* Photographer Message 2 */}
          <div className="ai-chat-bubble-3 bg-[#121216] border border-white/20 rounded-none p-3.5 shadow-2xl text-xs sm:text-sm text-stone-200 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-none bg-stone-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">P</div>
            <div>
              <div className="text-[10px] text-stone-400 font-semibold mb-0.5">Photographer</div>
              Can you analyze the shadow density and grain sharpness for a 24×36 inch exhibition print?
            </div>
          </div>

          {/* AI Response 2 */}
          <div className="ai-chat-bubble-4 bg-[#1a1a20] border border-white/20 rounded-none p-3.5 shadow-2xl text-xs sm:text-sm text-stone-100 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-stone-200 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-stone-300" /> Darkroom Assistant
            </div>
            <span className="text-xs text-stone-300">
              Zone III shadow density verified at 0.18 D-max. Acutance and silver grain structure optimal for 300 DPI Ilford Galerie fiber base enlargement.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
