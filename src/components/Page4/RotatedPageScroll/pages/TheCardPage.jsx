import React, { memo } from 'react';
import './RotatedPages.css';

export const TheCardPage = memo(function TheCardPage() {
  return (
    <div className="rotated-page-content page-the-card">
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

        {/* Dual Floating Cards Overlaid in Center */}
        <div className="thecard-overlays-container">
          {/* Card A: Peeling Orange Digital Pass */}
          <div className="thecard-peel-card">
            <div className="thecard-peel-header">
              <span>SIMON.ARCHIVE</span>
              <span>✦ 120MM</span>
            </div>
            <div className="thecard-peel-body">
              <img
                src="/images/section4/pexels-krista-glizdeniece-2150567376-31603972.webp"
                alt="Venus Nwaokoro"
                className="thecard-peel-avatar"
                loading="lazy"
              />
              <div>
                <div className="thecard-peel-name">Venus Nwaokoro</div>
                <div className="thecard-peel-meta">Medium Format Emulsion</div>
                <div className="thecard-peel-meta">artist@simon.archive</div>
              </div>
            </div>
            <div className="thecard-peel-qr">
              {/* Crisp SVG QR Code Representation */}
              <svg viewBox="0 0 40 40" width="100%" height="100%">
                <rect width="40" height="40" fill="#ffffff" />
                <path d="M4 4h10v10H4zm2 2v6h6V6zm16-2h10v10H22zm2 2v6h6V6zM4 22h10v10H4zm2 2v6h6v-6zm16 6h4v4h-4zm6-6h4v4h-4zm0 6h4v4h-4zm-6-4h4v4h-4z" fill="#000000" />
              </svg>
            </div>
          </div>

          {/* Card B: Dark Mobile Profile Card */}
          <div className="thecard-mobile-card">
            <div className="thecard-mobile-header">
              SIMON.ARCHIVE
            </div>
            <div className="thecard-mobile-title">
              Venus Nwaokoro
              <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 500 }}>
                Editorial &amp; Fine Art • Hasselblad 500C/M
              </div>
            </div>

            <img
              src="/images/section4/pexels-aloevera-17612352.webp"
              alt="Artist Studio"
              className="thecard-mobile-img"
              loading="lazy"
            />

            <div className="thecard-mobile-actions">
              <div className="thecard-support-btn">Commission Series</div>
              <div className="thecard-wallet-btn"> Add to Apple Wallet</div>
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

export default TheCardPage;
