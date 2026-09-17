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
      className="header-hud-wrapper"
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
      <style>{`
        .header-hud-wrapper {
          padding: 30px 45px;
        }
        .header-hud-top-row {
          margin-top: 260px;
        }
        @media (max-width: 768px) {
          .header-hud-wrapper {
            padding: 16px 20px !important;
          }
          /* LINE 48: Top margin spacing anchored to 20.24% of viewport height (exactly 135px at 667px height) */
          .header-hud-top-row {
            margin-top: clamp(120px, 20.24vh, 195px) !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: clamp(24px, 4.5vh, 44px) !important; /* LINE 56: EQUAL DISTANCE anchored to 4.5% of viewport height (exactly 30px at 667px) */
          }
          /* Promotes child text elements into direct flex items of .header-hud-top-row */
          .header-hud-center-heading {
            display: contents !important;
          }
          /* LINE 62: Order and style for ⊕ icon */
          .header-hud-icon {
            order: 1 !important;
            margin: 0 !important;
            font-size: 13px !important;
          }
          /* LINE 68: Order and style for WHERE LIGHT MEETS STORY */
          .header-hud-subheading {
            order: 2 !important;
            margin: 0 !important;
            font-size: 12px !important;
            font-weight: 800 !important;
            letter-spacing: 1.5px !important;
            text-align: center !important;
          }
          /* LINE 77: Order and style for SIMON'S FRAMEWORK (change order to 1 if you want it at the top) */
          .header-hud-logo {
            order: 3 !important;
            margin: 0 !important;
            font-size: 14px !important;
            font-weight: 900 !important;
            letter-spacing: 2px !important;
            text-align: center !important;
          }
          /* LINE 86: Order and style for description paragraph (proportional width & side margins) */
          .header-hud-desc {
            order: 4 !important;
            margin: 0 !important;
            max-width: clamp(290px, 86.6vw, 420px) !important;
            padding: 0 4vw !important;
            font-size: 11px !important;
            line-height: 1.55 !important;
            text-align: center !important;
          }
          .header-hud-telemetry {
            display: none !important;
          }
        }
      `}</style>
      {/* Top HUD Row */}
      <div
        className="header-hud-top-row"
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
          className="header-hud-logo"
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
          className="header-hud-center-heading"
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
            className="header-hud-icon"
            style={{
              fontSize: '13px',
              color: '#ffffff',
              marginBottom: '6px'
            }}
          >
            ⊕
          </div>

          <h2
            className="header-hud-subheading"
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
            className="header-hud-desc"
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
          className="header-hud-telemetry"
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
