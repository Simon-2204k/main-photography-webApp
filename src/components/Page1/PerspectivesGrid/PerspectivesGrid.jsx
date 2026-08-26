import React, { useState, useEffect, useRef } from 'react';
import { CursorTrail } from '../CursorTrail/CursorTrail';
import { VisualDisciplines } from '../VisualDisciplines/VisualDisciplines';

export const PerspectivesGrid = () => {
  const [offsets, setOffsets] = useState({ col1: 140, col2: 320, col3: 220 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 🎯 1. Columns start distinct speed motion as second page emerges from bottom (top <= 95% windowHeight)
      const startTrigger = windowHeight * 0.95;
      // 🎯 2. Stops and locks onto the exact same equal line when second page crosses 10% ABOVE the top (top <= -10% windowHeight)
      const endTrigger = -windowHeight * 0.10;

      if (rect.top > startTrigger) {
        // Before emergence threshold: columns stay at their initial resting offset
        setOffsets({ col1: 140, col2: 320, col3: 220 });
      } else if (rect.top <= endTrigger) {
        // When page crosses 10% above the top window screen: all 3 columns lock in the exact same equal line (0px)
        setOffsets({ col1: 0, col2: 0, col3: 0 });
      } else {
        // Between bottom emergence and 10% above top: 3 distinct speeds
        const progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
        const clamped = Math.min(Math.max(progress, 0), 1);

        // Column 1 Speed (Linear steady flow)
        const col1 = (1 - clamped) * 140;
        // Column 2 Speed (Fast dynamic surge)
        const col2 = (1 - Math.pow(clamped, 1.4)) * 320;
        // Column 3 Speed (Smooth trailing glide)
        const col3 = (1 - Math.pow(clamped, 0.75)) * 220;

        setOffsets({
          col1: Math.round(col1),
          col2: Math.round(col2),
          col3: Math.round(col3)
        });
      }
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
        backgroundColor: '#0a0a0c',
        color: '#ffffff',
        position: 'relative',
        zIndex: 10,
        padding: '5rem 3rem 8rem',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        fontFamily: "'Inter', sans-serif",
        cursor: 'default',
        overflow: 'hidden'
      }}
    >
      {/* Bounded Cursor Trail for Perspectives Section */}
      <CursorTrail zIndex={2} />

      {/* Top Header Section */}
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
            fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
            fontWeight: '900',
            lineHeight: '0.95',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#ffffff'
          }}
        >
          OUR PERSPECTIVES<br />AND STORIES
        </h2>
      </div>

      {/* 3-Column Seamless Editorial Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '0',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: 'none',
          width: '100%',
          maxWidth: '1650px',
          margin: '0 auto',
          boxSizing: 'border-box',
          backgroundColor: '#0d0d10'
        }}
      >
        {/* ================= COLUMN 1 (Speed 1) ================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            transform: `translate3d(0, ${offsets.col1}px, 0)`,
            transition: 'transform 0.08s ease-out'
          }}
        >
          {/* Card 1.1 */}
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

          {/* Card 1.2 */}
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

          {/* Card 1.3 */}
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

          {/* Card 1.4 */}
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

        {/* ================= COLUMN 2 (Speed 2) ================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            transform: `translate3d(0, ${offsets.col2}px, 0)`,
            transition: 'transform 0.08s ease-out'
          }}
        >
          {/* Card 2.1 (Image 1: Four Young Men Filming Outdoors) */}
          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_1.jpg"
                  alt="Collaborative Cinematography"
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

          {/* Card 2.2 (Image 2: Woman in Hat Standing in Front of Group) */}
          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_2.jpg"
                  alt="Framing Character in Crowd"
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

        {/* ================= COLUMN 3 (Speed 3) ================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: `translate3d(0, ${offsets.col3}px, 0)`,
            transition: 'transform 0.08s ease-out'
          }}
        >
          {/* Card 3.1 (Image 3: Children Gather Around Men in Street Scene) */}
          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_3.jpg"
                  alt="Street Scene Realism"
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

          {/* Card 3.2 (Image 4: Five Women Holding Cameras) */}
          <div className="perspective-cell" style={cellStyle}>
            <div>
              <div style={imageBannerContainerStyle}>
                <img
                  src="/assets/page1/editorial/editorial_4.jpg"
                  alt="Five Women with Cameras"
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

/* Reusable Inline Styles (0 Gaps, 0 Roundness, 1px Gray Borders, Normal Default Cursor) */
const cellStyle = {
  backgroundColor: '#0d0d10',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '0px',
  padding: '2.5rem 2.2rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '300px',
  position: 'relative',
  cursor: 'default'
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
