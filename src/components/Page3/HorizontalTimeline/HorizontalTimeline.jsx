import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalTimeline.css';

gsap.registerPlugin(ScrollTrigger);

// 10 Main Chronology Cards (5 B&W, 5 Color)
const TIMELINE_DATA = [
  {
    id: '01',
    type: 'B&W',
    date: 'OCTOBER 2021',
    title: 'THE FOUNDATIONAL EXPOSURE',
    desc: 'Early explorations in 35mm silver halide emulsion capturing raw architectural geometry.',
    specs: '35MM • F/2.8 • TRI-X 400',
    image: '/assets/page3/section8/main/main_01.webp'
  },
  {
    id: '02',
    type: 'B&W',
    date: 'MAY 2022',
    title: 'DARKROOM DEVELOPMENTS',
    desc: 'Hand-developing 120mm medium format negatives in red-light chemical stop baths.',
    specs: '120MM • F/3.5 • HP5 PLUS',
    image: '/assets/page3/section8/main/main_02.webp'
  },
  {
    id: '03',
    type: 'B&W',
    date: 'NOVEMBER 2022',
    title: 'CHIAROSCURO PORTRAITURE',
    desc: 'Deep shadow sculpture sculpting human silhouette forms with harsh tungsten spotlights.',
    specs: '85MM • F/1.4 • T-MAX 100',
    image: '/assets/page3/section8/main/main_03.webp'
  },
  {
    id: '04',
    type: 'B&W',
    date: 'APRIL 2023',
    title: 'BRUTALIST PERSPECTIVES',
    desc: 'Tilt-shift perspective studies documenting monolithic concrete structures across Europe.',
    specs: '24MM • F/8.0 • ORTHO PLUS',
    image: '/assets/page3/section8/main/main_04.webp'
  },
  {
    id: '05',
    type: 'B&W',
    date: 'SEPTEMBER 2023',
    title: 'THE BERLIN MONOGRAPH',
    desc: 'Archival hardcover photobook printed on heavyweight German cotton rag paper.',
    specs: '50MM • F/2.0 • ACROS II',
    image: '/assets/page3/section8/main/main_05.webp'
  },
  {
    id: '06',
    type: 'COLOR',
    date: 'FEBRUARY 2024',
    title: 'PRISM & DISPERSION',
    desc: 'Exploring optical refractions, flare artifacts, and spectral aberrations through manual glass.',
    specs: '50MM • F/1.2 • CINESTILL 800T',
    image: '/assets/page3/section8/main/main_06.webp'
  },
  {
    id: '07',
    type: 'COLOR',
    date: 'JULY 2024',
    title: 'HAUTE COUTURE CAMPAIGN',
    desc: 'High-saturation editorial lookbook commissioned by Parisian fashion ateliers.',
    specs: '90MM • F/2.8 • PORTRA 400',
    image: '/assets/page3/section8/main/main_07.webp'
  },
  {
    id: '08',
    type: 'COLOR',
    date: 'DECEMBER 2024',
    title: 'NOCTURNE TOKYO',
    desc: 'Atmospheric neon luminescence and rain-slicked asphalt captured on high-ISO color film.',
    specs: '35MM • F/1.4 • EKTACHROME E100',
    image: '/assets/page3/section8/main/main_08.webp'
  },
  {
    id: '09',
    type: 'COLOR',
    date: 'JUNE 2025',
    title: 'CHROMATIC EXPEDITION',
    desc: 'Vibrant landscape documentation across harsh volcanic mineral formations and horizons.',
    specs: '28MM • F/4.0 • FUJI VELVIA 50',
    image: '/assets/page3/section8/main/main_09.webp'
  },
  {
    id: '10',
    type: 'COLOR',
    date: 'SPRING 2026',
    title: 'GLOBAL RETROSPECTIVE',
    desc: 'Comprehensive retrospective exhibition co-created by Simon Studio worldwide.',
    specs: '105MM • F/1.8 • MASTER ARCHIVE',
    image: '/assets/page3/section8/main/main_10.webp'
  }
];

// Distributed vertical positions spanning upper band (7-26%), lower band (68-90%), and mid-flanks (34-58%)
// Intentionally alternating to ensure completely scattered organic placement with ZERO curved trajectory
const VERTICAL_SCATTER = [
  12, 78, 22, 85, 16, 74, 42, 88, 9, 81,
  24, 70, 15, 86, 38, 77, 18, 83, 10, 72,
  26, 89, 14, 75, 45, 80, 8, 84, 20, 69,
  17, 87, 36, 73, 11, 82, 23, 76, 13, 90,
  25, 71, 19, 85, 40, 79, 7, 88, 21, 68
];

