import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FixedCenterCard({ projects, activeIndex }) {
  const cardRef = useRef(null);
  const numberStripRef = useRef(null);
  const textStripRef = useRef(null);
  const thumbStripRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const worksEl = document.getElementById('works');
    const ctx = gsap.context(() => {
      if (worksEl) {
        ScrollTrigger.create({
          trigger: worksEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          onUpdate: (self) => {
            const progress = self.progress;
            const total = projects.length;
            const targetIndex = progress * (total - 1);
            setScrollPos(targetIndex);

            // Smooth vertical shift for thumbnail strip (110px mobile, 150px desktop)
            const thumbH = window.innerWidth <= 640 ? 110 : 150;
            if (thumbStripRef.current) {
              gsap.to(thumbStripRef.current, {
                y: -targetIndex * thumbH,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }

            // Smooth vertical shift for top number strip (20px per item slot)
            if (numberStripRef.current) {
              gsap.to(numberStripRef.current, {
                y: -targetIndex * 20,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }

            // Smooth vertical shift for text strip (24px per item slot)
            if (textStripRef.current) {
              gsap.to(textStripRef.current, {
                y: -targetIndex * 24,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          },
        });
      }
    }, card);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none select-none">
      {/* Fixed White Card Container: 780px Width x 220px Height (Responsive on mobile) */}
      <div
        ref={cardRef}
        className="w-[92vw] max-w-[780px] h-[180px] sm:h-[220px] bg-white text-black px-4 py-3.5 sm:px-7 sm:py-6 shadow-[0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden relative flex flex-col justify-between"
      >
        {/* Top Header Row inside Fixed Card: Dynamic Left Number Strip (01..05) + Constant '07' Right */}
        <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] text-neutral-800 z-20">
          <div className="h-[20px] overflow-hidden relative">
            <div ref={numberStripRef} className="w-full flex flex-col transition-none">
              {projects.map((proj, idx) => {
                const offset = idx - scrollPos;
                const opacity = Math.max(0, 1 - Math.abs(offset) * 1.2);
                const blurAmount = offset < -0.1 ? Math.min(8, Math.abs(offset) * 6) : 0;

                return (
                  <span
                    key={proj.id}
                    style={{
                      height: '20px',
                      opacity: opacity,
                      filter: `blur(${blurAmount}px)`,
                    }}
                    className="shrink-0 flex items-center"
                  >
                    {proj.number}
                  </span>
                );
              })}
            </div>
          </div>
          <span>07</span>
        </div>

        {/* Center Row inside Fixed Card: Shadowless Prominent Thumbnail Image Box */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-[185px] sm:w-[255px] h-[110px] sm:h-[150px] overflow-hidden bg-neutral-200 shadow-none border-0">
            {/* Vertical Thumbnail Strip */}
            <div ref={thumbStripRef} className="w-full flex flex-col transition-none">
              {projects.map((proj) => (
                <div key={proj.id} className="w-[185px] sm:w-[255px] h-[110px] sm:h-[150px] shrink-0 overflow-hidden relative">
                  <img
                    src={proj.thumbImage}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center contrast-[1.05] brightness-[0.98] transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer Row: Clean Non-Overlapping Single-Line Text with Kinetic Blur */}
        <div className="relative z-20 h-[24px] overflow-hidden border-0 pt-0">
          <div ref={textStripRef} className="w-full flex flex-col transition-none">
            {projects.map((proj, idx) => {
              const offset = idx - scrollPos;

              // Progressive blur begins when title translates past midpoint (-0.4)
              const isPastMidpoint = offset < -0.4;
              const blurAmount = isPastMidpoint ? Math.min(12, (Math.abs(offset) - 0.4) * 18) : 0;
              const opacity = Math.max(0, 1 - Math.abs(offset) * 1.15);

              return (
                <div
                  key={proj.id}
                  style={{
                    height: '24px',
                    filter: `blur(${blurAmount}px)`,
                    opacity: opacity,
                    transition: 'filter 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                  className="flex items-center justify-between font-sans uppercase shrink-0 gap-2"
                >
                  {/* Left Column: Clean Small Inter Title with mobile safety truncation */}
                  <span className="text-[9.5px] sm:text-[12px] font-bold tracking-[0.03em] text-black max-w-[55%] truncate">
                    {proj.title}
                  </span>

                  {/* Right Column: Clean Small Inter Category Tag with mobile safety truncation */}
                  <span className="text-[7.5px] sm:text-[9.5px] tracking-[0.08em] sm:tracking-[0.15em] text-neutral-500 font-semibold max-w-[42%] truncate text-right">
                    {proj.categories}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
