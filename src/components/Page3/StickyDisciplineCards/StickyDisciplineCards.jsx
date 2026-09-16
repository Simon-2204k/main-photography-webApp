import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StickyDisciplineCards.css';

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  {
    id: 'editorial',
    title: 'Editorial & Haute Couture',
    badge: 'DISCIPLINE // 01',
    bgColor: '#d8b4fe', // Rich soft lavender
    textColor: '#18181b',
    subTextColor: '#3f3f46',
    desc: 'Visual narrative direction for high-fashion ateliers, runway archives, and global editorial covers with distinct styling and mood.',
    disciplines: [
      'Creative Direction',
      'Model Casting & Styling',
      'Studio Strobes & Scrims',
      'Editorial Storyboards',
      'Color Fidelity Calibration',
      'Master Print Retouching'
    ],
    images: [
      '/assets/page3/section6/discipline_01.webp',
      '/assets/page3/section6/discipline_02.webp',
      '/assets/page3/section6/discipline_03.webp'
    ]
  },
  {
    id: 'architecture',
    title: 'Architectural & Spatial Vision',
    badge: 'DISCIPLINE // 02',
    bgColor: '#ffffff', // Crisp architectural white
    textColor: '#18181b',
    subTextColor: '#52525b',
    desc: 'Geometric compositions documenting raw monolithic brutalism, shadow interplay, and tactile materials across modern architectural landmarks.',
    disciplines: [
      'Perspective Tilt-Shift',
      'Low-Sun Angle Studies',
      'Monolithic Geometry',
      'Material & Texture Focus',
      'Urban Skyline Studies',
      'Archival Print Editioning'
    ],
    images: [
      '/assets/page3/section6/discipline_04.webp',
      '/assets/page3/section6/discipline_05.webp',
      '/assets/page3/section6/discipline_06.webp'
    ]
  },
  {
    id: 'monochrome',
    title: 'Fine Art & Silver Halide',
    badge: 'DISCIPLINE // 03',
    bgColor: '#fde047', // Warm amber ochre
    textColor: '#18181b',
    subTextColor: '#3f3f46',
    desc: 'Honoring chemical darkroom traditions, 120mm emulsion rolls, and handcrafted silver gelatin prints with nuanced chiaroscuro and organic grain.',
    disciplines: [
      'Silver Halide Darkroom',
      '120mm Medium Format Rolls',
      'Deep Shadow Chiaroscuro',
      'Fiber-Base Archival Wash',
      'Organic Grain Crystal Focus',
      'Signed Limited Editions'
    ],
    images: [
      '/assets/page3/section6/discipline_07.webp',
      '/assets/page3/section6/discipline_08.webp',
      '/assets/page3/section6/discipline_09.webp'
    ]
  },
  {
    id: 'campaigns',
    title: 'Campaigns & Commercial Lookbooks',
    badge: 'DISCIPLINE // 04',
    bgColor: '#18181b', // Deep Noir Charcoal
    textColor: '#ffffff',
    subTextColor: '#a1a1aa',
    desc: 'High-impact commercial photography campaigns sculpting cultural perception, celebrating product craft, and commanding global audience attention.',
    disciplines: [
      'Commercial Direction',
      'High-Speed Flash Sync',
      'Multi-Angle Studio Rigs',
      'Lookbook Catalog Layout',
      'Master Color Grading',
      'Global Asset Delivery'
    ],
    images: [
      '/assets/page3/section6/discipline_10.webp',
      '/assets/page3/section6/discipline_11.webp',
      '/assets/page3/section6/discipline_12.webp'
    ]
  }
];

export const StickyDisciplineCards = memo(function StickyDisciplineCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray('.discipline-sticky-card', container);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // 1. Initial State:
      // Card 0 is at top: 0 (in view)
      // Cards 1, 2, 3 sit below the viewport at yPercent: 100
      cards.forEach((card, idx) => {
        gsap.set(card, {
          yPercent: idx === 0 ? 0 : 100,
          y: 0,
          zIndex: 10 + idx
        });
      });

      // 2. Master pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${(cards.length - 1) * 120}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // Helper function to measure the bottom of card i's heading relative to card i's top
      const getHeadingBottom = (card) => {
        const heading = card.querySelector('.card-heading-strip');
        if (heading) {
          const cardRect = card.getBoundingClientRect();
          const headingRect = heading.getBoundingClientRect();
          return headingRect.bottom - cardRect.top + 20; // 20px breathing room below title
        }
        return 180;
      };

      // 3. Build sequence for each card transition (0 -> 1, 1 -> 2, 2 -> 3)
      for (let i = 0; i < cards.length - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        // Step A: nextCard scrolls up from 100% until its top border touches currentCard's heading bottom
        // This smoothly covers currentCard's description, deliverables, and images
        // leaving ONLY currentCard's heading strip visible!
        tl.to(nextCard, {
          yPercent: 0,
          y: () => getHeadingBottom(currentCard),
          ease: 'none',
          duration: 1
        });

        // Step B: nextCard touches the heading bottom ->
        // currentCard un-sticks and slides up out of the viewport (-headingBottom),
        // while nextCard simultaneously moves from headingBottom to 0!
        tl.to(currentCard, {
          y: () => -getHeadingBottom(currentCard),
          ease: 'none',
          duration: 0.25
        });

        tl.to(nextCard, {
          y: 0,
          ease: 'none',
          duration: 0.25
        }, '<');
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="sticky-disciplines-section" id="sticky-disciplines-section">
      {/* Sticky Stacking Cards Container */}
      <div className="disciplines-cards-stack">
        {CARDS_DATA.map((card, idx) => (
          <div
            key={card.id}
            className="discipline-sticky-card"
            style={{
              backgroundColor: card.bgColor,
              color: card.textColor
            }}
          >
            {/* Left Content Column */}
            <div className="card-info-col">
              <div className="card-heading-strip">
                <span
                  className="card-badge"
                  style={{
                    color: card.subTextColor,
                    borderColor: card.subTextColor
                  }}
                >
                  {card.badge}
                </span>

                <h3 className="card-discipline-title" style={{ color: card.textColor }}>
                  {card.title}
                </h3>
              </div>

              <p className="card-discipline-desc" style={{ color: card.subTextColor }}>
                {card.desc}
              </p>

              <div className="card-disciplines-list">
                {card.disciplines.map((item, i) => (
                  <span
                    key={i}
                    className="discipline-item"
                    style={{ color: card.subTextColor }}
                  >
                    • {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Showcase Column with 3 Images from Section 6 */}
            <div className="card-showcase-col">
              <div className="card-images-triptych">
                {card.images.map((imgSrc, imgIdx) => (
                  <div key={imgIdx} className="triptych-photo-card">
                    <img
                      src={imgSrc}
                      alt={`${card.title} plate 0${imgIdx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="triptych-photo"
                    />
                    <div className="triptych-photo-tag">0{imgIdx + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default StickyDisciplineCards;
