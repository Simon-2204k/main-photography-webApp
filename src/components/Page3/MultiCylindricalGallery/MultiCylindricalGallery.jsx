import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CylindricalGalleryCanvas } from './components/3d/CylindricalGalleryCanvas';
import { ProjectModal } from './components/ui/ProjectModal';
import { LAYERS_DATA } from './data/galleryData';
import './MultiCylindricalGallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function MultiCylindricalGallery() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  // High-performance direct mutable physics ref read by R3F useFrame (0 React re-renders)
  const physicsRef = useRef({
    scrollY: 0,
    scrollYTarget: 0,
    scrollVelocity: 0,
    rotationY: 0,
    rotationYTarget: 0,
    rotationVelocity: 0,
    autoRotate: true,
    isDragging: false,
  });

  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const manuallyUnlockedRef = useRef(false);

  // IntersectionObserver to pause physics and rendering when section is offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keep autoRotate synced in physics ref
  useEffect(() => {
    physicsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  // High-performance lerp loop: runs only when section is visible
  useEffect(() => {
    if (!isVisible) return;
    let animId;

    const updatePhysics = () => {
      const p = physicsRef.current;

      // Auto rotation increment when not dragging
      if (p.autoRotate && !p.isDragging) {
        p.rotationYTarget += 0.003 + p.rotationVelocity;
        p.rotationVelocity *= 0.92;
      }

      // Scroll Y Lerp
      const prevScrollY = p.scrollY;
      p.scrollY += (p.scrollYTarget - p.scrollY) * 0.08;
      p.scrollVelocity = p.scrollY - prevScrollY;

      // Rotation Y Lerp
      p.rotationY += (p.rotationYTarget - p.rotationY) * 0.08;

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

  // Scroll-lock on section entry via GSAP ScrollTrigger across all devices (Desktop, Tablets & Mobile)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => {
        if (!manuallyUnlockedRef.current) {
          setIsLocked(true);
          window.lenis?.stop();
        }
      },
      onEnterBack: () => {
        if (!manuallyUnlockedRef.current) {
          setIsLocked(true);
          window.lenis?.stop();
        }
      }
    });

    return () => {
      trigger.kill();
      window.lenis?.start();
    };
  }, []);

  // When locked on mobile & tablet, prevent touch gestures from scrolling the underlying page
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const preventTouchScrollWhenLocked = (e) => {
      if (isLocked) {
        // Never prevent clicks or touches on the unlock toggle button
        if (e.target && e.target.closest('.multi-cyc-bw-lock-btn')) return;
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    el.addEventListener('touchmove', preventTouchScrollWhenLocked, { passive: false });
    return () => {
      el.removeEventListener('touchmove', preventTouchScrollWhenLocked);
    };
  }, [isLocked]);

  // Toggle Scroll Lock handler: User can unlock freely (no auto-scroll to top)
  const handleToggleLock = useCallback(() => {
    if (isLocked) {
      // User explicitly unlocked: resume Lenis scrolling
      manuallyUnlockedRef.current = true;
      setIsLocked(false);
      window.lenis?.start();
    } else {
      // User re-locks
      manuallyUnlockedRef.current = false;
      setIsLocked(true);
      window.lenis?.stop();
    }
  }, [isLocked]);

  // Handle Wheel Scroll inside the section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (selectedCard) return;

      if (isLocked) {
        // Prevent default native page scrolling while locked
        e.preventDefault();
      }

      const delta = e.deltaY * 0.006;
      const p = physicsRef.current;
      p.scrollYTarget += delta;

      // Scroll Down (delta > 0) spins whole cylinder Left-to-Right (+Y)
      // Scroll Up (delta < 0) spins whole cylinder Right-to-Left (-Y)
      p.rotationYTarget += delta * 0.45;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [selectedCard, isLocked]);

  // Handle Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCard) return;
      const p = physicsRef.current;
      if (e.key === 'ArrowDown') {
        p.scrollYTarget += 1.8;
        p.rotationYTarget += 0.45;
      } else if (e.key === 'ArrowUp') {
        p.scrollYTarget -= 1.8;
        p.rotationYTarget -= 0.45;
      } else if (e.key === 'ArrowRight') {
        p.rotationYTarget += 0.35;
      } else if (e.key === 'ArrowLeft') {
        p.rotationYTarget -= 0.35;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCard]);

  // Handle Drag Pointer Events with Momentum Throw
  const handlePointerDown = (e) => {
    if (selectedCard) return;
    isDraggingRef.current = true;
    physicsRef.current.isDragging = true;
    physicsRef.current.rotationVelocity = 0;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || selectedCard) return;

    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    const rotDelta = dx * 0.004;
    const p = physicsRef.current;
    p.rotationYTarget += rotDelta;
    p.rotationVelocity = rotDelta * 0.5;

    // Dragging down -> scroll down -> spin left to right
    p.scrollYTarget -= dy * 0.006;
    p.rotationYTarget -= dy * 0.003;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    physicsRef.current.isDragging = false;
  };

  return (
    <section
      ref={containerRef}
      className="multi-cyc-section"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Background Subtle Scanning Lines */}
      <div className="scanline" />

      {/* Minimal Black & White Scroll-Lock Toggle Button */}
      <button
        type="button"
        onClick={handleToggleLock}
        className={`multi-cyc-bw-lock-btn ${isLocked ? 'is-locked' : 'is-unlocked'}`}
        aria-label={isLocked ? 'Scroll locked. Click to unlock.' : 'Scroll unlocked. Click to lock.'}
        title={isLocked ? 'Scroll Locked • Click to Unlock' : 'Scroll Unlocked • Click to Lock'}
      >
        <svg
          className="bw-lock-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="bw-shackle"
            d={isLocked ? "M7 11V7a5 5 0 0 1 10 0v4" : "M7 11V7a5 5 0 0 1 9.9-1.2"}
          />
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
        <span className="bw-lock-text">
          {isLocked ? 'LOCKED' : 'UNLOCKED'}
        </span>
      </button>

      {/* 3D Multi-Cylindrical Gallery Canvas (Reads physicsRef inside useFrame, 0 re-renders) */}
      <CylindricalGalleryCanvas
        physicsRef={physicsRef}
        isVisible={isVisible}
        onSelectCard={setSelectedCard}
      />

      {/* Detail Modal Overlay when Card Clicked */}
      {selectedCard && (
        <ProjectModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </section>
  );
}
