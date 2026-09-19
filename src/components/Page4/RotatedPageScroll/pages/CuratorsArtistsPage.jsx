import React, { memo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CurvedMeshCard3D from './CurvedMeshCard3D';
import './RotatedPages.css';

gsap.registerPlugin(ScrollTrigger);

export const CuratorsArtistsPage = memo(function CuratorsArtistsPage() {
  const containerRef = useRef(null);
  const photoColRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const photoCol = photoColRef.current;
    if (!container || !photoCol) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoCol,
        { yPercent: 12 },
        {
          yPercent: -12,
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
    <div ref={containerRef} className="rotated-page-content page-curators-artists">
      {/* Main Split Grid */}
      <div className="curators-main-grid">
        {/* Left: Frame Card with Orange Paint Backdrop (Parallax scrubbed, 3D curved mesh) */}
        <div ref={photoColRef} className="curators-photo-col">
          <div className="curators-orange-backdrop" />
          <div className="curators-frame-card-3d-wrap" style={{ position: 'relative', zIndex: 2 }}>
            <CurvedMeshCard3D
              type="photo-frame"
              imageSrc="/images/section4/pexels-gin-311039220-34175280.webp"
              width={280}
              height={380}
              curvature={0.32}
              rotationZ={-0.03}
            />
          </div>
        </div>

        {/* Right: Giant Heading & Feature Bullets */}
        <div className="curators-content-col">
          <div className="curators-heading-wrap">
            <h2 className="curators-giant-title">
              CURATORS AND<br />
              ARTISTS
            </h2>
            <div className="curators-sparkle-stars" aria-hidden="true">
              ✧ ✧
            </div>
          </div>

          <ul className="curators-bullets-list">
            <li>— Share your visual practice.</li>
            <li>— Build editorial &amp; gallery relationships.</li>
            <li>— Secure exhibition &amp; print funding.</li>
          </ul>

          <p className="curators-subtext">
            <u>All in one</u> place curators and collectors can access instantly
          </p>
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

export default CuratorsArtistsPage;
