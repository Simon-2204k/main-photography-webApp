import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SpotlightCards.css';

const SPOTLIGHT_CARDS = [
  {
    id: 1,
    image: '/assets/page1/spotlight-cards/pexels-behrouz-sasani-3568050-6893101.webp',
    exp: 'EXP.01',
    category: 'PORTRAIT',
    title: 'ECHOES OF SILENCE',
    meta: 'BERLIN // 35MM',
  },
  {
    id: 2,
    image: '/assets/page1/spotlight-cards/pexels-iodum-9533321.webp',
    exp: 'EXP.02',
    category: 'ARCHITECTURE',
    title: 'MONOLITHIC SHADOWS',
    meta: 'OSLO // 50MM',
  },
  {
    id: 3,
    image: '/assets/page1/spotlight-cards/pexels-mariah-ivie-cutajar-32883019-15180795.webp',
    exp: 'EXP.03',
    category: 'EDITORIAL',
    title: 'CHROMATIC FORM',
    meta: 'MILAN // MEDIUM FORMAT',
  },
  {
    id: 4,
    image: '/assets/page1/spotlight-cards/pexels-vika-glitter-392079-16843611.webp',
    exp: 'EXP.04',
    category: 'NOIR',
    title: 'SOLITUDE IN GRAIN',
    meta: 'TOKYO // MONOCHROME',
  },
];

const BASE_LAYOUT = [
  [-280, 15, 6],
  [-95, -12, -4],
  [95, 25, 6.5],
  [280, -15, -8],
];

const PROXIMITY_BASE = 320;
const PUSH = 14;
const SPRING = 0.08;
const DAMPING = 0.86;
const TILT = 0.08;
const SMOOTH = 0.8;

