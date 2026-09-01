import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STACKED_CARDS = [
  {
    id: 1,
    tag: 'BRAND IDENTITY',
    image: '/images/section3/baptiste-merel--bYa_kDl_tk-unsplash.webp',
  },
  {
    id: 2,
    tag: 'ARCHITECTURAL FORM',
    image: '/images/section3/brian-lundquist-xJWUhJP-qPc-unsplash.webp',
  },
  {
    id: 3,
    tag: 'WEBSITE',
    image: '/images/section3/erik-mclean-7jRqtUvNFgA-unsplash.webp',
  },
  {
    id: 4,
    tag: 'PRODUCT INNOVATION',
    image: '/images/section3/jr-korpa-07mULu__htY-unsplash.webp',
  },
  {
    id: 5,
    tag: 'CONTENT',
    image: '/images/section3/mahdi-bafande-niZ0qgwIEUk-unsplash.webp',
  },
  {
    id: 6,
    tag: 'EDITORIAL ARCHIVE',
    image: '/images/section3/olegs-jonins-w13BMngq7JM-unsplash.webp',
  },
];

export const StackedCardsDeck = memo(() => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const totalCards = cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalCards * 100}%`,
          pin: true,
          scrub: 1,
        },
      });

      // Staggered 3D backward movement for each card
      cards.forEach((card, i) => {
        if (i < totalCards - 1) {
          const nextCard = cards[i + 1];

          tl.to(
            card,
            {
              scale: 0.82,
              yPercent: -12,
              opacity: 0.35,
              filter: 'blur(3px)',
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${i}`
          );

          if (nextCard) {
            tl.fromTo(
              nextCard,
              { yPercent: 100, scale: 0.95, opacity: 0.6 },
              {
                yPercent: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
              },
              `step-${i}`
            );
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#141416] text-white flex flex-col items-center justify-center overflow-hidden [perspective:1400px] select-none"
    >
      {/* 3D Cards Stack Container */}
      <div className="relative w-[88vw] max-w-4xl aspect-[16/10] flex items-center justify-center [transform-style:preserve-3d]">
        {STACKED_CARDS.map((item, idx) => {
          return (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-white/15 bg-neutral-900 will-change-transform"
              style={{
                zIndex: idx + 1,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Category Tag Header */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                  {item.tag}
                </span>
              </div>

              {/* Background Image */}
              <img
                src={item.image}
                alt={item.tag}
                className="w-full h-full object-cover object-center transform scale-100"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default StackedCardsDeck;
