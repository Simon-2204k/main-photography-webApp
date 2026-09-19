import React, { memo } from 'react';
import './RotatedPages.css';

export const ConnectoryPage = memo(function ConnectoryPage() {
  return (
    <div className="rotated-page-content page-connectory">
      {/* Giant Background Title */}
      <h2 className="connectory-giant-bg-title">
        CONNECTORY
      </h2>

      {/* Cursive Script "The" Doodle Overlaid */}
      <div className="connectory-the-script">
        The
      </div>

      {/* Center 3D Tilted Web Interface Mockup */}
      <div className="connectory-stage">
        <div className="connectory-window-mockup">
          {/* Mockup Header Bar */}
          <div className="connectory-window-topbar">
            <div className="connectory-tabs">
              <span className="connectory-tab active">Artists</span>
              <span className="connectory-tab">Curators</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0.75 }}>
              <span>🔍 Search by name</span>
              <span>🔖</span>
            </div>
          </div>

          {/* Mockup Body: Sidebar Filters + Directory Grid */}
          <div className="connectory-window-body">
            {/* Sidebar */}
            <div className="connectory-sidebar">
              <div className="connectory-sidebar-item"><span>Country</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>City</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Mediums</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Themes & Topics</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Years of Experience</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Education</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Artwork Price Range</span><span>›</span></div>
            </div>

            {/* Grid Area */}
            <div className="connectory-grid-content">
              <div className="connectory-directory-title">
                The Connectory <span style={{ fontWeight: 450, fontSize: '11px', color: '#777' }}>1,321 Artists</span>
              </div>

              <div className="connectory-cards-grid">
                {/* Artist Tile 1 */}
                <div className="connectory-artist-card">
                  <div className="connectory-artist-name">Teona Toderei</div>
                  <img
                    src="/images/section4/pexels-myatezhny39-3994122.webp"
                    alt="Teona Toderei Artwork"
                    className="connectory-artist-img"
                    loading="lazy"
                  />
                </div>

                {/* Artist Tile 2 */}
                <div className="connectory-artist-card">
                  <div className="connectory-artist-name">Erin J Coholan</div>
                  <img
                    src="/images/section4/pexels-andrew-schwark-540305-9200496.webp"
                    alt="Erin J Coholan Artwork"
                    className="connectory-artist-img"
                    loading="lazy"
                  />
                </div>

                {/* Artist Tile 3 */}
                <div className="connectory-artist-card">
                  <div className="connectory-artist-name">Danny Van der Elst</div>
                  <img
                    src="/images/section4/pexels-fakhri98-16104931.webp"
                    alt="Danny Van der Elst Artwork"
                    className="connectory-artist-img"
                    loading="lazy"
                  />
                </div>

                {/* Artist Tile 4 */}
                <div className="connectory-artist-card">
                  <div className="connectory-artist-name">Alberto Balocca</div>
                  <img
                    src="/images/section4/pexels-minimoy-18532184.webp"
                    alt="Alberto Balocca Artwork"
                    className="connectory-artist-img"
                    loading="lazy"
                  />
                </div>
              </div>
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

export default ConnectoryPage;
