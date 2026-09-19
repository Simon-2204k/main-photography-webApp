import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CraftingComedy.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section8CraftingComedy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {

      const chars = root.querySelectorAll('.char');
      const hero = root.querySelector('.hero');
      if (chars.length && hero) {
        gsap.from(chars, {
          scrollTrigger: {
            trigger: hero,
            start: 'top 80%',
          },
          y: 140,
          rotateX: 45,
          rotateZ: 45,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.1,
          stagger: { amount: 0.5, from: 'start' },
          ease: 'power3.out',
        });

        gsap.from(root.querySelector('.hero-subtitle'), {
          scrollTrigger: {
            trigger: hero,
            start: 'top 75%',
          },
          y: 30,
          opacity: 0,
          duration: 0.9,
          delay: 0.4,
          ease: 'power2.out',
        });
      }

      gsap.set(root.querySelectorAll('.card-1, .card-2, .card-3'), {
        x: '140vw',
        scale: 0.88,
      });
      gsap.set(root.querySelectorAll('.card-4, .card-5, .card-6'), {
        x: '-140vw',
        scale: 0.88,
      });

      const secOne = root.querySelector('.section-one');
      const isMobileView = window.innerWidth <= 768;

      if (secOne) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: secOne,
            start: 'top top',
            end: isMobileView ? '+=45%' : '+=180%',
            pin: true,
            scrub: isMobileView ? 0.6 : 1.0,
            anticipatePin: 0,
            preventOverlaps: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        if (isMobileView) {

          tl1
            .fromTo(root.querySelector('.bg-1'), { y: '35vh', opacity: 0 }, { y: '0vh', opacity: 1, duration: 0.3, ease: 'power2.out' })
            .fromTo(root.querySelector('.card-1'), { x: '110vw', scale: 0.95 }, { x: '0vw', scale: 1.0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
            .to({}, { duration: 0.2 });
        } else {

          tl1
            .fromTo(
              root.querySelectorAll('.bg-1, .bg-2, .bg-3'),
              { y: '60vh', opacity: 0 },
              { y: '0vh', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
            )
            .fromTo(root.querySelector('.card-1'), { x: '120vw', scale: 0.88, rotation: 4 }, { x: '0vw', scale: 1.0, rotation: 0, duration: 1.0, ease: 'power2.out' }, '-=0.3')
            .fromTo(root.querySelector('.card-2'), { x: '140vw', scale: 0.88, rotation: -3 }, { x: '0vw', scale: 1.0, rotation: 0, duration: 1.3, ease: 'power2.out' }, '<')
            .fromTo(root.querySelector('.card-3'), { x: '160vw', scale: 0.88, rotation: 3 }, { x: '0vw', scale: 1.0, rotation: 0, duration: 1.6, ease: 'power2.out' }, '<');
        }
      }

      const secTwo = root.querySelector('.section-two');
      if (secTwo) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: secTwo,
            start: 'top top',
            end: isMobileView ? '+=45%' : '+=180%',
            pin: true,
            scrub: isMobileView ? 0.6 : 1.0,
            anticipatePin: 0,
            preventOverlaps: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        if (isMobileView) {

          tl2
            .fromTo(root.querySelector('.bg-4'), { y: '35vh', opacity: 0 }, { y: '0vh', opacity: 1, duration: 0.3, ease: 'power2.out' })
            .fromTo(root.querySelector('.card-4'), { x: '-110vw', scale: 0.95 }, { x: '0vw', scale: 1.0, duration: 0.5, ease: 'power2.out' }, '-=0.15')
            .to({}, { duration: 0.2 });
        } else {

          tl2
            .fromTo(
              root.querySelectorAll('.bg-4, .bg-5, .bg-6'),
              { y: '60vh', opacity: 0 },
              { y: '0vh', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
            )
            .fromTo(root.querySelector('.card-4'), { x: '-120vw', scale: 0.88, rotation: -4 }, { x: '0vw', scale: 1.0, rotation: 0, duration: 1.0, ease: 'power2.out' }, '-=0.3')
            .fromTo(root.querySelector('.card-5'), { x: '-140vw', scale: 0.88, rotation: 3 }, { x: '0vw', scale: 1.0, rotation: 0, duration: 1.3, ease: 'power2.out' }, '<')
            .fromTo(root.querySelector('.card-6'), { x: '-160vw', scale: 0.88, rotation: -3 }, { x: '0vw', scale: 1.0, rotation: 0, duration: 1.6, ease: 'power2.out' }, '<');
        }
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const renderChars = (text) =>
    text.split('').map((c, i) => (
      <span key={i} className={`char ${c === ' ' ? 'space' : ''}`}>
        {c === ' ' ? '\u00A0' : c}
      </span>
    ));

  return (
    <div ref={containerRef} className="section8-root">

      <section className="hero">
        <div className="hero-title-container">
          <h1 className="hero-text cream">{renderChars('CRAFTING')}</h1>
          <h1 className="hero-text red">{renderChars('EXPOSURE')}</h1>
          <h1 className="hero-text cream">{renderChars('SINCE 2026')}</h1>
        </div>
        <p className="hero-subtitle">
          We don't capture light alone. We collaborate with master darkroom printmakers and medium format visual artists because your imagery deserves enduring optical craft.
        </p>
      </section>

      <section className="pinned-section section-one bg-black">
        <div className="grid-container">

          <div className="grid-column-slot">
            <div className="column-bg bg-1"><span className="bg-letter">M</span></div>
            <div className="team-card card-1">
              <div className="card-img-wrapper">
                <img
                  src="/assets/section8/pexels-beratorer-30236021.jpg"
                  alt="Master Printmaker Matt Pittroff"
                  loading="lazy"
                />
              </div>
              <div className="card-info">
                <span className="card-role">Master Darkroom Printmaker</span>
                <h3 className="card-name">MATT PITTROFF</h3>
                <span className="text-[10px] font-mono text-stone-400 tracking-wider mt-1 uppercase">Leica M11-D • 50mm Noctilux</span>
              </div>
            </div>
          </div>

          <div className="grid-column-slot">
            <div className="column-bg bg-2"><span className="bg-letter">B</span></div>
            <div className="team-card card-2">
              <div className="card-img-wrapper">
                <img
                  src="/assets/section8/pexels-ekam-juneja-61080223-31441531.jpg"
                  alt="Darkroom Chemist Brenna Mathers"
                  loading="lazy"
                />
              </div>
              <div className="card-info">
                <span className="card-role">Senior Darkroom Chemist</span>
                <h3 className="card-name">BRENNA MATHERS</h3>
                <span className="text-[10px] font-mono text-stone-400 tracking-wider mt-1 uppercase">Selenium Tone • Gelatin Silver</span>
              </div>
            </div>
          </div>

          <div className="grid-column-slot">
            <div className="column-bg bg-3"><span className="bg-letter">S</span></div>
            <div className="team-card card-3">
              <div className="card-img-wrapper">
                <img
                  src="/assets/section8/pexels-hamidtajikph-12358274.jpg"
                  alt="Lighting Director Steve Olsen"
                  loading="lazy"
                />
              </div>
              <div className="card-info">
                <span className="card-role">Studio Lighting & Optics Director</span>
                <h3 className="card-name">STEVE OLSEN</h3>
                <span className="text-[10px] font-mono text-stone-400 tracking-wider mt-1 uppercase">Tungsten Chiaroscuro • Fresnel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pinned-section section-two alt-bg bg-black">
        <div className="grid-container">

          <div className="grid-column-slot">
            <div className="column-bg bg-4"><span className="bg-letter">J</span></div>
            <div className="team-card card-4">
              <div className="card-img-wrapper">
                <img
                  src="/assets/section8/pexels-ian-panelo-7531999.jpg"
                  alt="Medium Format Specialist Jen Chen"
                  loading="lazy"
                />
              </div>
              <div className="card-info">
                <span className="card-role">Medium Format Specialist</span>
                <h3 className="card-name">JEN CHEN</h3>
                <span className="text-[10px] font-mono text-stone-400 tracking-wider mt-1 uppercase">Hasselblad 500C/M • 80mm Planar</span>
              </div>
            </div>
          </div>

          <div className="grid-column-slot">
            <div className="column-bg bg-5"><span className="bg-letter">A</span></div>
            <div className="team-card card-5">
              <div className="card-img-wrapper">
                <img
                  src="/assets/section8/pexels-imvitordiniz-20214543.jpg"
                  alt="Portrait Director Alex Rivera"
                  loading="lazy"
                />
              </div>
              <div className="card-info">
                <span className="card-role">Editorial Portrait Director</span>
                <h3 className="card-name">ALEX RIVERA</h3>
                <span className="text-[10px] font-mono text-stone-400 tracking-wider mt-1 uppercase">Mamiya 7II • 6×7 Rangefinder</span>
              </div>
            </div>
          </div>

          <div className="grid-column-slot">
            <div className="column-bg bg-6"><span className="bg-letter">D</span></div>
            <div className="team-card card-6">
              <div className="card-img-wrapper">
                <img
                  src="/assets/section8/pexels-pudinx-14854696.jpg"
                  alt="Archivist Dave Kaufman"
                  loading="lazy"
                />
              </div>
              <div className="card-info">
                <span className="card-role">Silver Halide Archivist</span>
                <h3 className="card-name">DAVE KAUFMAN</h3>
                <span className="text-[10px] font-mono text-stone-400 tracking-wider mt-1 uppercase">Large Format 8×10 Platinum</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
