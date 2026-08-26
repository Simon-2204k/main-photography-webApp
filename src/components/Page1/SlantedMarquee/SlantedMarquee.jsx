import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import './SlantedMarquee.css';

const REPEAT_COUNT = 6;

const MarqueeUnit = ({ keyPrefix = 'u' }) => (
  <div className="marquee-item">
    <span className="marquee-text-main">IT'S A</span>

    {/* Tilted Stamp Badge Box: PRISM OPTICS */}
    <div className="marquee-badge-box">
      <span className="marquee-badge-line">PRISM</span>
      <span className="marquee-badge-line">OPTICS</span>
    </div>

    <span className="marquee-text-main">RAW SHOT</span>

    {/* 3-Line Sub-Label Lockup */}
    <div className="marquee-sub-lockup">
      <span className="marquee-sub-line">APERTURE LAB®</span>
      <span className="marquee-sub-line">VISUAL</span>
      <span className="marquee-sub-line">EXPERIMENTAL LOG.</span>
    </div>
  </div>
);

const SlantedMarqueeComponent = () => {
  const sectionRef = useRef(null);
  const topTrackRef = useRef(null);
  const bottomTrackRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const topTrack = topTrackRef.current;
    const bottomTrack = bottomTrackRef.current;

    if (!section || !topTrack || !bottomTrack) return;

    let posTop = -2000;
    let posBottom = 0;
    const BASE_SPEED = 3.4; // Increased base cruising velocity

    let targetVelocity = 0;
    let currentVelocity = 0;
    let lastScrollY = window.scrollY;
    let isTickerActive = false;

    // Measure single set width for seamless wrap
    let topSetWidth = 0;
    let bottomSetWidth = 0;

    const measureWidths = () => {
      if (topTrack.children.length > 0) {
        topSetWidth = topTrack.scrollWidth / 2 || 2400;
        bottomSetWidth = bottomTrack.scrollWidth / 2 || 2400;
      }
    };

    measureWidths();

    const handleResize = () => {
      measureWidths();
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // High-impact kinetic velocity multiplier on scroll
      targetVelocity = Math.min(Math.abs(deltaY) * 0.65, 35);
    };

    const ticker = () => {
      if (!isVisibleRef.current) return;

      // Smooth decay of velocity boost
      currentVelocity += (targetVelocity - currentVelocity) * 0.15;
      targetVelocity *= 0.90;

      const currentSpeed = BASE_SPEED + currentVelocity;

      // Top ribbon moves to the RIGHT
      posTop += currentSpeed;
      if (topSetWidth > 0 && posTop >= 0) {
        posTop -= topSetWidth;
      }

      // Bottom ribbon moves to the LEFT
      posBottom -= currentSpeed;
      if (bottomSetWidth > 0 && posBottom <= -bottomSetWidth) {
        posBottom += bottomSetWidth;
      }

      topTrack.style.transform = `translate3d(${posTop}px, 0, 0)`;
      bottomTrack.style.transform = `translate3d(${posBottom}px, 0, 0)`;
    };

    // Viewport Culling with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            measureWidths();
            if (!isTickerActive) {
              gsap.ticker.add(ticker);
              isTickerActive = true;
            }
          } else {
            if (isTickerActive) {
              gsap.ticker.remove(ticker);
              isTickerActive = false;
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (isTickerActive) {
        gsap.ticker.remove(ticker);
      }
    };
  }, []);

  return (
    <section id="slanted-marquee-section" ref={sectionRef} className="slanted-marquee-section">
      {/* Dual Dynamic Slanted Ribbons Stage */}
      <div className="marquee-ribbons-stage">
        {/* Top Ribbon — Moving RIGHT */}
        <div className="marquee-ribbon-wrapper marquee-ribbon-top">
          <div ref={topTrackRef} className="marquee-track">
            {Array.from({ length: REPEAT_COUNT }).map((_, idx) => (
              <MarqueeUnit key={`top-${idx}`} keyPrefix={`top-${idx}`} />
            ))}
          </div>
        </div>

        {/* Bottom Ribbon — Moving LEFT with extended solid greyish base */}
        <div className="marquee-ribbon-wrapper marquee-ribbon-bottom">
          <div ref={bottomTrackRef} className="marquee-track">
            {Array.from({ length: REPEAT_COUNT }).map((_, idx) => (
              <MarqueeUnit key={`bottom-${idx}`} keyPrefix={`bottom-${idx}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const SlantedMarquee = memo(SlantedMarqueeComponent);
export default SlantedMarquee;
