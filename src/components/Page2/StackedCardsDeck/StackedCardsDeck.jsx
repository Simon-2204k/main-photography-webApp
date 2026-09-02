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

// Organic rotations strictly within [-10deg, +10deg] range for exiting cards
const ROTATIONS = [-8, 7, -10, 9, -7, 8];

export const StackedCardsDeck = memo(() => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const totalCards = cards.length;

      // Pre-position Cards 1..5 flush at the bottom edge of current card (yPercent: 100)
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
          scrub: 1.5, // Ultra-smooth scrub interpolation
        },
      });

      // Step-by-step: Simultaneous continuous scale down to 0.5, fade to 0, and rotate
      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const targetRot = ROTATIONS[i % ROTATIONS.length];
        const stepStart = `step-${i}`;

        // 1. Next card slides up smoothly from flush bottom seam (yPercent: 100 -> 0)
        tl.fromTo(
          nextCard,
          { yPercent: 100, scale: 1, rotation: 0, opacity: 1 },
          { yPercent: 0, scale: 1, rotation: 0, opacity: 1, duration: 1.0, ease: 'power1.inOut' },
          stepStart
        );

        // 2. Current card: scaling down to 0.5, fading out to 0, and rotating happen ENTIRELY AT THE SAME TIME
        tl.to(
          currentCard,
          {
            scale: 0.5,          // Scales down to 0.5
            opacity: 0,          // Fades to 0 entirely at the same time
            rotation: targetRot, // Tilts between -10deg and +10deg
            yPercent: -16,       // Glides slightly up
            duration: 1.0,       // Full duration, continuous and simultaneous
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
      {/* 3D Cards Stack Container with sharp corners and strict overflow mask */}
      <div
        style={{
          position: 'relative',
          width: 'min(88vw, 860px)',
          height: 'clamp(380px, 58vh, 520px)',
          transformStyle: 'preserve-3d',
          overflow: 'hidden', // Strict overflow hidden mask at the card bottom seam
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
              {/* Category Tag Header */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 pointer-events-none">
                <span className="font-mono text-xs uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10">
                  {item.tag}
                </span>
              </div>

              {/* Background Image */}
              <img
                src={item.image}
                alt={item.tag}
                className="w-full h-full object-cover object-center transform scale-100"
                loading="eager"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default StackedCardsDeck;
