import React, { useState, useEffect, useRef, memo } from 'react';
import { CursorTrail } from '../CursorTrail/CursorTrail';

const PerspectivesGridComponent = () => {
  const sectionRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startTrigger = windowHeight * 0.95;

      const endTrigger = -windowHeight * 0.10;

      let c1 = 140;
      let c2 = 320;
      let c3 = 220;

      if (rect.top > startTrigger) {
        c1 = 140;
        c2 = 320;
        c3 = 220;
      } else if (rect.top <= endTrigger) {
        c1 = 0;
        c2 = 0;
        c3 = 0;
      } else {
        const progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
        const clamped = Math.min(Math.max(progress, 0), 1);

        c1 = Math.round((1 - clamped) * 140);
        c2 = Math.round((1 - Math.pow(clamped, 1.4)) * 320);
        c3 = Math.round((1 - Math.pow(clamped, 0.75)) * 220);
      }

      if (col1Ref.current) col1Ref.current.style.transform = `translate3d(0, ${c1}px, 0)`;
      if (col2Ref.current) col2Ref.current.style.transform = `translate3d(0, ${c2}px, 0)`;
      if (col3Ref.current) col3Ref.current.style.transform = `translate3d(0, ${c3}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="perspectives-section"
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'relative',
        zIndex: 10,
        padding: '5rem 3rem 8rem',
        boxSizing: 'border-box',
        fontFamily: "'Inter', sans-serif",
        cursor: 'default',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .perspectives-editorial-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .perspectives-editorial-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
          #perspectives-section {
            padding: 4rem 2.5rem 5rem !important;
          }
          .perspectives-col-1 {
            display: flex !important;
            border-right: 1px solid rgba(255, 255, 255, 0.12) !important;
          }
          .perspectives-col-2 {
            display: flex !important;
            border-right: none !important;
          }
          .perspectives-col-3 {
            display: none !important;
          }
          .perspective-cell {
            padding: 2.5rem 2rem !important;
          }
        }
        @media (max-width: 767px) {
          .perspectives-editorial-grid {
            grid-template-columns: 1fr !important;
            max-width: 520px !important;
            margin: 0 auto !important;
          }
          #perspectives-section {
            padding: 3.5rem 1.2rem 4rem !important;
          }
          .perspectives-col-1 {
            display: none !important;
          }
          .perspectives-col-2 {
            border-right: none !important;
          }
          .perspectives-col-3 {
            display: none !important;
          }
        }
      `}</style>

      <CursorTrail zIndex={2} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '3.5rem',
          paddingBottom: '2.2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(2rem, 4.2vw, 4.4rem)',
            fontWeight: '900',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff'
          }}
        >
          OUR PERSPECTIVES AND STORIES
        </h2>
      </div>

      <div
        className="perspectives-editorial-grid"
        style={{
          gap: '0',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: 'none',
          width: '100%',
          maxWidth: '1650px',
          margin: '0 auto',
          boxSizing: 'border-box',
          backgroundColor: '#000000'
        }}
      >

        <div
          ref={col1Ref}
          className="perspectives-col-1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            transform: 'translate3d(0, 140px, 0)',
            transition: 'transform 0.08s ease-out'
          }}
        >

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={metaStyle}>LIGHT &amp; SHADOW · 2026-06-22</div>
              <h3 style={serifTitleStyle}>The Geometry of Monochrome</h3>
              <p style={excerptStyle}>
                A deep technical investigation into tonal range, grain structure, and contrast sculpting in black &amp; white photography.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={metaStyle}>STREET CHRONICLES · 2026-03-19</div>
              <h3 style={serifTitleStyle}>
                Chasing Decisive Moments in Tokyo &amp; Paris
              </h3>
              <p style={excerptStyle}>
                Documenting ephemeral urban motion, raw human gestures, and atmospheric rain reflections through 35mm primes.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={metaStyle}>OPTICS &amp; MASTERY · 2025-11-25</div>
              <h3 style={serifTitleStyle}>The Soul of Vintage Glass: Leica to Hasselblad</h3>
              <p style={excerptStyle}>
                Why manual aperture blades, natural glass imperfections, and tactile focusing produce unmistakable organic depth.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={metaStyle}>FIELD NOTES · 2025-10-31</div>
              <h3 style={serifTitleStyle}>The Solitude of Nordic Highlands</h3>
              <p style={excerptStyle}>
                Endless horizons, midnight fog, and long-exposure quietude under the Icelandic winter aurora.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>
        </div>

        <div
          ref={col2Ref}
          className="perspectives-col-2"
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            transform: 'translate3d(0, 320px, 0)',
            transition: 'transform 0.08s ease-out'
          }}
        >

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_1.jpg"
                  alt="Collaborative Cinematography"
                  loading="lazy"
                  decoding="async"
                  style={imageBannerStyle}
                />
                <div style={badgeOverlayStyle}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.8 }}>CINEMATOGRAPHY</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '0.4rem' }}>
                    DIRECTORS<br />IN FRAME
                  </div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#b0b0b8', marginTop: '0.4rem' }}>
                    ON-LOCATION MOTION LAB
                  </div>
                </div>
              </div>

              <div style={metaStyle}>CINEMA GUILD · 2026-05-06</div>
              <h3 style={serifTitleStyle}>The Art of Collaborative Cinematography</h3>
              <p style={excerptStyle}>
                On-location staging, natural light diffusion, and handheld framing for dynamic narrative storytelling.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_2.jpg"
                  alt="Framing Character in Crowd"
                  loading="lazy"
                  decoding="async"
                  style={imageBannerStyle}
                />
                <div style={badgeOverlayStyle}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.8 }}>PORTRAITURE</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '0.4rem' }}>
                    FIGURE &amp;<br />FORM
                  </div>
                  <div style={{ fontSize: '0.65rem', lineHeight: 1.4, color: '#b0b0b8', marginTop: '0.4rem', maxWidth: '200px' }}>
                    FOCAL ISOLATION &amp; DENSE COMPOSITION
                  </div>
                </div>
              </div>

              <div style={metaStyle}>STUDIO CHRONICLES · 2026-02-15</div>
              <h3 style={serifTitleStyle}>The Singular Subject: Framing Character in Crowd</h3>
              <p style={excerptStyle}>
                Using depth-of-field, contrast hierarchy, and focal isolation to command viewer focus in dense environments.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>
        </div>

        <div
          ref={col3Ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: 'translate3d(0, 220px, 0)',
            transition: 'transform 0.08s ease-out'
          }}
        >

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_3.jpg"
                  alt="Street Scene Realism"
                  loading="lazy"
                  decoding="async"
                  style={imageBannerStyle}
                />
                <div style={badgeOverlayStyle}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.8 }}>DOCUMENTARY</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '0.4rem' }}>
                    STREET<br />SCENES
                  </div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#b0b0b8', marginTop: '0.4rem' }}>
                    COMMUNITY ARCHIVE
                  </div>
                </div>
              </div>

              <div style={metaStyle}>HUMAN ESSAYS · 2026-03-25</div>
              <h3 style={serifTitleStyle}>
                Spontaneous Realism: Street Culture in Motion
              </h3>
              <p style={excerptStyle}>
                Documenting unscripted community interactions, genuine micro-expressions, and cultural atmosphere.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>

          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_4.jpg"
                  alt="Five Women with Cameras"
                  loading="lazy"
                  decoding="async"
                  style={imageBannerStyle}
                />
                <div style={badgeOverlayStyle}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.8 }}>THE COLLECTIVE</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '0.4rem' }}>
                    FIVE<br />LENSES
                  </div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#b0b0b8', marginTop: '0.4rem' }}>
                    VOICES IN LIGHT
                  </div>
                </div>
              </div>

              <div style={metaStyle}>CONTEMPORARY GUILD · 2025-12-08</div>
              <h3 style={serifTitleStyle}>
                Women Behind the Shutter: Redefining the Gaze
              </h3>
              <p style={excerptStyle}>
                Five distinct photographic philosophies uniting to challenge conventional perspectives in visual arts.
              </p>
            </div>
            <div style={arrowBtnStyle}>→</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const cellStyle = {
  backgroundColor: '#000000',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '0px',
  padding: '2.5rem 2.2rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '300px',
  position: 'relative',
  cursor: 'default',
  contain: 'paint layout'
};

