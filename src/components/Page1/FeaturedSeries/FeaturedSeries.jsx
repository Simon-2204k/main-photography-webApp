import React, { useState, useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { FEATURED_SERIES_DATA, SIDEBAR_NAV_LINKS } from '../../../data/page1/featuredSeriesData';
import './FeaturedSeries.css';

const FeaturedSeriesComponent = () => {
  const [hoveredTag, setHoveredTag] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const hoverCardRef = useRef(null);
  const sectionRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (!hoverCardRef.current) return;

    // Smooth GSAP quickTo interpolation for floating red card
    xTo.current = gsap.quickTo(hoverCardRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    yTo.current = gsap.quickTo(hoverCardRef.current, 'y', { duration: 0.35, ease: 'power3.out' });
  }, []);

  const handleMouseMove = (e) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleCellMouseEnter = (item, e) => {
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
            <div key={`col-${colIdx}`} className="featured-grid-col">
              {columnItems.map((item) => (
                <div
                  key={item.id}
                  className={`featured-grid-cell ${activeItemId === item.id ? 'active-hover' : ''}`}
                  onMouseEnter={(e) => handleCellMouseEnter(item, e)}
                  onMouseLeave={handleCellMouseLeave}
                >
                  {item.name}
                </div>
              ))}
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
