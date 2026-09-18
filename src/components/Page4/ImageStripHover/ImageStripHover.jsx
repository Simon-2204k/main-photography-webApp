import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageStripHover.css';

// Optimized Section 3 Public Assets
const img1 = '/images/section3/anton-shuvalov-19IgrOxgKas-unsplash.jpg';
const img2 = '/images/section3/emiliano-vittoriosi-COzCGrIaa9w-unsplash.jpg';
const img3 = '/images/section3/hector-o-connor-e0OfutoNyqQ-unsplash.jpg';
const img4 = '/images/section3/mohammad-esmaeili-WlFbY8Ynqco-unsplash.jpg';

gsap.registerPlugin(ScrollTrigger);

const SERIES_ITEMS = [
  { title: 'SILVER HALIDE', tag: 'SERIES 01 // ANALOG EMULSION', img: img1 },
  { title: 'LATENT IMAGE', tag: 'SERIES 02 // EXPOSURE ARCHIVE', img: img2 },
  { title: 'CONTACT SHEET', tag: 'SERIES 03 // 35MM PROOF STUDY', img: img3 },
  { title: 'APERTURE LAB', tag: 'SERIES 04 // OPTICAL GEOMETRY', img: img4 },
];

export default function Section3ImageStripHover() {
  const containerRef = useRef(null);
  const hoverDivRef = useRef(null);
  const imageStripRef = useRef(null);
  const isDarkRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const boxes = container?.querySelectorAll('.box');
    const hoverDiv = hoverDivRef.current;
    const imageStrip = imageStripRef.current;

    if (!container || !boxes || !hoverDiv || !imageStrip) return;

    let isVisible = false;
    gsap.set(hoverDiv, { xPercent: -50, yPercent: -50, scale: 0.8, opacity: 0, force3D: true });

    // ScrollTrigger: Invert background and text when crossing 50% of the screen height
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 50%',
      onEnter: () => {
        isDarkRef.current = true;
        gsap.to(container, {
          backgroundColor: '#000000',
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        boxes.forEach((box) => {
          gsap.to(box, {
            color: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      },
      onLeaveBack: () => {
        isDarkRef.current = false;
        gsap.to(container, {
          backgroundColor: '#ffffff',
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        boxes.forEach((box) => {
          gsap.to(box, {
            color: '#000000',
            borderColor: 'rgba(0, 0, 0, 0.15)',
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      },
    });

    const xQuick = gsap.quickTo(hoverDiv, 'x', { duration: 0.22, ease: 'power2.out' });
    const yQuick = gsap.quickTo(hoverDiv, 'y', { duration: 0.22, ease: 'power2.out' });

    const handleMouseEnter = (box, index, e) => {
      if (!isVisible) return;
      gsap.set(hoverDiv, {
        x: e.clientX,
        y: e.clientY,
      });

      gsap.to(imageStrip, {
        y: -index * 100 + '%',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(hoverDiv, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Adaptive Hover Background & Text Color
      const hoverBg = isDarkRef.current ? '#ffffff' : '#000000';
      const hoverColor = isDarkRef.current ? '#000000' : '#ffffff';

      gsap.to(box, {
        scaleX: 1.03,
        backgroundColor: hoverBg,
        color: hoverColor,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseMove = (e) => {
      if (!isVisible) return;
      xQuick(e.clientX);
      yQuick(e.clientY);
    };

    const handleMouseLeave = (box) => {
      gsap.to(hoverDiv, {
        scale: 0.8,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Adaptive Reversion Color
      const defaultColor = isDarkRef.current ? '#ffffff' : '#000000';

      gsap.to(box, {
        scaleX: 1,
        backgroundColor: 'transparent',
        color: defaultColor,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const cleanups = [];
    boxes.forEach((box, index) => {
      const onEnter = (e) => handleMouseEnter(box, index, e);
      const onMove = (e) => handleMouseMove(e);
      const onLeave = () => handleMouseLeave(box);

      box.addEventListener('mouseenter', onEnter, { passive: true });
      box.addEventListener('mousemove', onMove, { passive: true });
      box.addEventListener('mouseleave', onLeave, { passive: true });

      cleanups.push(() => {
        box.removeEventListener('mouseenter', onEnter);
        box.removeEventListener('mousemove', onMove);
        box.removeEventListener('mouseleave', onLeave);
      });
    });

    // IntersectionObserver to sleep Section 3 when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (!isVisible) {
            gsap.set(hoverDiv, { opacity: 0, scale: 0.8 });
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      st.kill();
      observer.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div ref={containerRef} className="section3-root">
      <div ref={hoverDivRef} className="hoverDiv">
        <div ref={imageStripRef} className="image-strip">
          {SERIES_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="img"
              style={{ backgroundImage: `url(${item.img})` }}
            />
          ))}
        </div>
      </div>

      <div className="parentElem">
        <div className="container">
          {SERIES_ITEMS.map((item, idx) => (
            <div key={idx} className="box">
              <div className="box-text-content">
                <h2 className="box-title">{item.title}</h2>
                <span className="box-tag">{item.tag}</span>
              </div>
              <div 
                className="mobile-thumb" 
                style={{ backgroundImage: `url(${item.img})` }} 
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
