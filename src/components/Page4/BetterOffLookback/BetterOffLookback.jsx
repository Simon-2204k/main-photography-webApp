import React, { useEffect, useRef, useState, memo } from 'react';
import section1Data from './section1_data.json';
import './BetterOffLookback.css';

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const LOOPED_ITEMS = [
  ...section1Data.map((m, i) => ({ ...m, loopIdx: 0, uid: `s1-${m.id}-${i}` })),
  ...section1Data.map((m, i) => ({ ...m, loopIdx: 1, uid: `s2-${m.id}-${i}` })),
  ...section1Data.map((m, i) => ({ ...m, loopIdx: 2, uid: `s3-${m.id}-${i}` }))
];

const CARD_SLOT_WIDTH = 340;
const CARDS_PER_MONTH = section1Data.length / 12;
const MONTH_BLOCK_WIDTH = CARDS_PER_MONTH * CARD_SLOT_WIDTH;
const TOTAL_CYCLE_WIDTH = section1Data.length * CARD_SLOT_WIDTH;
const TICKS_PER_MONTH = 41;

const LOOPED_MONTHS = [
  ...MONTH_NAMES.map((name, i) => ({ name, uid: `r1-${name}-${i}` })),
  ...MONTH_NAMES.map((name, i) => ({ name, uid: `r2-${name}-${i}` })),
  ...MONTH_NAMES.map((name, i) => ({ name, uid: `r3-${name}-${i}` }))
];

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

    const initialOffset = -TOTAL_CYCLE_WIDTH + (window.innerWidth / 2) - (CARD_SLOT_WIDTH / 2);
    let scrollX = initialOffset;
    let velocity = 0;
    let isPointerDown = false;
    let startPointerX = 0;
    let lastPointerX = 0;
    let lastTime = performance.now();
    let animationFrameId = null;

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
      const clientX = e.clientX;
      startPointerX = clientX;
      lastPointerX = clientX;
      lastTime = performance.now();
      velocity = 0;
      if (stage.setPointerCapture && e.pointerId) {
        try { stage.setPointerCapture(e.pointerId); } catch (_) {}
      }
      stage.style.cursor = 'grabbing';
      startLoop();
    };

    const handlePointerMove = (e) => {
      if (!isPointerDown) return;
      const clientX = e.clientX;
      const now = performance.now();
      const rawDeltaX = clientX - lastPointerX;
      const dt = Math.max(now - lastTime, 1);

      const isTouch = e.pointerType === 'touch' || window.innerWidth <= 1024;
      const speedMult = isTouch ? 1.75 : 1.0;
      const deltaX = rawDeltaX * speedMult;

      scrollX += deltaX;
      velocity = (deltaX / dt) * 16.6;

      if (deltaX > 0.3) {
        currentOrigin = 'right center';
        targetRotateY = Math.min(Math.abs(velocity) * 0.7, 24);
      } else if (deltaX < -0.3) {
        currentOrigin = 'left center';
        targetRotateY = -Math.min(Math.abs(velocity) * 0.7, 24);
      }

      lastPointerX = clientX;
      lastTime = now;
      startLoop();
    };

    const handlePointerUp = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      stage.style.cursor = 'grab';
      if (stage.releasePointerCapture && e && e.pointerId) {
        try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      if (e && (e.pointerType === 'touch' || window.innerWidth <= 1024)) {
        velocity = Math.max(-55, Math.min(55, velocity * 1.3));
      }
    };

    stage.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    const animate = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }

      let isMoving = isPointerDown;

      if (!isPointerDown) {
        velocity *= 0.93;
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

      currentRotateY += (targetRotateY - currentRotateY) * 0.14;
      if (Math.abs(currentRotateY) < 0.05 && Math.abs(targetRotateY) < 0.05) {
        currentRotateY = 0;
      } else {
        isMoving = true;
      }

      const cycleMin = -TOTAL_CYCLE_WIDTH * 2;
      const cycleMax = -TOTAL_CYCLE_WIDTH * 0.5;
      if (scrollX < cycleMin) {
        scrollX += TOTAL_CYCLE_WIDTH;
      } else if (scrollX > cycleMax) {
        scrollX -= TOTAL_CYCLE_WIDTH;
      }

      track.style.transform = `translate3d(${scrollX}px, 0, 0)`;

      if (isMoving || currentRotateY !== 0) {
        const rotateTransform = `rotateY(${currentRotateY.toFixed(2)}deg)`;
        const totalCards = cardRefs.current.length;

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

      if (rulerTrack) {
        rulerTrack.style.transform = `translate3d(${scrollX}px, 0, 0)`;
      }

      if (!isMoving && Math.abs(velocity) === 0 && currentRotateY === 0) {
        isLoopRunning = false;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

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
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div
      id="specsheet-section-1"
      ref={containerRef}
      className="lookback-section"
      aria-label="Section 1 Better Off Lookback Timeline"
    >

      <header className="lookback-top-bar">
        <div className="lookback-nav-links">
          <span className="lookback-nav-item active">Timeline,</span>
          <span className="lookback-nav-item">35mm Roll,</span>
          <span className="lookback-nav-item">Portfolio,</span>
          <span className="lookback-nav-item">About</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

          <button
            type="button"
            className="lookback-player-pill"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label="Toggle Ambient Audio"
          >
            <span className="lookback-player-art">{isPlaying ? '🔊' : '🔈'}</span>
            <span>Mechanical Shutter — 1/250s Loop</span>
          </button>

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

      <div className="lookback-hero-title-container">
        <h2 className="lookback-title-brand">EXPOSURE LAB®</h2>
        <h1 className="lookback-title-main">THE RETROSPECTIVE</h1>
        <h3 className="lookback-title-sub">(EXP®/2026)</h3>
      </div>

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

      <div className="lookback-mobile-bottom-label" aria-hidden="true">
        <span className="label-text">Timeline,</span>
        <span className="swipe-hint">← swipe →</span>
      </div>

      <div className="lookback-ruler-container">

        <div className="lookback-ruler-center-needle" />

        <div ref={rulerTrackRef} className="lookback-ruler-track">
          <div className="lookback-ruler-inner">
            {LOOPED_MONTHS.map((month) => (
              <div
                key={`ruler-${month.uid}`}
                className="lookback-ruler-month-block"
                style={{ width: `${MONTH_BLOCK_WIDTH}px` }}
              >

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
