import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ArcStepShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const STEP_DATA = [
  {
    step: '01',
    title: 'APERTURE & LIGHT',
    desc: 'Calibrating optical diaphragm for depth of field and ambient luminance.',
    image: '/assets/page3/section2/step_01.webp'
  },
  {
    step: '02',
    title: 'SHUTTER EXPOSURE',
    desc: 'Synchronizing focal-plane curtain to freeze micro-motion in high precision.',
    image: '/assets/page3/section2/step_02.webp'
  },
  {
    step: '03',
    title: 'FOCAL PLANE FOCUS',
    desc: 'Aligning manual glass elements to render critical razor-sharp subject detail.',
    image: '/assets/page3/section2/step_03.webp'
  },
  {
    step: '04',
    title: 'SILVER HALIDE GRAIN',
    desc: 'Exposing 120mm emulsion crystals to capture authentic analog texture.',
    image: '/assets/page3/section2/step_04.webp'
  },
  {
    step: '05',
    title: 'CHROMATIC BALANCE',
    desc: 'Balancing color temperature and spectrum fidelity under studio lighting.',
    image: '/assets/page3/section2/step_05.webp'
  },
  {
    step: '06',
    title: 'DYNAMIC RANGE',
    desc: 'Preserving deep shadow nuances and retaining highlight clipping boundaries.',
    image: '/assets/page3/section2/step_06.webp'
  },
  {
    step: '07',
    title: 'OPTICAL DISTORTION',
    desc: 'Correcting spherical aberration through multi-coated prime glass elements.',
    image: '/assets/page3/section2/step_07.webp'
  },
  {
    step: '08',
    title: 'FRAME COMPOSITION',
    desc: 'Structuring golden ratio perspective, negative space, and visual tension.',
    image: '/assets/page3/section2/step_08.webp'
  },
  {
    step: '09',
    title: 'CHEMICAL LATENT BATH',
    desc: 'Developing latent image in controlled darkroom chemical developer solution.',
    image: '/assets/page3/section2/step_09.webp'
  },
  {
    step: '10',
    title: 'ACID STOP & FIXER',
    desc: 'Arresting photochemical reaction and stabilizing silver particles permanently.',
    image: '/assets/page3/section2/step_10.webp'
  },
  {
    step: '11',
    title: 'ARCHIVAL CONTACT PRINT',
    desc: 'Transferring negative onto fiber-base photographic paper for enduring display.',
    image: '/assets/page3/section2/step_11.webp'
  }
];

