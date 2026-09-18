import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const barRef = useRef(null);
  const letterSRef = useRef(null);
  const letterMRef = useRef(null);
  const subLabelsRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current || !barRef.current) {
      if (onComplete) onComplete();
      return;
    }

    const spans = subLabelsRef.current ? Array.from(subLabelsRef.current.querySelectorAll('span')) : [];

    const ctx = gsap.context(() => {
      try {
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });

        // 1. Initial State: Single White Bar Element
        gsap.set(barRef.current, {
          width: '10px',
          height: '50px',
          x: -170,
          opacity: 1,
        });

        if (letterSRef.current && letterMRef.current) {
          gsap.set([letterSRef.current, letterMRef.current], { y: 35, opacity: 0 });
        }
        if (subLabelsRef.current) {
          gsap.set(subLabelsRef.current, { opacity: 1 });
        }
        if (spans.length) {
          gsap.set(spans, { opacity: 0, y: 15 });
        }

        // 2. Cursor blinks twice
        tl.to(barRef.current, { opacity: 0, duration: 0.22, repeat: 1, yoyo: true })
          // 3. Expands horizontally over 0.7s strictly from LEFT origin
          .to(barRef.current, {
            width: '350px',
            x: 0,
            duration: 0.7,
            ease: 'power4.out',
          });

        // 4. STAGED ENTRANCE: S reveals first -> M reveals second -> Sub-labels reveal third
        if (letterSRef.current) {
          tl.to(letterSRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.in' });
        }
        if (letterMRef.current) {
          tl.to(letterMRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.in' });
        }
        if (spans.length) {
          tl.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.12,
            ease: 'power2.out',
          });
        }

        tl.to({}, { duration: 0.6 });

        // 5. STAGED REVERSE EXIT: Sub-labels exit first -> M exits second -> S exits third
        if (spans.length) {
          tl.to(spans, {
            opacity: 0,
            y: -15,
            duration: 0.25,
            stagger: 0.08,
            ease: 'power2.in',
          });
        }
        if (letterMRef.current) {
          tl.to(letterMRef.current, { y: 35, opacity: 0, duration: 0.3, ease: 'power2.in' });
        }
        if (letterSRef.current) {
          tl.to(letterSRef.current, { y: 35, opacity: 0, duration: 0.3, ease: 'power2.in' });
        }

        // 6. DIRECT BAR-TO-CARD MORPHING OUTRO (Expands into FixedCenterCard 780px x 220px)
        tl.to(barRef.current, {
          width: '780px',
          height: '220px',
          duration: 0.75,
          ease: 'power3.inOut',
        });

        // 7. Fade out preloader curtain overlay
        if (overlayRef.current) {
          tl.to(overlayRef.current, {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out',
          });
        }
      } catch (err) {
        console.warn('Preloader animation error, bypassing gracefully:', err);
        if (onComplete) onComplete();
      }
    }, overlayRef.current);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
    >
      {/* Central Morphing Container */}
      <div className="relative flex items-center justify-center ">
        {/* Single White Expanding Bar (Starts as 6px x 18px cursor, expands horizontally, morphs into card) */}
        <div
          ref={barRef}
          style={{ width: '10px', height: '50px', transform: 'translateX(-140px)', marginRight: "25px", opacity: 1 }}
          className="bg-white relative flex items-center justify-center"
        />

        {/* Sub-Labels around Central Bar */}
        <div
          ref={subLabelsRef}
          className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-1 w-[220px] sm:w-[260px] h-[18px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Top Sub-Labels: BRAND (left) & DESIGNER (right) */}
          <div className="absolute -top-10 left-0 right-0 flex items-center justify-between font-syne text-[10px] font-extrabold tracking-widest text-white uppercase px-1">
            <span style={{ opacity: 0, transform: 'translateY(15px)' }}>BRAND</span>
            <span style={{ opacity: 0, transform: 'translateY(15px)' }}>DESIGNER</span>
          </div>

          {/* Bottom Sub-Label: ART DIRECTOR (center) */}
          <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center font-syne text-[10px] font-extrabold tracking-widest text-white uppercase">
            <span style={{ opacity: 0, transform: 'translateY(15px)' }}>ART DIRECTOR</span>
          </div>
        </div>

        {/* Masked Container for Left Letter: S */}
        <div className="absolute -left-14 sm:-left-20 top-1/2 -translate-y-1/2 z-20 pointer-events-none h-[40px] overflow-hidden flex items-center">
          <span
            ref={letterSRef}
            style={{ opacity: 0, transform: 'translateY(35px)' }}
            className="block font-syne font-black text-4xl sm:text-5xl tracking-tight text-white uppercase"
          >
            S
          </span>
        </div>

        {/* Masked Container for Right Letter: M */}
        <div className="absolute -right-14 sm:-right-20 top-1/2 -translate-y-1/2 z-20 pointer-events-none h-[40px] overflow-hidden flex items-center">
          <span
            ref={letterMRef}
            style={{ opacity: 0, transform: 'translateY(35px)' }}
            className="block font-syne font-black text-4xl sm:text-5xl tracking-tight text-white uppercase"
          >
            M
          </span>
        </div>
      </div>
    </div>
  );
}
