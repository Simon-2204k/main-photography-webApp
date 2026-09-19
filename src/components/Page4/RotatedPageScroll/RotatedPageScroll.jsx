import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CylindricalCarousel3D from './CylindricalCarousel3D';
import CuratorsArtistsPage from './pages/CuratorsArtistsPage';
import TheCardPage from './pages/TheCardPage';
import CentralizePage from './pages/CentralizePage';
import TestimonialsPage from './pages/TestimonialsPage';
import ConnectoryPage from './pages/ConnectoryPage';
import JoinUsPage from './pages/JoinUsPage';
import './RotatedPageScroll.css';

gsap.registerPlugin(ScrollTrigger);

const pagesData = [
  // Page 2: Curators and Artists (Sage Green)
  {
    id: 'page-2',
    sectionBg: '#000000',
    cardBg: '#848c7c',
    zIndex: 20,
    component: CuratorsArtistsPage,
  },
  // Page 3: The Card (Dusty Rose)
  {
    id: 'page-3',
    sectionBg: '#848c7c',
    cardBg: '#b88890',
    zIndex: 30,
    component: TheCardPage,
  },
  // Page 4: Centralize (Sage Green)
  {
    id: 'page-4',
    sectionBg: '#b88890',
    cardBg: '#848c7c',
    zIndex: 40,
    component: CentralizePage,
  },
  // Page 5: Testimonials (Slate Blue)
  {
    id: 'page-5',
    sectionBg: '#848c7c',
    cardBg: '#788c9e',
    zIndex: 50,
    component: TestimonialsPage,
  },
  // Page 6: The Connectory (Sage Green)
  {
    id: 'page-6',
    sectionBg: '#788c9e',
    cardBg: '#848c7c',
    zIndex: 60,
    component: ConnectoryPage,
  },
  // Page 7: Join Us (Vibrant Orange)
  {
    id: 'page-7',
    sectionBg: '#848c7c',
    cardBg: '#f25822',
    zIndex: 70,
    component: JoinUsPage,
  },
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

function RotatedPageSection({ id, sectionBg, cardBg, zIndex = 20, component: Component }) {
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
      {/* 100% Screen Height & Width Page with Mounted Component */}
      <div
        ref={pageRef}
        style={{ backgroundColor: cardBg }}
        className="relative w-full h-full text-white rounded-none shadow-none overflow-hidden preserve-3d flex items-center justify-center"
      >
        {Component ? <Component /> : null}
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
          component={page.component}
        />
      ))}
    </div>
  );
}
