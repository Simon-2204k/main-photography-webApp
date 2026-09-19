import React, { useEffect, useRef, memo } from 'react';

export const CustomCursorComponent = ({ isSection1Active = true }) => {
  const cursorRef = useRef(null);
  const hLineRef = useRef(null);
  const vLineRef = useRef(null);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice) return;

    const setElementsOpacity = (opacity) => {
      if (cursorRef.current) cursorRef.current.style.opacity = opacity;
      if (hLineRef.current) hLineRef.current.style.opacity = opacity;
      if (vLineRef.current) vLineRef.current.style.opacity = opacity;
    };

    const handleMouseMove = (e) => {
      if (e.sourceCapabilities?.firesTouchEvents || (e.pointerType && e.pointerType === 'touch')) {
        return;
      }

      if (!isSection1Active || window.scrollY > window.innerHeight * 0.8) {
        setElementsOpacity('0');
        return;
      }

      const overExcluded = !!e.target.closest('#manifesto-section, #page-2-container, #perspectives-section, #visual-disciplines-section, #magnetic-spotlight-section, #slanted-marquee-section, #featured-series-section, #spotlight-marquee-section, #footer-section, #menu-overlay-container, .darkroom-mask-box');
      if (overExcluded) {
        setElementsOpacity('0');
        return;
      }

      setElementsOpacity('1');

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
      setElementsOpacity('0');
    };

    const handleMouseEnter = () => {
      if (isSection1Active && window.scrollY <= window.innerHeight * 0.8) {
        setElementsOpacity('1');
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
  }, [isSection1Active, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
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
          opacity: 0,
          transition: 'opacity 0.25s ease'
        }}
      />

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
          opacity: 0,
          transition: 'opacity 0.25s ease'
        }}
      />

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
          opacity: 0,
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
