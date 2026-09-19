import React, { useState, useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { InfiniteCanvas } from './InfiniteCanvas';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';
import './InfiniteDragCanvas.css';

gsap.registerPlugin(ScrollTrigger);

export const InfiniteDragCanvas = memo(function InfiniteDragCanvas() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);
  const closeBtnRef = useRef(null);

  useLandoTextReveal(sectionRef, '.stamp-helper-prompt span:last-child', {
    theme: 'dark',
    start: 'top 80%',
  });

  // Pin Section 5 with ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150vh',
        pin: true,
        scrub: 1,
        anticipatePin: 0
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // GSAP animation for top-right X close button
  useEffect(() => {
    if (isExpanded && closeBtnRef.current) {
      gsap.fromTo(
        closeBtnRef.current,
        { scale: 0, rotate: -90, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' }
      );
    }
  }, [isExpanded]);

  const handleClose = (e) => {
    e.stopPropagation();
    if (closeBtnRef.current) {
      gsap.to(closeBtnRef.current, {
        scale: 0,
        rotate: 90,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setIsExpanded(false)
      });
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <section ref={sectionRef} className="infinite-drag-section" id="infinite-drag-section">
      {/* Top-Right Animated X Close Button when Expanded */}
      {isExpanded && (
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="canvas-close-x-btn"
          aria-label="Close Canvas"
        >
          <X size={22} color="#ffffff" />
        </button>
      )}

      {/* Infinite Drag Canvas Viewport */}
      <InfiniteCanvas
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded((prev) => !prev)}
      />

      {/* Helper Text directly below the floating draggable image stack */}
      {!isExpanded && (
        <div className="stamp-helper-prompt">
          <span className="prompt-dot">✦</span>
          <span>PINNED TO CANVAS — CLICK TO EXPAND &amp; DRAG TO EXPLORE (SCROLL TO UNPIN)</span>
        </div>
      )}
    </section>
  );
});

export default InfiniteDragCanvas;
