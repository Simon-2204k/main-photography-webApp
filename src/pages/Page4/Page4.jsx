import React, { useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { DesktopOnlyNotice } from '../../components/Page1/DesktopOnlyNotice/DesktopOnlyNotice';

// Section 1: Better Off Lookback Drag-Tilt Loop & Jan–Dec Ruler Timeline
import BetterOffLookback from '../../components/Page4/BetterOffLookback/BetterOffLookback';

// Section 2: Z-Axis Rotated Page Scroll
import RotatedPageScroll from '../../components/Page4/RotatedPageScroll/RotatedPageScroll';

// Section 3: Image Strip Hover Cursor
import ImageStripHover from '../../components/Page4/ImageStripHover/ImageStripHover';

// Section 4: Cursor Proximity Magnetic Tilt Cards
import MagneticCards from '../../components/Page4/MagneticCards/MagneticCards';

// Section 5: Desk Scatter Showcase
import DeskScatterShowcase from '../../components/Page4/DeskScatterShowcase/DeskScatterShowcase';

// Section 6: Scroll Mindmap with SVG Wrinkle Path & 10 Nodes
import ScrollMindmap from '../../components/Page4/ScrollMindmap/ScrollMindmap';

// Section 7: GSAP Director Reveal Mask
import DirectorReveal from '../../components/Page4/DirectorReveal/DirectorReveal';

// Section 8: Crafting Vision Pinned Section
import CraftingComedy from '../../components/Page4/CraftingComedy/CraftingComedy';

// Section 9: Fixed Center Card Parallax
import Cr7Parallax from '../../components/Page4/Cr7Parallax/Cr7Parallax';

// Section 10: WebGL Wave Drag Gallery (NaughtyDuck Style 3D Wave Physics)
import WaveDragGallery from '../../components/Page3/WaveDragGallery/WaveDragGallery';

import './Page4.css';

gsap.registerPlugin(ScrollTrigger);

export const Page4Component = ({ onOpenMenu }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      delete window.lenis;
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div className="page4-root-wrapper min-h-screen bg-[#000000] text-[#ffffff] font-sans antialiased overflow-x-hidden selection:bg-[#ff2a4b] selection:text-white">
      {/* Device Restriction Notice (< 1024px) */}
      <DesktopOnlyNotice />

      {/* Section 1: Better Off Lookback Drag-Tilt Gallery */}
      <section id="specsheet-section-1" className="page4-section-container">
        <BetterOffLookback onOpenMenu={onOpenMenu} />
      </section>

      {/* Section 2: Z-Axis Rotated Page Scroll */}
      <section id="specsheet-section-2" className="page4-section-container">
        <RotatedPageScroll />
      </section>

      {/* Section 3: Image Strip Hover Cursor */}
      <section id="specsheet-section-3" className="page4-section-container">
        <ImageStripHover />
      </section>

      {/* Section 4: Studio Namma 3D Showcase */}
      <MagneticCards />

      {/* Section 5: Desk Scatter Showcase */}
      <section id="specsheet-section-5" className="page4-section-container">
        <DeskScatterShowcase />
      </section>

      {/* Section 6: Scroll Mindmap with SVG Wrinkle Path */}
      <section id="specsheet-section-6" className="page4-section-container">
        <ScrollMindmap />
      </section>

      {/* Section 7: GSAP Director Reveal Mask */}
      <section id="specsheet-section-7" className="page4-section-container">
        <DirectorReveal />
      </section>

      {/* Section 8: Crafting Vision Pinned Section */}
      <section id="specsheet-section-8" className="page4-section-container bg-black">
        <CraftingComedy />
      </section>

      {/* Section 9: Fixed Center Card Parallax */}
      <section id="specsheet-section-9" className="page4-section-container">
        <Cr7Parallax />
      </section>

      {/* Section 10: WebGL Wave Drag Gallery */}
      <section id="specsheet-section-10" className="page4-section-container">
        <WaveDragGallery onOpenMenu={onOpenMenu} />
      </section>
    </div>
  );
};

export const Page4 = memo(Page4Component);
export default Page4;
