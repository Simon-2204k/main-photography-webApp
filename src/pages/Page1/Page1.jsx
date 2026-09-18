import React, { useState, useEffect, useRef, memo } from 'react';
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
import { DesktopOnlyNotice } from '../../components/Page1/DesktopOnlyNotice/DesktopOnlyNotice';

import { projectsData } from '../../data/page1/projectsData';
import './Page1.css';

export const Page1Component = ({ onOpenMenu }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSpiralActive, setIsSpiralActive] = useState(true);
  const heroSpacerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true, // Ultra-smooth synced physics scrolling on touch devices (phones & tablets)
      syncTouchLerp: 0.075, // Butter-smooth interpolation on touch
      touchMultiplier: 1.5, // Responsive touch sensitivity
      touchInertiaExponent: 1.6,
      infinite: false,
    });

    let prevProgress = 0;
    let prevSpiralActive = true;

    const getSpacerHeight = () => {
      if (heroSpacerRef.current) {
        return heroSpacerRef.current.offsetHeight;
      }
      return window.innerWidth <= 768 ? window.innerHeight * 1.8 : window.innerHeight * 2.35;
    };

    let spacerHeight = getSpacerHeight();

    const handleResize = () => {
      spacerHeight = getSpacerHeight();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1] Active state: visible until 2nd section top (yellow line) touches browser top
      // When scrolling back up, awakens with a 250px pre-warm buffer so it appears instantly on screen
      const active = scrollY <= spacerHeight + 250;
      if (active !== prevSpiralActive) {
        prevSpiralActive = active;
        setIsSpiralActive(active);
      }

      // 2] 3D spiral scroll progress: only update while spiral is active
      if (active) {
        const progressLimit = spacerHeight;
        const progress = Math.min(Math.max(scrollY / progressLimit, 0), 1);
        if (Math.abs(progress - prevProgress) > 0.001 || progress === 0 || progress === 1) {
          prevProgress = progress;
          setScrollProgress(progress);
        }
      }
      // When scrollY > spacerHeight + 250, ZERO state updates occur, eliminating all scroll re-renders across Sections 2-10
    };

    lenis.on('scroll', handleScroll);
    // Native window scroll listener for mobile/tablet touch swipe scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize synchronously on mount / reload to prevent rotation freeze
    handleScroll();

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Section 1 HUD/Typography visibility: Visible during initial entrance, fades as spiral climbs
  const isHeaderActive = isSpiralActive && scrollProgress < 0.65;

  return (
    <div className="page1-root-wrapper">
      {/* Device Restriction Blocker: Displays exclusively for phones and tablets (< 1024px) */}
      <DesktopOnlyNotice />

      {/* Custom + Cursor (Restricted exclusively to Section 1) */}
      <CustomCursor isSection1Active={isSpiralActive} />

      {/* Section 1 Background Typography & Menu Trigger: Visible exclusively in Section 1 */}
      <BackgroundTypography 
        isVisible={isHeaderActive}
        onOpenMenu={onOpenMenu} 
      />

      {/* Section 1 HUD Overlay: Visible exclusively in Section 1 */}
      <HeaderHUD isVisible={isHeaderActive} />

      {/* Fixed 3D Spiral Background: Stays visible until 2nd section top (yellow line) touches browser top */}
      <div 
        className="page1-fixed-spiral-canvas"
        style={{ 
          visibility: isSpiralActive ? 'visible' : 'hidden',
          opacity: isSpiralActive ? 1 : 0,
          pointerEvents: isSpiralActive ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
      >
        <SpiralGalleryCanvas 
          projects={projectsData} 
          scrollProgress={scrollProgress} 
          isActive={isSpiralActive}
        />
      </div>

      {/* Section 1 Space: Spacer for 3D Camera Path */}
      <div ref={heroSpacerRef} className="page1-hero-spacer" />

      {/* Solid Editorial Container wrapping all lower sections to eliminate any canvas bleed-through */}
      <div className="page1-editorial-container" style={{ background: '#000000', position: 'relative', zIndex: 10, width: '100%' }}>
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
        <Footer onOpenMenu={onOpenMenu} />
      </div>
    </div>
  );
};

export const Page1 = memo(Page1Component);
export default Page1;
