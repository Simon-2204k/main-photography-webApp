import React, { useState, useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import './SvgPathHoverCards.css';

const CARDS_DATA = [
  {
    name: 'Olivia',
    desc: 'Creative designer with a love for minimal interfaces.',
    image: '/assets/page3/section7/plate_01.webp'
  },
  {
    name: 'Noah',
    desc: 'Frontend developer passionate about interactions.',
    image: '/assets/page3/section7/plate_02.webp'
  },
  {
    name: 'Emma',
    desc: 'Photographer capturing everyday moments beautifully.',
    image: '/assets/page3/section7/plate_03.webp'
  },
  {
    name: 'Liam',
    desc: 'Motion designer focused on playful animations.',
    image: '/assets/page3/section7/plate_04.webp'
  }
];

const colors = [
  '#ff5a5f',
  '#ff8c42',
  '#ffd166',
  '#06d6a0'
];

export const SvgPathHoverCards = memo(function SvgPathHoverCards() {
  const cardsRef = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const paths = card.querySelectorAll('.svgClass path');
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.dataset.length = length;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = -length;
      });
    });
  }, []);

  // Synchronize activeCardIndex changes with forward/reverse GSAP animations
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const paths = card.querySelectorAll('.svgClass path');
      const hoverCard = card.querySelector('.hovercard');
      const isActive = activeCardIndex === index;

      card._tl?.kill();
      gsap.killTweensOf([...paths, hoverCard]);

      if (isActive) {
        // ONE TAP / HOVER: SHOW SVG AND DETAILS
        const tl = gsap.timeline();
        card._tl = tl;

        tl.to(paths, {
          strokeDashoffset: 0,
          strokeWidth: 60,
          duration: 0.85,
          ease: 'power2.out',
          stagger: 0.08
        }).to(
          hoverCard,
          {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
          },
          '0.4'
        );
      } else {
        // ANOTHER TAP / LEAVE: CLOSE DETAILS AND SVG BACKWARDS
        const tl = gsap.timeline();
        card._tl = tl;

        tl.to(hoverCard, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out'
        });

        paths.forEach((p) => {
          const len = Number(p.dataset.length) || p.getTotalLength();
          tl.to(
            p,
            {
              strokeDashoffset: -len,
              duration: 0.4,
              ease: 'power2.inOut'
            },
            0
          );
        });
      }
    });
  }, [activeCardIndex]);

  const handleCardClick = (index) => {
    setActiveCardIndex((prev) => (prev === index ? null : index));
  };

  const handleMouseEnter = (index) => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setActiveCardIndex(index);
    }
  };

  const handleMouseLeave = (index) => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setActiveCardIndex((prev) => (prev === index ? null : prev));
    }
  };

  return (
    <section className="background" id="svgpath-section">
      <div className="cardsDiv">
        {CARDS_DATA.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            aria-expanded={activeCardIndex === index}
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="card-img"
            />

            <svg className="svgClass" viewBox="0 0 409 341" fill="none">
              <path
                d="M332 15.0005C332 15.0005 406 75.0005 391 109C376 143 245 -18.9995 212 26.0005C179 71.0005 379 151 353 198C327 245 109 -1.19337 82.0001 49.8066C55.0001 100.807 339 247.807 303 285.807C267 323.807 60.0001 107 27.0001 151C-5.99991 195 179 274.001 160 316.001C141 358.001 15.0001 245 15.0001 245"
                stroke={colors[index]}
                strokeWidth="30"
                strokeLinecap="round"
              />
            </svg>

            <svg className="svgClass" viewBox="0 0 409 341" fill="none">
              <path
                d="M76.0138 15.0005C76.0138 15.0005 2.01381 75.0005 17.0138 109C32.0138 143 163.014 -18.9995 196.014 26.0005C229.014 71.0005 29.0139 151 55.0139 198C81.0139 245 299.014 -1.19337 326.014 49.8066C353.014 100.807 69.0139 247.807 105.014 285.807C141.014 323.807 348.014 107 381.014 151C414.014 195 229.014 274.001 248.014 316.001C267.014 358.001 393.014 245 393.014 245"
                stroke="#f1f1f1"
                strokeWidth="30"
                strokeLinecap="round"
              />
            </svg>

            <div className="hovercard">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default SvgPathHoverCards;
