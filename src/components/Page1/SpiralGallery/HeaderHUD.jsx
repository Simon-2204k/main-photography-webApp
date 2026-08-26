import React, { useState, useEffect, memo } from 'react';

export const HeaderHUDComponent = ({ isVisible = true }) => {
  const [coords, setCoords] = useState({ x: 1152, y: 477 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '30px 45px',
        boxSizing: 'border-box',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s'
      }}
    >
      {/* Top HUD Row */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '260px'
        }}
      >
        {/* Top Left Logo: SIMON'S FRAMEWORK */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: '900',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            pointerEvents: isVisible ? 'auto' : 'none',
            cursor: 'pointer',
            color: '#ffffff',
            mixBlendMode: 'difference'
          }}
        >
          SIMON'S FRAMEWORK
        </div>

        {/* Center Heading & Description (Locked Strictly at Screen Center) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '560px',
            textAlign: 'center',
            pointerEvents: 'none',
            mixBlendMode: 'difference'
          }}
        >
          <div
            style={{
              fontSize: '13px',
              color: '#ffffff',
              marginBottom: '6px'
            }}
          >
            ⊕
          </div>

          <h2
            style={{
              margin: '0 0 6px 0',
              fontSize: '13px',
              fontWeight: '800',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#ffffff'
            }}
          >
            Where Light Meets Story
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: '11px',
              lineHeight: 1.55,
              color: '#ffffff',
              fontWeight: '400',
              letterSpacing: '0.3px',
              opacity: 0.92
            }}
          >
            Exploring the world through landscapes, black &amp; white photography, motion blur, street photography, portraits, wildlife, architecture, and timeless visual art.
          </p>
        </div>

        {/* Top Right Live Telemetry */}
        <div
          style={{
            minWidth: '130px',
            textAlign: 'right',
            fontSize: '10px',
            fontFamily: 'monospace',
            letterSpacing: '2px',
            color: '#ffffff',
            mixBlendMode: 'difference'
          }}
        >
          X : {String(coords.x).padStart(4, ' ')} &nbsp;&nbsp; Y : {String(coords.y).padStart(4, ' ')}
        </div>
      </div>
    </div>
  );
};

export const HeaderHUD = memo(HeaderHUDComponent);
export default HeaderHUD;
