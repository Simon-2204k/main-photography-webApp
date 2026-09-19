import React, { memo } from 'react';

export const BackgroundTypographyComponent = ({ onOpenMenu, isVisible = true }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-18px)',
        width: '100%',
        textAlign: 'center',
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 15,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'difference',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s'
      }}
    >
      <h1
        style={{
          margin: 0,
          padding: '0 0.5rem',
          maxWidth: '98vw',
          fontSize: 'clamp(1.15rem, 5.2vw, 7.5rem)',
          fontWeight: '900',
          lineHeight: '0.85',
          letterSpacing: '-0.03em',
          color: '#ffffff',
          textTransform: 'uppercase',
          fontFamily: 'Inter, system-ui, sans-serif',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box'
        }}
      >
        THE WORLD THROUGH LENSES
      </h1>

      <button
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          if (onOpenMenu) onOpenMenu(rect);
        }}
        aria-label="Open Navigation Menu"
        style={{
          marginTop: '16px',
          pointerEvents: isVisible ? 'auto' : 'none',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: '#ffffff',
          fontFamily: "'Anton', 'Oswald', sans-serif",
          fontSize: 'clamp(18px, 2.2vw, 24px)',
          fontWeight: '900',
          letterSpacing: '0.06em',
          lineHeight: '1',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 8px',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.opacity = '0.85';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '1';
        }}
      >
        MENU
      </button>
    </div>
  );
};

export const BackgroundTypography = memo(BackgroundTypographyComponent);
export default BackgroundTypography;
