import React, { useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BetterOffLookback from '../../components/Page4/BetterOffLookback/BetterOffLookback';

import RotatedPageScroll from '../../components/Page4/RotatedPageScroll/RotatedPageScroll';

import ImageStripHover from '../../components/Page4/ImageStripHover/ImageStripHover';

import MagneticCards from '../../components/Page4/MagneticCards/MagneticCards';

import DeskScatterShowcase from '../../components/Page4/DeskScatterShowcase/DeskScatterShowcase';

import ScrollMindmap from '../../components/Page4/ScrollMindmap/ScrollMindmap';

import DirectorReveal from '../../components/Page4/DirectorReveal/DirectorReveal';

import CraftingComedy from '../../components/Page4/CraftingComedy/CraftingComedy';

import Cr7Parallax from '../../components/Page4/Cr7Parallax/Cr7Parallax';

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
    <div className="page4-root-wrapper min-h-screen bg-[#000000] text-[#ffffff] font-sans antialiased overflow-x-hidden selection:bg-[#ff2a4b] selection:text-white">

      <section id="specsheet-section-1" className="page4-section-container">
        <BetterOffLookback onOpenMenu={onOpenMenu} />
      </section>

      <section id="specsheet-section-2" className="page4-section-container">
        <RotatedPageScroll />
      </section>

      <section id="specsheet-section-3" className="page4-section-container">
        <ImageStripHover />
      </section>

      <MagneticCards />

      <section id="specsheet-section-5" className="page4-section-container">
        <DeskScatterShowcase />
      </section>

      <section id="specsheet-section-6" className="page4-section-container">
        <ScrollMindmap />
      </section>

      <section id="specsheet-section-7" className="page4-section-container">
        <DirectorReveal />
      </section>

      <section id="specsheet-section-8" className="page4-section-container bg-black">
        <CraftingComedy />
      </section>

      <section id="specsheet-section-9" className="page4-section-container">
        <Cr7Parallax />
      </section>

      <section id="specsheet-section-10" className="page4-section-container">
        <WaveDragGallery onOpenMenu={onOpenMenu} />
      </section>
    </div>
  );
};

export const Page4 = memo(Page4Component);
export default Page4;
