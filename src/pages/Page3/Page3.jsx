import React, { useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CylindricalGallery from '../../components/Page3/CylindricalGallery/CylindricalGallery';

import ArcStepShowcase from '../../components/Page3/ArcStepShowcase/ArcStepShowcase';

import TriptychCardFlip from '../../components/Page3/TriptychCardFlip/TriptychCardFlip';

import JamareaHub from '../../components/Page3/JamareaHub/JamareaHub';

import InfiniteDragCanvas from '../../components/Page3/InfiniteDragCanvas/InfiniteDragCanvas';

import StickyDisciplineCards from '../../components/Page3/StickyDisciplineCards/StickyDisciplineCards';

import SvgPathHoverCards from '../../components/Page3/SvgPathHoverCards/SvgPathHoverCards';

import HorizontalTimeline from '../../components/Page3/HorizontalTimeline/HorizontalTimeline';

import MultiCylindricalGallery from '../../components/Page3/MultiCylindricalGallery/MultiCylindricalGallery';

import './Page3.css';

gsap.registerPlugin(ScrollTrigger);

export const Page3Component = ({ onOpenMenu }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.6,
      touchInertiaExponent: 1.65,
      infinite: false,
    });

    window.lenis = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('resize', handleResize);
      delete window.lenis;
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div className="page3-root-wrapper min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-[#ff2a4b] selection:text-white">

      <section id="exhibits-section-1" className="page3-section-container">

        <header className="page3-floating-nav">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              if (onOpenMenu) onOpenMenu(rect);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              if (onOpenMenu) onOpenMenu(rect);
            }}
            className="page3-nav-menu-btn"
            aria-label="Open Navigation Menu"
          >
            MENU
          </button>
        </header>
        <CylindricalGallery />
      </section>

      <section id="exhibits-section-2" className="page3-section-container">
        <ArcStepShowcase />
      </section>

      <section id="exhibits-section-3" className="page3-section-container">
        <TriptychCardFlip />
      </section>

      <section id="exhibits-section-4" className="page3-section-container">
        <JamareaHub />
      </section>

      <section id="exhibits-section-5" className="page3-section-container">
        <InfiniteDragCanvas />
      </section>

      <section id="exhibits-section-6" className="page3-section-container">
        <StickyDisciplineCards />
      </section>

      <section id="exhibits-section-7" className="page3-section-container">
        <SvgPathHoverCards />
      </section>

      <section id="exhibits-section-8" className="page3-section-container">
        <HorizontalTimeline />
      </section>

      <section id="exhibits-section-9" className="page3-section-container">
        <MultiCylindricalGallery onOpenMenu={onOpenMenu} />
      </section>
    </div>
  );
};

export const Page3 = memo(Page3Component);
export default Page3;
