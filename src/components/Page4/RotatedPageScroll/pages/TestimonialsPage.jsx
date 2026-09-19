import React, { useState, memo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RotatedPages.css';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_DATA = [
  {
    quote:
      'Creating my Photographic Card has been transformative. While generic digital portfolio platforms exist, this feels truly engineered for photographers and darkroom printers. Curators immediately access 120mm emulsion scans, master baryta print archives, and technical optics specs, letting my imagery speak with complete fidelity.',
    name: 'Venus Nwaokoro',
    role: 'Editorial Photographer',
    location: 'Canada',
    flag: '🇨🇦',
    avatar: '/images/section4/pexels-krista-glizdeniece-2150567376-31603972.webp',
  },
  {
    quote:
      'SIMON.ARCHIVE keeps optical craft at the heart rather than treating photography like quick social feeds. The focus stays where it belongs: on dynamic range, film grain, and print editioning. I share my archive with galleries via physical QR proofs and digital passes without friction.',
    name: 'British Print Guild',
    role: 'Master Darkroom Printer',
    location: 'United Kingdom',
    flag: '🇬🇧',
    avatar: '/images/section4/pexels-aloevera-20240486.webp',
  },
  {
    quote:
      "The Card's analog minimalism and tactile QR access integrate seamlessly into physical gallery exhibitions, offering a frictionless companion for curators and collectors that showcases silver halide depth without interface clutter.",
    name: 'Elena Vance',
    role: 'Exhibition Curator',
    location: 'Germany',
    flag: '🇩🇪',
    avatar: '/images/section4/pexels-marianamontrazi-6757343.webp',
  },
];

export const TestimonialsPage = memo(function TestimonialsPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const containerRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const stack = stackRef.current;
    if (!container || !stack) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stack,
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

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIdx];

  return (
    <div ref={containerRef} className="rotated-page-content page-testimonials">

      <h2 className="testimonials-giant-bg-title">
        TESTIMONIALS
      </h2>

      <svg
        className="testimonials-speech-bubble-doodle"
        viewBox="0 0 120 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="60" cy="38" rx="52" ry="26" />
        <path d="M22 52 L10 70 L34 58" />
      </svg>

      <div className="testimonials-stage">
        <div ref={stackRef} className="testimonials-cards-stack">

          <div className="testimonial-card-fanned-2" />
          <div className="testimonial-card-fanned-1" />

          <div className="testimonial-card-main">
            <p className="testimonial-quote-text">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="testimonial-author-row">
              <div className="testimonial-author-info">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="testimonial-author-avatar"
                  loading="lazy"
                />
                <div>
                  <div className="testimonial-author-name">{current.name}</div>
                  <div className="testimonial-author-role">
                    {current.role} • {current.location}
                  </div>
                </div>
              </div>
              <span className="testimonial-flag-icon" role="img" aria-label={current.location}>
                {current.flag}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials-bottom-bar">
        <span className="testimonials-label">Our Members Say</span>

        <div className="testimonials-nav-btns">
          <button onClick={handlePrev} className="testimonials-nav-btn" aria-label="Previous Testimonial">
            ← Prev
          </button>
          <span style={{ opacity: 0.4 }}>|</span>
          <button onClick={handleNext} className="testimonials-nav-btn" aria-label="Next Testimonial">
            Next →
          </button>
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

export default TestimonialsPage;
