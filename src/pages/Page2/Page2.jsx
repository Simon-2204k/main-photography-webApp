import React, { useState, useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FilmGrain } from '../../components/Page1/FilmGrain/FilmGrain';
import { CustomCursor } from '../../components/Page1/SpiralGallery/CustomCursor';
import { DesktopOnlyNotice } from '../../components/Page1/DesktopOnlyNotice/DesktopOnlyNotice';

import { DarkroomCanvas } from '../../components/Page2/DarkroomCanvas/DarkroomCanvas';
import { DarkroomHeader } from '../../components/Page2/DarkroomHeader/DarkroomHeader';
import { DarkroomGridGrain } from '../../components/Page2/DarkroomGridGrain/DarkroomGridGrain';
import { DarkroomStatement } from '../../components/Page2/DarkroomStatement/DarkroomStatement';
import { DarkroomParallaxCarousel } from '../../components/Page2/DarkroomParallaxCarousel/DarkroomParallaxCarousel';
import { DarkroomBioStatement } from '../../components/Page2/DarkroomBioStatement/DarkroomBioStatement';
import { Darkroom3DOutroCard } from '../../components/Page2/Darkroom3DOutroCard/Darkroom3DOutroCard';
import { DarkroomVideoOutro } from '../../components/Page2/DarkroomVideoOutro/DarkroomVideoOutro';
import { DarkroomFooter } from '../../components/Page2/DarkroomFooter/DarkroomFooter';

import './Page2.css';

gsap.registerPlugin(ScrollTrigger);

export const Page2Component = ({ onOpenMenu }) => {
  const [isSection1Active, setIsSection1Active] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      // Section 1 Header (CHRONICLES IN LIGHT + MENU) visible exclusively in Section 1
      setIsSection1Active(window.scrollY < window.innerHeight * 0.7);
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="page2-root-wrapper">
      {/* Device Restriction Blocker (< 1024px) */}
      <DesktopOnlyNotice />

      {/* Cinematic Film Grain Overlay */}
      <FilmGrain />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Section 1 Header: CHRONICLES IN LIGHT + MENU (Visible exclusively in Section 1) */}
      <DarkroomHeader
        isVisible={isSection1Active}
        onOpenMenu={onOpenMenu}
      />

      {/* Section 1: Interactive HUD Video Canvas & Grid Grain Telemetry */}
      <section id="darkroom-hero-section" className="darkroom-hero-wrapper">
        <DarkroomGridGrain />
        <DarkroomCanvas />
      </section>

      {/* Section 2: Statement Text Page */}
      <DarkroomStatement />

      {/* Section 3: 6-Slide Codegrid Parallax Carousel */}
      <DarkroomParallaxCarousel />

      {/* Section 4: Bio Statement with 5 GIF Capsule Pills */}
      <DarkroomBioStatement />

      {/* Section 5: 3-Step 3D Flip Outro Card */}
      <Darkroom3DOutroCard />

      {/* Section 6: Video Outro & 112-Tile Square Grid Reveal */}
      <DarkroomVideoOutro />

      {/* Section 7: 50vh Footer with Infinite Marquee */}
      <DarkroomFooter />
    </div>
  );
};

export const Page2 = memo(Page2Component);
export default Page2;
