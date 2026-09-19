import React, { useState, useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { FEATURED_SERIES_DATA, SIDEBAR_NAV_LINKS } from '../../../data/page1/featuredSeriesData';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';
import './FeaturedSeries.css';

const FeaturedSeriesComponent = () => {
  const [hoveredTag, setHoveredTag] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const hoverCardRef = useRef(null);
  const sectionRef = useRef(null);
  const asideRef = useRef(null);
  const isHoveredRef = useRef(false);

  useLandoTextReveal(asideRef, ['.featured-nav-item', '.featured-title-line'], {
    theme: 'dark',
    start: 'top 80%',
    duration: 0.4,
    stagger: 0.04,
  });

  const xTo = useRef(null);
  const yTo = useRef(null);

  const cachedCellsRef = useRef([]);
  const prevActiveIdRef = useRef(null);

  useEffect(() => {
    if (!hoverCardRef.current) return;

    gsap.set(hoverCardRef.current, { xPercent: -50, yPercent: -50 });

    xTo.current = gsap.quickTo(hoverCardRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    yTo.current = gsap.quickTo(hoverCardRef.current, 'y', { duration: 0.35, ease: 'power3.out' });

    const cacheCellPositions = () => {
      if (window.innerWidth > 1024) return;
      const section = sectionRef.current;
      if (!section) return;
      const scrollY = window.scrollY;
      const cells = section.querySelectorAll('.featured-grid-cell:not(.featured-hide-mobile)');
      cachedCellsRef.current = Array.from(cells).map((cell) => {
        const rect = cell.getBoundingClientRect();
        return {
          pageTop: rect.top + scrollY,
          halfHeight: rect.height / 2,
          id: cell.getAttribute('data-id'),
          tag: cell.getAttribute('data-tag'),
        };
      });
    };

    const handleScroll = () => {
      if (window.innerWidth > 1024) return;
      const section = sectionRef.current;
      if (!section) return;

      const scrollY = window.scrollY;
      const centerY = window.innerHeight * 0.5;
      const pageCenterY = scrollY + centerY;
      const sectionRect = section.getBoundingClientRect();

      if (sectionRect.top <= centerY && sectionRect.bottom >= centerY) {
        const cached = cachedCellsRef.current;
        let closestCell = null;
        let minDistance = Infinity;

        for (let i = 0; i < cached.length; i++) {
          const c = cached[i];
          const cellCenterY = c.pageTop + c.halfHeight;
          const dist = Math.abs(cellCenterY - pageCenterY);
          if (dist < minDistance) {
            minDistance = dist;
            closestCell = c;
          }
        }

        if (closestCell && minDistance < 50) {
          if (closestCell.id !== prevActiveIdRef.current) {
            prevActiveIdRef.current = closestCell.id;
            if (closestCell.id) setActiveItemId(closestCell.id);
            if (closestCell.tag) setHoveredTag(closestCell.tag);
          }
          if (xTo.current && yTo.current) {
            xTo.current(window.innerWidth * 0.72);
            yTo.current(centerY);
          }
        }
      } else if (sectionRect.top > centerY || sectionRect.bottom < centerY) {
        if (prevActiveIdRef.current !== null) {
          prevActiveIdRef.current = null;
          setActiveItemId(null);
          setHoveredTag(null);
        }
      }
    };

    const initTimer = setTimeout(cacheCellPositions, 150);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', cacheCellPositions, { passive: true });
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', cacheCellPositions);
    };
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

      <div className="featured-series-main">

        <aside ref={asideRef} className="featured-series-sidebar">
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

          <h2 className="featured-main-title">
            <span className="featured-title-line">Featured</span>
            <span className="featured-title-line">Series</span>
          </h2>
        </aside>

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
