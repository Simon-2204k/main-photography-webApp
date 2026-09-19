import React, { memo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RotatedPages.css';

gsap.registerPlugin(ScrollTrigger);

export const ConnectoryPage = memo(function ConnectoryPage() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage,
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
    <div ref={containerRef} className="rotated-page-content page-connectory">

      <h2 className="connectory-giant-bg-title">
        CONNECTORY
      </h2>

      <div className="connectory-the-script">
        The
      </div>

      <div className="connectory-stage">
        <div ref={stageRef} className="connectory-window-mockup">

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

          <div className="connectory-window-body">

            <div className="connectory-sidebar">
              <div className="connectory-sidebar-item"><span>Country</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>City</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Mediums</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Themes & Topics</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Years of Experience</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Education</span><span>›</span></div>
              <div className="connectory-sidebar-item"><span>Artwork Price Range</span><span>›</span></div>
            </div>

            <div className="connectory-grid-content">
              <div className="connectory-directory-title">
                The Connectory <span style={{ fontWeight: 450, fontSize: '11px', color: '#777' }}>1,321 Artists</span>
              </div>

              <div className="connectory-cards-grid">

                <div className="connectory-artist-card">
                  <div className="connectory-artist-name">Teona Toderei</div>
                  <img
                    src="/images/section4/pexels-myatezhny39-3994122.webp"
                    alt="Teona Toderei Artwork"
                    className="connectory-artist-img"
                    loading="lazy"
                  />
                </div>

                <div className="connectory-artist-card">
                  <div className="connectory-artist-name">Erin J Coholan</div>
                  <img
                    src="/images/section4/pexels-andrew-schwark-540305-9200496.webp"
                    alt="Erin J Coholan Artwork"
                    className="connectory-artist-img"
                    loading="lazy"
                  />
                </div>

                <div className="connectory-artist-card">
                  <div className="connectory-artist-name">Danny Van der Elst</div>
                  <img
                    src="/images/section4/pexels-fakhri98-16104931.webp"
                    alt="Danny Van der Elst Artwork"
                    className="connectory-artist-img"
                    loading="lazy"
                  />
                </div>

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
