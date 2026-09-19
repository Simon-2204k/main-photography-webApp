import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CylindricalGalleryCanvas } from './components/3d/CylindricalGalleryCanvas';
import { LAYERS_DATA } from './data/galleryData';
import './MultiCylindricalGallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function MultiCylindricalGallery({ onOpenMenu }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

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

  useEffect(() => {
    physicsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (!isVisible) return;
    let animId;

    const updatePhysics = () => {
      const p = physicsRef.current;

      if (p.autoRotate && !p.isDragging) {
        p.rotationYTarget += 0.003 + p.rotationVelocity;
        p.rotationVelocity *= 0.92;
      }

      const prevScrollY = p.scrollY;
      p.scrollY += (p.scrollYTarget - p.scrollY) * 0.08;
      p.scrollVelocity = p.scrollY - prevScrollY;

      p.rotationY += (p.rotationYTarget - p.rotationY) * 0.08;

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const preventTouchScrollWhenLocked = (e) => {
      if (isLocked) {

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

  const handleToggleLock = useCallback(() => {
    if (isLocked) {

      manuallyUnlockedRef.current = true;
      setIsLocked(false);
      window.lenis?.start();
    } else {

      manuallyUnlockedRef.current = false;
      setIsLocked(true);
      window.lenis?.stop();
    }
  }, [isLocked]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (isLocked) {

        e.preventDefault();
      }

      const delta = e.deltaY * 0.006;
      const p = physicsRef.current;
      p.scrollYTarget += delta;

      p.rotationYTarget += delta * 0.45;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isLocked]);

  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, []);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    physicsRef.current.isDragging = true;
    physicsRef.current.rotationVelocity = 0;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    const isTouch = e.pointerType === 'touch' || (typeof window !== 'undefined' && window.innerWidth <= 1024);
    const rotSens = isTouch ? 0.012 : 0.004;
    const scrollSens = isTouch ? 0.015 : 0.006;
    const rotFromScrollSens = isTouch ? 0.008 : 0.003;

    const rotDelta = dx * rotSens;
    const p = physicsRef.current;
    p.rotationYTarget += rotDelta;
    p.rotationVelocity = rotDelta * 0.5;

    p.scrollYTarget -= dy * scrollSens;
    p.rotationYTarget -= dy * rotFromScrollSens;

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

      <div className="scanline" />

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

      <CylindricalGalleryCanvas
        physicsRef={physicsRef}
        isVisible={isVisible}
      />

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
        aria-label="Open Navigation Menu"
        style={{
          position: 'absolute',
          bottom: 'clamp(16px, 2.8vh, 28px)',
          right: 'clamp(16px, 2.8vw, 36px)',
          zIndex: 35,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          color: '#ffffff',
          fontFamily: "'Anton', 'Oswald', sans-serif",
          fontSize: 'clamp(22px, 2.8vw, 32px)',
          fontWeight: 900,
          letterSpacing: '0.06em',
          lineHeight: 1,
          padding: '4px',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.opacity = '0.85';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '1';
        }}
      >
        MENU
      </button>
    </section>
  );
}
