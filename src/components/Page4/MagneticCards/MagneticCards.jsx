import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MagneticCards.css';

// Section 4 Visual Assets (High-Res Photography)
const s4_1 = '/images/section4/pexels-304109370-14232091.webp';
const s4_2 = '/images/section4/pexels-abdelilah-hibat-allah-1652683667-33393728.webp';
const s4_3 = '/images/section4/pexels-aloevera-17612352.webp';
const s4_4 = '/images/section4/pexels-aloevera-20240486.webp';
const s4_5 = '/images/section4/pexels-andrew-schwark-540305-22468990.webp';
const s4_6 = '/images/section4/pexels-andrew-schwark-540305-9200496.webp';
const s4_7 = '/images/section4/pexels-fakhri98-16104931.webp';
const s4_8 = '/images/section4/pexels-fromsalih-36456611.webp';
const s4_9 = '/images/section4/pexels-gin-311039220-34175280.webp';
const s4_10 = '/images/section4/pexels-hazily-light-672092024-18022480.webp';
const s4_11 = '/images/section4/pexels-krista-glizdeniece-2150567376-31603972.webp';
const s4_12 = '/images/section4/pexels-kyle-miller-169884138-13411957.webp';
const s4_13 = '/images/section4/pexels-luiz-antico-1846061-4847526.webp';
const s4_14 = '/images/section4/pexels-marianamontrazi-6757343.webp';
const s4_15 = '/images/section4/pexels-minimoy-18532184.webp';
const s4_16 = '/images/section4/pexels-myatezhny39-3994122.webp';

gsap.registerPlugin(ScrollTrigger);

// Safe interior cell indices (rows 1..4, cols 1..4 of a 6x6 grid)
// Centering these cells guarantees zero empty spaces are ever revealed in the card viewport!
const SAFE_INTERIOR_CELLS = [
  7, 8, 9, 10,
  13, 14, 15, 16,
  19, 20, 21, 22,
  25, 26, 27, 28
];

