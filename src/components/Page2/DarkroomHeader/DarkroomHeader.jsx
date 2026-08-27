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
          padding: 0,
          fontSize: 'clamp(2.5rem, 6.5vw, 7.5rem)',
          fontWeight: '900',
          lineHeight: '0.85',
          letterSpacing: '-0.03em',
          color: '#ffffff',
          textTransform: 'uppercase',
          fontFamily: 'Inter, system-ui, sans-serif',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}
      >
        CHRONICLES IN LIGHT
      </h1>

      {/* Clean Box-Shape Menu Trigger with interactive pointerEvents */}
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
          zIndex: 1001,
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

export const DarkroomHeader = memo(DarkroomHeaderComponent);
export default DarkroomHeader;
