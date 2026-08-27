import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import gsap from 'gsap';
import './MenuOverlay.css';

// 4 Navigation Options with 2 localized GIFs each
const MENU_ITEMS = [
  {
    id: 'page1',
    title: 'SEE EVERYTHING',
    category: 'LANDSCAPE / EDITORIAL',
    gifs: ['/assets/page1/menu-gifs/gif_1.gif', '/assets/page1/menu-gifs/gif_2.gif'],
  },
  {
    id: 'page2',
    title: 'DARKROOM',
    category: 'EXPERIMENTAL FILM',
    gifs: ['/assets/page1/menu-gifs/gif_3.gif', '/assets/page1/menu-gifs/gif_4.gif'],
  },
  {
    id: 'page3',
    title: 'EXHIBITS',
    category: 'ARCHIVAL GALLERY',
    gifs: ['/assets/page1/menu-gifs/gif_5.gif', '/assets/page1/menu-gifs/gif_6.gif'],
  },
  {
    id: 'page4',
    title: 'SPEC SHEET',
    category: 'ANALOG CAMERAS',
    gifs: ['/assets/page1/menu-gifs/gif_7.gif', '/assets/page1/menu-gifs/gif_8.gif'],
  },
];

export const MenuOverlayComponent = ({ isOpen, onClose, onSelectPage, triggerRect }) => {
  const overlayRef = useRef(null);
  const innerRef = useRef(null);
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const rowsRef = useRef([]);
  const isAnimatingCloseRef = useRef(false);

  // Active hover row state (null = none active)
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Live India Time (IST / Asia/Kolkata)
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTimeString(`INDIA_${formatted}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Symmetrical Reverse Morph Close Animation
  const animateClose = useCallback((callback) => {
    if (isAnimatingCloseRef.current) return;
    isAnimatingCloseRef.current = true;

    const el = overlayRef.current;
    const inner = innerRef.current;
    if (!el) {
      if (callback) callback();
      return;
    }

    const rect = triggerRect || {
      top: 20,
      left: window.innerWidth / 2 - 40,
      width: 80,
      height: 32,
    };

    gsap.killTweensOf([el, inner, topBarRef.current, bottomBarRef.current, rowsRef.current]);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        gsap.set(el, { display: 'none' });
        setHoveredIndex(null);
        isAnimatingCloseRef.current = false;
        if (callback) callback();
      },
    });

    // 1. Instantly fade inner content out
    tl.to(inner, {
      opacity: 0,
      duration: 0.18,
      ease: 'power2.in',
    })
    // 2. Morph box smoothly back into the exact spot and size of the MENU button
    .to(el, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: '4px',
      duration: 0.52,
      ease: 'power4.inOut',
    }, '-=0.08');
  }, [triggerRect]);

  // Handle Option Click: smoothly close back into MENU spot, then switch page
  const handleItemClick = (pageId) => {
    animateClose(() => {
      if (onSelectPage) onSelectPage(pageId);
      if (onClose) onClose();
    });
  };

  // Handle Close Button Click
  const handleCloseClick = () => {
    animateClose(() => {
      if (onClose) onClose();
    });
  };

  // GSAP Morph Scaling Opening Physics
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      isAnimatingCloseRef.current = false;
      document.body.style.overflow = 'hidden';
      const el = overlayRef.current;
      const inner = innerRef.current;

      const rect = triggerRect || {
        top: 20,
        left: window.innerWidth / 2 - 40,
        width: 80,
        height: 32,
      };

      // 1. Initial State matching exact trigger button coordinates
      gsap.killTweensOf([el, inner, topBarRef.current, bottomBarRef.current, rowsRef.current]);

      gsap.set(el, {
        display: 'flex',
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: '4px',
        opacity: 1,
        zIndex: 99999,
        overflow: 'hidden',
        backgroundColor: '#000000',
      });

      gsap.set(inner, { opacity: 0 });
      gsap.set([topBarRef.current, bottomBarRef.current], { opacity: 0, y: 20 });
      gsap.set(rowsRef.current, { opacity: 0, y: 50 });

      // 2. Physical Morph Scale to 100vw × 100vh
      const tl = gsap.timeline();

      tl.to(el, {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        duration: 0.65,
        ease: 'power4.inOut',
      })
      // 3. Reveal Inner Menu & Content
      .to(inner, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      }, '-=0.35')
      .to([topBarRef.current, bottomBarRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      }, '-=0.25')
      .to(rowsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
      }, '-=0.3');

    } else if (!isAnimatingCloseRef.current) {
      document.body.style.overflow = '';
      const el = overlayRef.current;
      if (el && el.style.display !== 'none') {
        animateClose();
      }
    }
  }, [isOpen, triggerRect, animateClose]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCloseClick]);

  return (
    <div
      id="menu-overlay-container"
      ref={overlayRef}
      className="k72-morph-menu-box"
      style={{ display: 'none' }}
    >
      <div ref={innerRef} className="k72-menu-inner">
        {/* Top Header Bar: Centered SIMON'S FRAMEWORK + Right Rotating SVG Close Button */}
        <header ref={topBarRef} className="k72-menu-topbar">
          <div className="k72-topbar-spacer" />
          
          <div className="k72-brand-center-container">
            <span className="k72-brand-logo">SIMON'S FRAMEWORK</span>
          </div>

          {/* Large Geometric Rotating SVG Close Button (Top Right) */}
          <button 
            className="k72-close-btn" 
            onClick={handleCloseClick}
            aria-label="Close navigation menu"
          >
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="8" y1="8" x2="32" y2="32" />
              <line x1="32" y1="8" x2="8" y2="32" />
            </svg>
          </button>
        </header>

        {/* 4 Interactive Full-Width Navigation Option Rows */}
        <nav className="k72-nav-links">
          {MENU_ITEMS.map((item, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.id}
                ref={(el) => (rowsRef.current[idx] = el)}
                className={`k72-nav-row ${isHovered ? 'hovered-marquee-active' : 'standard-row'}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleItemClick(item.id)}
              >
                {isHovered ? (
                  /* Dynamic Electric-Lime Marquee Ribbon on Hover with 2 Alternating GIFs */
                  <div className="k72-lime-marquee-banner">
                    <div className="k72-marquee-track-infinite">
                      {Array.from({ length: 5 }).map((_, segmentIdx) => (
                        <span key={segmentIdx} className="k72-marquee-segment">
                          {item.title}
                          <span className="k72-photo-pill">
                            <img src={item.gifs[0]} alt="" />
                          </span>
                          {item.title}
                          <span className="k72-photo-pill">
                            <img src={item.gifs[1]} alt="" />
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Clean Minimalist Typography when not hovered */
                  <h2 className="k72-nav-title">{item.title}</h2>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Screen: Centered India Time with Globe Icon */}
        <footer ref={bottomBarRef} className="k72-menu-bottombar">
          <div className="k72-telemetry-centered">
            <span className="k72-globe-icon">🌐</span>
            <span className="k72-clock-text">{timeString || 'INDIA_21:50:30'}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export const MenuOverlay = memo(MenuOverlayComponent);
export default MenuOverlay;
