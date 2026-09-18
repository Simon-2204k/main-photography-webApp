import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cr7Projects } from './data/cr7Projects';
import Navbar from './Navbar';
import FixedCenterCard from './FixedCenterCard';
import ParallaxSection from './ParallaxSection';
import './Cr7Parallax.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section9Cr7Suite() {
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);
  const hudRef = useRef(null);
  const pinTriggerRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const hud = hudRef.current;
    if (!root || !hud) return;

    // Pin HUD (Navbar + FixedCenterCard) throughout the entire Section 9 works scroll
    pinTriggerRef.current = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      pin: hud,
      pinSpacing: false,
    });

    return () => {
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
      }
    };
  }, []);

  return (
    <div ref={rootRef} id="cr7-parallax-root" className="relative w-full bg-[#0a0a0a] text-white">
      {/* Pinned HUD Layer: GSAP pin: hudRef ensures it stays 100% fixed in center during Section 9 */}
      <div 
        ref={hudRef}
        className="w-full h-screen pointer-events-none z-30 overflow-hidden relative"
      >
        <Navbar
          activeIndex={activeIndex}
          totalProjects={cr7Projects.length}
          currentNumber={cr7Projects[activeIndex]?.number}
          totalNumber={cr7Projects[activeIndex]?.total}
        />
        <FixedCenterCard projects={cr7Projects} activeIndex={activeIndex} />
      </div>

      {/* Vertical Parallax Background Sections (500vh total, scrolls underneath pinned HUD) */}
      <main id="works" className="relative w-full -mt-[100vh]">
        {cr7Projects.map((project, index) => (
          <ParallaxSection
            key={project.id}
            project={project}
            index={index}
            onActive={(idx) => setActiveIndex(idx)}
          />
        ))}
      </main>
    </div>
  );
}
