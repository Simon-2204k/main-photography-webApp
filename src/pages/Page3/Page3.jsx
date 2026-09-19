import React, { useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Section 1: Fullscreen 3D Cylindrical Gallery
import CylindricalGallery from '../../components/Page3/CylindricalGallery/CylindricalGallery';

// Section 2: Half-Circle Arc Step Showcase (11 Cards, Vertical Roll, Statement Outro)
import ArcStepShowcase from '../../components/Page3/ArcStepShowcase/ArcStepShowcase';

// Section 3: 3-Panel Triptych Panoramic Split & 3D Flipping Card Trio
import TriptychCardFlip from '../../components/Page3/TriptychCardFlip/TriptychCardFlip';

// Section 4: Fullscreen Photography Hub (Jamarea-style cycling portal)
import JamareaHub from '../../components/Page3/JamareaHub/JamareaHub';

// Section 5: Infinite Drag Canvas
import InfiniteDragCanvas from '../../components/Page3/InfiniteDragCanvas/InfiniteDragCanvas';

// Section 6: Sticky Pushing Photography Discipline Cards
import StickyDisciplineCards from '../../components/Page3/StickyDisciplineCards/StickyDisciplineCards';

// Section 7: SVG Path Drawing Hover Cards
import SvgPathHoverCards from '../../components/Page3/SvgPathHoverCards/SvgPathHoverCards';

// Section 8: Stiff Background Horizontal Parallax Timeline
import HorizontalTimeline from '../../components/Page3/HorizontalTimeline/HorizontalTimeline';

// Section 9: Multi-Tier 3D Cylindrical Gallery
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
      syncTouch: true, // Ultra-smooth synced physics scrolling on touch devices (phones & tablets)
      syncTouchLerp: 0.08, // Butter-smooth interpolation on touch
      touchMultiplier: 1.6, // Responsive touch sensitivity
      touchInertiaExponent: 1.65,
      infinite: false,
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

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Refresh ScrollTrigger to ensure pinned sections compute accurate geometry
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
      {/* Section 1: Fullscreen 3D Cylindrical Gallery */}
      <section id="exhibits-section-1" className="page3-section-container">
        {/* Floating Top Navigation Bar - Scoped to Section 1 Only */}
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

      {/* Section 2: Half-Circle Arc Step Showcase */}
      <section id="exhibits-section-2" className="page3-section-container">
        <ArcStepShowcase />
      </section>

      {/* Section 3: 3-Panel Triptych Panoramic Split & 3D Flipping Card Trio */}
      <section id="exhibits-section-3" className="page3-section-container">
        <TriptychCardFlip />
      </section>

      {/* Section 4: Fullscreen Photography Hub */}
      <section id="exhibits-section-4" className="page3-section-container">
        <JamareaHub />
      </section>

      {/* Section 5: Infinite Drag Canvas */}
      <section id="exhibits-section-5" className="page3-section-container">
        <InfiniteDragCanvas />
      </section>

      {/* Section 6: Sticky Pushing Photography Discipline Cards */}
      <section id="exhibits-section-6" className="page3-section-container">
        <StickyDisciplineCards />
      </section>

      {/* Section 7: SVG Path Drawing Hover Cards */}
      <section id="exhibits-section-7" className="page3-section-container">
        <SvgPathHoverCards />
      </section>

      {/* Section 8: Stiff Background Horizontal Parallax Timeline */}
      <section id="exhibits-section-8" className="page3-section-container">
        <HorizontalTimeline />
      </section>

      {/* Section 9: Multi-Tier 3D Cylindrical Gallery */}
      <section id="exhibits-section-9" className="page3-section-container">
        <MultiCylindricalGallery onOpenMenu={onOpenMenu} />
      </section>
    </div>
  );
};

export const Page3 = memo(Page3Component);
export default Page3;
