import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LAPTOP_CARDS = [
  {
    id: '01',
    bg: '#3b2db5', // Royal Purple
    titleLines: [
      'Light engineered with absolute precision.',
      'Shadows crafted for narrative tension.',
      'Frame geometry that distills pure reality.',
    ],
    paragraph:
      'We channel raw optical physics, balance precise shutter intervals, and shape natural luminance to elevate visual density. Every shot isolates negative space while revealing microscopic texture, giving your story unshakeable presence. The mandate is clear: uncompromised optics.',
    quote:
      'The attention to detail and mastery over low-light contrast is unparalleled. Every frame from our campaign felt intentional, visceral, and stripped of unnecessary noise.',
    author: 'Elena Rostova',
    role: 'Senior Art Director @ Substratum Press',
    images: [
      '/images/section5/brian-lundquist-aA6NVwzqWJg-unsplash.webp',
      '/images/section5/brooke-balentine-Bs15bCACD_0-unsplash.webp',
      '/images/section5/daniel-khor-rZtdwCZTibY-unsplash.webp',
    ],
  },
  {
    id: '02',
    bg: '#ff5d22', // Vibrant Orange
    titleLines: [
      'Emulsion textures that hold time still.',
      'Unvarnished grain with cinematic weight.',
      'Authentic moments etched in 35mm density.',
    ],
    paragraph:
      'We fuse classic analogue processing with modern editorial framing to deliver tactile visual archives. By combining latent silver halide depth with bold composition, we bring immediate atmosphere and organic weight to every series. The philosophy is simple: pure chemical truth.',
    quote:
      'They don’t just shoot subjects; they document energy. The film grain, tonal warmth, and frame control brought an incredible editorial elegance to our lookbook.',
    author: 'Julian Thorne',
    role: 'Founder & Curator @ Halide Journal',
    images: [
      '/images/section5/eduardo-kenji-amorim-m6FlHxLBlVs-unsplash.webp',
      '/images/section5/hamza-nouasria-25NzjUbPIcc-unsplash.webp',
      '/images/section5/jan-oblak-O1H4keiH-Io-unsplash.webp',
    ],
  },
  {
    id: '03',
    bg: '#ff333a', // Coral Red
    titleLines: [
      'Form and shadow aligned in symmetry.',
      'Structural scale captured without distortion.',
      'Spatial perspectives mapped through pristine glass.',
    ],
    paragraph:
      'We evaluate architectural volume, control perspective shift, and record how ambient light interacts with raw material. Every focal plane is calibrated to reveal structural rhythm and spatial harmony across print and digital media. The objective is focused: structural stillness.',
    quote:
      'Capturing structural scale without losing human intimacy is rare. Their ability to read room geometry and natural highlights gave our built projects an iconic presence.',
    author: 'Kaelen Voss',
    role: 'Principal Architect @ Monolith Design',
    images: [
      '/images/section5/oscar-ramirez-IHYP1yLWEek-unsplash.webp',
      '/images/section5/rock-staar-xYcnWXtURrs-unsplash.webp',
      '/images/section5/steven-weeks-xAHbt6YpAJ4-unsplash.webp',
    ],
  },
  {
    id: '04',
    bg: '#6c584c', // Warm Earthy Taupe
    titleLines: [
      'Imagery that commands focus & emotion.',
      'Visuals that redefine perspective & scale.',
      'Composition that evokes stillness & depth.',
    ],
    paragraph:
      'We isolate natural light, control optical depth, and construct visual narratives across digital and print mediums. Every frame balances precise aperture mechanics with unvarnished texture, giving your subject absolute clarity. The focus is simple: timeless exposure.',
    quote:
      'Working with the studio was an incredible experience. Beyond the technical mastery of light and composition, there’s a genuine eye for capturing unscripted, powerful moments. Every frame delivered carried immense depth and atmosphere.',
    author: 'Marcus Vance',
    role: 'Creative Director @ Studio Monochrome',
    images: [
      '/images/section5/vinicius-amnx-amano-3BvtFNc1MYY-unsplash.webp',
      '/images/section5/windah-limbai-x9y7-4VvS38-unsplash.webp',
      '/images/section5/yunus-emre-mM5tCQ0uJo8-unsplash.webp',
    ],
  },
];

export const LaptopFoldingDeck = memo(() => {
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
          end: `+=${totalCards * 120}%`,
          pin: true,
          scrub: 1.2,
        },
      });

      // 3D Laptop folding animation: each card flips backwards on X axis
      cards.forEach((card, i) => {
        if (i < totalCards - 1) {
          tl.to(
            card,
            {
              rotateX: -70,
              yPercent: -20,
              opacity: 0,
              scale: 0.9,
              duration: 1.2,
              ease: 'power2.inOut',
            },
            `step-${i}`
          );

          const nextCard = cards[i + 1];
          if (nextCard) {
            tl.fromTo(
              nextCard,
              { scale: 0.95, opacity: 0.8 },
              { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.inOut' },
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
      className="relative w-full h-screen bg-[#f7f5f0] text-black py-16 px-6 sm:px-12 lg:px-20 select-none overflow-hidden flex flex-col justify-between [perspective:1600px]"
    >
      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto text-center z-10 pt-4 mb-8">
        <h2 className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-snug text-neutral-900">
          High-speed focal locks, rapid frame bursts, and instantaneous shutter response.
        </h2>
      </div>

      {/* Center 4 Stacked Laptop-Folding Cards */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-center justify-center [transform-style:preserve-3d]">
        {LAPTOP_CARDS.map((card, idx) => {
          return (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="absolute inset-x-0 mx-auto w-full max-w-5xl rounded-[32px] p-8 sm:p-12 lg:p-14 text-white shadow-2xl overflow-hidden flex flex-col justify-between will-change-transform"
              style={{
                backgroundColor: card.bg,
                zIndex: LAPTOP_CARDS.length - idx,
                transformOrigin: 'top center',
                minHeight: '480px',
                maxHeight: '620px',
              }}
            >
              {/* Card Header & Index */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="max-w-3xl">
                  {card.titleLines.map((line, lIdx) => (
                    <h3
                      key={lIdx}
                      className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight"
                    >
                      {line}
                    </h3>
                  ))}
                </div>
                <span className="font-mono text-lg sm:text-xl font-semibold opacity-80 shrink-0">
                  ({card.id})
                </span>
              </div>

              {/* Sub-headline Paragraph */}
              <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl mb-8">
                {card.paragraph}
              </p>

              {/* Bottom Row: Testimonial on Left & 3 Asset Image Cards on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-white/20">
                {/* Left Testimonial */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <blockquote className="font-sans italic text-xs sm:text-sm text-white/90 mb-3 leading-relaxed">
                    "{card.quote}"
                  </blockquote>
                  <div>
                    <span className="font-sans font-bold text-sm text-white block">
                      {card.author}
                    </span>
                    <span className="font-sans text-xs text-white/75 block">
                      {card.role}
                    </span>
                  </div>
                </div>

                {/* Right 3 Asset Cards */}
                <div className="lg:col-span-6 grid grid-cols-3 gap-3">
                  {card.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="aspect-[4/3] rounded-xl overflow-hidden bg-black/30 border border-white/25 shadow-lg"
                    >
                      <img
                        src={imgSrc}
                        alt=""
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default LaptopFoldingDeck;
