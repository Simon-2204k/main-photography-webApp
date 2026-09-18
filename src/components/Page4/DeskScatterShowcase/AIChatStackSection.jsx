import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, User, FileText, Image as ImageIcon, Video, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Stacked files that gather underneath the central card
const STACK_FILES = [
  { id: 1, type: 'magazine', title: 'STREETWEAR UPCYCLING', src: '/assets/items/item_5.jpg', rot: -8, scale: 0.95 },
  { id: 2, type: 'document', title: 'Research Report 2026', src: '/assets/items/item_27.jpg', rot: 12, scale: 0.92 },
  { id: 3, type: 'photo', title: 'Lookbook Editorial', src: '/assets/items/item_28.jpg', rot: -15, scale: 0.9 },
  { id: 4, type: 'code', title: 'imaginable.py', src: '/assets/items/item_29.jpg', rot: 6, scale: 0.88 },
  { id: 5, type: 'audio', title: 'Interview_Audio.wav', src: '/assets/items/item_30.jpg', rot: -3, scale: 0.85 },
];

export default function AIChatStackSection() {
  const sectionRef = useRef(null);
  const mainCardRef = useRef(null);
  const chatGroupRef = useRef(null);
  const fileStackRef = useRef(null);
  const headlineStackRef = useRef(null);
  const calloutsRef = useRef(null);
  const headlineSlantRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mainCard = mainCardRef.current;
    const chatGroup = chatGroupRef.current;
    const fileStack = fileStackRef.current;
    const headlineStack = headlineStackRef.current;
    const callouts = calloutsRef.current;
    const headlineSlant = headlineSlantRef.current;

    if (!section || !mainCard) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Initial State: Main central card pinned, Chat bubbles pop up
      tl.fromTo(
        mainCard,
        { scale: 0.9, rotation: 0, opacity: 0.8 },
        { scale: 1.05, rotation: 4, opacity: 1, duration: 0.4 }
      );

      tl.fromTo(
        chatGroup,
        { opacity: 0, x: 50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
        'chatIn'
      );

      // 2. Chat bubbles fade out, leaving the isolated card on desk
      tl.to({}, { duration: 0.3 }); // hold
      tl.to(
        chatGroup,
        { opacity: 0, x: 30, scale: 0.95, duration: 0.4, ease: 'power2.in' },
        'chatOut'
      );

      // 3. Headline for stack appears: "It works with nearly every file type imaginable.py"
      tl.to(
        headlineStack,
        { opacity: 1, y: 0, duration: 0.4 },
        'stackIn'
      );

      // 4. Multiple files fly in and gather underneath the main card into a neat stack
      tl.fromTo(
        '.stack-item',
        {
          x: (i) => (i % 2 === 0 ? -400 : 400),
          y: (i) => (i % 3 === 0 ? 350 : -350),
          opacity: 0,
          scale: 0.6,
          rotation: (i) => (i % 2 === 0 ? -45 : 45),
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: (i) => STACK_FILES[i].scale,
          rotation: (i) => STACK_FILES[i].rot,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
        },
        'stackIn+=0.1'
      );

      // 5. Chalk callout labels and arrows radiate outward
      tl.fromTo(
        callouts,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' },
        'stackIn+=0.5'
      );

      // Hold assembled stack
      tl.to({}, { duration: 0.3 });

      // 6. Section 6: Slanted Fanning Transformation (/ to \)
      // Stack headline & callouts fade out, Slant headline fades in
      tl.to([headlineStack, callouts], { opacity: 0, y: -20, duration: 0.3 }, 'slantStart');
      tl.to(headlineSlant, { opacity: 1, y: 0, duration: 0.4 }, 'slantStart+=0.1');

      // Diagonal slant / (fanning towards top-right)
      tl.to(
        fileStack,
        {
          x: 180,
          y: -40,
          rotation: -18,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        'slantForward'
      );
      tl.to(
        '.stack-item',
        {
          x: (i) => i * 45,
          y: (i) => -i * 35,
          rotation: (i) => -15 + i * 5,
          stagger: 0.02,
          duration: 0.7,
        },
        'slantForward'
      );
      tl.to(
        mainCard,
        { x: -60, y: 40, rotation: -12, scale: 1.1, duration: 0.7 },
        'slantForward'
      );

      // Smooth pivot across desk from right to left into opposite slant \ (cascading towards bottom-right)
      tl.to(
        fileStack,
        {
          x: 240,
          y: 60,
          rotation: 16,
          duration: 0.9,
          ease: 'power2.inOut',
        },
        'slantReverse'
      );
      tl.to(
        '.stack-item',
        {
          x: (i) => i * 55,
          y: (i) => i * 40,
          rotation: (i) => 12 + i * 6,
          stagger: 0.03,
          duration: 0.9,
        },
        'slantReverse'
      );
      tl.to(
        mainCard,
        { x: -100, y: -30, rotation: 10, scale: 1.15, duration: 0.9 },
        'slantReverse'
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen wood-bg overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Ambient Wood Shadow */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Top Headline 1: Stack Announcement */}
      <div
        ref={headlineStackRef}
        className="relative z-20 text-center mb-6 px-6 max-w-4xl opacity-0 -translate-y-4"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white/95 drop-shadow-xl">
          It works with nearly every file <br />
          type <span className="font-mono text-[#FF7043] font-bold">imaginable.py</span>
        </h2>
      </div>

      {/* Top Headline 2: Slanted Transformation Text (Section 6) */}
      <div
        ref={headlineSlantRef}
        className="absolute top-24 left-8 sm:left-16 z-20 max-w-lg opacity-0 -translate-y-4"
      >
        <div className="relative">
          {/* Handwritten Arrow Above */}
          <div className="mb-2">
            <svg width="60" height="24" viewBox="0 0 80 30" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
              <path d="M10 25 C 20 5, 50 5, 70 20 M 55 15 L 70 20 L 68 8" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight drop-shadow-xl">
            Transform the way <br />
            you see{' '}
            <span className="relative inline-block font-semibold">
              your files...
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 8 Q 50 14, 98 4" />
              </svg>
            </span>
          </h2>
        </div>
      </div>

      {/* Central Desk Canvas Area */}
      <div className="relative w-full max-w-5xl h-[480px] flex items-center justify-center">
        
        {/* Main Pinned Film Card */}
        <div
          ref={mainCardRef}
          className="relative z-30 film-frame w-48 sm:w-64 h-60 sm:h-76 rounded-md p-1 bg-black shadow-[0_25px_50px_rgba(0,0,0,0.8)] will-change-transform"
        >
          <img
            src="/assets/items/item_4.jpg"
            alt="main film frame"
            className="w-full h-full object-cover rounded-sm filter brightness-105"
          />
          <div className="absolute top-1 left-2 text-[8px] font-mono text-white/60">FUJI RDPII 21</div>
          <div className="absolute bottom-1 right-2 text-[8px] font-mono text-white/60">▶ 20A 21</div>
        </div>

        {/* AI Chat Dialog (Section 5) */}
        <div
          ref={chatGroupRef}
          className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 z-40 max-w-sm flex flex-col gap-3 pointer-events-none"
        >
          {/* User Chat Bubble */}
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-stone-900/90 border border-white/15 text-stone-200 text-xs shadow-2xl backdrop-blur-xl">
            <div className="w-6 h-6 rounded-full bg-stone-700 overflow-hidden shrink-0">
              <img src="/assets/items/item_31.jpg" alt="user avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-sans leading-relaxed">
                Can you find the pre-edited footage for this? it might be in the folder <span className="text-[#FF7043] font-semibold">'Upcycle Shoot'</span>
              </p>
            </div>
          </div>

          {/* Poly AI Response Bubble */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-stone-950/95 border border-[#FF5722]/40 text-stone-100 text-xs shadow-2xl backdrop-blur-2xl">
            <div className="w-6 h-6 rounded-full bg-[#FF5722] flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="space-y-2">
              <p className="font-sans leading-relaxed text-stone-300">
                I looked in the folder <span className="font-medium text-white">'Upcycle Shoot'</span> and wasn't able to find any matching clips. Broadening my search, I was able to find it in <span className="text-[#FF7043] font-semibold">'Upcycle Shoot Footage'</span> though. Here it is:
              </p>
              
              {/* Embedded Found Thumbnail Chip */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-black/60 border border-white/10 w-fit">
                <img src="/assets/items/item_4.jpg" alt="raw footage thumbnail" className="w-7 h-7 object-cover rounded" />
                <span className="text-[10px] font-mono text-[#FF7043] font-semibold">Upcycle_Shoot_Raw.jpg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stack of files that gather below the card */}
        <div
          ref={fileStackRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 will-change-transform"
        >
          {STACK_FILES.map((file) => (
            <div
              key={file.id}
              className="stack-item absolute w-48 sm:w-64 h-64 sm:h-80 rounded-md paper-shadow overflow-hidden bg-white text-stone-900 border border-stone-200"
              style={{
                transform: `rotate(${file.rot}deg) scale(${file.scale})`,
              }}
            >
              {file.type === 'magazine' ? (
                <div className="w-full h-full bg-slate-900 p-2 flex flex-col justify-between text-white">
                  <div className="text-[10px] font-mono tracking-widest text-[#FF7043] font-bold">
                    {file.title}
                  </div>
                  <img src={file.src} alt={file.title} className="w-full h-44 object-cover rounded" />
                  <div className="text-[8px] font-mono text-stone-400">ISSUE #48 • DIGITAL ARCHIVE</div>
                </div>
              ) : file.type === 'document' ? (
                <div className="w-full h-full bg-stone-50 p-3 flex flex-col justify-between text-stone-800 font-serif">
                  <div>
                    <h4 className="text-xs font-bold font-sans uppercase tracking-wider mb-1">
                      {file.title}
                    </h4>
                    <p className="text-[8px] leading-relaxed text-stone-600 line-clamp-6">
                      An exhaustive overview of generative search pipelines across multi-modal dataset corpora. Semantic vector alignments enable instantaneous cross-referencing of visual and textual nodes.
                    </p>
                  </div>
                  <div className="text-[8px] font-mono text-stone-400 border-t pt-1">PAGE 1 OF 34</div>
                </div>
              ) : (
                <div className="w-full h-full bg-stone-900 p-1">
                  <img src={file.src} alt={file.title} className="w-full h-full object-cover rounded" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chalk Callout Labels & Arrows (radiating outward) */}
        <div
          ref={calloutsRef}
          className="absolute inset-0 pointer-events-none z-40 opacity-0"
        >
          {/* Top Left: Audio */}
          <div className="absolute top-8 left-12 sm:left-24 flex items-center gap-2">
            <span className="font-chalk text-2xl text-white tracking-wide border-2 border-white/80 rounded-full px-4 py-1">
              audio
            </span>
            <svg width="40" height="20" viewBox="0 0 50 20" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 10 Q 25 18, 45 12 M 35 6 L 45 12 L 38 18" />
            </svg>
          </div>

          {/* Top Right: Images */}
          <div className="absolute top-10 right-12 sm:right-28 flex items-center gap-2">
            <svg width="40" height="20" viewBox="0 0 50 20" fill="none" stroke="white" strokeWidth="2">
              <path d="M45 10 Q 25 18, 5 12 M 15 6 L 5 12 L 12 18" />
            </svg>
            <span className="font-chalk text-2xl text-white tracking-wide border-b-2 border-white pb-0.5">
              images
            </span>
          </div>

          {/* Bottom Left: Videos */}
          <div className="absolute bottom-12 left-10 sm:left-20 flex items-center gap-2">
            <span className="font-chalk text-2xl text-white tracking-wide border-2 border-white/80 rounded-full px-4 py-1">
              videos
            </span>
            <svg width="40" height="20" viewBox="0 0 50 20" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 10 Q 25 2, 45 8 M 35 14 L 45 8 L 38 2" />
            </svg>
          </div>

          {/* Bottom Right: Documents */}
          <div className="absolute bottom-14 right-10 sm:right-24 flex items-center gap-2">
            <svg width="40" height="20" viewBox="0 0 50 20" fill="none" stroke="white" strokeWidth="2">
              <path d="M45 10 Q 25 2, 5 8 M 15 14 L 5 8 L 12 2" />
            </svg>
            <span className="font-chalk text-2xl text-white tracking-wide border-b-2 border-white pb-0.5">
              documents
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
