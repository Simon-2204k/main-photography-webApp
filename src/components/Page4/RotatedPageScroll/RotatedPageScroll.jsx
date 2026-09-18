import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CylindricalCarousel3D from './CylindricalCarousel3D';
import './RotatedPageScroll.css';

gsap.registerPlugin(ScrollTrigger);

const pagesData = [
  // Page 2: Section background is Page 1 White (#FFFFFF), Card is Black (#000000)
  { id: 'page-2', sectionBg: '#FFFFFF', cardBg: '#000000', zIndex: 20 },
  // Page 3: Section background is Page 2 Black (#000000), Card is Dark Charcoal (#18181b)
  { id: 'page-3', sectionBg: '#000000', cardBg: '#18181b', zIndex: 30 },
  // Page 4: Section background is Page 3 Dark Charcoal (#18181b), Card is Medium Gray (#3f3f46)
  { id: 'page-4', sectionBg: '#18181b', cardBg: '#3f3f46', zIndex: 40 },
  // Page 5: Section background is Page 4 Medium Gray (#3f3f46), Card is Light Slate (#71717a)
  { id: 'page-5', sectionBg: '#3f3f46', cardBg: '#71717a', zIndex: 50 },
  // Page 6: Section background is Page 5 Light Slate (#71717a), Card is Zinc (#e4e4e7)
  { id: 'page-6', sectionBg: '#71717a', cardBg: '#e4e4e7', zIndex: 60 },
  // Page 7 (End One): Section background is Zinc (#e4e4e7), Card is Pure White (#FFFFFF)
  { id: 'page-7', sectionBg: '#e4e4e7', cardBg: '#FFFFFF', zIndex: 70 },
];

function HeroPageSection() {
  return (
    <section
      id="specsheet-section-2-hero"
      className="hero-page-section-container"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Massive Background Display Typography ("SIMON") in High-Contrast Dark Charcoal */}
      <h1
        className="hero-simon-bg-text font-bebas"
        style={{ color: '#111111' }}
      >
        SIMON
      </h1>

      {/* 3D Tilted Cylinder Showcase */}
      <div className="hero-carousel-wrapper">
        <CylindricalCarousel3D />
      </div>
    </section>
  );
}

function RotatedPageSection({ id, sectionBg, cardBg, zIndex = 20 }) {
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    const container = containerRef.current;

    if (!page || !container) return;

    const ctx = gsap.context(() => {
      // Initial State: Pushed down below viewport (yPercent: 20) with Z-AXIS ROTATION ONLY (rotateZ: 14)
      gsap.set(page, {
        rotateZ: 14,
        rotateX: 0,
        rotateY: 0,
        yPercent: 20,
        transformOrigin: '50% 50%',
        scale: 0.88,
        boxShadow: 'none',
      });

      // Instant 1:1 scrub ScrollTrigger (scrub: true) for symmetric scroll up & down rotation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 100%',
          end: 'top 10%',
          scrub: true,
        },
      });

      // Smoothly animate rotateZ to 0 and yPercent to 0 as page enters viewport
      tl.to(page, {
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        yPercent: 0,
        scale: 1.0,
        boxShadow: 'none',
        ease: 'none',
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id={id}
      style={{
        backgroundColor: sectionBg,
        zIndex,
        marginTop: id !== 'page-2' ? '-2px' : '0',
      }}
      className="relative w-screen h-screen flex items-center justify-center overflow-visible perspective-container"
    >
      {/* 100% Screen Height & Width Page - EMPTY Container pushed below viewport before scroll */}
      <div
        ref={pageRef}
        style={{ backgroundColor: cardBg }}
        className="relative w-full h-full text-white rounded-none shadow-none overflow-hidden preserve-3d flex items-center justify-center"
      >
        {/* Completely EMPTY Page Container */}
      </div>
    </section>
  );
}

export default function Section2RotatedSuite() {
  return (
    <div id="rotated-page-scroll-root" className="relative w-screen overflow-x-hidden">
      {/* Page 1: Hero Section with SIMON background & 3D Tilted Cylindrical Carousel */}
      <HeroPageSection />

      {/* Pages 2 through 7: Rotated scroll pages stacked over previous background */}
      {pagesData.map((page) => (
        <RotatedPageSection
          key={page.id}
          id={page.id}
          sectionBg={page.sectionBg}
          cardBg={page.cardBg}
          zIndex={page.zIndex}
        />
      ))}
    </div>
  );
}
