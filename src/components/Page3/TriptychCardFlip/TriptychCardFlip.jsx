import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Aperture, Sun, Droplets, Layers } from 'lucide-react';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';
import './TriptychCardFlip.css';

gsap.registerPlugin(ScrollTrigger);

const CARD_DATA = [
  {
    id: 'frame-1',
    image: '/assets/page3/section3/frame_01.webp',
    bgClass: 'card-back-dark',
    icon: Camera,
    title: 'Latent Emulsion',
    desc: 'Raw photon capture suspended in silver halide crystals for organic analog micro-tonality.',
    titleColor: '#ffffff',
    descColor: 'rgba(255, 255, 255, 0.75)',
    iconColor: '#38bdf8',
    edition: 'EDITION // 01'
  },
  {
    id: 'frame-2',
    image: '/assets/page3/section3/frame_02.webp',
    bgClass: 'card-back-light',
    icon: Aperture,
    title: 'Optical Purity',
    desc: 'Calibrated prime glass engineered for razor-sharp micro-contrast and natural cinematic falloff.',
    titleColor: '#111114',
    descColor: '#52525b',
    iconColor: '#111114',
    edition: 'EDITION // 02'
  },
  {
    id: 'frame-3',
    image: '/assets/page3/section3/frame_03.webp',
    bgClass: 'card-back-crimson',
    icon: Sun,
    title: 'Chiaroscuro Form',
    desc: 'The deliberate play of directional light carving sculptural depth out of impenetrable shadow.',
    titleColor: '#ffffff',
    descColor: 'rgba(255, 255, 255, 0.88)',
    iconColor: '#ffffff',
    edition: 'EDITION // 03'
  },
  {
    id: 'frame-4',
    image: '/assets/page3/section3/frame_04.webp',
    bgClass: 'card-back-dark',
    icon: Droplets,
    title: 'Darkroom Alchemy',
    desc: 'Precision chemical developer baths balancing micro-gradients across deep, luminous blacks.',
    titleColor: '#ffffff',
    descColor: 'rgba(255, 255, 255, 0.75)',
    iconColor: '#38bdf8',
    edition: 'EDITION // 04'
  },
  {
    id: 'frame-5',
    image: '/assets/page3/section3/frame_05.webp',
    bgClass: 'card-back-light',
    icon: Layers,
    title: 'Archival Print',
    desc: 'Heavyweight cotton rag baryta substrate cured for century-long permanence and exhibition depth.',
    titleColor: '#111114',
    descColor: '#52525b',
    iconColor: '#111114',
    edition: 'EDITION // 05'
  }
];

export const TriptychCardFlip = memo(function TriptychCardFlip() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardInnerRefs = useRef([]);
  const cardOuterRefs = useRef([]);

  useLandoTextReveal(headerRef, '.triptych-headline', { theme: 'dark', start: 'top 80%' });

  const [isCompact, setIsCompact] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 1024
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeCards = React.useMemo(() => {
    return isCompact ? CARD_DATA.slice(0, 3) : CARD_DATA;
  }, [isCompact]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 0
        }
      });

      gsap.set(container, { yPercent: 120 });

      tl.to(
        container,
        {
          yPercent: 0,
          duration: 0.30,
          ease: 'power2.out'
        },
        0
      );

      tl.to(
        container,
        {
          gap: isCompact ? 'clamp(8px, 1.8vw, 16px)' : 'clamp(10px, 1.4vw, 22px)',
          duration: 0.25,
          ease: 'power2.inOut'
        },
        0.30
      );

      cardInnerRefs.current.forEach((cardInner, idx) => {
        if (!cardInner) return;
        tl.to(
          cardInner,
          {
            rotateY: 180,
            duration: 0.25,
            ease: 'power2.inOut'
          },
          0.55 + idx * 0.04
        );
      });

      const fanConfigs = isCompact
        ? [
            { rotateY: 8, rotateZ: -1.5, xPercent: -2 },
            { rotateY: 0, rotateZ: 0, scale: 1.02 },
            { rotateY: -8, rotateZ: 1.5, xPercent: 2 }
          ]
        : [
            { rotateY: 10, rotateZ: -2, xPercent: -2 },
            { rotateY: 5, rotateZ: -1, xPercent: -1 },
            { rotateY: 0, rotateZ: 0, scale: 1.02 },
            { rotateY: -5, rotateZ: 1, xPercent: 1 },
            { rotateY: -10, rotateZ: 2, xPercent: 2 }
          ];

      fanConfigs.forEach((config, idx) => {
        const outer = cardOuterRefs.current[idx];
        if (!outer) return;
        tl.to(
          outer,
          {
            ...config,
            duration: 0.15,
            ease: 'power2.out'
          },
          0.85
        );
      });
    }, section);

    return () => ctx.revert();
  }, [isCompact]);

  return (
    <section ref={sectionRef} className="triptych-flip-section" id="triptych-flip-section">

      <div ref={headerRef} className="triptych-header">
        <h2 className="triptych-headline">
          Curated Frames: <em>From Vision</em> to Print
        </h2>
      </div>

      <div className="triptych-stage">
        <div ref={containerRef} className="triptych-cards-container">
          {activeCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                ref={(el) => (cardOuterRefs.current[idx] = el)}
                className={`triptych-card-outer triptych-card-${card.id}`}
              >
                <div
                  ref={(el) => (cardInnerRefs.current[idx] = el)}
                  className="triptych-card-inner"
                >

                  <div className="triptych-card-face card-face-front">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="card-front-image"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="front-face-overlay" />
                  </div>

                  <div className={`triptych-card-face card-face-back ${card.bgClass}`}>
                    <div className="card-back-header">
                      <IconComponent
                        size={22}
                        strokeWidth={1.75}
                        color={card.iconColor}
                        className="card-back-icon"
                      />
                    </div>

                    <div className="card-back-body">
                      <h3
                        className="card-back-title"
                        style={{ color: card.titleColor }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="card-back-desc"
                        style={{ color: card.descColor }}
                      >
                        {card.desc}
                      </p>
                    </div>

                    <div className="card-back-footer">
                      <span className="card-edition-tag">
                        {card.edition}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default TriptychCardFlip;
