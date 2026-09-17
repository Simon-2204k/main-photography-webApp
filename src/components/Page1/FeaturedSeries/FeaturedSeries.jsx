import React, { useState, useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { FEATURED_SERIES_DATA, SIDEBAR_NAV_LINKS } from '../../../data/page1/featuredSeriesData';
import './FeaturedSeries.css';

const FeaturedSeriesComponent = () => {
  const [hoveredTag, setHoveredTag] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const hoverCardRef = useRef(null);
  const sectionRef = useRef(null);
  const isHoveredRef = useRef(false);

  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (!hoverCardRef.current) return;

    // Center origin offset via GSAP
    gsap.set(hoverCardRef.current, { xPercent: -50, yPercent: -50 });

    // Smooth GSAP quickTo interpolation for floating red card
    xTo.current = gsap.quickTo(hoverCardRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    yTo.current = gsap.quickTo(hoverCardRef.current, 'y', { duration: 0.35, ease: 'power3.out' });

    // On mobile and tablet screens, activate whichever row crosses the center of the screen purely on scroll!
    const handleScroll = () => {
      if (window.innerWidth > 1024) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const centerY = window.innerHeight * 0.5;

      if (rect.top <= centerY && rect.bottom >= centerY) {
        const cells = section.querySelectorAll('.featured-grid-cell:not(.featured-hide-mobile)');
        let closestCell = null;
        let minDistance = Infinity;

        cells.forEach((cell) => {
          const cRect = cell.getBoundingClientRect();
          const dist = Math.abs(cRect.top + cRect.height / 2 - centerY);
          if (dist < minDistance) {
            minDistance = dist;
            closestCell = cell;
          }
        });

        if (closestCell && minDistance < 50) {
          const id = closestCell.getAttribute('data-id');
          const tag = closestCell.getAttribute('data-tag');
          if (id) setActiveItemId(id);
          if (tag) setHoveredTag(tag);
          if (xTo.current && yTo.current) {
            xTo.current(window.innerWidth * 0.72);
            yTo.current(centerY);
          }
        }
      } else if (rect.top > centerY || rect.bottom < centerY) {
        setActiveItemId(null);
        setHoveredTag(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!isHoveredRef.current) {
      if (hoverCardRef.current) {
        gsap.set(hoverCardRef.current, { x: e.clientX, y: e.clientY });
      }
    } else if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleCellMouseEnter = (item, e) => {
    if (!isHoveredRef.current) {
      if (hoverCardRef.current) {
        gsap.set(hoverCardRef.current, { x: e.clientX, y: e.clientY });
      }
      isHoveredRef.current = true;
    }

    setHoveredTag(item.tag);
    setActiveItemId(item.id);

    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleCellMouseLeave = () => {
    setHoveredTag(null);
    setActiveItemId(null);
  };

  const handleGridMouseLeave = () => {
    isHoveredRef.current = false;
    setHoveredTag(null);
    setActiveItemId(null);
  };

  return (
    <section 
      id="featured-series-section" 
      ref={sectionRef} 
      className="featured-series-section"
      onMouseMove={handleMouseMove}
    >
      {/* Main Content Area */}
      <div className="featured-series-main">
        {/* Left Sidebar */}
        <aside className="featured-series-sidebar">
          <nav className="featured-nav-links">
            {SIDEBAR_NAV_LINKS.map((link, idx) => (
              <span 
                key={idx} 
                className={`featured-nav-item ${link.active ? 'active' : ''}`}
              >
                {link.label}
              </span>
            ))}
          </nav>

          {/* Main Title: Featured Series */}
          <h2 className="featured-main-title">
            <span className="featured-title-line">Featured</span>
            <span className="featured-title-line">Series</span>
          </h2>
        </aside>

        {/* Right 3-Column Table Grid Directory */}
        <div 
          className="featured-grid-container"
          onMouseLeave={handleGridMouseLeave}
        >
          {FEATURED_SERIES_DATA.map((columnItems, colIdx) => (
            <div 
              key={`col-${colIdx}`} 
              className={`featured-grid-col ${colIdx === 2 ? 'featured-col-3-hide-mobile' : ''}`}
            >
              {columnItems.map((item, itemIdx) => {
                const isHiddenOnMobile = (colIdx === 1 && itemIdx >= 7) || colIdx === 2;
                return (
                  <div
                    key={item.id}
                    data-id={item.id}
                    data-tag={item.tag}
                    className={`featured-grid-cell ${activeItemId === item.id ? 'active-hover' : ''} ${isHiddenOnMobile ? 'featured-hide-mobile' : ''}`}
                    onMouseEnter={(e) => handleCellMouseEnter(item, e)}
                    onMouseLeave={handleCellMouseLeave}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Red Hover Preview Card with Photography Pill Tag */}
      <div 
        ref={hoverCardRef}
        className={`featured-hover-card ${hoveredTag ? 'visible' : ''}`}
      >
        <div className="featured-hover-pill">
          {hoveredTag || 'Photography'}
        </div>
      </div>
    </section>
  );
};

export const FeaturedSeries = memo(FeaturedSeriesComponent);
export default FeaturedSeries;
