import React, { useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FilmGrain } from '../../components/Page1/FilmGrain/FilmGrain';
import { CustomCursor } from '../../components/Page1/SpiralGallery/CustomCursor';
import { DesktopOnlyNotice } from '../../components/Page1/DesktopOnlyNotice/DesktopOnlyNotice';

// Section 1: Darkroom HUD Video Canvas & Telemetry
import { DarkroomCanvas } from '../../components/Page2/DarkroomCanvas/DarkroomCanvas';
import { DarkroomHeader } from '../../components/Page2/DarkroomHeader/DarkroomHeader';
import { DarkroomGridGrain } from '../../components/Page2/DarkroomGridGrain/DarkroomGridGrain';

// Section 2: 49-Frame Image Sequence with MODERN / HIGH QUALITY / FRESH tags & scroll reveal
import { HeroCanvas } from '../../components/Page2/HeroCanvas/HeroCanvas';

// Section 3: Statement Text Page with Alpha Gradient Mask
import { ThisIsESE } from '../../components/Page2/ThisIsESE/ThisIsESE';

// Section 4: 6-Page Cinematic Parallax Carousel + 5 GIFs Bio + 3D Flip Card + Video Reveal + Footer
import ParallaxPages from '../../components/Page2/ParallaxPages/ParallaxPages';

import './PageOneStyles.css';
import './Page2.css';

gsap.registerPlugin(ScrollTrigger);

export const Page2Component = ({ onOpenMenu }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    window.lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete window.lenis;
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div className="page2-root-wrapper min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-[#ff2a4b] selection:text-white">
      {/* Device Restriction Blocker (< 1024px) */}
      <DesktopOnlyNotice />

      {/* Cinematic Film Grain Overlay */}
      <FilmGrain />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Section 1: Hero Interactive HUD Video Canvas, Grid Grain Telemetry & Natural Scrolling Header */}
      <section id="darkroom-hero-section" className="darkroom-hero-wrapper">
        <DarkroomHeader onOpenMenu={onOpenMenu} />
        <DarkroomGridGrain />
        <DarkroomCanvas />
      </section>

      {/* Section 2: 49-Frame Image Sequence with MODERN / HIGH QUALITY / FRESH tags & scroll reveal */}
      <HeroCanvas />

      {/* Section 3: Statement Text Page */}
      <ThisIsESE />

      {/* Section 4: 6-Page Cinematic Parallax Carousel + Bio Statement + 3D Flip Card + Video Reveal + Footer */}
      <ParallaxPages />
    </div>
  );
};

export const Page2 = memo(Page2Component);
export default Page2;
