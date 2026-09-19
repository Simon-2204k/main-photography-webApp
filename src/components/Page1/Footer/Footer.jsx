import React, { useState, useEffect, useRef, memo } from 'react';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';
import './Footer.css';

const FooterComponent = ({ onOpenMenu }) => {
  const [isInverted, setIsInverted] = useState(false);
  const footerRef = useRef(null);

  useLandoTextReveal(
    footerRef,
    [
      '.simon-wordmark',
      '.simon-footer-statement p',
      '.simon-footer-contact a',
      '.simon-footer-socials a',
      '.simon-copyright',
    ],
    {
      theme: 'light',
      start: 'top 80%',
      duration: 0.4,
      stagger: 0.04,
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const threshold = window.innerHeight * 0.5;
      // Crosses 50% height of screen: invert colors; vice versa when scrolling back up
      setIsInverted(rect.top <= threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer 
      id="footer-section" 
      ref={footerRef} 
      className={`simon-footer-section ${isInverted ? 'inverted' : ''}`}
    >
      <div className="simon-footer-container">
        {/* Top Header Row */}
        <div className="simon-footer-top">
          {/* Brand Wordmark & Emblem */}
          <div className="simon-footer-brand">
            <h2 className="simon-wordmark">Simon</h2>
            <div className="simon-brand-emblem" aria-hidden="true">
              {/* Hand with heart artisan emblem */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9" />
              </svg>
            </div>
          </div>

          {/* Statement Tagline */}
          <div className="simon-footer-statement">
            <p>Partnering with ambitious brands &amp; inspiring people.</p>
          </div>

          {/* Contact Details Column */}
          <div className="simon-footer-contact">
            <a href="tel:8568166159" className="simon-footer-link">856.816.6159</a>
            <a href="tel:6109521398" className="simon-footer-link">610.952.1398</a>
            <a href="mailto:svasu0014@gmail.com" className="simon-footer-link email-link">svasu0014@gmail.com</a>
          </div>

          {/* Social Links Column */}
          <div className="simon-footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="simon-footer-link">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="simon-footer-link">Linkedin</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="simon-footer-link">X</a>
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div className="simon-footer-bottom">
          <p className="simon-copyright">
            Copyright 2026 Simon Design Inc. All Rights Reserved
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Real Camera Icon Badge */}
            <div className="simon-camera-badge" title="Simon Camera Atelier" aria-label="Camera Icon">
              <svg 
                className="simon-camera-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Camera Body */}
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                {/* Lens Outer Ring */}
                <circle cx="12" cy="13" r="3.5" />
                {/* Inner Lens Pupil Reflection */}
                <circle cx="12" cy="13" r="1.2" fill="currentColor" />
                {/* Viewfinder / Flash Sensor Indicator */}
                <path d="M18.5 10h.01" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Bottom-Right Universal MENU button */}
            <button
              type="button"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                if (onOpenMenu) onOpenMenu(rect);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                if (onOpenMenu) onOpenMenu(rect);
              }}
              aria-label="Open Navigation Menu"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                color: 'inherit',
                fontFamily: "'Anton', 'Oswald', sans-serif",
                fontSize: 'clamp(20px, 2.4vw, 28px)',
                fontWeight: 900,
                letterSpacing: '0.06em',
                lineHeight: 1,
                padding: '4px 8px',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              MENU
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
export default Footer;
