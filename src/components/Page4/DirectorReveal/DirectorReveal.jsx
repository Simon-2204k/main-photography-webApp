import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './DirectorReveal.css';

const directorsData = [
  {
    name: 'AVEDON',
    img: '/assets/section7/gryffyn-m-0rYi_P711Hk-unsplash.jpg',
  },
  {
    name: 'LEIBOVITZ',
    img: '/assets/section7/matthias-oberholzer-U6cNIAssTks-unsplash.jpg',
  },
  {
    name: 'SALGADO',
    img: '/assets/section7/matthias-oberholzer-tmVb96i5Cdc-unsplash.jpg',
  },
  {
    name: 'CARTIER',
    img: '/assets/section7/pexels-ahmed-akeri-801514718-28162693.jpg',
  },
  {
    name: 'NEWTON',
    img: '/assets/section7/pexels-imvitordiniz-23366497.jpg',
  },
  {
    name: 'ADAMS',
    img: '/assets/section7/pexels-theo-cold-814199886-31294444.jpg',
  },
  {
    name: 'PENN',
    img: '/assets/section7/pexels-thiagomobile-4420440.jpg',
  },
  {
    name: 'MAIER',
    img: '/assets/section7/vicky-hladynets-POWBvXGND0Y-unsplash.jpg',
  },
];

export default function Section7DirectorReveal() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const homeAnchorRef = useRef(null);
  const defaultCharsRef = useRef([]);
  const dynamicCharsRef = useRef([]);
  const boxRefs = useRef([]);
  const [activeMobileIdx, setActiveMobileIdx] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const customCursor = cursorRef.current;
    const homeAnchor = homeAnchorRef.current;
    if (!container || !customCursor) return;

    gsap.set(customCursor, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.8 });

    const handleMouseMove = (e) => {
      gsap.to(customCursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = (e) => {
      gsap.to(customCursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(customCursor, {
        opacity: 0,
        scale: 0.7,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            gsap.set(customCursor, { opacity: 0, scale: 0.8 });
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    dynamicCharsRef.current.forEach((charGroup) => {
      if (charGroup) {
        gsap.set(charGroup, { y: '130%' });
      }
    });

    return () => {
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const currentActiveRef = useRef(null);

  const activateAuthor = (i) => {
    const prevIdx = currentActiveRef.current;
    if (prevIdx === i) return;

    currentActiveRef.current = i;
    setActiveMobileIdx(i);

    const tl = gsap.timeline();

    // If switching from another author, hide previous author without restoring DIRECTORS
    if (prevIdx !== null && prevIdx !== i) {
      const prevBox = boxRefs.current[prevIdx];
      if (prevBox) {
        prevBox.style.filter = 'grayscale(100%)';
        const isMobile = window.innerWidth <= 640;
        tl.to(
          prevBox,
          {
            width: isMobile ? 68 : 100,
            height: isMobile ? 94 : 100,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          },
          0
        );
      }

      const prevGroup = dynamicCharsRef.current[prevIdx];
      if (prevGroup) {
        tl.to(
          prevGroup,
          {
            y: '130%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
            stagger: { from: 'center', amount: 0.12 },
          },
          0
        );
      }
    }

    // Ensure DIRECTORS is completely hidden
    if (defaultCharsRef.current.length) {
      tl.to(
        defaultCharsRef.current,
        {
          y: '-100%',
          opacity: 0,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
          stagger: { from: 'center', amount: 0.15 },
        },
        0
      );
    }

    // Animate target author letters in
    const targetGroup = dynamicCharsRef.current[i];
    if (targetGroup) {
      tl.to(
        targetGroup,
        {
          y: '0%',
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
          stagger: { from: 'center', amount: 0.18 },
        },
        0
      );
    }

    // Expand target box
    const currentBox = boxRefs.current[i];
    if (currentBox) {
      currentBox.style.filter = 'grayscale(0%)';
      const isMobile = window.innerWidth <= 640;
      tl.to(
        currentBox,
        {
          width: isMobile ? 82 : 200,
          height: isMobile ? 112 : 200,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        },
        0
      );
    }
  };

  const deactivateAuthor = (i) => {
    if (currentActiveRef.current !== i) return;
    currentActiveRef.current = null;
    setActiveMobileIdx(null);

    const tl = gsap.timeline();

    const box = boxRefs.current[i];
    if (box) {
      box.style.filter = 'grayscale(100%)';
      const isMobile = window.innerWidth <= 640;
      tl.to(
        box,
        {
          width: isMobile ? 68 : 100,
          height: isMobile ? 94 : 100,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        },
        0
      );
    }

    const targetGroup = dynamicCharsRef.current[i];
    if (targetGroup) {
      tl.to(
        targetGroup,
        {
          y: '130%',
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
          stagger: { from: 'center', amount: 0.15 },
        },
        0
      );
    }

    // Only restore DIRECTORS when all authors are deselected
    if (defaultCharsRef.current.length) {
      tl.to(
        defaultCharsRef.current,
        {
          y: '0%',
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
          stagger: { from: 'center', amount: 0.2 },
        },
        0
      );
    }
  };

  const handleBoxClick = (i) => {
    if (currentActiveRef.current === i) {
      deactivateAuthor(i);
    } else {
      activateAuthor(i);
    }
  };

  const handleContainerClick = () => {
    if (currentActiveRef.current !== null) {
      deactivateAuthor(currentActiveRef.current);
    }
  };

  return (
    <div
      id="specsheet-section-7"
      ref={containerRef}
      className="section7-root grandParent"
      onClick={handleContainerClick}
    >

      <div ref={cursorRef} className="custom-cursor">
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      <div className="parent">
        {directorsData.map((director, i) => (
          <div
            key={director.name}
            ref={(el) => (boxRefs.current[i] = el)}
            className={`box ${activeMobileIdx === i ? 'mobile-active' : ''}`}
            style={{ backgroundImage: `url(${director.img})` }}
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: none)').matches) {
                activateAuthor(i);
              }
            }}
            onMouseLeave={() => {
              if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: none)').matches) {
                deactivateAuthor(i);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleBoxClick(i);
            }}
          />
        ))}
      </div>

      <div className="textArea">
        <div className="maskingWord">
          <h1 className="default-text">
            <span className="word-mask">
              {'DIRECTORS'.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  ref={(el) => (defaultCharsRef.current[cIdx] = el)}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </span>

            <span ref={homeAnchorRef} className="arrow-resting-spot" />
          </h1>

          {directorsData.map((director, dIdx) => {
            if (!dynamicCharsRef.current[dIdx]) dynamicCharsRef.current[dIdx] = [];
            return (
              <h1 key={director.name} className="dynamic-text">
                <span className="word-mask">
                  {director.name.split('').map((char, cIdx) => (
                    <span
                      key={cIdx}
                      ref={(el) => (dynamicCharsRef.current[dIdx][cIdx] = el)}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
}
