import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EXPANDING_GALLERY_DATA } from '../../../data/page1/expandingGalleryData';

const ROWS_COUNT = 8;
const ITEMS_PER_ROW = 8;

export const ExpandingGallery = () => {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let startWidth, endWidth;

    const setupLayout = () => {
      const isMobile = window.innerWidth < 1000;
      startWidth = isMobile ? 250 : 125;
      endWidth = isMobile ? 750 : 500;

      if (rowsRef.current[0]) {
        rowsRef.current[0].style.width = `${endWidth}%`;
        const singleRowHeight = rowsRef.current[0].offsetHeight;
        rowsRef.current[0].style.width = "";

        const styles = getComputedStyle(section);
        const gapSize = parseFloat(styles.gap) || 0;
        const paddingTop = parseFloat(styles.paddingTop) || 0;
        const paddingBottom = parseFloat(styles.paddingBottom) || 0;

        section.style.height = `${singleRowHeight * ROWS_COUNT + gapSize * (ROWS_COUNT - 1) + paddingTop + paddingBottom}px`;
      }
    };

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      rowsRef.current.forEach((row) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const rowTop = rect.top + scrollY;
        const scrollStart = rowTop - viewportHeight;
        const scrollEnd = rowTop + rect.height;

        let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
        progress = Math.max(0, Math.min(1, progress));

        row.style.width = `${startWidth + (endWidth - startWidth) * progress}%`;
      });
    };

    window.addEventListener("resize", setupLayout);
    setupLayout();
    gsap.ticker.add(updateScroll);

    return () => {
      window.removeEventListener("resize", setupLayout);
      gsap.ticker.remove(updateScroll);
    };
  }, []);

  // Split 64 items into 8 rows of 8 items
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
        backgroundColor: '#0a0a0c',
        color: '#ffffff',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.8rem',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 10
      }}
    >
      {/* Dynamic Expanding Rows */}
      {rowsData.map((rowItems, rowIdx) => (
        <div
          key={rowIdx}
          ref={(el) => (rowsRef.current[rowIdx] = el)}
          className="projects-row"
          style={{
            width: '125%',
            display: 'flex',
            gap: '1rem'
          }}
        >
          {rowItems.map((item) => (
            <div
              key={item.id}
              className="project"
              style={{
                flex: 1,
                aspectRatio: '7 / 5',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Stepped Darkroom Cassette Tab */}
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
                  textTransform: 'uppercase'
                }}
              >
                <span>{item.frameNumber}</span>
                <span style={{ color: '#555560' }}>•</span>
                <span style={{ color: '#e5a956' }}>{item.category}</span>
              </div>

              {/* Main Photo Frame Body */}
              <div
                className="project-img"
                style={{
                  flex: 1,
                  minHeight: 0,
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
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Under-Card Metadata */}
              <div
                className="project-info"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.25rem 0',
                  fontFamily: "'Space Grotesk', monospace"
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
                    letterSpacing: '0.06em'
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

export default ExpandingGallery;
