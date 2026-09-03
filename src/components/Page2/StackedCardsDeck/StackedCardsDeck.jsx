import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STACKED_CARDS = [
  {
    id: 1,
    title: 'CINEMATIC PORTRAITURE',
    image: '/images/section3/baptiste-merel--bYa_kDl_tk-unsplash.webp',
  },
  {
    id: 2,
    title: 'ARCHITECTURAL LIGHT',
    image: '/images/section3/brian-lundquist-xJWUhJP-qPc-unsplash.webp',
  },
  {
    id: 3,
    title: 'ANALOGUE GRAIN',
    image: '/images/section3/erik-mclean-7jRqtUvNFgA-unsplash.webp',
  },
  {
    id: 4,
    title: 'SHADOW GEOMETRY',
    image: '/images/section3/jr-korpa-07mULu__htY-unsplash.webp',
  },
  {
    id: 5,
    title: 'EDITORIAL HIGH-FASHION',
    image: '/images/section3/mahdi-bafande-niZ0qgwIEUk-unsplash.webp',
  },
  {
    id: 6,
    title: 'RAW MONOCHROME',
    image: '/images/section3/olegs-jonins-w13BMngq7JM-unsplash.webp',
  },
];

const ROTATIONS = [-8, 7, -10, 9, -7, 8];

export const StackedCardsDeck = memo(() => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const totalCards = cards.length;

      cards.forEach((card, idx) => {
        if (!card) return;
        if (idx > 0) {
          gsap.set(card, { yPercent: 100, scale: 1, opacity: 1, rotation: 0 });
        } else {
          gsap.set(card, { yPercent: 0, scale: 1, opacity: 1, rotation: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${(totalCards - 1) * 140}%`,
          pin: true,
          scrub: 1.5,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const targetRot = ROTATIONS[i % ROTATIONS.length];
        const stepStart = `step-${i}`;

        tl.fromTo(
          nextCard,
          { yPercent: 100, scale: 1, rotation: 0, opacity: 1 },
          { yPercent: 0, scale: 1, rotation: 0, opacity: 1, duration: 1.0, ease: 'power1.inOut' },
          stepStart
        );

        tl.to(
          currentCard,
          {
            scale: 0.5,
            opacity: 0,
            rotation: targetRot,
            yPercent: -16,
            duration: 1.0,
            ease: 'power1.inOut',
          },
          stepStart
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#141416] text-white flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        perspective: '1400px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 'min(88vw, 860px)',
          height: 'clamp(380px, 58vh, 520px)',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          borderRadius: '0px',
        }}
      >
        {STACKED_CARDS.map((item, idx) => {
          return (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full overflow-hidden border border-white/15 bg-neutral-900 will-change-transform"
              style={{
                zIndex: 10 + idx,
                transformOrigin: 'center bottom',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.85)',
                borderRadius: '0px',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transform scale-100"
                loading="eager"
              />

              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-6 text-center">
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    textShadow: '0 4px 25px rgba(0,0,0,0.95)',
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default StackedCardsDeck;
