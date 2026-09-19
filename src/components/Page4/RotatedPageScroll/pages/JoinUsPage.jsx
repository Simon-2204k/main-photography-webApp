import React, { memo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RotatedPages.css';

gsap.registerPlugin(ScrollTrigger);

export const JoinUsPage = memo(function JoinUsPage() {
  const containerRef = useRef(null);
  const avatarsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const avatars = avatarsRef.current;
    if (!container || !avatars) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        avatars,
        { yPercent: 14 },
        {
          yPercent: -14,
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
    <div ref={containerRef} className="rotated-page-content page-join-us">
      <div className="join-main-grid">

        <div className="join-left-col">
          <h2 className="join-giant-title">
            JOIN
          </h2>

          <div className="join-us-script">
            Us
          </div>

          <div ref={avatarsRef} className="join-avatars-cluster">
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

        <div className="join-right-col">
          <p className="join-headline-text">
            <u>Create Your Card</u> and share wherever your practice is seen
          </p>

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
