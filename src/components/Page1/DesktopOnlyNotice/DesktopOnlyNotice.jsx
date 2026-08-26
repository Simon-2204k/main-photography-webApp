import React, { useState, useEffect } from 'react';
import { FilmGrain } from '../FilmGrain/FilmGrain';
import './DesktopOnlyNotice.css';

export const DesktopOnlyNotice = () => {
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="desktop-only-screen-blocker" className="desktop-only-blocker">
      {/* Procedural Continuous Film Grain Overlay */}
      <FilmGrain />

      <div className="desktop-notice-container">
        {/* Brand Mark */}
        <div className="desktop-notice-brand">SIMON'S FRAMEWORK</div>

        {/* Optical Camera Viewfinder Reticle Graphic */}
        <div className="desktop-notice-aperture">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="aperture-svg">
            <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="32" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="8" fill="#ffffff" />
            <line x1="50" y1="6" x2="50" y2="24" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="50" y1="76" x2="50" y2="94" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="6" y1="50" x2="24" y2="50" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="76" y1="50" x2="94" y2="50" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
          <div className="aperture-pulse-ring" />
        </div>

        {/* Headline */}
        <h1 className="desktop-notice-title">
          EXPERIENCE DESIGNED FOR<br />DESKTOP &amp; LAPTOP
        </h1>

        {/* Editorial Subtitle */}
        <p className="desktop-notice-desc">
          Simon's Framework features high-fidelity 3D WebGL spiral physics, camera optical simulations, 
          and precision cursor telemetry crafted exclusively for widescreen displays.
        </p>

        {/* Live Display Telemetry Pill */}
        <div className="desktop-notice-pill">
          <span className="pill-dot" />
          <span>CURRENT DISPLAY: <strong>{viewportWidth}px</strong></span>
          <span className="pill-divider">·</span>
          <span>REQUIRED: <strong>1024px+</strong></span>
        </div>

        <div className="desktop-notice-footer">
          PLEASE OPEN ON A LAPTOP OR DESKTOP MONITOR
        </div>
      </div>
    </div>
  );
};

export default DesktopOnlyNotice;
