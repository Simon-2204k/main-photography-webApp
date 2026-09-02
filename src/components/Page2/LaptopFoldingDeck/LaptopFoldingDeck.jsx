import React, { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LAPTOP_CARDS = [
  {
    id: '01',
    bg: '#3b2db5',
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
    bg: '#ff5d22',
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
    bg: '#ff333a',
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
    bg: '#6c584c',
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
  const sectionRef = useRef(null);
  const laptopPinRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const totalCards = cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: laptopPinRef.current,
          start: 'center center',
          end: `+=${totalCards * 120}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
        },
      });

      cards.forEach((card, i) => {
        if (i < totalCards - 1) {
          tl.to(
            card,
            {
              rotateX: 90,
              yPercent: -20,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#f7f5f0',
        color: '#000000',
        paddingTop: '15vh',
        paddingBottom: '15vh',
        boxSizing: 'border-box',
        userSelect: 'none',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto 60px auto',
          padding: '0 24px',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: '#111111',
            margin: 0,
          }}
        >
          High-speed focal locks, rapid frame bursts, and instantaneous shutter response.
        </h2>
      </div>

      <div
        ref={laptopPinRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1600px',
          overflow: 'visible',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1140px',
            height: '100%',
            margin: '0 auto',
            transformStyle: 'preserve-3d',
          }}
        >
          {LAPTOP_CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                backgroundColor: card.bg,
                zIndex: LAPTOP_CARDS.length - idx,
                transformOrigin: 'top center',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '44px 52px',
                boxSizing: 'border-box',
                color: '#ffffff',
                willChange: 'transform',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div style={{ maxWidth: '850px' }}>
                  {card.titleLines.map((line, lIdx) => (
                    <h3
                      key={lIdx}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        margin: '0 0 4px 0',
                      }}
                    >
                      {line}
                    </h3>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    fontWeight: 600,
                    opacity: 0.85,
                    flexShrink: 0,
                  }}
                >
                  ({card.id})
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.92)',
                  maxWidth: '850px',
                  margin: '16px 0',
                }}
              >
                {card.paragraph}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '32px',
                  alignItems: 'flex-end',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.22)',
                }}
              >
                <div
                  style={{
                    gridColumn: 'span 6',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)',
                      color: 'rgba(255, 255, 255, 0.92)',
                      margin: '0 0 12px 0',
                      lineHeight: 1.5,
                    }}
                  >
                    "{card.quote}"
                  </blockquote>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: '14px',
                        display: 'block',
                      }}
                    >
                      {card.author}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        display: 'block',
                      }}
                    >
                      {card.role}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    gridColumn: 'span 6',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                  }}
                >
                  {card.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      style={{
                        aspectRatio: '4 / 3',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default LaptopFoldingDeck;
