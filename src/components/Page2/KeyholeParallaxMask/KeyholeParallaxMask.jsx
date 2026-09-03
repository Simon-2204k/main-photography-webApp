import React, { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '../Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

const BATMAN_MASK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 726 252.17"><path d="M483.92 0S481.38 24.71 466 40.11c-11.74 11.74-24.09 12.66-40.26 15.07-9.42 1.41-29.7 3.77-34.81-.79-2.37-2.11-3-21-3.22-27.62-.21-6.92-1.36-16.52-2.82-18-.75 3.06-2.49 11.53-3.09 13.61S378.49 34.3 378 36a85.13 85.13 0 0 0-30.09 0c-.46-1.67-3.17-11.48-3.77-13.56s-2.34-10.55-3.09-13.61c-1.45 1.45-2.61 11.05-2.82 18-.21 6.67-.84 25.51-3.22 27.62-5.11 4.56-25.38 2.2-34.8.79-16.16-2.47-28.51-3.39-40.21-15.13C244.57 24.71 242 0 242 0H0s69.52 22.74 97.52 68.59c16.56 27.11 14.14 58.49 9.92 74.73C170 140 221.46 140 273 158.57c69.23 24.93 83.2 76.19 90 93.6 6.77-17.41 20.75-68.67 90-93.6 51.54-18.56 103-18.59 165.56-15.25-4.21-16.24-6.63-47.62 9.93-74.73C656.43 22.74 726 0 726 0z" fill="black"/></svg>`;

const SECTION5_IMAGES = [
  '/images/section5/brian-lundquist-aA6NVwzqWJg-unsplash.webp',
  '/images/section5/brooke-balentine-Bs15bCACD_0-unsplash.webp',
  '/images/section5/daniel-khor-rZtdwCZTibY-unsplash.webp',
  '/images/section5/eduardo-kenji-amorim-m6FlHxLBlVs-unsplash.webp',
  '/images/section5/hamza-nouasria-25NzjUbPIcc-unsplash.webp',
  '/images/section5/jan-oblak-O1H4keiH-Io-unsplash.webp',
  '/images/section5/oscar-ramirez-IHYP1yLWEek-unsplash.webp',
  '/images/section5/rock-staar-xYcnWXtURrs-unsplash.webp',
  '/images/section5/steven-weeks-xAHbt6YpAJ4-unsplash.webp',
  '/images/section5/vinicius-amnx-amano-3BvtFNc1MYY-unsplash.webp',
  '/images/section5/windah-limbai-x9y7-4VvS38-unsplash.webp',
  '/images/section5/yunus-emre-mM5tCQ0uJo8-unsplash.webp',
];

const PARALLAX_CARDS = [
  { id: 1, src: '/images/section6/float-1.webp', left: '6%', width: 140, startY: '110vh', targetY: '-150vh' },
  { id: 2, src: '/images/section6/float-2.webp', left: '14%', width: 150, startY: '230vh', targetY: '-150vh' },
  { id: 3, src: '/images/section6/float-3.webp', left: '8%', width: 135, startY: '350vh', targetY: '-150vh' },
  { id: 4, src: '/images/section6/float-4.webp', left: '16%', width: 155, startY: '470vh', targetY: '-150vh' },
  { id: 5, src: '/images/section6/float-5.webp', left: '7%', width: 145, startY: '590vh', targetY: '-150vh' },

  { id: 6, src: '/images/section6/float-6.webp', left: '28%', width: 130, startY: '140vh', targetY: '-150vh' },
  { id: 7, src: '/images/section6/float-7.webp', left: '23%', width: 145, startY: '260vh', targetY: '-150vh' },
  { id: 8, src: '/images/section6/float-8.webp', left: '31%', width: 135, startY: '380vh', targetY: '-150vh' },
  { id: 9, src: '/images/section6/float-9.webp', left: '25%', width: 150, startY: '500vh', targetY: '-150vh' },
  { id: 10, src: '/images/section6/float-10.webp', left: '29%', width: 140, startY: '620vh', targetY: '-150vh' },

  { id: 11, src: '/images/section6/float-11.webp', left: '69%', width: 140, startY: '125vh', targetY: '-150vh' },
  { id: 12, src: '/images/section6/float-12.webp', left: '76%', width: 155, startY: '245vh', targetY: '-150vh' },
  { id: 13, src: '/images/section6/float-13.webp', left: '70%', width: 135, startY: '365vh', targetY: '-150vh' },
  { id: 14, src: '/images/section6/float-14.webp', left: '77%', width: 145, startY: '485vh', targetY: '-150vh' },
  { id: 15, src: '/images/section6/float-15.webp', left: '71%', width: 150, startY: '605vh', targetY: '-150vh' },

  { id: 16, src: '/images/section6/float-16.webp', left: '88%', width: 150, startY: '155vh', targetY: '-150vh' },
  { id: 17, src: '/images/section6/float-17.webp', left: '84%', width: 135, startY: '275vh', targetY: '-150vh' },
  { id: 18, src: '/images/section6/float-18.webp', left: '90%', width: 160, startY: '395vh', targetY: '-150vh' },
  { id: 19, src: '/images/section6/float-19.webp', left: '85%', width: 140, startY: '515vh', targetY: '-150vh' },
  { id: 20, src: '/images/section6/float-20.webp', left: '89%', width: 155, startY: '635vh', targetY: '-150vh' },
];

export const KeyholeParallaxMask = memo(() => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const maskWindowRef = useRef(null);
  const frontLayerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % SECTION5_IMAGES.length);
    }, 220);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const maskWindow = maskWindowRef.current;
      const frontLayer = frontLayerRef.current;
      const text2 = text2Ref.current;

      gsap.set(maskWindow, {
        opacity: 1,
        maskSize: '0px auto',
        webkitMaskSize: '0px auto',
      });

      cardRefs.current.forEach((el, idx) => {
        if (el && PARALLAX_CARDS[idx]) {
          gsap.set(el, { y: PARALLAX_CARDS[idx].startY });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=700%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          scrub: 1.2,
        },
      });

      cardRefs.current.forEach((el, idx) => {
        if (el && PARALLAX_CARDS[idx]) {
          tl.to(
            el,
            {
              y: PARALLAX_CARDS[idx].targetY,
              duration: 4.0,
              ease: 'none',
            },
            0
          );
        }
      });

      tl.to(
        maskWindow,
        {
          maskSize: '450px auto',
          webkitMaskSize: '450px auto',
          duration: 0.8,
          ease: 'power2.out',
        },
        3.2
      );

      tl.to(
        maskWindow,
        {
          maskSize: '15000px auto',
          webkitMaskSize: '15000px auto',
          duration: 1.5,
          ease: 'power3.inOut',
        },
        4.0
      );

      tl.to(
        frontLayer,
        {
          opacity: 0,
          duration: 0.3,
        },
        5.2
      );

      tl.fromTo(
        text2,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        4.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', backgroundColor: '#000000' }}>
      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundColor: '#050505',
          color: '#ffffff',
          userSelect: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <img
            src={SECTION5_IMAGES[activeImgIdx]}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />

          <div
            ref={text2Ref}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 24px',
              opacity: 0,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              backgroundColor: 'transparent',
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#ff5d22',
                marginBottom: '14px',
                fontWeight: 700,
                textShadow: '0 2px 10px rgba(0,0,0,0.95)',
              }}
            >
              CAPTURING TIME THROUGH UNCOMPROMISED OPTICS
            </div>

            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: '0 10px 30px rgba(0,0,0,0.95)',
                margin: 0,
              }}
            >
              BE THE ONE TO
            </h2>
            <span
              style={{
                fontFamily: "'Newsreader', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                color: '#ffffff',
                textShadow: '0 10px 30px rgba(0,0,0,0.95)',
                marginTop: '8px',
              }}
            >
              Stand Out
            </span>
          </div>
        </div>

        <div
          ref={frontLayerRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            backgroundColor: '#ffffff',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 12,
              overflow: 'visible',
            }}
          >
            {PARALLAX_CARDS.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                style={{
                  position: 'absolute',
                  left: card.left,
                  top: 0,
                  width: `${card.width}px`,
                  aspectRatio: '3 / 4',
                  filter: 'grayscale(100%) contrast(120%)',
                  opacity: 0.75,
                  overflow: 'hidden',
                  willChange: 'transform',
                  borderRadius: '4px',
                }}
              >
                <img
                  src={card.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <div
            ref={text1Ref}
            style={{
              position: 'relative',
              zIndex: 15,
              textAlign: 'center',
              maxWidth: '900px',
              padding: '0 24px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: '#111111',
                margin: 0,
              }}
            >
              IN A WORLD FULL <br /> OF NOISE
            </h2>
          </div>
        </div>

        <div
          ref={maskWindowRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 20,
            pointerEvents: 'none',
            maskImage: `url('${BATMAN_MASK_SVG}')`,
            WebkitMaskImage: `url('${BATMAN_MASK_SVG}')`,
            maskPosition: 'center center',
            WebkitMaskPosition: 'center center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: '0px auto',
            WebkitMaskSize: '0px auto',
            willChange: 'mask-size, -webkit-mask-size',
          }}
        >
          <img
            src={SECTION5_IMAGES[activeImgIdx]}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 24px',
              backgroundColor: 'transparent',
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#ff5d22',
                marginBottom: '14px',
                fontWeight: 700,
                textShadow: '0 2px 10px rgba(0,0,0,0.95)',
              }}
            >
              CAPTURING TIME THROUGH UNCOMPROMISED OPTICS
            </div>

            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: '0 10px 30px rgba(0,0,0,0.95)',
                margin: 0,
              }}
            >
              BE THE ONE TO
            </h2>
            <span
              style={{
                fontFamily: "'Newsreader', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                color: '#ffffff',
                textShadow: '0 10px 30px rgba(0,0,0,0.95)',
                marginTop: '8px',
              }}
            >
              Stand Out
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

export default KeyholeParallaxMask;
