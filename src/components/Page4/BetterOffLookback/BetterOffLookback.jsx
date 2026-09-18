import React, { useEffect, useRef, useState, memo } from 'react';
import section1Data from './section1_data.json';
import './BetterOffLookback.css';

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

// Triplicate 120 items for seamless infinite circular loop (360 items total)
const LOOPED_ITEMS = [
  ...section1Data.map((m, i) => ({ ...m, loopIdx: 0, uid: `s1-${m.id}-${i}` })),
  ...section1Data.map((m, i) => ({ ...m, loopIdx: 1, uid: `s2-${m.id}-${i}` })),
  ...section1Data.map((m, i) => ({ ...m, loopIdx: 2, uid: `s3-${m.id}-${i}` }))
];

const CARD_SLOT_WIDTH = 340; // Exact width in px per card
const CARDS_PER_MONTH = section1Data.length / 12; // 10 cards per month
const MONTH_BLOCK_WIDTH = CARDS_PER_MONTH * CARD_SLOT_WIDTH; // 3400px per month
const TOTAL_CYCLE_WIDTH = section1Data.length * CARD_SLOT_WIDTH; // 40,800px per 120-card cycle
const TICKS_PER_MONTH = 41; // Delicate millimeter ticks per month

// Triplicate 12 months for the synchronized infinite ruler timeline (36 months total)
const LOOPED_MONTHS = [
  ...MONTH_NAMES.map((name, i) => ({ name, uid: `r1-${name}-${i}` })),
  ...MONTH_NAMES.map((name, i) => ({ name, uid: `r2-${name}-${i}` })),
  ...MONTH_NAMES.map((name, i) => ({ name, uid: `r3-${name}-${i}` }))
];

// React-optimized memoized card component with native drag ghost suppression
const LookbackCardItem = memo(({ item, cardRef }) => {
  return (
    <div 
      ref={cardRef}
      className="lookback-card-wrapper"
      style={{ width: `${CARD_SLOT_WIDTH}px` }}
    >
      <div className={`lookback-card-box ${item.aspect}`}>
        <img
          src={`/images/section1_opt/${item.image}`}
          alt={item.caption}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          loading="lazy"
          decoding="async"
          className="lookback-card-img"
        />
      </div>

      <div className="lookback-card-caption">
        {item.caption}
      </div>
    </div>
  );
});

LookbackCardItem.displayName = 'LookbackCardItem';

