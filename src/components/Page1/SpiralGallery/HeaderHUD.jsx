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
        @media (max-width: 1024px) {
          .header-hud-wrapper {
            padding: 20px 24px !important;
          }
          .header-hud-top-row {
            margin-top: clamp(140px, 18vh, 220px) !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: clamp(20px, 3.2vh, 36px) !important;
          }
          .header-hud-center-heading {
            display: contents !important;
          }
          .header-hud-icon {
            order: 1 !important;
            margin: 0 !important;
            font-size: 16px !important;
          }
          .header-hud-subheading {
            order: 2 !important;
            margin: 0 !important;
            font-size: clamp(13px, 1.6vw, 16px) !important;
            font-weight: 800 !important;
            letter-spacing: 2px !important;
            text-align: center !important;
          }
          .header-hud-logo {
            order: 3 !important;
            margin: 0 !important;
            font-size: clamp(24px, 3.2vw, 36px) !important;
            font-weight: 900 !important;
            letter-spacing: 3px !important;
            text-align: center !important;
          }
          .header-hud-desc {
            order: 4 !important;
            margin: 0 !important;
            max-width: clamp(440px, 68vw, 680px) !important;
            padding: 0 2vw !important;
            font-size: clamp(13px, 1.5vw, 16px) !important;
            line-height: 1.6 !important;
            text-align: center !important;
          }
          .header-hud-telemetry {
            display: none !important;
          }
        }
      `}</style>

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
