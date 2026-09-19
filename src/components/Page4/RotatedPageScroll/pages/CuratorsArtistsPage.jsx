import React, { memo } from 'react';
import './RotatedPages.css';

export const CuratorsArtistsPage = memo(function CuratorsArtistsPage() {
  return (
    <div className="rotated-page-content page-curators-artists">
      {/* Main Split Grid */}
      <div className="curators-main-grid">
        {/* Left: Frame Card with Orange Paint Backdrop */}
        <div className="curators-photo-col">
          <div className="curators-orange-backdrop" />
          <div className="curators-frame-card">
            <img
              src="/images/section4/pexels-gin-311039220-34175280.webp"
              alt="How FOLLOW.ART works"
              className="curators-frame-img"
              loading="lazy"
              decoding="async"
            />
            <div className="curators-frame-overlay" />
            <div className="curators-frame-play-btn">&gt;</div>
            <div className="curators-frame-badge">
              <span style={{ fontWeight: 800 }}>How</span><br />
              SIMON.ARCHIVE<br />
              works?
            </div>
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
