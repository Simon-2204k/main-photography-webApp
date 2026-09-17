import React, { useState, useEffect, useRef } from 'react';

const DISCIPLINES = [
  {
    id: '01',
    title: 'VISUAL DIRECTION',
    subTag: 'STORYTELLING',
    bgColor: '#f4f1ea',
    textColor: '#1a1a1a',
    accentColor: '#4f772d',
    subLabel: 'ART DIRECTION'
  },
  {
    id: '02',
    title: 'VISUAL STORYTELLING',
    subTag: 'NARRATIVE',
    bgColor: '#f7ebe8',
    textColor: '#1a1a1a',
    accentColor: '#d95d39',
    subLabel: 'STORYTELLING'
  },
  {
    id: '03',
    title: 'LIGHT & SHADOW',
    subTag: 'EXPOSURE',
    bgColor: '#ebebeb',
    textColor: '#111111',
    accentColor: '#333333',
    subLabel: 'CHIAROSCURO'
  },
  {
    id: '04',
    title: 'FINE ART',
    subTag: 'ARCHIVE',
    bgColor: '#eeeaf5',
    textColor: '#1a1a1a',
    accentColor: '#7b2cbf',
    subLabel: 'FINE ART'
  },
  {
    id: '05',
    title: 'VISUAL COMPOSITION',
    subTag: 'GEOMETRY',
    bgColor: '#e3efe9',
    textColor: '#1a1a1a',
    accentColor: '#2d6a4f',
    subLabel: 'COMPOSITION'
  },
  {
    id: '06',
    title: 'MOTION & BLUR',
    subTag: 'KINETICS',
    bgColor: '#e2f1f8',
    textColor: '#1a1a1a',
    accentColor: '#0077b6',
    subLabel: 'MOTION'
  },
  {
    id: '07',
    title: 'BLACK & WHITE',
    subTag: 'MONOCHROME',
    bgColor: '#e6e6e6',
    textColor: '#111111',
    accentColor: '#1a1a1a',
    subLabel: 'MONO'
  },
  {
    id: '08',
    title: 'LANDSCAPE',
    subTag: 'HORIZONS',
    bgColor: '#f9f2e3',
    textColor: '#1a1a1a',
    accentColor: '#b08968',
    subLabel: 'LANDSCAPE'
  },
  {
    id: '09',
    title: 'PORTRAITURE',
    subTag: 'HUMAN FORM',
    bgColor: '#fbe8ec',
    textColor: '#1a1a1a',
    accentColor: '#e63946',
    subLabel: 'PORTRAIT'
  },
  {
    id: '10',
    title: 'STREET & URBAN',
    subTag: 'METROPOLIS',
    bgColor: '#fcf8d8',
    textColor: '#1a1a1a',
    accentColor: '#b5a100',
    subLabel: 'STREET'
  },
  {
    id: '11',
    title: 'COMMERCIAL',
    subTag: 'CAMPAIGNS',
    bgColor: '#e4ebf5',
    textColor: '#1a1a1a',
    accentColor: '#1d3557',
    subLabel: 'COMMERCIAL'
  },
  {
    id: '12',
    title: 'EDITORIAL',
    subTag: 'PUBLISHING',
    bgColor: '#faf6ee',
    textColor: '#1a1a1a',
    accentColor: '#5c4d3c',
    subLabel: 'EDITORIAL'
  }
];

