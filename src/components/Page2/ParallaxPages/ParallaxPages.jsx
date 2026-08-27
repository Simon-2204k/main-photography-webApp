import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CursorTrail } from '../../Page1/CursorTrail/CursorTrail';

gsap.registerPlugin(ScrollTrigger);

const PAGES = [
  {
    id: 1,
    image: '/img1.jpg',
    marquee: 'Cinematic Light, Raw Emotion, and Timeless Framing',
  },
  {
    id: 2,
    image: '/img2.jpg',
    marquee: 'Shadows Define the Depth of Every Story',
  },
  {
    id: 3,
    image: '/img3.jpg',
    marquee: 'Analog Grain, High Contrast, and Vivid Focus',
  },
  {
    id: 4,
    image: '/img4.jpeg',
    marquee: 'Artistry in Canvas, Warm Sunlight, and Brushstrokes',
  },
  {
    id: 5,
    image: '/img5.jpeg',
    marquee: 'Urban Glow, Electric Motion, and Freedom',
  },
  {
    id: 6,
    image: '/img6.jpeg',
    marquee: 'Atmospheric Rays, Velvet Shadows, and Subtle Grace',
  },
];

export default function ParallaxPages() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const timelineBarRef = useRef(null);
  const progressBarRefs = useRef([]);
  const marqueeXRef = useRef(0);
  const scrollDirRef = useRef(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const previousProgressRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const newsContainerRef = useRef(null);
  const newsCardRef = useRef(null);
  const newsCtaRef = useRef(null);

  useEffect(() => {
    progressBarRefs.current = progressBarRefs.current.slice(0, PAGES.length);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      // 1. Update progress bars custom CSS property --progress (0 -> 1)
      const updateProgressBars = (progress) => {
        progressBarRefs.current.forEach((barEl, index) => {
          if (!barEl) return;
          const barProgress = Math.min(Math.max(progress * PAGES.length - index, 0), 1);
          barEl.style.setProperty('--progress', barProgress);
        });
      };

      // 2. Initial Setup for First Slide
      const initialSlide = carousel.querySelector('.slide');
      if (initialSlide) {
        gsap.set(initialSlide, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        });
        const initialImg = initialSlide.querySelector('.slide-img img');
        if (initialImg) {
          gsap.set(initialImg, { y: '0%' });
        }
      }

      // 3. Helper to Create Slide DOM Element with Camera Viewfinder HUD (Image 3) & Marquee
      const createSlideElement = (slideData) => {
        const slide = document.createElement('div');
        slide.className = 'slide absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-center items-center pointer-events-none select-none z-10';
        slide.innerHTML = `
          <div class="slide-img absolute inset-0 w-full h-full overflow-hidden z-0">
            <img src="${slideData.image}" alt="" class="w-full h-full object-cover object-center transform scale-100 opacity-100 will-change-transform" />
          </div>

          <!-- Camera Viewfinder HUD Overlay (Image 3) -->
          <div class="slide-hud absolute inset-0 pointer-events-none z-30 p-6 sm:p-10 lg:p-14 flex flex-col justify-between select-none">
            <!-- Top HUD Bar: Blinking REC + ISO + WB + BAT -->
            <div class="flex justify-between items-center text-xs sm:text-sm font-mono tracking-widest text-white/90">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse inline-block shadow-[0_0_8px_#ef4444]"></span>
                <span class="font-bold text-red-500 tracking-wider">● REC</span>
                <span class="text-white/80 font-normal">[4K 60FPS RAW]</span>
              </div>
              <div class="flex items-center gap-4 text-white/75">
                <span>ISO 400</span>
                <span>WB 5600K</span>
                <span>[BAT 98%]</span>
              </div>
            </div>

            <!-- 4 Viewfinder Corner Brackets & Center Focus Reticle -->
            <div class="absolute inset-6 sm:inset-12 lg:inset-16 pointer-events-none">
              <div class="absolute top-0 left-0 w-6 sm:w-10 h-6 sm:h-10 border-t-2 border-l-2 border-white/70"></div>
              <div class="absolute top-0 right-0 w-6 sm:w-10 h-6 sm:h-10 border-t-2 border-r-2 border-white/70"></div>
              <div class="absolute bottom-0 left-0 w-6 sm:w-10 h-6 sm:h-10 border-b-2 border-l-2 border-white/70"></div>
              <div class="absolute bottom-0 right-0 w-6 sm:w-10 h-6 sm:h-10 border-b-2 border-r-2 border-white/70"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 flex items-center justify-center pointer-events-none">
                <span class="text-white/40 text-xs font-mono">+</span>
              </div>
            </div>

            <!-- Bottom HUD Bar: F-stop, Shutter, EV, Focal Length -->
            <div class="flex justify-between items-center text-xs sm:text-sm font-mono tracking-widest text-white/90">
              <div class="flex items-center gap-4 text-white/80">
                <span>F/2.8</span>
                <span>1/250s</span>
                <span>+0.7 EV</span>
                <span>50mm [AF-C]</span>
              </div>
              <div class="flex items-center gap-3 text-white/70">
                <span>[•] CENTER</span>
                <span>GRID 3x3</span>
              </div>
            </div>
          </div>

          <div class="slide-copy absolute inset-0 flex items-center justify-center w-full overflow-hidden z-20 pointer-events-auto">
            <div class="slide-marquee w-full overflow-hidden px-0 mx-0 py-8 sm:py-12 lg:py-16">
              <div class="marquee-track flex whitespace-nowrap will-change-transform py-4" style="width: max-content;">
                <span class="marquee-text font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] leading-[1.3] text-white tracking-tight shrink-0 px-8 transition-colors duration-300 cursor-pointer pointer-events-auto hover:scale-[1.03]" onmouseenter="this.style.color='transparent'; this.style.webkitTextStroke='1.5px rgba(255, 255, 255, 0.9)';" onmouseleave="this.style.color='#ffffff'; this.style.webkitTextStroke='0px transparent';">
                  ${slideData.marquee} • ${slideData.marquee} • &nbsp;
                </span>
                <span class="marquee-text font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] leading-[1.3] text-white tracking-tight shrink-0 px-8 transition-colors duration-300 cursor-pointer pointer-events-auto hover:scale-[1.03]" onmouseenter="this.style.color='transparent'; this.style.webkitTextStroke='1.5px rgba(255, 255, 255, 0.9)';" onmouseleave="this.style.color='#ffffff'; this.style.webkitTextStroke='0px transparent';">
                  ${slideData.marquee} • ${slideData.marquee} • &nbsp;
                </span>
              </div>
            </div>
          </div>
        `;
        return slide;
      };

      // 4. Zero-Jitter Infinite Marquee Engine
      const animateMarquee = () => {
        const tracks = carousel.querySelectorAll('.marquee-track');
        if (!tracks.length) return;

        const step = 0.08 * scrollDirRef.current;
        marqueeXRef.current -= step;

        const wrappedX = gsap.utils.wrap(-50, 0, marqueeXRef.current);

        tracks.forEach((track) => {
          gsap.set(track, { xPercent: wrappedX });
        });
      };

      gsap.ticker.add(animateMarquee);

      // 5. Codegrid Slide Creation & clipPath Polygon Animation Engine
      const createAndAnimateSlide = (targetIndex, isScrollingForward) => {
        const currentSlide = carousel.querySelector('.slide');
        if (!currentSlide) {
          isAnimatingRef.current = false;
          return;
        }

        const newSlideData = PAGES[targetIndex];
        const newSlide = createSlideElement(newSlideData);

        const currentSlideImg = currentSlide.querySelector('.slide-img img');
        const currentSlideCopy = currentSlide.querySelector('.slide-copy');

        if (!currentSlideImg || !currentSlideCopy) {
          isAnimatingRef.current = false;
          return;
        }

        gsap.killTweensOf(currentSlide);
        gsap.killTweensOf(currentSlideImg);
        gsap.killTweensOf(currentSlideCopy);

        if (isScrollingForward) {
          const newSlideImg = newSlide.querySelector('.slide-img img');
          const newSlideCopy = newSlide.querySelector('.slide-copy');

          gsap.set(newSlide, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          });
          gsap.set(newSlideImg, { y: '25%' });
          gsap.set(newSlideCopy, { y: '100%' });

          carousel.appendChild(newSlide);

          gsap.to(newSlide, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            duration: 1,
            ease: 'power4.inOut',
          });

          gsap.to([newSlideCopy, newSlideImg], {
            y: '0%',
            duration: 1,
            ease: 'power4.inOut',
          });

          gsap.to(currentSlide, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 1,
            ease: 'power4.inOut',
            onStart: () => {
              gsap.to(currentSlideImg, {
                y: '-25%',
                duration: 1,
                ease: 'power4.inOut',
              });
              gsap.to(currentSlideCopy, {
                y: '-100%',
                duration: 1,
                ease: 'power4.inOut',
              });
            },
            onComplete: () => {
              if (currentSlide.parentNode) {
                currentSlide.remove();
              }
              isAnimatingRef.current = false;
              setCurrentSlideIndex(targetIndex);
            },
            onInterrupt: () => {
              isAnimatingRef.current = false;
            },
          });
        } else {
          const newSlideImg = newSlide.querySelector('.slide-img img');
          const newSlideCopy = newSlide.querySelector('.slide-copy');

          gsap.set(newSlide, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          });
          gsap.set(newSlideImg, { y: '-25%' });
          gsap.set(newSlideCopy, { y: '-100%' });

          carousel.insertBefore(newSlide, currentSlide);

          gsap.to(newSlide, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'power4.inOut',
          });

          gsap.to([newSlideCopy, newSlideImg], {
            y: '0%',
            duration: 1,
            ease: 'power4.inOut',
          });

          gsap.to(currentSlide, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'power4.inOut',
            onStart: () => {
              gsap.to(currentSlideImg, {
                y: '25%',
                duration: 1,
                ease: 'power4.inOut',
              });
              gsap.to(currentSlideCopy, {
                y: '100%',
                duration: 1,
                ease: 'power4.inOut',
              });
            },
            onComplete: () => {
              if (currentSlide.parentNode) {
                currentSlide.remove();
              }
              isAnimatingRef.current = false;
              setCurrentSlideIndex(targetIndex);
            },
            onInterrupt: () => {
              isAnimatingRef.current = false;
            },
          });
        }
      };

      // 6. Master Pinned GSAP ScrollTrigger for 6-Slide Carousel
      ScrollTrigger.create({
        trigger: carousel,
        start: 'top top',
        end: () => '+=' + window.innerHeight * 14 + 'px',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const currentProgress = self.progress;

          // Fade in/out the bottom carousel progress timeline
          if (timelineBarRef.current) {
            if (currentProgress > 0.01 && currentProgress < 0.99) {
              timelineBarRef.current.style.opacity = '1';
            } else {
              timelineBarRef.current.style.opacity = '0';
            }
          }

          // Detect scroll direction
          if (currentProgress > previousProgressRef.current) {
            scrollDirRef.current = 1;
          } else if (currentProgress < previousProgressRef.current) {
            scrollDirRef.current = -1;
          }
          previousProgressRef.current = currentProgress;

          // Calculate current active slide index based on progress
          const segmentSize = 1 / PAGES.length;
          const targetIndex = Math.min(
            Math.floor(currentProgress / segmentSize),
            PAGES.length - 1
          );

          if (targetIndex !== activeIndexRef.current && !isAnimatingRef.current) {
            const isScrollingForward = targetIndex > activeIndexRef.current;
            isAnimatingRef.current = true;
            activeIndexRef.current = targetIndex;
            createAndAnimateSlide(targetIndex, isScrollingForward);
          }

          updateProgressBars(currentProgress);
        },
      });

      // 7. 3-Step Outro Card Sequence with 3D Flip & Solid GREY Base Plate
      const newsContainer = newsContainerRef.current;
      const newsCard = newsCardRef.current;
      const newsCta = newsCtaRef.current;

      if (newsContainer && newsCard && newsCta) {
        const outroTl = gsap.timeline({
          scrollTrigger: {
            trigger: newsContainer,
            start: 'top top',
            end: '+=350%',
            pin: true,
            pinSpacing: true,
            scrub: 2,
          },
        });

        // Step 1: Scale down from full screen (1 -> 0.75) and round corners (0px -> 28px)
        outroTl.to(newsCard, {
          scale: 0.75,
          borderRadius: '28px',
          duration: 1.2,
          ease: 'power2.inOut',
        });

        // Step 2: 3D Flip 180 degrees on Y-axis
        outroTl.to(newsCard, {
          rotationY: 180,
          duration: 1.5,
          ease: 'power2.inOut',
        });

        // Step 3: Button on back face resolves Blur to Clear
        outroTl.fromTo(
          newsCta,
          { opacity: 0, filter: 'blur(16px)', scale: 0.9 },
          { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1, ease: 'power2.out' }
        );
      }

      // 8. Zero-Jitter Infinite Left-to-Right Marquee for Footer
      const footerTrack = containerRef.current?.querySelector('.footer-marquee-track');
      let footerX = -50;
      const animateFooterMarquee = () => {
        if (!footerTrack) return;
        footerX += 0.07;
        if (footerX >= 0) footerX = -50;
        gsap.set(footerTrack, { xPercent: footerX });
      };
      gsap.ticker.add(animateFooterMarquee);

      return () => {
        gsap.ticker.remove(animateMarquee);
        gsap.ticker.remove(animateFooterMarquee);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black text-white">
      {/* Pinned Codegrid Carousel Container */}
      <div
        ref={carouselRef}
        className="carousel relative w-full h-screen overflow-hidden bg-black flex justify-center items-center"
      >
        {/* Initial Active Slide DOM Element */}
        <div className="slide absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-center items-center pointer-events-none select-none z-10">
          <div className="slide-img absolute inset-0 w-full h-full overflow-hidden z-0">
            <img
              src={PAGES[0].image}
              alt=""
              className="w-full h-full object-cover object-center transform scale-100 opacity-100 will-change-transform"
            />
          </div>

          {/* Camera Viewfinder HUD Overlay (Image 3) */}
          <div className="slide-hud absolute inset-0 pointer-events-none z-30 p-6 sm:p-10 lg:p-14 flex flex-col justify-between select-none">
            {/* Top HUD Bar */}
            <div className="flex justify-between items-center text-xs sm:text-sm font-mono tracking-widest text-white/90">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse inline-block shadow-[0_0_8px_#ef4444]"></span>
                <span className="font-bold text-red-500 tracking-wider">● REC</span>
                <span className="text-white/80 font-normal">[4K 60FPS RAW]</span>
              </div>
              <div className="flex items-center gap-4 text-white/75">
                <span>ISO 400</span>
                <span>WB 5600K</span>
                <span>[BAT 98%]</span>
              </div>
            </div>

            {/* 4 Viewfinder Corner Brackets & Center Crosshair */}
            <div className="absolute inset-6 sm:inset-12 lg:inset-16 pointer-events-none">
              <div className="absolute top-0 left-0 w-6 sm:w-10 h-6 sm:h-10 border-t-2 border-l-2 border-white/70"></div>
              <div className="absolute top-0 right-0 w-6 sm:w-10 h-6 sm:h-10 border-t-2 border-r-2 border-white/70"></div>
              <div className="absolute bottom-0 left-0 w-6 sm:w-10 h-6 sm:h-10 border-b-2 border-l-2 border-white/70"></div>
              <div className="absolute bottom-0 right-0 w-6 sm:w-10 h-6 sm:h-10 border-b-2 border-r-2 border-white/70"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 flex items-center justify-center pointer-events-none">
                <span className="text-white/40 text-xs font-mono">+</span>
              </div>
            </div>

            {/* Bottom HUD Bar */}
            <div className="flex justify-between items-center text-xs sm:text-sm font-mono tracking-widest text-white/90">
              <div className="flex items-center gap-4 text-white/80">
                <span>F/2.8</span>
                <span>1/250s</span>
                <span>+0.7 EV</span>
                <span>50mm [AF-C]</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <span>[•] CENTER</span>
                <span>GRID 3x3</span>
              </div>
            </div>
          </div>

          <div className="slide-copy absolute inset-0 flex items-center justify-center w-full overflow-hidden z-20 pointer-events-auto">
            <div className="slide-marquee w-full overflow-hidden px-0 mx-0 py-8 sm:py-12 lg:py-16">
              <div className="marquee-track flex whitespace-nowrap will-change-transform py-4" style={{ width: 'max-content' }}>
                <span
                  className="marquee-text font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] leading-[1.3] text-white tracking-tight shrink-0 px-8 transition-colors duration-300 cursor-pointer pointer-events-auto hover:scale-[1.03]"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.WebkitTextStroke = '1.5px rgba(255, 255, 255, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.WebkitTextStroke = '0px transparent';
                  }}
                >
                  ${PAGES[0].marquee} • ${PAGES[0].marquee} • &nbsp;
                </span>
                <span
                  className="marquee-text font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] leading-[1.3] text-white tracking-tight shrink-0 px-8 transition-colors duration-300 cursor-pointer pointer-events-auto hover:scale-[1.03]"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.WebkitTextStroke = '1.5px rgba(255, 255, 255, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.WebkitTextStroke = '0px transparent';
                  }}
                >
                  ${PAGES[0].marquee} • ${PAGES[0].marquee} • &nbsp;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Codegrid Bottom Carousel Progress Bar Container */}
        <div
          ref={timelineBarRef}
          className="carousel-progress fixed bottom-8 left-0 w-full px-8 sm:px-16 lg:px-24 z-50 pointer-events-none select-none transition-opacity duration-300 opacity-0"
        >
          <div className="flex gap-2 sm:gap-4 w-full">
            {PAGES.map((page, index) => (
              <div
                key={page.id}
                ref={(el) => (progressBarRefs.current[index] = el)}
                className="progress-bar"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        EDITORIAL STATEMENT & CAPABILITY SHOWCASE (IMAGE 4 ALADESIGN.CZ STYLE)
        CURSOR TRAIL LAYER IS DIRECTLY OVER THE TEXT (Z-INDEX 40)
        ========================================================================
      */}
      <div className="relative w-full bg-[#0a0a0c] text-white py-32 sm:py-48 px-6 sm:px-12 lg:px-20 z-40 border-none overflow-hidden select-none">
        {/* Photo Cursor Trail Layer: SPAWNS OVER THE TEXT (zIndex 40) */}
        <CursorTrail zIndex={40} />

        {/* Text Content: Under cursor trail at relative z-10 */}
        <div className="max-w-6xl mx-auto relative z-10 pointer-events-auto">
          {/* Main High-Fashion Editorial Serif Statement (Image 4 Style) */}
          <h2 className="font-serif font-normal text-3xl sm:text-5xl lg:text-[54px] leading-[1.22] tracking-tight text-white/95 mb-20 select-none">
            Our approach combines analogue discipline with a deep understanding of cinematic light, allowing us to create imagery that not only captures attention, but commands an enduring emotional resonance.
          </h2>

          {/* 2-Column Capability / Discipline Rows (Image 4 Style) */}
          <div className="border-t border-white/15 divide-y divide-white/15 text-left font-sans">
            <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4 font-sans font-semibold text-lg sm:text-xl text-white">
                Strategic Creative Direction
              </div>
              <div className="md:col-span-8 font-sans font-normal text-sm sm:text-base text-neutral-300 leading-relaxed">
                Ability to curate the photographic narrative and implement visual aesthetics that not only meet editorial goals, but innovatively transform brand stories into enduring cultural moments with high visual impact.
              </div>
            </div>

            <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4 font-sans font-semibold text-lg sm:text-xl text-white">
                Medium Format &amp; Analogue Craft
              </div>
              <div className="md:col-span-8 font-sans font-normal text-sm sm:text-base text-neutral-300 leading-relaxed">
                Working across medium format digital and 120 film, capturing raw texture, grain, and authentic atmosphere that digital sensors alone cannot replicate, ensuring high differentiation in modern editorial imagery.
              </div>
            </div>

            <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4 font-sans font-semibold text-lg sm:text-xl text-white">
                Exhibition &amp; Fine Art Printmaking
              </div>
              <div className="md:col-span-8 font-sans font-normal text-sm sm:text-base text-neutral-300 leading-relaxed">
                Curating gallery-grade prints, limited-edition monographs, and visual exhibitions with timeless framing, museum-quality color calibration, and uncompromising physical craft.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        3-STEP PINNED GSAP OUTRO CARD: SOLID GREY BASE PLATE & CLEAN "read more"
        ========================================================================
      */}
      <div
        ref={newsContainerRef}
        id="outro-black"
        className="relative w-full h-screen bg-black z-40 flex items-center justify-center overflow-hidden [perspective:1400px] border-none"
      >
        {/* Rotating 3D Card Parent Container */}
        <div
          ref={newsCardRef}
          className="relative w-full max-w-[92vw] h-[80vh] max-h-[760px] rounded-[28px] [transform-style:preserve-3d]"
          style={{
            transformOrigin: 'center center',
            boxShadow: '0 35px 80px rgba(0,0,0,0.95)',
          }}
        >
          {/* FRONT FACE PLANE: Solid Opaque GREY Base Plate (#2d2d34) */}
          <div
            className="absolute inset-0 w-full h-full bg-[#2d2d34] border border-white/20 p-8 sm:p-12 lg:p-14 rounded-[28px] flex flex-col justify-center [transform-style:preserve-3d] select-none"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            {/* Section Heading with 30px depth */}
            <div className="mb-6 sm:mb-8" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-white">
                Latest news from the world of SIMON Photography
              </h2>
            </div>

            {/* 3-Column News Card Grid with 100px 3D Levitation Depth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [transform-style:preserve-3d]">
              {[
                {
                  id: 1,
                  category: 'Denner',
                  title: 'SIMON Studio & Manifesto Visuals: Denner Editorial Series with Granit Xhaka and Terence Hill, Captured Cinematically',
                  image: '/img1.jpg',
                },
                {
                  id: 2,
                  category: 'Migros Gruppe',
                  title: 'New Corporate Photo Identity for the Migros Group',
                  image: '/img2.jpg',
                },
                {
                  id: 3,
                  category: 'Denner',
                  title: 'Denner signs the Easter Bunny as official model for spring photoshoot',
                  image: '/img3.jpg',
                },
              ].map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col bg-[#1e1e22] rounded-xl border border-white/20 overflow-hidden select-none"
                  style={{
                    transform: 'translateZ(100px)',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 50px 100px rgba(0, 0, 0, 0.95), 0 20px 40px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  {/* Card Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center rounded-none transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Card Text Details Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-[#1e1e22]">
                    <div>
                      <span className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="font-sans font-semibold text-base sm:text-lg text-white leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* BACK FACE PLANE: Solid Opaque GREY Base Plate (#2d2d34) with ONLY "scroll more to read" / "read more" */}
          <div
            className="absolute inset-0 w-full h-full bg-[#2d2d34] border border-white/20 rounded-[28px] flex items-center justify-center select-none"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Center Content: ONLY "read more" / "SCROLL MORE TO READ" on Clean Solid Grey Plate */}
            <div ref={newsCtaRef} className="opacity-0 filter blur-lg flex flex-col items-center justify-center gap-3">
              <span
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-serif italic text-5xl sm:text-7xl lg:text-8xl text-white hover:text-neutral-300 transition-colors cursor-pointer tracking-wide drop-shadow-lg"
              >
                read more
              </span>
              <span className="text-xs font-mono tracking-[0.35em] text-neutral-400 uppercase">
                SCROLL MORE TO READ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 50vh Footer Section with 100vw Full-Width Zero-Jitter Infinite Marquee */}
      <footer className="relative w-screen max-w-none bg-black text-white z-40 flex flex-col justify-between items-center border-t border-white/10 py-10 px-0 select-none overflow-hidden left-1/2 -translate-x-1/2">
        {/* Full-Width Edge-to-Edge Zero-Jitter Marquee Track */}
        <div className="w-full flex-1 flex items-center overflow-hidden px-0 mx-0">
          <div className="footer-marquee-track flex whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
            <span className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight text-white/90 shrink-0 px-8">
              MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • &nbsp;
            </span>
            <span className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight text-white/90 shrink-0 px-8">
              MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • &nbsp;
            </span>
          </div>
        </div>

        {/* Bottom Row Bar: Centered Copyright Only */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center pt-6 border-t border-white/10 text-xs sm:text-sm font-mono text-neutral-400 px-6">
          <div>© {new Date().getFullYear()} SIMON Photography. All Rights Reserved.</div>
        </div>
      </footer>
    </section>
  );
}