export const BetterOffLookbackComponent = ({ onOpenMenu }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const rulerTrackRef = useRef(null);
  const cardRefs = useRef([]);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    const rulerTrack = rulerTrackRef.current;
    if (!stage || !track) return;

    // Start centered in the middle cycle (Cycle 2)
    const initialOffset = -TOTAL_CYCLE_WIDTH + (window.innerWidth / 2) - (CARD_SLOT_WIDTH / 2);
    let scrollX = initialOffset;
    let velocity = 0;
    let isPointerDown = false;
    let startPointerX = 0;
    let lastPointerX = 0;
    let lastTime = performance.now();
    let animationFrameId = null;

    // 3D Door-Hinge flap physics
    let currentRotateY = 0;
    let targetRotateY = 0;
    let currentOrigin = 'center center';

    let isVisible = true;
    let isLoopRunning = false;

    const startLoop = () => {
      if (!isLoopRunning && isVisible) {
        isLoopRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      isLoopRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handlePointerDown = (e) => {
      isPointerDown = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      startPointerX = clientX;
      lastPointerX = clientX;
      lastTime = performance.now();
      velocity = 0;
      stage.style.cursor = 'grabbing';
      startLoop();
    };

    const handlePointerMove = (e) => {
      if (!isPointerDown) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const now = performance.now();
      const deltaX = clientX - lastPointerX;
      const dt = Math.max(now - lastTime, 1);

      scrollX += deltaX;
      velocity = (deltaX / dt) * 16.6;

      // 3D Hinge Physics based on drag direction
      if (deltaX > 0.5) {
        currentOrigin = 'right center';
        targetRotateY = Math.min(Math.abs(velocity) * 0.55, 22);
      } else if (deltaX < -0.5) {
        currentOrigin = 'left center';
        targetRotateY = -Math.min(Math.abs(velocity) * 0.55, 22);
      }

      lastPointerX = clientX;
      lastTime = now;
      startLoop();
    };

    const handlePointerUp = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      stage.style.cursor = 'grab';
    };

    stage.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    stage.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 60FPS Physics loop directly updating DOM transforms (0 React re-renders during dragging)
    const animate = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }

      let isMoving = isPointerDown;

      if (!isPointerDown) {
        velocity *= 0.93; // Smooth inertia damping
        scrollX += velocity;

        if (Math.abs(velocity) > 0.1) {
          isMoving = true;
          if (velocity > 0) {
            currentOrigin = 'right center';
            targetRotateY = Math.min(Math.abs(velocity) * 0.45, 18);
          } else {
            currentOrigin = 'left center';
            targetRotateY = -Math.min(Math.abs(velocity) * 0.45, 18);
          }
        } else {
          velocity = 0;
          targetRotateY = 0;
        }
      }

      // Smooth spring damping for 3D rotateY
      currentRotateY += (targetRotateY - currentRotateY) * 0.14;
      if (Math.abs(currentRotateY) < 0.05 && Math.abs(targetRotateY) < 0.05) {
        currentRotateY = 0;
      } else {
        isMoving = true;
      }

      // Seamless Infinite Looping modulo wrap
      const cycleMin = -TOTAL_CYCLE_WIDTH * 2;
      const cycleMax = -TOTAL_CYCLE_WIDTH * 0.5;
      if (scrollX < cycleMin) {
        scrollX += TOTAL_CYCLE_WIDTH;
      } else if (scrollX > cycleMax) {
        scrollX -= TOTAL_CYCLE_WIDTH;
      }

      // 1. Move card track
      track.style.transform = `translate3d(${scrollX}px, 0, 0)`;

      // 2. Apply 3D Hinge Flap only when rotating
      if (isMoving || currentRotateY !== 0) {
        const rotateTransform = `rotateY(${currentRotateY.toFixed(2)}deg)`;
        const totalCards = cardRefs.current.length;
        // Calculate visible viewport range to only rotate onscreen cards
        const viewMinX = -scrollX - CARD_SLOT_WIDTH * 2;
        const viewMaxX = -scrollX + window.innerWidth + CARD_SLOT_WIDTH * 2;

        for (let i = 0; i < totalCards; i++) {
          const cardX = i * CARD_SLOT_WIDTH;
          if (cardX >= viewMinX && cardX <= viewMaxX) {
            const el = cardRefs.current[i];
            if (el) {
              if (el.style.transformOrigin !== currentOrigin) {
                el.style.transformOrigin = currentOrigin;
              }
              el.style.transform = rotateTransform;
            }
          }
        }
      }

      // 3. Move timeline ruler in EXACT 1:1 speed synchronization with cards
      if (rulerTrack) {
        rulerTrack.style.transform = `translate3d(${scrollX}px, 0, 0)`;
      }

      // Sleep loop when at rest
      if (!isMoving && Math.abs(velocity) === 0 && currentRotateY === 0) {
        isLoopRunning = false;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause loop when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      stage.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      stage.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  return (
    <div 
      id="specsheet-section-1" 
      ref={containerRef} 
      className="lookback-section"
      aria-label="Section 1 Better Off Lookback Timeline"
    >
      {/* 1] Top Navigation Bar */}
      <header className="lookback-top-bar">
        <div className="lookback-nav-links">
          <span className="lookback-nav-item active">Timeline,</span>
          <span className="lookback-nav-item">35mm Roll,</span>
          <span className="lookback-nav-item">Portfolio,</span>
          <span className="lookback-nav-item">About</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Tactile Shutter Audio Player Pill */}
          <button 
            type="button" 
            className="lookback-player-pill"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label="Toggle Ambient Audio"
          >
            <span className="lookback-player-art">{isPlaying ? '🔊' : '🔈'}</span>
            <span>Mechanical Shutter — 1/250s Loop</span>
          </button>

          {/* Bold Condensed Uppercase Menu Trigger */}
          <button
            type="button"
            className="lookback-nav-menu-btn"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              if (onOpenMenu) onOpenMenu(rect);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              if (onOpenMenu) onOpenMenu(rect);
            }}
            aria-label="Open Navigation Menu"
          >
            MENU
          </button>
        </div>
      </header>

      {/* 2] Massive Display Headline Typography (Overlaid ON TOP of cards with mix-blend-mode: difference) */}
      <div className="lookback-hero-title-container">
        <h2 className="lookback-title-brand">EXPOSURE LAB®</h2>
        <h1 className="lookback-title-main">THE RETROSPECTIVE</h1>
        <h3 className="lookback-title-sub">(EXP®/2026)</h3>
      </div>

      {/* 3] Interactive Drag Stage with 3D Perspective Door-Hinge Flap */}
      <div 
        ref={stageRef} 
        className="lookback-stage"
        aria-label="Drag Left and Right to Flap and Scroll"
      >
        <div ref={trackRef} className="lookback-cards-track">
          {LOOPED_ITEMS.map((item, idx) => (
            <LookbackCardItem
              key={item.uid}
              item={item}
              cardRef={(el) => (cardRefs.current[idx] = el)}
            />
          ))}
        </div>
      </div>

      {/* Mobile-only: Timeline label + swipe hint below cards */}
      <div className="lookback-mobile-bottom-label" aria-hidden="true">
        <span className="label-text">Timeline,</span>
        <span className="swipe-hint">← swipe →</span>
      </div>

      {/* 4] Synchronized Endless Circular Looping Ruler Timeline */}
      <div className="lookback-ruler-container">
        {/* Fixed Center Indicator Needle */}
        <div className="lookback-ruler-center-needle" />

        {/* Scrolling Ruler Track in exact 1:1 speed sync with cards */}
        <div ref={rulerTrackRef} className="lookback-ruler-track">
          <div className="lookback-ruler-inner">
            {LOOPED_MONTHS.map((month) => (
              <div 
                key={`ruler-${month.uid}`} 
                className="lookback-ruler-month-block"
                style={{ width: `${MONTH_BLOCK_WIDTH}px` }}
              >
                {/* Delicate Millimeter Ticks across the month block */}
                <div className="lookback-ruler-ticks">
                  {Array.from({ length: TICKS_PER_MONTH }).map((_, tickIdx) => {
                    const isCenter = tickIdx === Math.floor(TICKS_PER_MONTH / 2);
                    return (
                      <span 
                        key={tickIdx} 
                        className={`lookback-tick ${isCenter ? 'center-tick' : ''}`} 
                      />
                    );
                  })}
                </div>

                {/* Clean Uppercase Month Label centered under center tick */}
                <span className="lookback-ruler-month-label">
                  {month.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BetterOffLookback = memo(BetterOffLookbackComponent);
export default BetterOffLookback;
