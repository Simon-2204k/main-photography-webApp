import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

// Initialize Global Asset Preloader upfront
import '../../utils/imagePreloadCache';

import { SpiralGalleryCanvas } from '../../components/Page1/SpiralGallery/SpiralGalleryCanvas';
import { CustomCursor } from '../../components/Page1/SpiralGallery/CustomCursor';
import { HeaderHUD } from '../../components/Page1/SpiralGallery/HeaderHUD';
import { BackgroundTypography } from '../../components/Page1/SpiralGallery/BackgroundTypography';
import { MenuOverlay } from '../../components/Page1/MenuOverlay/MenuOverlay';
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

export const Page1 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTriggerRect, setMenuTriggerRect] = useState(null);

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

  const handleOpenMenu = useCallback((rect) => {
    setMenuTriggerRect(rect);
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
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
        onOpenMenu={handleOpenMenu} 
      />

      {/* Section 1 HUD Overlay: Visible exclusively in Section 1 */}
      <HeaderHUD isVisible={isSection1Active} />

      {/* Fullscreen GSAP Morph-Scaled Navigation Menu */}
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={handleCloseMenu} 
        triggerRect={menuTriggerRect}
      />

      {/* Fixed 3D Spiral Background */}
      <div className="page1-fixed-spiral-canvas">
        <SpiralGalleryCanvas 
          projects={projectsData} 
          scrollProgress={scrollProgress}
        />
      </div>

      {/* Calibrated Hero Spacer (235vh): Ensures users view 90% of spiral travel before lower sections emerge */}
      <section className="page1-hero-spacer" />

      {/* Lower Sections Container (Perspectives Editorial Grid + Visual Disciplines + Studio Manifesto) */}
      <div id="page-2-container" className="page1-editorial-container">
        <PerspectivesGrid />
        <VisualDisciplines />
        <StudioManifesto />
      </div>

      {/* Expanding Scroll Multi-Row Archive Gallery (64 Cards) */}
      <ExpandingGallery />

      {/* Magnetic Spotlight Cards (Kinetic Magnetic Repulsion Physics) */}
      <SpotlightCards />

      {/* Dual Slanted Kinetic Ribbon Marquee Section */}
      <SlantedMarquee />

      {/* Featured Series Editorial Directory (30 Projects Grid) */}
      <FeaturedSeries />

      {/* Magnetic Spotlight Marquee Strip (divLike Cursor) */}
      <SpotlightMarquee />

      {/* Simon Editorial Footer (Monochrome Black & White) */}
      <Footer />
    </div>
  );
};

export default Page1;