const VisualDisciplinesComponent = () => {
  const [activeIndex, setActiveIndex] = useState(-1); // -1 when not yet in range
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!itemsRef.current.length) return;
      const centerY = window.innerHeight * 0.5;

      const firstItem = itemsRef.current[0];
      const lastItem = itemsRef.current[itemsRef.current.length - 1];

      if (!firstItem || !lastItem) return;

      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();

      const firstCenterY = firstRect.top + firstRect.height / 2;
      const lastCenterY = lastRect.top + lastRect.height / 2;

      // Card & highlight are ONLY active between the 1st word reaching 50vh and the 12th word leaving 50vh!
      const isWithinActiveRange = (firstCenterY <= centerY) && (lastCenterY >= centerY);

      if (!isWithinActiveRange) {
        setIsVisible(false);
        setActiveIndex(-1);
        return;
      }

      setIsVisible(true);

      // Find closest word to centerY
      let closestIdx = 0;
      let minDistance = Infinity;

      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItem = (activeIndex >= 0 && DISCIPLINES[activeIndex]) ? DISCIPLINES[activeIndex] : DISCIPLINES[0];

  return (
    <section
      id="visual-disciplines-section"
      ref={containerRef}
      style={{
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        border: 'none',
        cursor: 'default',
        paddingTop: '20vh', // 20vh top gap
        paddingBottom: '20vh' // 20vh bottom gap
      }}
    >
      <style>{`
        .visual-preview-box {
          position: fixed;
          top: 50vh;
          left: calc(50vw - 440px);
        }
        .visual-words-list {
          padding-left: calc(50vw - 110px);
        }
        @media (max-width: 1024px) {
          .visual-preview-box {
            display: none;
          }
          .visual-preview-box.is-visible {
            display: flex !important;
            position: fixed !important;
            top: auto !important;
            bottom: 16px !important;
            left: 16px !important;
            right: 16px !important;
            width: calc(100% - 32px) !important;
            max-width: calc(100vw - 32px) !important;
            height: clamp(220px, 24vh, 280px) !important;
            aspect-ratio: auto !important;
            transform: none !important;
            padding: 1.6rem 2.2rem !important;
            border-radius: 16px !important;
            z-index: 100 !important;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.8) !important;
          }
          .visual-preview-center {
            margin: 0 !important;
            flex-direction: row !important;
            gap: 0.8rem !important;
            justify-content: center !important;
          }
          .visual-preview-sublabel {
            font-size: clamp(3.2rem, 5.8vw, 4.5rem) !important;
            font-weight: 800 !important;
            letter-spacing: 0.04em !important;
          }
          .visual-preview-top-row span {
            font-size: clamp(0.95rem, 1.5vw, 1.15rem) !important;
          }
          .visual-preview-bottom-row span {
            font-size: clamp(0.95rem, 1.4vw, 1.15rem) !important;
          }
          .visual-preview-line,
          .visual-preview-frame-tag {
            display: none !important;
          }
          .visual-words-list {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-bottom: clamp(260px, 28vh, 340px) !important;
            align-items: center !important;
            text-align: center !important;
          }
          .visual-word-row {
            position: relative !important;
            padding-top: clamp(2rem, 3.5vh, 3.2rem) !important;
            padding-bottom: 0.6rem !important;
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
          .visual-word-row h2 {
            text-align: center !important;
            width: 100% !important;
            font-size: clamp(3.8rem, 8vw, 6.5rem) !important;
            line-height: 1.05 !important;
          }
          .visual-word-subtag {
            position: absolute !important;
            top: 0 !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin-left: 0 !important;
            z-index: 15 !important;
            font-size: clamp(0.85rem, 1.5vw, 1.15rem) !important;
            letter-spacing: 0.22em !important;
            text-align: center !important;
          }
        }
      `}</style>
      {/* 1:1 Graphic Preview Box - Fixed Dead-Center at Exact 50% Window Height */}
      <div
        className={`visual-preview-box ${isVisible ? 'is-visible' : 'is-hidden'}`}
        style={{
          position: 'fixed',
          top: '50vh',
          left: 'calc(50vw - 440px)',
          transform: 'translateY(-50%)',
          width: '280px',
          height: '280px',
          aspectRatio: '1 / 1',
          backgroundColor: activeItem.bgColor,
          borderRadius: '0px',
          padding: '1.6rem',
          boxSizing: 'border-box',
          display: isVisible ? 'flex' : 'none', // Disappears instantly with ZERO delay
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          // Smooth continuous background morph between words, but instant on/off outside list
          transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 30
        }}
      >
        {/* Top Row Minimal ID */}
        <div
          className="visual-preview-top-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#666',
              transition: 'color 0.3s ease'
            }}
          >
            № {activeItem.id}
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#888',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease'
            }}
          >
            {activeItem.subTag}
          </span>
        </div>

        {/* Center Visual Art Graphic */}
        <div
          className="visual-preview-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            my: 'auto'
          }}
        >
          <div
            className="visual-preview-sublabel"
            style={{
              fontFamily: "'Anton', 'Oswald', sans-serif",
              fontSize: '2.4rem',
              lineHeight: '0.95',
              letterSpacing: '0.02em',
              color: activeItem.accentColor,
              textTransform: 'uppercase',
              transition: 'color 0.35s ease'
            }}
          >
            {activeItem.subLabel}
          </div>
          <div
            className="visual-preview-line"
            style={{
              width: '30px',
              height: '2px',
              backgroundColor: activeItem.accentColor,
              margin: '0.6rem 0',
              opacity: 0.5,
              transition: 'background-color 0.35s ease'
            }}
          />
          <span
            className="visual-preview-frame-tag"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              color: '#555',
              textTransform: 'uppercase'
            }}
          >
            PHOTOGRAPHY FRAME
          </span>
        </div>

        {/* Bottom Row Tag */}
        <div
          className="visual-preview-bottom-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: '#777'
            }}
          >
            STUDIO DISCIPLINE
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: '0.8rem',
              fontWeight: 800,
              color: activeItem.textColor,
              transition: 'color 0.3s ease'
            }}
          >
            ↗
          </span>
        </div>
      </div>

      {/* Right Side: Words List Scrolling Vertically Through 50% Window Height */}
      <div
        className="visual-words-list"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: 'calc(50vw - 110px)', // Aligns text directly to the right of fixed 1:1 card
          gap: '0.3rem', // Zero gap between stacked words
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {DISCIPLINES.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="visual-word-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem 0', // Zero extra vertical gaps
                cursor: 'default',
                whiteSpace: 'nowrap'
              }}
            >
              {/* Word Title */}
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Anton', 'Oswald', 'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
                  lineHeight: '1.02',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: isActive ? '#ffffff' : '#28282c',
                  transition: 'color 0.25s ease'
                }}
              >
                {item.title}
              </h2>

              {/* Right Side Subtitle */}
              <span
                className="visual-word-subtag"
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#e5a956',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                  marginLeft: '2rem'
                }}
              >
                {item.subTag}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const VisualDisciplines = React.memo(VisualDisciplinesComponent);
export default VisualDisciplines;
