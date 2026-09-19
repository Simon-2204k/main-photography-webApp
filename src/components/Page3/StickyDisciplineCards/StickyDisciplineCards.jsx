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
    bgColor: '#d8b4fe',
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
    bgColor: '#ffffff',
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
    bgColor: '#fde047',
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
    bgColor: '#18181b',
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

import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';

const DisciplineCardItem = ({ card, cardIndex, playRef }) => {
  const cardRef = useRef(null);
  const cardTheme = card.textColor === '#ffffff' ? 'dark' : 'light';

  useLandoTextReveal(
    cardRef,
    '.card-discipline-title',
    {
      theme: cardTheme,
      start: 'top 80%',
      stagger: 0.04,
      scrollTrigger: cardIndex === 0,
      playRef: playRef,
    }
  );

  return (
    <div
      ref={cardRef}
      className="discipline-sticky-card"
      style={{
        backgroundColor: card.bgColor,
        color: card.textColor
      }}
    >

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
  );
};

export const StickyDisciplineCards = memo(function StickyDisciplineCards() {
  const containerRef = useRef(null);
  const playRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef()
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray('.discipline-sticky-card', container);
    if (!cards.length) return;

    const ctx = gsap.context(() => {

      cards.forEach((card, idx) => {
        gsap.set(card, {
          yPercent: idx === 0 ? 0 : 100,
          y: 0,
          zIndex: 10 + idx
        });
      });

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

      const getHeadingBottom = (card) => {
        const heading = card.querySelector('.card-heading-strip');
        if (heading) {
          const cardRect = card.getBoundingClientRect();
          const headingRect = heading.getBoundingClientRect();
          return headingRect.bottom - cardRect.top + 20;
        }
        return 180;
      };

      for (let i = 0; i < cards.length - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const nextCardIndex = i + 1;

        tl.to(nextCard, {
          yPercent: 0,
          y: () => getHeadingBottom(currentCard),
          ease: 'none',
          duration: 1
        });

        tl.call(() => {
          playRefs.current[nextCardIndex]?.current?.();
        }, null, i * 1.25 + 0.6);

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

      <div className="disciplines-cards-stack">
        {CARDS_DATA.map((card, idx) => (
          <DisciplineCardItem
            key={card.id}
            card={card}
            cardIndex={idx}
            playRef={playRefs.current[idx]}
          />
        ))}
      </div>
    </section>
  );
});

export default StickyDisciplineCards;
