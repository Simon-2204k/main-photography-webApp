import React, { useState, useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SpiralGalleryCanvas } from '../../components/Page1/SpiralGallery/SpiralGalleryCanvas';
import { BackgroundTypography } from '../../components/Page1/SpiralGallery/BackgroundTypography';
import { HeaderHUD } from '../../components/Page1/SpiralGallery/HeaderHUD';
import { CustomCursor } from '../../components/Page1/SpiralGallery/CustomCursor';
import { CursorTrail } from '../../components/Page1/CursorTrail/CursorTrail';
import { PerspectivesGrid } from '../../components/Page1/PerspectivesGrid/PerspectivesGrid';
import { VisualDisciplines } from '../../components/Page1/VisualDisciplines/VisualDisciplines';
import { StudioManifesto } from '../../components/Page1/StudioManifesto/StudioManifesto';
import { ExpandingGallery } from '../../components/Page1/ExpandingGallery/ExpandingGallery';
import { SpotlightCards } from '../../components/Page1/SpotlightCards/SpotlightCards';
import { SlantedMarquee } from '../../components/Page1/SlantedMarquee/SlantedMarquee';
import { FeaturedSeries } from '../../components/Page1/FeaturedSeries/FeaturedSeries';
import { SpotlightMarquee } from '../../components/Page1/SpotlightMarquee/SpotlightMarquee';
import { Footer } from '../../components/Page1/Footer/Footer';
import { FilmGrain } from '../../components/Page1/FilmGrain/FilmGrain';
import { DesktopOnlyNotice } from '../../components/Page1/DesktopOnlyNotice/DesktopOnlyNotice';

import { projectsData } from '../../data/page1/projectsData';
import './Page1.css';

export const Page1Component = ({ onOpenMenu }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      infinite: false,
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Spiral traverses its full upward journey over 1.5 * windowHeight
      const progress = Math.min(Math.max(scrollY / (window.innerHeight * 1.5), 0), 1);
      setScrollProgress(progress);
    };

    lenis.on('scroll', handleScroll);

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

  // Section 1 visibility state: Menu and Background Typography visible only during 3D Spiral travel
  const isSection1Active = scrollProgress < 0.85;

  return (
    <div className="page1-root-wrapper">
      {/* Device Restriction Blocker: Displays exclusively for phones and tablets (< 1024px) */}
      <DesktopOnlyNotice />

      {/* Global Continuous Animated Analog Film Grain Overlay */}
      <FilmGrain />

      <CustomCursor />

      {/* Section 1 Background Typography & Menu Trigger: Visible exclusively in Section 1 */}
      <BackgroundTypography 
        isVisible={isSection1Active}
        onOpenMenu={onOpenMenu} 
      />

      {/* Section 1 HUD Overlay: Visible exclusively in Section 1 */}
      <HeaderHUD isVisible={isSection1Active} />

      {/* Fixed 3D Spiral Background */}
      <div className="page1-fixed-spiral-canvas">
        <SpiralGalleryCanvas 
          projects={projectsData} 
          scrollProgress={scrollProgress} 
        />
      </div>

      {/* Section 1 Space: Spacer for 3D Camera Path */}
      <div className="page1-hero-spacer" />

      {/* Section 2: Cursor Trail Gallery */}
      <div id="page-2-container">
        <CursorTrail />
      </div>

      {/* Section 3: Perspectives Photography Editorial Grid */}
      <PerspectivesGrid />

      {/* Section 4: Visual Disciplines Typography Showcase */}
      <VisualDisciplines />

      {/* Section 5: Studio Manifesto */}
      <StudioManifesto />

      {/* Section 6: Expanding Gallery */}
      <ExpandingGallery />

      {/* Section 7: Spotlight Interactive Cards (Physics Engine) */}
      <SpotlightCards />

      {/* Section 8: Slanted Kinetic Ribbon Marquee */}
      <SlantedMarquee />

      {/* Section 9: Featured Photography Series */}
      <FeaturedSeries />

      {/* Section 10: Spotlight Infinite Marquee Gallery */}
      <SpotlightMarquee />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export const Page1 = memo(Page1Component);
export default Page1;
