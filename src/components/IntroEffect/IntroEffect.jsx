import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import './IntroEffect.css';

const INTRO_IMAGES = [
  '/images/intro/intro-01.webp',
  '/images/intro/intro-02.webp',
  '/images/intro/intro-03.webp',
  '/images/intro/intro-04.webp',
  '/images/intro/intro-05.webp',
  '/images/intro/intro-06.webp',
  '/images/intro/intro-07.webp',
  '/images/intro/intro-08.webp',
  '/images/intro/intro-09.webp',
  '/images/intro/intro-10.webp',
];

// Pre-computed organic card tilt angles
const CARD_ROTATIONS = [-12, 16, -6, 22, -18, 10, -24, 14, -8, 20];

export const IntroEffect = memo(function IntroEffect({ onComplete }) {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const upperDivRef = useRef(null);
  const isFinishedRef = useRef(false);

  const finishIntro = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    if (onComplete) {
      onComplete();
    }
  };

  const handleSkip = () => {
    const container = containerRef.current;
    if (!container) {
      finishIntro();
      return;
    }
    gsap.killTweensOf('*');
    gsap.to(container, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: finishIntro,
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    const upperDiv = upperDivRef.current;
    if (!container || !slider || !upperDiv) return;

    let isMounted = true;

    // React Image Optimization: Pre-decode all 10 WebP images asynchronously in parallel
    // so textures are pre-allocated in GPU memory before animations begin
    const preloadPromise = Promise.all(
      INTRO_IMAGES.map((src) => {
        const img = new Image();
        img.src = src;
        if (img.decode) {
          return img.decode().catch(() => {});
        }
        return Promise.resolve();
      })
    );

    let ctx;

    preloadPromise.then(() => {
      if (!isMounted) return;

      ctx = gsap.context(() => {
        const getSlideDistance = () => {
          const gap = parseFloat(getComputedStyle(slider).columnGap) || 50;
          return container.clientWidth + gap;
        };

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(container, {
              opacity: 0,
              duration: 0.65,
              ease: 'power2.inOut',
              onComplete: finishIntro,
            });
          },
        });

        // 1. Cards pop up sequentially over the center title
        tl.from('.intro-effect-card', {
          scale: 0,
          stagger: 0.185,
          duration: 0.45,
          ease: 'back.out(1.2)',
          transformOrigin: 'center center',
        })
        // 2. Scale upperDiv down to 0.75, revealing the belowDiv 3-column grid
        .to(
          upperDiv,
          {
            scale: 0.75,
            transformOrigin: 'center center',
            ease: 'power4.out',
            duration: 0.75,
          },
          '+=0.15'
        )
        // 3. Slide horizontally to secondopeningPage
        .to(slider, {
          x: () => -getSlideDistance(),
          duration: 1.0,
          ease: 'power4.inOut',
        })
        // 4. Scale upperDiv back to full scale 1
        .to(
          upperDiv,
          {
            scale: 1,
            ease: 'power4.out',
            duration: 0.75,
          },
          '+=0.1'
        );

        // Window resize & orientation change handler
        const handleResize = () => {
          if (slider && tl.progress() > 0.5) {
            gsap.set(slider, { x: -getSlideDistance() });
          }
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, container);
    });

    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="parentElementLandingDiv" aria-label="Intro Website Animation">
      {/* Subtle Skip Button */}
      <button onClick={handleSkip} className="intro-skip-btn" aria-label="Skip Intro Animation">
        <span>Skip</span>
        <span>↗</span>
      </button>

      {/* Underneath Monospace Grid (Revealed when upperDiv scales to 0.75) */}
      <div className="belowDiv">
        <div className="belowDiv-col">
          <h4>Master Emulsion Scans</h4>
          <h4>Optical Grain Analysis</h4>
          <h4>120mm Medium Format</h4>
          <h4>Silver Halide Precision</h4>
        </div>

        <div className="belowDiv-col">
          <h4>Curated Visual Dialogue</h4>
          <h4>Analog Darkroom Archive</h4>
          <h4>Dynamic Tone Calibration</h4>
          <h4>Baryta Master Prints</h4>
        </div>

        <div className="belowDiv-col">
          <h4>Monochromatic Contrast</h4>
          <h4>Depth of Field Optics</h4>
          <h4>Mechanical Shutter Blades</h4>
          <h4>Latent Image Chemistry</h4>
        </div>
      </div>

      {/* Upper Overlay Slider Window */}
      <div ref={upperDivRef} className="upperDiv">
        <div ref={sliderRef} className="slider">
          {/* Page 1: Opening Page with Center Title & 10 Popping Image Cards */}
          <div className="openingPage">
            <div className="outerDiv">
              {/* Center Display Title */}
              <div className="textDiv">
                <h1 className="title">PHOTOGRAPHY</h1>
              </div>

              {/* 10 Scattered Cards popping up */}
              {INTRO_IMAGES.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="image intro-effect-card"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${CARD_ROTATIONS[idx]}deg)`,
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`Archive Photographic Exhibit ${idx + 1}`}
                    className="intro-card-img"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width="200"
                    height="300"
                  />
                </div>
              ))}
            </div>

            {/* Bottom Floating Cards */}
            <div className="floating-card left">
              <h4>Silver Halide Craft</h4>
              <p>Analog emulsion scans & darkroom chemistry.</p>
            </div>

            <div className="floating-card right">
              <h4>Master Print Editions</h4>
              <p>Curated archival portfolio & optical depth.</p>
            </div>
          </div>

          {/* Page 2: Second Opening Page (Editorial Monograph Transition) */}
          <div className="secondopeningPage">
            <div className="NamedDiv">
              <div className="leftDiv">
                <h1>
                  SIMON<span className="registered">®</span>
                </h1>
              </div>

              <div className="rightDiv">
                <div className="top-meta">
                  <div className="bio">
                    PHOTOGRAPHIC ARCHIVE & OPTICAL MONOGRAPH / SILVER HALIDE MASTER PRINTS
                  </div>
                  <div className="date-time">
                    <div className="squares">■ ■ ■ ■</div>
                    <div>EST. 2026 / MMXXVI</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="thirdDiv" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default IntroEffect;
