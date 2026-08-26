import React from 'react';
import { CursorTrail } from '../CursorTrail/CursorTrail';

export const StudioManifesto = () => {
  return (
    <section
      id="manifesto-section"
      style={{
        width: '100%',
        backgroundColor: '#0a0a0c',
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
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Bounded Cursor Trail for Studio Manifesto Section (Appears on top of text) */}
      <CursorTrail zIndex={15} />

      <div
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
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)'
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

export default StudioManifesto;
