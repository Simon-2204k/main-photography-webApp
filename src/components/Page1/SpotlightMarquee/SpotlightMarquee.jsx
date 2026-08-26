import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import './SpotlightMarquee.css';

const GALLERY_IMAGES = [
  '/assets/page1/spotlight-marquee/user_spotlight_01.webp',
  '/assets/page1/spotlight-marquee/user_spotlight_02.webp',
  '/assets/page1/spotlight-marquee/user_spotlight_03.webp',
  '/assets/page1/spotlight-marquee/user_spotlight_04.webp',
  '/assets/page1/spotlight-marquee/user_spotlight_05.webp',
  '/assets/page1/spotlight-marquee/user_spotlight_06.webp',
];

const SpotlightMarqueeComponent = () => {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    const track = trackRef.current;
    const contentWrapper = contentWrapperRef.current;

    if (!section || !strip || !track || !contentWrapper) return;

    const cfg = {
      spd: 110,     // Marquee horizontal speed (px/sec)
      ease: 0.085,  // Fast, responsive vertical tracking ease
      inset: 130,   // Vertical margin boundaries
      rise: 0.85,   // Text rise displacement factor
      gap: 90,      // Content top gap threshold
      lift: 125,    // Proximity lift trigger distance
      wakeS: 2.6,   // Gaussian velocity wake multiplier
      wakeR: 130,   // Gaussian wake radius
      settle: 0.09, // Spring return settling speed
    };

    let moved = false;
    let rectTop = 0;
    let rectHeight = window.innerHeight;
    let stripBase = strip.offsetTop;
    let stripH = strip.offsetHeight;
    let contentTop = 250;
    let targetY = 0;
    let currY = 0;
    let prevY = 0;
    let isTickerActive = false;

    // Line references with coordinate tracking
    const lineElements = Array.from(contentWrapper.querySelectorAll('.spotlight-line'));
    const lines = lineElements.map((el) => ({
      el,
      currY: 0,
      baseY: 0,
    }));

    const updateRect = () => {
      const rect = section.getBoundingClientRect();
      rectTop = rect.top;
      rectHeight = rect.height;
    };

    const measure = () => {
      updateRect();
      stripBase = strip.offsetTop;
      stripH = strip.offsetHeight;

      const top = Math.min(
        ...lines.map((l) => {
          const lRect = l.el.getBoundingClientRect();
          l.baseY = lRect.top - rectTop + lRect.height / 2;
          return l.baseY - lRect.height / 2;
        })
      );
      contentTop = top === Infinity ? rectHeight * 0.35 : top;

      if (!moved) {
        targetY = currY = prevY = cfg.inset - stripBase - stripH / 2;
      }
    };

    measure();

    // Horizontal Marquee Track Loop Math
    let trackX = 0;
    let singleSetWidth = 0;

    const calculateTrackWidth = () => {
      if (track.children.length > 0) {
        singleSetWidth = track.scrollWidth / 2 || 2200;
      }
    };

    calculateTrackWidth();

    // Pure algebraic calculation on mousemove (Zero Reflow / 0ms latency)
    const handleMouseMove = (e) => {
      moved = true;
      const yOffset = stripBase + stripH / 2;
      const mouseRelY = e.clientY - rectTop;

      targetY = gsap.utils.clamp(
        cfg.inset - yOffset,
        rectHeight - cfg.inset - yOffset,
        mouseRelY - yOffset
      );
    };

    const handleScroll = () => {
      updateRect();
    };

    const handleResize = () => {
      measure();
      calculateTrackWidth();
    };

    let lastTime = performance.now();

    const ticker = () => {
      if (!isVisibleRef.current) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // 1. Horizontal Continuous Marquee Movement
      trackX -= cfg.spd * dt;
      if (singleSetWidth > 0 && trackX <= -singleSetWidth) {
        trackX += singleSetWidth;
      }
      track.style.transform = `translate3d(${trackX}px, 0, 0)`;

      // 2. Responsive Vertical Strip Interpolation (Cursor Following)
      currY += (targetY - currY) * cfg.ease;
      strip.style.transform = `translate3d(0, ${currY}px, 0)`;

      const cY = stripBase + currY + stripH / 2;
      const vY = currY - prevY;
      prevY = currY;

      const rise = -Math.min(
        Math.max(0, cY - cfg.inset) * cfg.rise,
        Math.max(0, contentTop - cfg.gap)
      );

      // 3. Magnetic Text Displacement & Wake Physics
      lines.forEach((l) => {
        const gap = l.baseY - cY;
        const wake = vY * cfg.wakeS * Math.exp(-(gap * gap) / (2 * cfg.wakeR ** 2));
        const targetLineY = (cY + cfg.lift >= l.baseY ? rise : 0) + wake;

        l.currY += (targetLineY - l.currY) * cfg.settle;
        l.el.style.transform = `translate3d(0, ${l.currY}px, 0)`;
      });
    };

    // IntersectionObserver for Viewport Culling & Measuring
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            measure();
            calculateTrackWidth();
            lastTime = performance.now();
            if (!isTickerActive) {
              gsap.ticker.add(ticker);
              isTickerActive = true;
            }
          } else {
            if (isTickerActive) {
              gsap.ticker.remove(ticker);
              isTickerActive = false;
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    section.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      section.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (isTickerActive) {
        gsap.ticker.remove(ticker);
      }
    };
  }, []);

  return (
    <section 
      id="spotlight-marquee-section" 
      ref={sectionRef} 
      className="spotlight-marquee-section"
    >
      {/* Top Navigation HUD — Contact & Socials */}
      <div className="spotlight-nav">
        <p>svasu0014@gmail.com</p>
        <p>Instagram, Twitter</p>
      </div>

      {/* Interactive Horizontal Image Marquee Strip (Cursor Follower) */}
      <div ref={stripRef} className="spotlight-marquee">
        <div ref={trackRef} className="spotlight-marquee-track">
          {/* Quadruple array for seamless infinite wrap across ultra-wide viewports */}
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, idx) => (
            <div key={idx} className="spotlight-marquee-item">
              <img 
                src={src} 
                alt={`Archive Frame ${(idx % GALLERY_IMAGES.length) + 1}`} 
                decoding="async"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Difference-Blended Center Typography */}
      <div ref={contentWrapperRef} className="spotlight-content-wrapper">
        <h1>
          <span className="spotlight-line">SILVER &amp; GRAIN</span>
        </h1>
        <h3>
          <span className="spotlight-line">CAPTURING WHAT OTHERS PASS BY</span>
        </h3>
        <div className="spotlight-copy">
          <p>
            <span className="spotlight-line">Silver &amp; Grain explores analog chemistry,</span>
            <span className="spotlight-line">latent exposure, and light manipulation</span>
            <span className="spotlight-line">through tactile darkroom experiments.</span>
            <span className="spotlight-line">Every frame is crafted to evoke emotional</span>
            <span className="spotlight-line">resonance and timeless visual weight.</span>
          </p>
          <p>
            <span className="spotlight-line">From large format plate photography and</span>
            <span className="spotlight-line">kinetic studio lighting to archival prints,</span>
            <span className="spotlight-line">our atelier focuses on authentic depth,</span>
            <span className="spotlight-line">mechanical precision, and enduring aesthetics</span>
            <span className="spotlight-line">for tangible spaces.</span>
          </p>
        </div>
      </div>

      {/* Footer Manifesto */}
      <div className="spotlight-footer">
        <p>
          Silver &amp; Grain Atelier is dedicated to the craft of physical light capture, continuous exploration of silver halide emulsion, and bespoke editorial curation across global physical and digital archives.
        </p>
      </div>
    </section>
  );
};

export const SpotlightMarquee = memo(SpotlightMarqueeComponent);
export default SpotlightMarquee;
