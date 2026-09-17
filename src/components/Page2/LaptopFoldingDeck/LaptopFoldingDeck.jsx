import React, { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LAPTOP_CARDS = [
  {
    id: '01',
    bg: '#3732c5',
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
    bg: '#1a5c3a',
    titleLines: [
      'Natural luminance harnessed at golden hour.',
      'Organic grains preserved through film baths.',
      'Visual density untouched by artificial noise.',
    ],
    paragraph:
      'Emulsion responds to what sensors fail to compute: the gradient of atmospheric twilight. By pairing medium-format cameras with hand-developed negatives, every print retains chemical richness and tactile depth that digital algorithms cannot simulate.',
    quote:
      'Their approach to analogue process created an atmosphere that anchored our brand identity. The physical depth in each capture is something you simply cannot manufacture.',
    author: 'Marcus Vance',
    role: 'Head of Brand @ Atelier Meridian',
    images: [
      '/images/section5/eduardo-kenji-amorim-m6FlHxLBlVs-unsplash.webp',
      '/images/section5/hamza-nouasria-25NzjUbPIcc-unsplash.webp',
      '/images/section5/jan-oblak-O1H4keiH-Io-unsplash.webp',
    ],
  },
  {
    id: '03',
    bg: '#a23b18',
    titleLines: [
      'Editorial composition stripped to the bone.',
      'Every subject framed with sculptural weight.',
      'Moments suspended in silver halide crystalloids.',
    ],
    paragraph:
      'A great editorial portrait does not beg for interpretation; it commands presence through unyielding focus and sculptural illumination. Stripping down lighting rigs to raw reflectors yields portraits that command absolute editorial authority.',
    quote:
      'Every portrait captured possessed a striking, monumental stillness. It redefined our publication’s visual grammar and set a benchmark for future creative direction.',
    author: 'Sora Takahashi',
    role: 'Editor in Chief @ MONOCHROME Journal',
    images: [
      '/images/section5/oscar-ramirez-IHYP1yLWEek-unsplash.webp',
      '/images/section5/rock-staar-xYcnWXtURrs-unsplash.webp',
      '/images/section5/steven-weeks-xAHbt6YpAJ4-unsplash.webp',
    ],
  },
  {
    id: '04',
    bg: '#1e242b',
    titleLines: [
      'Chiaroscuro balance calibrated for print archives.',
      'Infinite blacks that absorb ambient illumination.',
      'Monochrome studies rendered for gallery walls.',
    ],
    paragraph:
      'When pigment meets cotton rag, dynamic range transforms from digital pixels into physical reality. Our darkroom techniques yield deep, velvety blacks and razor highlights that preserve tonal transition from corner to corner across every museum-grade exhibition print.',
    quote:
      'Seeing the gallery prints in physical space was breathtaking. The subtle transitions in deep shadow demonstrated a level of photographic discipline rarely seen today.',
    author: 'Julian Thorne',
    role: 'Curator @ Haus der Fotografie, Zurich',
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
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const totalCards = cards.length;

      cards.forEach((card, idx) => {
        gsap.set(card, {
          scale: 1 - idx * 0.04,
          transformOrigin: 'top center',
        });
      });

      // Background inversion at 50% scroll height (top 50%) ONLY on phone
      if (isMobile) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 50%',
          onEnter: () => {
            if (sectionRef.current) {
              sectionRef.current.style.backgroundColor = '#ffffff';
              sectionRef.current.style.color = '#000000';
            }
          },
          onLeaveBack: () => {
            if (sectionRef.current) {
              sectionRef.current.style.backgroundColor = '#000000';
              sectionRef.current.style.color = '#ffffff';
            }
          },
          onEnterBack: () => {
            if (sectionRef.current) {
              sectionRef.current.style.backgroundColor = '#ffffff';
              sectionRef.current.style.color = '#000000';
            }
          },
        });
      }

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
              y: '-60vh',
              scale: 0.9,
              duration: 1.0,
              ease: 'power3.out',
            },
            `step-${i}`
          );

          for (let j = i + 1; j < totalCards; j++) {
            const targetScale = 1 - (j - (i + 1)) * 0.04;
            tl.to(
              cards[j],
              {
                scale: targetScale,
                duration: 0.8,
                ease: 'power2.out',
              },
              `step-${i}+=0.1`
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: isMobile ? '#000000' : '#ffffff',
        color: isMobile ? '#ffffff' : '#000000',
        transition: isMobile ? 'background-color 0.5s ease, color 0.5s ease' : 'none',
        paddingTop: isMobile ? '8vh' : '15vh',
        paddingBottom: isMobile ? '8vh' : '15vh',
        boxSizing: 'border-box',
        userSelect: 'none',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: isMobile ? '0 auto 40px auto' : '0 auto 60px auto',
          padding: '0 24px',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? 'clamp(1.35rem, 5.2vw, 1.8rem)' : 'clamp(1.8rem, 3.2vw, 3rem)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: isMobile ? 'inherit' : '#000000',
            transition: isMobile ? 'color 0.5s ease' : 'none',
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
          height: isMobile ? '100vh' : '90vh',
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
            width: isMobile ? 'min(90vw, 350px)' : 'min(92vw, 1050px)',
            maxWidth: isMobile ? '350px' : '1050px',
            height: isMobile ? 'min(90vw, 350px)' : '100%',
            maxHeight: isMobile ? '350px' : '640px',
            aspectRatio: isMobile ? '1 / 1' : 'auto',
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
                borderRadius: isMobile ? '16px' : '10px',
                backgroundColor: card.bg,
                zIndex: LAPTOP_CARDS.length - idx,
                transformOrigin: 'top center',
                boxShadow: isMobile ? '0 18px 36px rgba(0,0,0,0.2)' : 'none',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isMobile
                  ? '16px 16px 14px 16px'
                  : 'clamp(20px, 3.5vw, 44px) clamp(18px, 3.8vw, 52px)',
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
                  gap: '12px',
                }}
              >
                <div style={{ maxWidth: '850px' }}>
                  {isMobile ? (
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: 'clamp(0.95rem, 3.8vw, 1.15rem)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {card.titleLines.slice(0, 2).join(' ')}
                    </h3>
                  ) : (
                    card.titleLines.map((line, lIdx) => (
                      <h3
                        key={lIdx}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 700,
                          fontSize: 'clamp(1.15rem, 2.2vw, 2.4rem)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.15,
                          margin: '0 0 4px 0',
                        }}
                      >
                        {line}
                      </h3>
                    ))
                  )}
                </div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '12px' : 'clamp(14px, 1.4vw, 18px)',
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
                  fontSize: isMobile ? 'clamp(0.72rem, 2.6vw, 0.8rem)' : 'clamp(0.82rem, 1.1vw, 1.05rem)',
                  lineHeight: isMobile ? 1.35 : 1.55,
                  color: 'rgba(255, 255, 255, 0.92)',
                  maxWidth: '850px',
                  margin: isMobile ? '4px 0 8px 0' : '12px 0',
                  display: isMobile ? '-webkit-box' : 'block',
                  WebkitLineClamp: isMobile ? 2 : 'none',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {card.paragraph}
              </p>

              <div
                style={
                  isMobile
                    ? {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingTop: '8px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                      }
                    : {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '32px',
                        alignItems: 'flex-end',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.22)',
                      }
                }
              >
                <div
                  style={
                    isMobile
                      ? { display: 'none' }
                      : {
                          gridColumn: 'span 6',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }
                  }
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
                  style={
                    isMobile
                      ? {
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '6px',
                          width: '100%',
                        }
                      : {
                          gridColumn: 'span 6',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '12px',
                          width: '100%',
                        }
                  }
                >
                  {card.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      style={{
                        aspectRatio: '4 / 3',
                        borderRadius: isMobile ? '6px' : '8px',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: 'none',
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
