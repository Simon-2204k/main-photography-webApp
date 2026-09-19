import React, { useRef, memo } from 'react';
import { CursorTrail } from '../CursorTrail/CursorTrail';
import { useSplitTextLines } from '../../../utils/useSplitTextLines';

const StudioManifestoComponent = () => {
  const sectionRef = useRef(null);

  useSplitTextLines(sectionRef, ['.manifesto-tagline', '.manifesto-paragraph'], {
    type: 'lines',
    stagger: 0.085,
    start: 'top 85%',
    duration: 0.85,
  });

  return (
    <section
      id="manifesto-section"
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'relative',
        zIndex: 10,
        padding: '12rem 2rem 14rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @media (max-width: 1024px) {
          #manifesto-section {
            min-height: 75vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: clamp(6rem, 10vh, 10rem) 2rem !important;
          }
          .manifesto-tagline {
            font-size: clamp(0.85rem, 1.6vw, 1.15rem) !important;
            letter-spacing: 0.22em !important;
            margin-bottom: 1.5rem !important;
          }
          .manifesto-paragraph {
            font-size: clamp(2.6rem, 5.2vw, 4.2rem) !important;
            line-height: 1.35 !important;
            max-width: 95% !important;
          }
        }
      `}</style>
      {/* Bounded Cursor Trail for Studio Manifesto Section (Appears on top of text) */}
      <CursorTrail zIndex={15} />

      <div
        className="manifesto-content"
        style={{
          maxWidth: '1050px', // Compressed width for tighter centered composition
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          position: 'relative',
          zIndex: 5
        }}
      >
        {/* Top Tagline */}
        <div
          className="manifesto-tagline"
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: '#8e8e95',
            textTransform: 'uppercase',
            marginBottom: '1.2rem'
          }}
        >
          Visual studio crafting timeless stories through photography
        </div>

        {/* Single Centered Flowing Typography Paragraph with Increased Line Height & Compressed Bounds */}
        <p
          className="manifesto-paragraph"
          style={{
            margin: 0,
            fontFamily: "'Anton', 'Oswald', 'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.1rem, 4.2vw, 4.4rem)',
            lineHeight: '1.42', // Increased line space for elegance and breath
            letterSpacing: '0.015em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: '1000px', // Compressed container width
          }}
        >
          It’s never “just a photograph.” Every <span style={underlineStyle}>frame</span> holds a story. We capture what words cannot express. Your vision. Our <span style={underlineStyle}>perspective</span>. Light, emotion, movement, and atmosphere. We preserve moments that deserve to be remembered. Not just images. <span style={underlineStyle}>Experiences</span> frozen in time. Every detail has a story waiting to be seen. Your world. Our lens. We frame the <span style={underlineStyle}>extraordinary</span>.
        </p>
      </div>
    </section>
  );
};

const underlineStyle = {
  display: 'inline-block',
  fontFamily: "'Newsreader', 'Playfair Display', 'Instrument Serif', Georgia, serif",
  fontStyle: 'italic',
  fontWeight: 400,
  textTransform: 'none', // Elegant lowercase/editorial italic lettering
  textDecoration: 'underline',
  textUnderlineOffset: '8px',
  textDecorationThickness: '2px',
  textDecorationColor: '#ffffff',
  margin: '0 15px', // 15px margin on left and right
  color: '#ffffff'
};

export const StudioManifesto = memo(StudioManifestoComponent);
export default StudioManifesto;