export default function Section4StudioNamma() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const matrixRef = useRef(null);
  const [timeStr, setTimeStr] = useState('');

  // Live Indian Standard Time (IST) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
      });
      setTimeStr(istString);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // 3D Cursor Follow + Tilt According to Speed & Pin Scroll
  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const matrix = matrixRef.current;

    if (!section || !card || !matrix) return;

    // --- 1. Pin Section Briefly on Arrival ---
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=100vh',
      pin: true,
      pinSpacing: true,
      anticipatePin: 0,
      fastScrollEnd: true,
      preventOverlaps: true,
    });

    // --- 2. Viewport Geometry & Motion Bounds (Zero Layout Thrashing) ---
    let halfW = window.innerWidth / 2;
    let halfH = window.innerHeight / 2;
    let maxOffsetX = Math.max(50, (window.innerWidth - 270) / 2 - 24);
    let maxOffsetY = Math.max(50, (window.innerHeight - 380) / 2 - 24);
    let isVisible = false;
    let isResting = true;
    let isRunning = false;
    let shiftInterval = null;

    const updateBounds = () => {
      halfW = window.innerWidth / 2;
      halfH = window.innerHeight / 2;
      maxOffsetX = Math.max(50, (window.innerWidth - 270) / 2 - 24);
      maxOffsetY = Math.max(50, (window.innerHeight - 380) / 2 - 24);
    };

    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;
    let lastTime = performance.now();
    let velX = 0;
    let velY = 0;

    const mouse = {
      targetX: 0,
      targetY: 0,
      targetRotX: 0,
      targetRotY: 0,
      targetRotZ: 0,
    };
    const current = {
      x: 0,
      y: 0,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
    };

    const onMouseMove = (e) => {
      isResting = false;
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;

      // Instant velocity (px per frame normalized to ~60fps)
      const instantVx = (dx / dt) * 16.6;
      const instantVy = (dy / dt) * 16.6;

      // Blend velocity smoothly
      velX = velX * 0.35 + instantVx * 0.65;
      velY = velY * 0.35 + instantVy * 0.65;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      lastTime = now;

      // Full 2D Cursor Following: Offset from viewport center in both X and Y axes
      const diffX = e.clientX - halfW;
      const diffY = e.clientY - halfH;

      mouse.targetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, diffX));
      mouse.targetY = Math.max(-maxOffsetY, Math.min(maxOffsetY, diffY));

      const normX = Math.max(-1, Math.min(1, diffX / halfW));
      const normY = Math.max(-1, Math.min(1, diffY / halfH));

      // Tilt According to Speed
      const speedTiltY = Math.max(-45, Math.min(45, velX * 1.5));
      const speedTiltX = Math.max(-38, Math.min(38, -velY * 1.5));
      const speedTiltZ = Math.max(-25, Math.min(25, velX * 0.6));

      mouse.targetRotY = normX * 18 + speedTiltY;
      mouse.targetRotX = -normY * 15 + speedTiltX;
      mouse.targetRotZ = normX * 5 + speedTiltZ;
    };

    const onMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.targetRotX = 0;
      mouse.targetRotY = 0;
      mouse.targetRotZ = 0;
      velX = 0;
      velY = 0;
      isResting = false;
    };

    // Smooth physics ticker loop with zero layout thrashing
    const ticker = () => {
      if (!isVisible) return;

      // Velocity decay towards 0
      velX *= 0.88;
      velY *= 0.88;

      // Settle tilt smoothly when mouse stops
      if (Math.abs(velX) < 0.05 && Math.abs(velY) < 0.05) {
        const normX = Math.max(-1, Math.min(1, (lastMouseX - halfW) / halfW));
        const normY = Math.max(-1, Math.min(1, (lastMouseY - halfH) / halfH));
        mouse.targetRotY = normX * 18;
        mouse.targetRotX = -normY * 15;
        mouse.targetRotZ = normX * 5;
      }

      const deltaX = mouse.targetX - current.x;
      const deltaY = mouse.targetY - current.y;
      const deltaRotX = mouse.targetRotX - current.rotX;
      const deltaRotY = mouse.targetRotY - current.rotY;
      const deltaRotZ = mouse.targetRotZ - current.rotZ;

      // Sleep ticker when settled to avoid constant GPU layout updates
      if (
        Math.abs(velX) < 0.01 &&
        Math.abs(velY) < 0.01 &&
        Math.abs(deltaX) < 0.05 &&
        Math.abs(deltaY) < 0.05 &&
        Math.abs(deltaRotX) < 0.05 &&
        Math.abs(deltaRotY) < 0.05 &&
        Math.abs(deltaRotZ) < 0.05
      ) {
        if (isResting) return;
        isResting = true;
        current.x = mouse.targetX;
        current.y = mouse.targetY;
        current.rotX = mouse.targetRotX;
        current.rotY = mouse.targetRotY;
        current.rotZ = mouse.targetRotZ;
      } else {
        isResting = false;
        current.x += deltaX * 0.14;
        current.y += deltaY * 0.14;
        current.rotX += deltaRotX * 0.12;
        current.rotY += deltaRotY * 0.12;
        current.rotZ += deltaRotZ * 0.12;
      }

      gsap.set(card, {
        x: current.x,
        y: current.y,
        rotateX: current.rotX,
        rotateY: current.rotY,
        rotateZ: current.rotZ,
        transformPerspective: 1400,
      });
    };

    // --- 3. Inner 6x6 Grid Centering (Zero Empty Spaces) ---
    const isMobileView = window.innerWidth <= 640;
    const cardCenterX = isMobileView ? 102.5 : 135;
    const cardCenterY = isMobileView ? 145 : 190;
    const cellWidth = isMobileView ? 200 : 230;
    const cellHeight = isMobileView ? 140 : 160;
    const gap = isMobileView ? 12 : 14;
    const pad = isMobileView ? 12 : 14;

    const getCenterOffset = (index) => {
      const col = index % 6;
      const row = Math.floor(index / 6);
      const cellCenterX = pad + col * (cellWidth + gap) + cellWidth / 2;
      const cellCenterY = pad + row * (cellHeight + gap) + cellHeight / 2;
      return {
        x: cardCenterX - cellCenterX,
        y: cardCenterY - cellCenterY,
      };
    };

    let activeCellIndex = 19;
    const initOffset = getCenterOffset(activeCellIndex);
    gsap.set(matrix, { x: initOffset.x, y: initOffset.y });

    const startShifting = () => {
      if (shiftInterval) clearInterval(shiftInterval);
      shiftInterval = setInterval(() => {
        if (!isVisible) return;
        let nextIndex;
        do {
          const randChoice = Math.floor(Math.random() * SAFE_INTERIOR_CELLS.length);
          nextIndex = SAFE_INTERIOR_CELLS[randChoice];
        } while (nextIndex === activeCellIndex);

        activeCellIndex = nextIndex;
        const offset = getCenterOffset(activeCellIndex);

        gsap.to(matrix, {
          x: offset.x,
          y: offset.y,
          duration: 0.85,
          ease: 'power3.inOut',
        });
      }, 1500);
    };

    const stopShifting = () => {
      if (shiftInterval) {
        clearInterval(shiftInterval);
        shiftInterval = null;
      }
    };

    const startAnimation = () => {
      if (isRunning) return;
      isRunning = true;
      updateBounds();
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('resize', updateBounds, { passive: true });
      gsap.ticker.add(ticker);
      startShifting();
    };

    const stopAnimation = () => {
      if (!isRunning) return;
      isRunning = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', updateBounds);
      gsap.ticker.remove(ticker);
      stopShifting();
    };

    // --- 4. IntersectionObserver: Pause completely when outside viewport ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            startAnimation();
          } else {
            isVisible = false;
            stopAnimation();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    section.addEventListener('mouseleave', onMouseLeave);

    return () => {
      st.kill();
      observer.disconnect();
      section.removeEventListener('mouseleave', onMouseLeave);
      stopAnimation();
    };
  }, []);

  return (
    <section id="specsheet-section-4" ref={sectionRef} className="page4-section-container studio-namma-section">
      {/* Top Header Bar — Photography Brand Header */}
      <header className="namma-header">
        <div className="namma-brand">SIMON PHOTOGRAPHY</div>
        <div className="namma-talk-btn">BOOK A SESSION</div>
      </header>

      {/* Center Bold Display Typography — 100% Photography Theme */}
      <div className="namma-hero-text-wrap">
        <h1 className="namma-hero-title">WE CAPTURE</h1>
        <h1 className="namma-hero-title">LIGHT AND</h1>
        <h1 className="namma-hero-title">MOMENTS</h1>
      </div>

      {/* Floating & Cursor-Following 3D Card Viewport (Follows with zero gap, tilts with speed) */}
      <div className="namma-3d-card-wrapper">
        <div ref={cardRef} className="namma-3d-card">
          <div ref={matrixRef} className="namma-matrix-container">
            {/* ROW 0 (Buffer Row) */}
            <div className="namma-matrix-cell"><img src={s4_1} alt="Visual 1" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_2} alt="Visual 2" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_3} alt="Visual 3" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_4} alt="Visual 4" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_5} alt="Visual 5" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_6} alt="Visual 6" loading="lazy" decoding="async" /></div>

            {/* ROW 1 (Interior Safe Row: Cells 7, 8, 9, 10) */}
            <div className="namma-matrix-cell"><img src={s4_7} alt="Visual 7" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell namma-cell-homework">
              <div className="namma-cell-homework-col">
                <span>PORTRAIT</span>
                <span>FASHION</span>
                <span>EDITORIAL</span>
                <span>STREET</span>
              </div>
              <div className="namma-cell-homework-col" style={{ opacity: 0.85 }}>
                <span>STUDIO</span>
                <span>FILM</span>
                <span>GALLERY</span>
              </div>
            </div>
            <div className="namma-matrix-cell"><img src={s4_8} alt="Visual 8" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_9} alt="Visual 9" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell namma-cell-curated">
              <span className="namma-cell-curated-badge">VISUAL STORIES</span>
              <span className="namma-cell-curated-sub">FRAMES & EXHIBITIONS</span>
            </div>
            <div className="namma-matrix-cell"><img src={s4_10} alt="Visual 10" loading="lazy" decoding="async" /></div>

            {/* ROW 2 (Interior Safe Row: Cells 13, 14, 15, 16) */}
            <div className="namma-matrix-cell"><img src={s4_11} alt="Visual 11" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_12} alt="Visual 12" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell namma-cell-curated">
              <span className="namma-cell-curated-badge">VISUAL STORIES</span>
              <span className="namma-cell-curated-sub">FRAMES & EXHIBITIONS</span>
            </div>
            <div className="namma-matrix-cell"><img src={s4_13} alt="Visual 13" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_14} alt="Visual 14" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_15} alt="Visual 15" loading="lazy" decoding="async" /></div>

            {/* ROW 3 (Interior Safe Row: Cells 19, 20, 21, 22) */}
            <div className="namma-matrix-cell"><img src={s4_16} alt="Visual 16" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell namma-cell-portfolio">
              <h3>SELECTED WORKS</h3>
              <span style={{ fontSize: '11px', letterSpacing: '0.12em', opacity: 0.65 }}>
                PHOTOGRAPHIC ARCHIVE
              </span>
            </div>
            <div className="namma-matrix-cell"><img src={s4_1} alt="Visual 17" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_2} alt="Visual 18" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell namma-cell-homework">
              <div className="namma-cell-homework-col">
                <span>LIGHT</span>
                <span>SHADOW</span>
                <span>ANALOG</span>
                <span>VISION</span>
              </div>
              <div className="namma-cell-homework-col" style={{ opacity: 0.85 }}>
                <span>RAW</span>
                <span>PRINTS</span>
                <span>LAB</span>
              </div>
            </div>
            <div className="namma-matrix-cell"><img src={s4_3} alt="Visual 19" loading="lazy" decoding="async" /></div>

            {/* ROW 4 (Interior Safe Row: Cells 25, 26, 27, 28) */}
            <div className="namma-matrix-cell"><img src={s4_4} alt="Visual 20" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_5} alt="Visual 21" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell namma-cell-portfolio">
              <h3>SIMON STUDIO</h3>
              <span style={{ fontSize: '11px', letterSpacing: '0.12em', opacity: 0.65 }}>
                FINE ART ARCHIVE
              </span>
            </div>
            <div className="namma-matrix-cell"><img src={s4_6} alt="Visual 22" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_7} alt="Visual 23" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_8} alt="Visual 24" loading="lazy" decoding="async" /></div>

            {/* ROW 5 (Buffer Row) */}
            <div className="namma-matrix-cell"><img src={s4_9} alt="Visual 25" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_10} alt="Visual 26" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_11} alt="Visual 27" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_12} alt="Visual 28" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_13} alt="Visual 29" loading="lazy" decoding="async" /></div>
            <div className="namma-matrix-cell"><img src={s4_14} alt="Visual 30" loading="lazy" decoding="async" /></div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <footer className="namma-footer">
        <div className="namma-footer-left">
          CAPTURING TIMELESS STORIES & EDITORIAL FRAMES.
        </div>
        <div className="namma-footer-right">
          <span>NEW DELHI, INDIA</span>
          <span style={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: 'bold' }}>
            {timeStr || '18:50:00'} IST
          </span>
        </div>
      </footer>
    </section>
  );
}