const SpotlightCardsComponent = () => {
  const spotlightRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const centerPosRef = useRef({ cx: 0, cy: 0 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!spotlight || !container || cards.length === 0) return;

    let scale = Math.min(1, Math.max(0.55, window.innerWidth / 1200));
    let proximity = PROXIMITY_BASE * scale;

    const mouse = { x: 0, y: 0, vx: 0, vy: 0 };
    let px = 0;
    let py = 0;
    let isTickerActive = false;

    // Cache container coordinates (No layout thrashing during 60-120fps physics loop)
    const updateContainerCenter = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      centerPosRef.current = {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    };

    updateContainerCenter();

    let physics = cards.map((card, i) => {
      const [bx, by, br] = BASE_LAYOUT[i] || [0, 0, 0];
      const rx = bx * scale;
      const ry = by * scale;
      const rr = br;
      const baseZ = 20 + i;

      gsap.set(card, {
        x: rx,
        y: ry,
        rotation: rr,
        xPercent: -50,
        yPercent: -50,
        zIndex: baseZ,
        force3D: true,
      });

      // Hover elevation
      const onMouseEnter = () => {
        gsap.set(card, { zIndex: 50 });
      };
      const onMouseLeave = () => {
        gsap.set(card, { zIndex: baseZ });
      };

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mouseleave', onMouseLeave);

      return { 
        card, 
        rx, 
        ry, 
        rr, 
        baseZ,
        x: rx, 
        y: ry, 
        r: rr, 
        vx: 0, 
        vy: 0, 
        vr: 0, 
        isResting: true,
        cleanupHover: () => {
          card.removeEventListener('mouseenter', onMouseEnter);
          card.removeEventListener('mouseleave', onMouseLeave);
        }
      };
    });

    const handleResize = () => {
      scale = Math.min(1, Math.max(0.55, window.innerWidth / 1200));
      proximity = PROXIMITY_BASE * scale;

      physics.forEach((c, i) => {
        const [bx, by, br] = BASE_LAYOUT[i] || [0, 0, 0];
        c.rx = bx * scale;
        c.ry = by * scale;
        c.rr = br;
      });

      updateContainerCenter();
    };

    const handleScroll = () => {
      if (isVisibleRef.current) {
        updateContainerCenter();
      }
    };

    const handleMouseMove = (e) => {
      mouse.vx = mouse.vx * SMOOTH + (e.clientX - px) * (1 - SMOOTH);
      mouse.vy = mouse.vy * SMOOTH + (e.clientY - py) * (1 - SMOOTH);

      mouse.x = px = e.clientX;
      mouse.y = py = e.clientY;

      physics.forEach((c) => {
        c.isResting = false;
      });
    };

    const handleMouseLeave = () => {
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const ticker = () => {
      if (!isVisibleRef.current) return;

      const { cx, cy } = centerPosRef.current;

      physics.forEach((c) => {
        const dist = Math.hypot(mouse.x - (cx + c.rx), mouse.y - (cy + c.ry));
        const f = dist < proximity ? Math.pow(1 - dist / proximity, 2) : 0;

        c.vx = (c.vx + (c.rx + mouse.vx * PUSH * f - c.x) * SPRING) * DAMPING;
        c.vy = (c.vy + (c.ry + mouse.vy * PUSH * f - c.y) * SPRING) * DAMPING;
        c.vr = (c.vr + (c.rr + mouse.vx * TILT * f - c.r) * SPRING) * DAMPING;

        c.x += c.vx;
        c.y += c.vy;
        c.r += c.vr;

        // Check if movement is significant
        const isMoving = 
          Math.abs(c.vx) > 0.001 || 
          Math.abs(c.vy) > 0.001 || 
          Math.abs(c.vr) > 0.001 || 
          Math.abs(c.x - c.rx) > 0.01 || 
          Math.abs(c.y - c.ry) > 0.01;

        if (isMoving) {
          c.isResting = false;
          gsap.set(c.card, {
            x: c.x,
            y: c.y,
            rotation: c.r,
            force3D: true,
          });
        } else if (!c.isResting) {
          c.isResting = true;
          c.x = c.rx;
          c.y = c.ry;
          c.r = c.rr;
          gsap.set(c.card, {
            x: c.rx,
            y: c.ry,
            rotation: c.rr,
            force3D: true,
          });
        }
      });
    };

    // IntersectionObserver: Only run ticker when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            updateContainerCenter();
            if (!isTickerActive) {
              gsap.ticker.add(ticker);
              isTickerActive = true;
            }
          } else {
            if (isTickerActive) {
              gsap.ticker.remove(ticker);
              isTickerActive = false;
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(spotlight);

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    spotlight.addEventListener('mousemove', handleMouseMove, { passive: true });
    spotlight.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    spotlight.addEventListener('pointermove', handleMouseMove, { passive: true });
    spotlight.addEventListener('pointerleave', handleMouseLeave, { passive: true });

    return () => {
      observer.disconnect();
      physics.forEach((c) => c.cleanupHover && c.cleanupHover());
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      spotlight.removeEventListener('mousemove', handleMouseMove);
      spotlight.removeEventListener('mouseleave', handleMouseLeave);
      spotlight.removeEventListener('pointermove', handleMouseMove);
      spotlight.removeEventListener('pointerleave', handleMouseLeave);
      if (isTickerActive) {
        gsap.ticker.remove(ticker);
      }
    };
  }, []);

  return (
    <section id="magnetic-spotlight-section" ref={spotlightRef} className="spotlight-section">
      {/* Top Editorial HUD */}
      <div className="spotlight-header">
        <div className="spotlight-tag">
          <span>INTERACTIVE SPOTLIGHT</span>
        </div>
        <h2 className="spotlight-title">SILVER HALIDE</h2>
        <p className="spotlight-subtitle">
          Latent image reaction responsive to frame exposure
        </p>
      </div>

      {/* Center Interactive Cards Stage */}
      <div className="spotlight-stage">
        <div ref={containerRef} className="spotlight-cards-container">
          {SPOTLIGHT_CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="spotlight-card"
            >
              {/* Stepped Darkroom Card Tab */}
              <div className="spotlight-card-tab">
                <span>{card.exp}</span>
                <span className="spotlight-card-tab-badge">{card.category}</span>
              </div>

              {/* Photo Image & Filmic Overlay */}
              <div className="spotlight-card-img-wrapper">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="spotlight-card-img"
                />
                <div className="spotlight-card-overlay" />
              </div>

              {/* Under-Card Metadata */}
              <div className="spotlight-card-info">
                <div className="spotlight-card-title">{card.title}</div>
                <div className="spotlight-card-sub">
                  <span>{card.meta}</span>
                  <span style={{ color: '#e5a956' }}>ACTIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SpotlightCards = React.memo(SpotlightCardsComponent);
export default SpotlightCards;
