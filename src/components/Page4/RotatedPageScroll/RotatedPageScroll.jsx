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

  {
    id: 'page-2',
    sectionBg: '#ffffff',
    cardBg: '#000000',
    textColor: '#ffffff',
    theme: 'dark',
    zIndex: 20,
    component: CuratorsArtistsPage,
  },

  {
    id: 'page-3',
    sectionBg: '#000000',
    cardBg: '#18181b',
    textColor: '#ffffff',
    theme: 'dark',
    zIndex: 30,
    component: TheCardPage,
  },

  {
    id: 'page-4',
    sectionBg: '#18181b',
    cardBg: '#3f3f46',
    textColor: '#ffffff',
    theme: 'dark',
    zIndex: 40,
    component: CentralizePage,
  },

  {
    id: 'page-5',
    sectionBg: '#3f3f46',
    cardBg: '#71717a',
    textColor: '#ffffff',
    theme: 'dark',
    zIndex: 50,
    component: TestimonialsPage,
  },

  {
    id: 'page-6',
    sectionBg: '#71717a',
    cardBg: '#e4e4e7',
    textColor: '#111111',
    theme: 'light',
    zIndex: 60,
    component: ConnectoryPage,
  },

  {
    id: 'page-7',
    sectionBg: '#e4e4e7',
    cardBg: '#ffffff',
    textColor: '#111111',
    theme: 'light',
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

      <h1
        className="hero-simon-bg-text font-bebas"
        style={{ color: '#111111' }}
      >
        SIMON
      </h1>

      <div className="hero-carousel-wrapper">
        <CylindricalCarousel3D />
      </div>
    </section>
  );
}

function RotatedPageSection({
  id,
  sectionBg,
  cardBg,
  textColor,
  theme,
  zIndex = 20,
  component: Component,
}) {
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    const container = containerRef.current;

    if (!page || !container) return;

    const ctx = gsap.context(() => {

      gsap.set(page, {
        rotateZ: 14,
        rotateX: 0,
        rotateY: 0,
        yPercent: 20,
        transformOrigin: '50% 50%',
        boxShadow: 'none',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 100%',
          end: 'top 15%',
          scrub: true,
        },
      });

      tl.to(page, {
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        yPercent: 0,
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
      className="relative w-screen h-screen flex items-center justify-center overflow-visible"
    >

      <div
        ref={pageRef}
        style={{ backgroundColor: cardBg, color: textColor, boxShadow: 'none' }}
        className="relative w-full h-full rounded-none overflow-hidden flex items-center justify-center"
      >
        {Component ? (
          <Component textColor={textColor} theme={theme} cardBg={cardBg} />
        ) : null}
      </div>
    </section>
  );
}

export default function Section2RotatedSuite() {
  return (
    <div id="rotated-page-scroll-root" className="relative w-screen overflow-x-hidden">

      <HeroPageSection />

      {pagesData.map((page) => (
        <RotatedPageSection
          key={page.id}
          id={page.id}
          sectionBg={page.sectionBg}
          cardBg={page.cardBg}
          textColor={page.textColor}
          theme={page.theme}
          zIndex={page.zIndex}
          component={page.component}
        />
      ))}
    </div>
  );
}