export const ArcStepShowcase = memo(function ArcStepShowcase() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const numberRollRef = useRef(null);
  const stepLabelRef = useRef(null);
  const outroRef = useRef(null);
  const outroEyebrowRef = useRef(null);
  const outroLinesRef = useRef([]);
  const outroMetaRef = useRef(null);

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalSteps = STEP_DATA.length;
    // Smooth scroll runway
    const scrollRunway = totalSteps * 850;
    
    // Timeline segmentation:
    // 0.00 to 0.80: 11 cards sequential progression
    // 0.80 to 0.87: Step 11 and Card 10 completely exit offscreen
    // 0.88 to 1.00: Outro Manifesto sequentially rolls up in series (clean, no overlap)
    const phase1Duration = 0.80;
    const initialHold = 0.05;
    const transitionDuration = (phase1Duration - initialHold) / (totalSteps - 1);

    const ctx = gsap.context(() => {
      // 1. Initial positions: Card 0 is centered at (0, 0, 0); all others far offscreen right (400%)
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        card.style.zIndex = 10 + index;
        if (index === 0) {
          gsap.set(card, {
            xPercent: 0,
            x: 0,
            yPercent: 0,
            y: 0,
            rotation: 0
          });
        } else {
          gsap.set(card, {
            xPercent: 400,
            x: 0,
            yPercent: 35,
            y: 0,
            rotation: 12
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollRunway}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < phase1Duration) {
              const stepP = Math.max(0, p - initialHold) / (phase1Duration - initialHold);
              const idx = Math.min(
                Math.floor(stepP * (totalSteps - 1)),
                totalSteps - 1
              );
              setActiveStepIndex(p < initialHold ? 0 : idx);
            }
          }
        }
      });

      // 2. Sequential Right-to-Left Convex Trajectories (Steps 1 through 11)
      for (let k = 0; k < totalSteps - 1; k++) {
        const transitionStart = initialHold + k * transitionDuration;
        const outgoingCard = cardRefs.current[k];
        const incomingCard = cardRefs.current[k + 1];

        // Outgoing card glides down-left far offscreen past left edge (-400%)
        if (outgoingCard) {
          tl.to(
            outgoingCard,
            {
              xPercent: -400,
              x: 0,
              yPercent: 35,
              y: 0,
              rotation: -14,
              ease: 'none',
              duration: transitionDuration
            },
            transitionStart
          );
        }

        // Incoming card glides in from offscreen right (400%) to center (0%)
        if (incomingCard) {
          tl.fromTo(
            incomingCard,
            {
              xPercent: 400,
              x: 0,
              yPercent: 35,
              y: 0,
              rotation: 12
            },
            {
              xPercent: 0,
              x: 0,
              yPercent: 0,
              y: 0,
              rotation: 0,
              ease: 'none',
              duration: transitionDuration
            },
            transitionStart
          );
        }
      }

      // 3. Number roll animation (bottom-to-top masked transition under STEP)
      if (numberRollRef.current) {
        tl.to(
          numberRollRef.current,
          {
            yPercent: -((totalSteps - 1) / totalSteps) * 100,
            ease: 'none',
            duration: phase1Duration - initialHold
          },
          initialHold
        );
      }

      // =========================================================================
      // 4. STEP 11 COMPLETE EXIT (Phase 2: 0.80 to 0.87)
      // Step 11 card and STEP 11 text completely exit before Outro starts
      // =========================================================================
      const lastCard = cardRefs.current[totalSteps - 1];
      if (lastCard) {
        tl.to(
          lastCard,
          {
            xPercent: -400,
            x: 0,
            yPercent: 35,
            y: 0,
            rotation: -14,
            ease: 'power2.in',
            duration: 0.07
          },
          phase1Duration
        );
      }

      tl.to(
        '.step-label-char',
        {
          yPercent: -130,
          stagger: 0.015,
          duration: 0.06,
          ease: 'power3.in'
        },
        phase1Duration
      );

      if (numberRollRef.current) {
        tl.to(
          numberRollRef.current,
          {
            yPercent: -130,
            duration: 0.06,
            ease: 'power3.in'
          },
          phase1Duration
        );
      }

      // =========================================================================
      // 5. SEQUENTIAL OUTRO MANIFESTO REVEAL (Phase 3: 0.88 to 1.00)
      // Only starts AFTER Step 11 is completely offscreen! Continuous sequence.
      // =========================================================================
      if (outroRef.current) {
        tl.set(
          outroRef.current,
          {
            autoAlpha: 1,
            pointerEvents: 'auto'
          },
          0.88
        );
      }

      // Eyebrow roll-up
      if (outroEyebrowRef.current) {
        tl.fromTo(
          outroEyebrowRef.current,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 0.02,
            ease: 'power3.out'
          },
          0.89
        );
      }

      // Headline Line (accent cyan)
      if (outroLinesRef.current[0]) {
        tl.fromTo(
          outroLinesRef.current[0],
          { yPercent: 130 },
          {
            yPercent: 0,
            duration: 0.035,
            ease: 'power3.out'
          },
          0.92
        );
      }

      // Meta Tag
      if (outroMetaRef.current) {
        tl.fromTo(
          outroMetaRef.current,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 0.02,
            ease: 'power3.out'
          },
          0.985
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="arc-step-section" id="arc-step-section">
      {/* Background Soft Lighting & Analogue Vignette */}
      <div className="arc-vignette-layer" />
      <div className="arc-radial-spotlight" />

      {/* Giant Kinetic Step Background Typography - Stacked on Left */}
      <div className="arc-huge-typography">
        <div className="step-label-row" ref={stepLabelRef}>
          {'STEP'.split('').map((char, i) => (
            <span key={i} className="step-label-char-wrapper">
              <span className="step-label-char">{char}</span>
            </span>
          ))}
        </div>

        {/* Masked Vertical Odometer for Number Roll */}
        <div className="step-number-mask-box">
          <div className="step-number-roll" ref={numberRollRef}>
            {STEP_DATA.map((item) => (
              <div key={item.step} className="step-number-row">
                {item.step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semicircle Arc Curved Cards Track */}
      <div className="arc-track-viewport">
        {STEP_DATA.map((item, idx) => (
          <div
            key={item.step}
            ref={(el) => (cardRefs.current[idx] = el)}
            className={`arc-square-card ${idx === activeStepIndex ? 'is-active' : ''}`}
          >
            <div className="card-image-box">
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                decoding="async"
                className="card-image"
              />
              <div className="card-inner-frame" />
            </div>
          </div>
        ))}
      </div>

      {/* Outro Photography Statement (Sequenced cleanly after Step 11 completely leaves) */}
      <div ref={outroRef} className="arc-outro-statement-container">
        <div className="outro-mask-line outro-eyebrow-line">
          <span ref={outroEyebrowRef} className="outro-eyebrow-text">
            ✦ SIMON PHOTOGRAPHY ARCHIVE // MANIFESTO
          </span>
        </div>

        <div className="outro-masked-headline">
          <div className="outro-mask-line">
            <span ref={(el) => (outroLinesRef.current[0] = el)} className="outro-line-text">
              where light, optics, and chemistry converge into enduring art.
            </span>
          </div>
        </div>

        <div className="outro-mask-line outro-meta-line">
          <span ref={outroMetaRef} className="outro-meta-text">
            MASTER OPTICS • SILVER HALIDE EMULSION • ANALOG CRAFT
          </span>
        </div>
      </div>
    </section>
  );
});

export default ArcStepShowcase;
