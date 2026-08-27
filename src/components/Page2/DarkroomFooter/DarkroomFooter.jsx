import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import './DarkroomFooter.css';

export const DarkroomFooterComponent = () => {
  const footerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let xPos = -50;
    const animateFooterMarquee = () => {
      xPos += 0.08;
      if (xPos >= 0) xPos = -50;
      gsap.set(marquee, { xPercent: xPos });
    };

    gsap.ticker.add(animateFooterMarquee);
    return () => gsap.ticker.remove(animateFooterMarquee);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="darkroom-footer-section">
      {/* Huge Left-to-Right Infinite Marquee Ribbon */}
      <div className="darkroom-footer-marquee-wrap">
        <div ref={marqueeRef} className="darkroom-footer-marquee-track">
          <span className="darkroom-footer-marquee-text">
            MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON •
          </span>
          <span className="darkroom-footer-marquee-text">
            MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON •
          </span>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back To Top */}
      <div className="darkroom-footer-bottom-bar">
        <div className="darkroom-footer-copyright">
          © {new Date().getFullYear()} SIMON Photography. All Rights Reserved.
        </div>
        <button
          onClick={scrollToTop}
          className="darkroom-back-to-top-btn"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <span className="darkroom-up-arrow">↑</span>
        </button>
      </div>
    </footer>
  );
};

export const DarkroomFooter = memo(DarkroomFooterComponent);
export default DarkroomFooter;
