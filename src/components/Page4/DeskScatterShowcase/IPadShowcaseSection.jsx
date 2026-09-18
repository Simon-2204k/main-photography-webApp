import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IPAD_FEED_COLUMNS = [
  [
    { id: 'f1', src: '/assets/items/item_1.jpg', h: 'h-40' },
    { id: 'f2', src: '/assets/items/item_2.jpg', h: 'h-52' },
    { id: 'f3', src: '/assets/items/item_3.jpg', h: 'h-36' },
  ],
  [
    { id: 'f4', src: '/assets/items/item_4.jpg', h: 'h-48' },
    { id: 'f5', src: '/assets/items/item_5.jpg', h: 'h-36' },
    { id: 'f6', src: '/assets/items/item_6.jpg', h: 'h-44' },
  ],
  [
    { id: 'f7', src: '/assets/items/item_7.jpg', h: 'h-36' },
    { id: 'f8', src: '/assets/items/item_8.jpg', h: 'h-48' },
    { id: 'f9', src: '/assets/items/item_9.jpg', h: 'h-40' },
  ],
  [
    { id: 'f10', src: '/assets/items/item_10.jpg', h: 'h-48' },
    { id: 'f11', src: '/assets/items/item_1.jpg', h: 'h-36' },
    { id: 'f12', src: '/assets/items/item_2.jpg', h: 'h-44' },
  ],
];

export default function IPadShowcaseSection() {
  const sectionRef = useRef(null);
  const internalFeedRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const internalFeed = internalFeedRef.current;
    if (!section || !internalFeed) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Internal feed scrolls smoothly, then immediately transitions to next section
      tl.to(internalFeed, {
        y: -380,
        duration: 1,
        ease: 'power1.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Main Layout Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-center gap-12">
        {/* Left Side Content */}
        <div className="w-full max-w-md pr-6">
          <div className="relative inline-block mb-3">
            <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight drop-shadow-lg">
              with beautiful, <br />
              flexible{' '}
              <span className="relative inline-block font-semibold">
                view modes
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="#FF5722"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M2 7 Q 50 1, 98 6" />
                </svg>
              </span>{' '}
              <br />
              at your fingertips.
            </h2>
          </div>
        </div>

        {/* Right Side: iPad Device Mockup */}
        <div className="relative shrink-0 w-[580px] sm:w-[680px] h-[440px] sm:h-[490px] rounded-[38px] bg-[#1a1a1e] p-3.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_0_2px_#333339]">
          {/* iPad Camera Notch & Bezel */}
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-1.5 h-10 rounded-r bg-[#2a2a30]" />
          <div className="absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0a0a0f] border border-stone-800" />

          {/* iPad Display Screen */}
          <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#111114] border border-white/10">
            {/* Masonry Grid Media Feed */}
            <div className="absolute inset-0 flex flex-col">
              {/* App Top Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-stone-900/90 border-b border-white/10 text-xs font-mono text-stone-300">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-stone-200 font-sans font-semibold">
                    Home / Personal
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white font-sans">
                    Feed View
                  </span>
                </div>
              </div>

              {/* Internal Scrolling Masonry Container */}
              <div className="relative flex-1 overflow-hidden p-3">
                <div
                  ref={internalFeedRef}
                  className="grid grid-cols-4 gap-2.5 will-change-transform"
                >
                  {IPAD_FEED_COLUMNS.map((col, cIdx) => (
                    <div key={`col-${cIdx}`} className="flex flex-col gap-2.5">
                      {col.map((item) => (
                        <div
                          key={item.id}
                          className={`w-full ${item.h} rounded-xl overflow-hidden bg-stone-800 border border-white/10 shadow-lg`}
                        >
                          <img
                            src={item.src}
                            alt="iPad feed item"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
