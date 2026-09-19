import React, { memo } from 'react';
import './RotatedPages.css';

export const JoinUsPage = memo(function JoinUsPage() {
  return (
    <div className="rotated-page-content page-join-us">
      <div className="join-main-grid">
        {/* Left: Giant JOIN Typography + Script "Us" + 3 Avatar Portraits */}
        <div className="join-left-col">
          <h2 className="join-giant-title">
            JOIN
          </h2>

          <div className="join-us-script">
            Us
          </div>

          <div className="join-avatars-cluster">
            <img
              src="/images/section4/pexels-kyle-miller-169884138-13411957.webp"
              alt="Community Member 1"
              className="join-avatar-img"
              loading="lazy"
            />
            <img
              src="/images/section4/pexels-gin-311039220-34175280.webp"
              alt="Community Member 2"
              className="join-avatar-img"
              loading="lazy"
            />
            <img
              src="/images/section4/pexels-hazily-light-672092024-18022480.webp"
              alt="Community Member 3"
              className="join-avatar-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Headline & Curved Arrow pointing to Join button */}
        <div className="join-right-col">
          <p className="join-headline-text">
            <u>Create Your Card</u> and share wherever your practice is seen
          </p>

          {/* Hand-Drawn Black Arrow Pointing Toward Bottom-Right Button */}
          <svg
            className="join-arrow-doodle"
            viewBox="0 0 100 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 20 Q 55 5, 85 45" />
            <path d="M70 45 L 85 45 L 85 30" />
          </svg>
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

export default JoinUsPage;
