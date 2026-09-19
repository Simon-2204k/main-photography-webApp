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

import { projectsData } from '../../data/page1/projectsData';
import './Page1.css';

export const Page1Component = ({ onOpenMenu, isIntroActive = false }) => {
  const [isSpiralActive, setIsSpiralActive] = useState(true);
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  const scrollProgressRef = useRef(0);
  const prevSpiralActiveRef = useRef(true);
  const prevHeaderActiveRef = useRef(true);
  const heroSpacerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      infinite: false,
    });

    const getSpacerHeight = () => {
      if (heroSpacerRef.current) {
        return heroSpacerRef.current.offsetHeight;
      }
      return window.innerWidth <= 768 ? window.innerHeight * 1.8 : window.innerHeight * 2.35;
    };

    let spacerHeight = getSpacerHeight();

    const handleResize = () => {
      spacerHeight = getSpacerHeight();
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const section2El = document.getElementById('perspectives-section');
      const rectTop = section2El ? section2El.getBoundingClientRect().top : (spacerHeight - scrollY);

      if (rectTop <= 0) {
        if (prevSpiralActiveRef.current) {
          prevSpiralActiveRef.current = false;
          setIsSpiralActive(false);
        }
      } else if (rectTop > 0) {
        if (!prevSpiralActiveRef.current) {
          prevSpiralActiveRef.current = true;
          setIsSpiralActive(true);
        }
      }

      const progressLimit = spacerHeight || 1;
      const progress = Math.min(Math.max(scrollY / progressLimit, 0), 1);
      scrollProgressRef.current = progress;

      const headerActive = prevSpiralActiveRef.current && progress < 0.65;
      if (headerActive !== prevHeaderActiveRef.current) {
        prevHeaderActiveRef.current = headerActive;
        setIsHeaderActive(headerActive);
      }
    };

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    lenis.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="page1-root-wrapper">
      <CustomCursor isSection1Active={isSpiralActive} />

      <BackgroundTypography
        isVisible={isHeaderActive}
        onOpenMenu={onOpenMenu}
      />

      <HeaderHUD isVisible={isHeaderActive} />

      <div
        className="page1-fixed-spiral-canvas"
        style={{
          visibility: isSpiralActive ? 'visible' : 'hidden',
          opacity: isSpiralActive ? 1 : 0,
          pointerEvents: isSpiralActive ? 'auto' : 'none',
          transition: 'opacity 0.2s ease'
        }}
      >
        <SpiralGalleryCanvas
          projects={projectsData}
          scrollProgressRef={scrollProgressRef}
          isActive={!isIntroActive && isSpiralActive}
        />
      </div>

      <div ref={heroSpacerRef} className="page1-hero-spacer" />

      <div className="page1-editorial-container" style={{ background: '#000000', position: 'relative', zIndex: 10, width: '100%' }}>
        <div id="page-2-container">
          <CursorTrail />
        </div>

        <PerspectivesGrid />

        <VisualDisciplines />

        <StudioManifesto />

        <ExpandingGallery />

        <SpotlightCards />

        <SlantedMarquee />

        <FeaturedSeries />

        <SpotlightMarquee />

        <Footer onOpenMenu={onOpenMenu} />
      </div>
    </div>
  );
};

export const Page1 = memo(Page1Component);
export default Page1;
