import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { EXPANDING_GALLERY_DATA } from '../../../data/page1/expandingGalleryData';

const ROWS_COUNT = 8;
const ITEMS_PER_ROW = 8;

const ExpandingGalleryComponent = () => {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let startWidth = 125;
    let endWidth = 500;
    let isTickerActive = false;
    let lastRenderedFrame = -1;

    const setupLayout = () => {
      const width = window.innerWidth;
      if (width < 640) {
        startWidth = 260;
        endWidth = 720;
      } else if (width < 768) {
        startWidth = 220;
        endWidth = 640;
      } else if (width <= 1024) {
        startWidth = Math.round(125 * (1200 / Math.max(width, 500)));
        endWidth = Math.round(startWidth * 3.6);
      } else if (width <= 1440) {
        startWidth = 125;
        endWidth = 500;
      } else {
        startWidth = 115;
        endWidth = 450;
      }

      updateScroll(true);
    };

    const updateScroll = (force = false) => {
      const rows = rowsRef.current;
      if (!rows || rows.length === 0) return;

      const viewportHeight = window.innerHeight;
      const widthDelta = endWidth - startWidth;

      // Phase 1: Batch all DOM layout reads together (triggers at most 1 layout pass)
      const measurements = [];
      for (let i = 0; i < ROWS_COUNT; i++) {
        const row = rows[i];
        if (!row) continue;
        const rect = row.getBoundingClientRect();
        measurements.push({
          row,
          rectTop: rect.top,
          height: rect.height,
        });
      }

      // Phase 2: Batch all DOM style writes together (zero interleaved reflows)
      for (let i = 0; i < measurements.length; i++) {
        const { row, rectTop, height } = measurements[i];
        const span = viewportHeight + height || 1;
        let progress = (viewportHeight - rectTop) / span;
        if (progress < 0) progress = 0;
        else if (progress > 1) progress = 1;

        const targetWidth = `${startWidth + widthDelta * progress}%`;
        if (row.style.width !== targetWidth) {
          row.style.width = targetWidth;
        }
      }
    };

    const onTick = () => {
      const frame = gsap.ticker.frame;
      if (frame === lastRenderedFrame) return;
      lastRenderedFrame = frame;
      updateScroll();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setupLayout();
            if (!isTickerActive) {
              gsap.ticker.add(onTick);
              if (window.lenis) {
                window.lenis.on('scroll', onTick);
              }
              isTickerActive = true;
            }
          } else {
            if (isTickerActive) {
              gsap.ticker.remove(onTick);
              if (window.lenis) {
                window.lenis.off('scroll', onTick);
              }
              isTickerActive = false;
            }
          }
        });
      },
      { threshold: 0.01, rootMargin: '300px 0px' }
    );

    window.addEventListener('resize', setupLayout, { passive: true });
    setupLayout();
    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', setupLayout);
      if (isTickerActive) {
        gsap.ticker.remove(onTick);
        if (window.lenis) {
          window.lenis.off('scroll', onTick);
        }
        isTickerActive = false;
      }
    };
  }, []);

  const rowsData = [];
  for (let r = 0; r < ROWS_COUNT; r++) {
    rowsData.push(EXPANDING_GALLERY_DATA.slice(r * ITEMS_PER_ROW, (r + 1) * ITEMS_PER_ROW));
  }

  return (
    <section
      id="expanding-gallery-section"
      ref={sectionRef}
      className="projects"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.8rem',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      {rowsData.map((rowItems, rowIdx) => (
        <div
          key={rowIdx}
          ref={(el) => (rowsRef.current[rowIdx] = el)}
          className="projects-row"
          style={{
            width: '125%',
            display: 'flex',
            gap: 'clamp(0.5rem, 1.2vw, 1rem)',
            willChange: 'width',
            transform: 'translateZ(0)'
          }}
        >
          {rowItems.map((item) => (
            <div
              key={item.id}
              className="project"
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                transform: 'translateZ(0)'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  alignSelf: 'flex-start',
                  backgroundColor: '#16161a',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderBottom: 'none',
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                  padding: '0.2rem 0.6rem',
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#b0b0b8',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <span>{item.frameNumber}</span>
                <span style={{ color: '#555560' }}>•</span>
                <span style={{ color: '#e5a956' }}>{item.category}</span>
              </div>

              <div
                className="project-img"
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  backgroundColor: '#121216',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderTopRightRadius: '6px',
                  borderBottomLeftRadius: '6px',
                  borderBottomRightRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              <div
                className="project-info"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.25rem 0',
                  fontFamily: "'Space Grotesk', monospace",
                  whiteSpace: 'nowrap'
                }}
              >
                <span
                  style={{
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#dddddf',
                    textTransform: 'uppercase',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '75%'
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    color: '#6e6e78',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export const ExpandingGallery = memo(ExpandingGalleryComponent);
export default ExpandingGallery;
