import React, { useState, useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';
import './JamareaHub.css';

gsap.registerPlugin(ScrollTrigger);

// 20 Landscape Photography Assets
const PORTAL_IMAGES = Array.from(
  { length: 20 },
  (_, i) => `/assets/page3/section4/portal_${String(i + 1).padStart(2, '0')}.webp`
);

const MARQUEE_TERMS = [
  'EXHIBITS',
  'DARKROOM',
  'MONOCHROME',
  'EDITORIAL'
];

export const JamareaHub = memo(function JamareaHub() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLandoTextReveal(sectionRef, ['.jamarea-top-nav', '.jamarea-huge-title'], {
    theme: 'dark',
    start: 'top 80%',
  });

  // IntersectionObserver to pause cycling and animations when offscreen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 1. Continuous image cycling timer across all 20 images (active only when in viewport)
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % PORTAL_IMAGES.length);
    }, 280);

    return () => clearInterval(timer);
  }, [isVisible]);

  // 2. Pin Section 4 for 150vh
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150vh',
        pin: true,
        scrub: 1,
        anticipatePin: 0
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 3. Mouse scrub on desktop / Auto-ticker fallback on touch or mobile
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024;

    if (isTouch) {
      if (!isVisible) return;
      const tween = gsap.to(track, {
        x: '-33.33%',
        repeat: -1,
        duration: 16,
        ease: 'none'
      });
      return () => tween.kill();
    } else {
      const handleMouseMove = (e) => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        const maxScroll = track.scrollWidth - window.innerWidth;
        if (maxScroll > 0) {
          gsap.to(track, {
            x: -progress * maxScroll,
            duration: 0.65,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      };

      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="jamarea-hub-section" id="jamarea-hub-section">
      {/* Top Navigation - Clean centered links without Menu and Contact */}
      <header className="jamarea-topbar">
        <nav className="jamarea-top-nav">
          <span>PORTFOLIO</span>
          <span className="top-sep">,</span>
          <span>DISCIPLINES</span>
          <span className="top-sep">,</span>
          <span>DARKROOM</span>
          <span className="top-sep">,</span>
          <span>EXHIBITS</span>
        </nav>
      </header>

      {/* Main Grid Viewport */}
      <div className="jamarea-main-grid">
        {/* Left Flank: Giant SIMON Typography pushed outward */}
        <div className="jamarea-flank flank-left">
          <h1 className="jamarea-huge-title">SIMON</h1>
        </div>

        {/* Left Metadata Column (Mail removed) */}
        <div className="jamarea-meta-col meta-left">
          <div className="meta-block">
            <span className="meta-label">SIMON ARCHIVE</span>
            <span className="meta-sub">ANALOG DARKROOM & OPTICS</span>
            <span className="meta-sub">MEDIUM FORMAT 120MM</span>
          </div>

          <div className="meta-block">
            <span className="meta-tag">SILVER HALIDE</span>
          </div>

          <div className="meta-block">
            <span className="meta-label">STUDIO SPEC</span>
            <span className="meta-val">HASSELBLAD / LEICA M</span>
          </div>
        </div>

        {/* Center Portal: Landscape (3:2) Continuous Cycling Imagery (Counter removed) */}
        <div className="jamarea-center-portal-wrapper">
          <div className="jamarea-center-portal">
            <img
              src={PORTAL_IMAGES[activeImageIdx]}
              alt="Simon Photography Archive Continuous Stream"
              loading="eager"
              decoding="async"
              className="portal-stream-image"
            />
            <div className="portal-scanline" />
          </div>
        </div>

        {/* Right Metadata Column */}
        <div className="jamarea-meta-col meta-right">
          <div className="meta-block">
            <span className="meta-label">DISCIPLINES</span>
            <span className="meta-sub">INSTAGRAM</span>
            <span className="meta-sub">BEHANCE</span>
            <span className="meta-sub">LINKEDIN</span>
          </div>

          <div className="meta-block">
            <span className="meta-tag tag-accent">ENGLISH</span>
          </div>

          <div className="meta-block">
            <span className="meta-label">OPTICS SPEC</span>
            <span className="meta-val">50MM F/1.2 • 85MM F/1.4</span>
          </div>

          <div className="meta-block">
            <span className="meta-label">LEGAL INFO</span>
            <span className="meta-sub">SIMON ARCHIVE © 2026</span>
            <span className="meta-sub">ALL RIGHTS RESERVED</span>
          </div>
        </div>

        {/* Right Flank: Giant ARCHIVE Typography pushed outward */}
        <div className="jamarea-flank flank-right">
          <h1 className="jamarea-huge-title">ARCHIVE</h1>
        </div>
      </div>

      {/* Bottom Interactive Mouse-Scrubbed Text Track */}
      <div className="jamarea-bottom-marquee-container">
        <div ref={trackRef} className="jamarea-marquee-track is-mouse-driven">
          {MARQUEE_TERMS.concat(MARQUEE_TERMS, MARQUEE_TERMS).map((term, index) => (
            <span key={index} className="jamarea-marquee-item">
              {term}
              <span className="marquee-separator">,</span>
              {index % 3 === 0 && <span className="marquee-red-dot">●</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

export default JamareaHub;
