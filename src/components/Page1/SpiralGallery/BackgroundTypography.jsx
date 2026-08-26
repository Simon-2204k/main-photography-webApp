import React from 'react';

export const BackgroundTypography = ({ onOpenMenu }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 15,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'difference'
      }}
    >
      <h1
        style={{
          margin: 0,
          padding: 0,
          fontSize: 'clamp(2.5rem, 6.5vw, 7.5rem)',
          fontWeight: '900',
          lineHeight: '0.85',
          letterSpacing: '-0.03em',
          color: '#ffffff',
          textTransform: 'uppercase',
          fontFamily: 'Inter, system-ui, sans-serif',
          whiteSpace: 'nowrap'
        }}
      >
        THE WORLD THROUGH LENSES
      </h1>

      {/* Clean Box-Shape Menu Trigger (No Border, No Icon) */}
      <button
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          if (onOpenMenu) onOpenMenu(rect);
        }}
        aria-label="Open Navigation Menu"
        style={{
          marginTop: '16px',
          pointerEvents: 'auto',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
          borderRadius: '4px',
          padding: '8px 24px',
          color: '#ffffff',
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        MENU
      </button>
    </div>
  );
};

export default BackgroundTypography;
