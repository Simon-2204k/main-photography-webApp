import React, { memo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CurvedMeshCard3D from './CurvedMeshCard3D';
import './RotatedPages.css';

gsap.registerPlugin(ScrollTrigger);

export const TheCardPage = memo(function TheCardPage() {
  const containerRef = useRef(null);
  const overlaysRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlays = overlaysRef.current;
    if (!container || !overlays) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlays,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="rotated-page-content page-the-card">
      {/* Top Header Strip (from Screenshot 7) */}
      <header className="thecard-top-strip">
        <div className="thecard-top-left">
          Your photographic practice, all in one place
        </div>
        <div className="thecard-top-right">
          A digital Card that brings darkroom rolls, prints, and editorial archives together. Easy for you to share. Easy for curators, agencies, and collectors to discover, license, and support your craft.
        </div>
      </header>

      {/* Center Stage: Massive THE CARD Typography + Overlaid Dual Cards */}
      <div className="thecard-center-stage">
        <h2 className="thecard-giant-title">
          THE CARD
        </h2>

        {/* Dual 3D Curled Cards Overlaid in Center (Three.js WebGL, Parallax scrubbed) */}
        <div ref={overlaysRef} className="thecard-overlays-container">
          {/* Card A: Peeling Orange Digital Pass (3D Curled Paper Mesh) */}
          <CurvedMeshCard3D
            type="orange-pass"
            width={280}
            height={420}
            curvature={0.48}
            rotationZ={-0.12}
            className="thecard-3d-orange-pass"
          />

          {/* Card B: Dark Mobile Profile Card (3D Curved Cylinder Mesh) */}
          <CurvedMeshCard3D
            type="mobile-card"
            width={290}
            height={450}
            curvature={0.36}
            rotationZ={0.08}
            className="thecard-3d-mobile-pass"
          />
        </div>
      </div>

      {/* Signature Bottom-Right Join Button */}
      <button className="follow-join-btn" aria-label="Join Platform">
        <div className="follow-join-icon-row">
          <span className="follow-join-icon">↗</span>
        </div>
        <span className="follow-join-text">Join</span>
      </button>
    </div>
  );
});

export default TheCardPage;
