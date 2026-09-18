import React, { memo } from 'react';

export const DarkroomHeaderComponent = ({ onOpenMenu }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 1000,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'difference',
      }}
    >
      <h1
        style={{
          margin: 0,
          padding: '0 16px',
          fontSize: 'clamp(1.7rem, 6.2vw, 7.5rem)',
          fontWeight: '900',
          lineHeight: '0.92',
          letterSpacing: '-0.03em',
          color: '#ffffff',
          textTransform: 'uppercase',
          fontFamily: 'Inter, system-ui, sans-serif',
          maxWidth: '96vw',
          pointerEvents: 'none'
        }}
      >
        CHRONICLES IN LIGHT
      </h1>

      {/* Bold Condensed Uppercase Menu Trigger (No Border, Transparent) */}
      <button
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          if (onOpenMenu) onOpenMenu(rect);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
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
          background: 'transparent',
          color: '#ffffff',
          fontFamily: "'Anton', 'Oswald', sans-serif",
          fontSize: 'clamp(18px, 2.2vw, 24px)',
          fontWeight: 900,
          letterSpacing: '0.06em',
          lineHeight: 1,
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
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

export const DarkroomHeader = memo(DarkroomHeaderComponent);
export default DarkroomHeader;
