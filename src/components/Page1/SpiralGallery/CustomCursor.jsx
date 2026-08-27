import React, { useEffect, useRef, useState, memo } from 'react';

export const CustomCursorComponent = ({ isSection1Active = true }) => {
  const cursorRef = useRef(null);
  const hLineRef = useRef(null);
  const vLineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // If Section 1 is no longer active (scrolled past hero) or hovering lower interactive sections
      if (!isSection1Active || window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(false);
        return;
      }

      const overExcluded = !!e.target.closest('#manifesto-section, #page-2-container, #perspectives-section, #visual-disciplines-section, #magnetic-spotlight-section, #slanted-marquee-section, #featured-series-section, #spotlight-marquee-section, #footer-section, #menu-overlay-container, .darkroom-mask-box');
      if (overExcluded) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (hLineRef.current) {
        hLineRef.current.style.transform = `translate3d(0, ${e.clientY}px, 0)`;
      }

      if (vLineRef.current) {
        vLineRef.current.style.transform = `translate3d(${e.clientX}px, 0, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      if (isSection1Active && window.scrollY <= window.innerHeight * 0.8) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isSection1Active]);

  const shouldRenderVisible = isVisible && isSection1Active;

  return (
    <>
      {/* Fullscreen Horizontal Crosshair Line */}
      <div
        ref={hLineRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: shouldRenderVisible ? 1 : 0,
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* Fullscreen Vertical Crosshair Line */}
      <div
        ref={vLineRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '1px',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: shouldRenderVisible ? 1 : 0,
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* Custom + Cursor Pointer */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          marginLeft: '-12px',
          marginTop: '-12px',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: '300',
          lineHeight: 1,
          userSelect: 'none',
          mixBlendMode: 'difference',
          opacity: shouldRenderVisible ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        +
      </div>
    </>
  );
};

export const CustomCursor = memo(CustomCursorComponent);
export default CustomCursor;