const metaStyle = {
  fontFamily: "'Space Grotesk', monospace",
  fontSize: '0.72rem',
  fontWeight: '600',
  letterSpacing: '0.14em',
  color: '#8e8e98',
  textTransform: 'uppercase',
  marginBottom: '1rem'
};

const serifTitleStyle = {
  fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif",
  fontSize: 'clamp(1.65rem, 2.2vw, 2.25rem)',
  fontWeight: '500',
  lineHeight: '1.16',
  letterSpacing: '-0.015em',
  color: '#ffffff',
  margin: '0 0 1.2rem 0'
};

const excerptStyle = {
  fontSize: '0.92rem',
  lineHeight: '1.6',
  color: '#a2a2ad',
  fontWeight: '400',
  margin: '0 0 2rem 0'
};

const arrowBtnStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '0px',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '1rem',
  alignSelf: 'flex-start'
};

const imageBannerContainerStyle = {
  width: '100%',
  height: '210px',
  borderRadius: '0px',
  overflow: 'hidden',
  position: 'relative',
  marginBottom: '1.8rem',
  backgroundColor: '#16161c',
  border: '1px solid rgba(255, 255, 255, 0.08)'
};

const imageBannerStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  borderRadius: '0px',
  opacity: 0.9,
  filter: 'brightness(0.9) contrast(1.1)'
};

const badgeOverlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(10,10,14,0.92) 0%, rgba(10,10,14,0.35) 60%, rgba(10,10,14,0.7) 100%)',
  padding: '1.4rem 1.4rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  color: '#ffffff',
  boxSizing: 'border-box',
  borderRadius: '0px'
};

export const PerspectivesGrid = memo(PerspectivesGridComponent);
export default PerspectivesGrid;