// 50 Ambient Popping Micro-Thumbnails Scattered Across Track
const AMBIENT_THUMBS = Array.from({ length: 50 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  // Dispersed horizontal positions covering the entire track length with pseudo-random jitter
  const baseLeft = (i / 50) * 95 + 1.5;
  const jitterX = (((i * 37 + 11) % 23) - 11) * 0.14;
  const leftPercent = Math.max(1, Math.min(98.5, Number((baseLeft + jitterX).toFixed(2))));
  const topPercent = VERTICAL_SCATTER[i % VERTICAL_SCATTER.length];
  const rotation = (((i * 13 + 7) % 27) - 13); // -13deg to +13deg
  const size = 68 + ((i * 19 + 5) % 28); // 68px to 96px

  return {
    id: i + 1,
    image: `/assets/page3/section8/ambient/ambient_${num}.webp`,
    leftPercent,
    topPercent,
    rotation,
    size,
    frameCode: `EXP-${(100 + i * 17) % 900}`
  };
});

export const HorizontalTimeline = memo(function HorizontalTimeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const bgLayerRef = useRef(null);
  const beadRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1
        }
      });

      // 1. Foreground track travels horizontally
      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 160),
        ease: 'none'
      }, 0);

      // 2. Background subtle parallax shift
      if (bgLayerRef.current) {
        tl.to(bgLayerRef.current, {
          xPercent: -15,
          ease: 'none'
        }, 0);
      }

      // 3. Central waypoint bead glides along axis
      if (beadRef.current) {
        tl.to(beadRef.current, {
          left: '92%',
          ease: 'none'
        }, 0);
      }

      // 4. Continuous organic popping lifecycle for all ambient micro-thumbnails
      const ambientThumbs = gsap.utils.toArray('.timeline-ambient-thumb', track);
      ambientThumbs.forEach((thumb, idx) => {
        // Individualized deterministic phase & durations
        const initialDelay = ((idx * 0.19 + (idx % 7) * 0.4) % 4.2);
        const stayDuration = 1.8 + ((idx * 11) % 15) * 0.1; // 1.8s to 3.2s
        const popInDuration = 0.45 + ((idx % 3) * 0.08); // 0.45s to 0.61s
        const restDuration = 1.2 + ((idx * 7) % 20) * 0.1; // 1.2s to 3.1s

        gsap.set(thumb, { scale: 0, opacity: 0 });

        const popTl = gsap.timeline({
          repeat: -1,
          repeatDelay: restDuration,
          delay: initialDelay
        });

        popTl
          // 1. Pop in energetically with elastic/back bounce
          .to(thumb, {
            scale: 1,
            opacity: 0.95,
            duration: popInDuration,
            ease: 'back.out(2.2)'
          })
          // 2. Subtle micro-float while alive
          .to(thumb, {
            y: (idx % 2 === 0 ? -6 : 6),
            duration: stayDuration,
            ease: 'sine.inOut'
          }, '<+0.1')
          // 3. Crisp pop out / retract
          .to(thumb, {
            scale: 0,
            opacity: 0,
            duration: 0.35,
            ease: 'back.in(1.6)'
          });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="timeline-horizontal-section" id="timeline-horizontal-section">
      {/* Stiff Ambient Background Layer */}
      <div ref={bgLayerRef} className="timeline-stiff-bg">
        <div className="bg-monogram-pattern" />
        <div className="bg-vignette-overlay" />
      </div>

      {/* Central Axis Guide Line with Floating Progress Bead */}
      <div className="timeline-axis-line">
        <div ref={beadRef} className="timeline-axis-bead">
          <span className="bead-center-dot" />
        </div>
      </div>

      {/* Horizontal Parallax Foreground Track */}
      <div ref={trackRef} className="timeline-horizontal-track">
        {/* 10 Main Timeline Event Cards */}
        {TIMELINE_DATA.map((item) => (
          <div key={item.id} className={`timeline-card-item card-type-${item.type.toLowerCase()}`}>
            <div className="timeline-photo-box">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="timeline-photo"
              />
              <div className="timeline-photo-border" />
              <span className="timeline-photo-type-badge">{item.type}</span>
            </div>

            <div className="timeline-info-box">
              <div className="item-meta-row">
                <span className="item-num">#{item.id}</span>
                <span className="item-date">{item.date}</span>
              </div>
              <h4 className="item-title">{item.title}</h4>
              <p className="item-desc">{item.desc}</p>
              <span className="item-specs">{item.specs}</span>
            </div>
          </div>
        ))}

        {/* 50 Ambient Popping Contact-Sheet Proofs */}
        <div className="timeline-ambient-layer">
          {AMBIENT_THUMBS.map((thumb) => (
            <div
              key={thumb.id}
              className="timeline-ambient-thumb"
              style={{
                left: `${thumb.leftPercent}%`,
                top: `${thumb.topPercent}%`,
                width: `${thumb.size}px`,
                height: `${thumb.size}px`,
                transform: `rotate(${thumb.rotation}deg)`
              }}
            >
              <img
                src={thumb.image}
                alt={`Proof ${thumb.id}`}
                loading="lazy"
                decoding="async"
                className="ambient-img"
              />
              <span className="ambient-code">{thumb.frameCode}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HorizontalTimeline;
