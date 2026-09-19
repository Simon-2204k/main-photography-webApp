import React, { useEffect, memo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { DarkroomCanvas } from '../../components/Page2/DarkroomCanvas/DarkroomCanvas';
import { DarkroomHeader } from '../../components/Page2/DarkroomHeader/DarkroomHeader';
import { DarkroomGridGrain } from '../../components/Page2/DarkroomGridGrain/DarkroomGridGrain';

import { HeroCanvas } from '../../components/Page2/HeroCanvas/HeroCanvas';

import { ThisIsESE } from '../../components/Page2/ThisIsESE/ThisIsESE';

import ParallaxPages from '../../components/Page2/ParallaxPages/ParallaxPages';

import { DulcedoMenu } from '../../components/Page2/DulcedoMenu/DulcedoMenu';
import { PhysicsDisciplines } from '../../components/Page2/PhysicsDisciplines/PhysicsDisciplines';
import { StackedCardsDeck } from '../../components/Page2/StackedCardsDeck/StackedCardsDeck';
import { FolderArchive } from '../../components/Page2/FolderArchive/FolderArchive';
import { LaptopFoldingDeck } from '../../components/Page2/LaptopFoldingDeck/LaptopFoldingDeck';
import { KeyholeParallaxMask } from '../../components/Page2/KeyholeParallaxMask/KeyholeParallaxMask';

import './PageOneStyles.css';
import './Page2.css';

gsap.registerPlugin(ScrollTrigger);

export const Page2Component = ({ onOpenMenu }) => {
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
    <div className="page2-root-wrapper min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-[#ff2a4b] selection:text-white">

      <section id="darkroom-hero-section" className="darkroom-hero-wrapper">
        <DarkroomHeader onOpenMenu={onOpenMenu} />
        <DarkroomGridGrain />
        <DarkroomCanvas />
      </section>

      <HeroCanvas />

      <ThisIsESE />

      <ParallaxPages />

      <DulcedoMenu />

      <PhysicsDisciplines />

      <StackedCardsDeck />

      <FolderArchive />

      <LaptopFoldingDeck />

      <KeyholeParallaxMask onOpenMenu={onOpenMenu} />
    </div>
  );
};

export const Page2 = memo(Page2Component);
export default Page2;
