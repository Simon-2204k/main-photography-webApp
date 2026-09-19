import React, { memo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RotatedPages.css';

gsap.registerPlugin(ScrollTrigger);

export const CentralizePage = memo(function CentralizePage() {
  const containerRef = useRef(null);
  const cardsColRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cardsCol = cardsColRef.current;
    if (!container || !cardsCol) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsCol,
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
    <div ref={containerRef} className="rotated-page-content page-centralize">
      <div className="centralize-main-grid">
        {/* Left: Giant Title with Star Doodle & Descriptive Copy */}
        <div className="centralize-left-col">
          <div className="centralize-title-wrap">
            <h2 className="centralize-giant-title">
              CENTRALIZE
            </h2>
            {/* Hand-Drawn White 5-Point Star Doodle */}
            <svg
              className="centralize-star-doodle"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="50,5 64,36 98,38 72,60 80,95 50,75 20,95 28,60 2,38 36,36" />
            </svg>
          </div>

          <div className="centralize-copy-block">
            <p className="centralize-lead-text">
              No more <u>scattered</u> drive links, PDFs, and half-finished lookbooks.
            </p>
            <p className="centralize-sub-text">
              Have your entire photographic body of work together in one clear format
            </p>
          </div>
        </div>

        {/* Right: 2x2 Feature Cards Grid with Orange Paint Splash Backdrop (Parallax scrubbed) */}
        <div ref={cardsColRef} className="centralize-cards-col">
          <div className="centralize-orange-cross" />

          <div className="centralize-cards-grid">
            {/* Box 1 */}
            <div className="centralize-card-box">
              <span className="centralize-card-num">1</span>
              <span className="centralize-card-label">
                Archival<br />presentation
              </span>
            </div>

            {/* Box 2 */}
            <div className="centralize-card-box">
              <span className="centralize-card-num">2</span>
              <span className="centralize-card-label">
                Exhibition<br />support
              </span>
            </div>

            {/* Box 3 */}
            <div className="centralize-card-box">
              <span className="centralize-card-num">3</span>
              <span className="centralize-card-label">
                Instant proof<br />sharing
              </span>
            </div>

            {/* Box 4 */}
            <div className="centralize-card-box">
              <span className="centralize-card-num">4</span>
              <span className="centralize-card-label">
                Collector<br />discovery
              </span>
            </div>
          </div>
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

export default CentralizePage;
