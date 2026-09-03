import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CursorTrail } from '../../Page1/CursorTrail/CursorTrail';

gsap.registerPlugin(ScrollTrigger);

const PAGES = [
  {
    id: 1,
    image: '/img1.jpg',
    marquee: 'Cinematic Light, Raw Emotion, and Timeless Framing ',
  },
  {
    id: 2,
    image: '/img2.jpg',
    marquee: 'Shadows Define the Depth of Every Story ',
  },
  {
    id: 3,
    image: '/img3.jpg',
    marquee: 'Analog Grain, High Contrast, and Vivid Focus ',
  },
];

export default function ParallaxPages() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const timelineBarRef = useRef(null);
  const progressBarRefs = useRef([]);
  const marqueeXRef = useRef(0);
  const scrollDirRef = useRef(1); // 1 = Scroll Down (Left), -1 = Scroll Up (Right)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const previousProgressRef = useRef(0);
  const isAnimatingRef = useRef(false);


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

      // 3. Helper to Create Slide DOM Element with Camera HUD Overlay
      const createSlideElement = (slideData) => {
        const slide = document.createElement('div');
        slide.className = 'slide absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-center items-center pointer-events-none select-none z-10';
        slide.innerHTML = `
          <div class="slide-img absolute inset-0 w-full h-full overflow-hidden z-0">
            <img src="${slideData.image}" alt="" class="w-full h-full object-cover object-center transform scale-100 opacity-100 will-change-transform" />
          </div>

          <!-- Camera Viewfinder HUD Overlay (Image 3) -->
          <div class="slide-hud absolute inset-0 pointer-events-none z-30 p-6 sm:p-10 lg:p-14 flex flex-col justify-between select-none">
            <!-- Top HUD Bar -->
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

            <!-- Bottom HUD Bar -->
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
            <div class="slide-marquee w-full overflow-hidden py-16 sm:py-24 lg:py-28 flex items-center">
              <div class="marquee-track flex whitespace-nowrap will-change-transform" style="width: max-content;">
                <div class="marquee-group flex items-center shrink-0 pr-8">
                  <span class="marquee-text font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[120px] leading-[1.4] py-4 text-white tracking-tight shrink-0 transition-colors duration-300 cursor-pointer pointer-events-auto" onmouseenter="this.style.color='transparent'; this.style.webkitTextStroke='1.5px rgba(255, 255, 255, 0.9)';" onmouseleave="this.style.color='#ffffff'; this.style.webkitTextStroke='0px transparent';">
                    ${slideData.marquee} • ${slideData.marquee} • &nbsp;
                  </span>
                </div>
                <div class="marquee-group flex items-center shrink-0 pr-8">
                  <span class="marquee-text font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[120px] leading-[1.4] py-4 text-white tracking-tight shrink-0 transition-colors duration-300 cursor-pointer pointer-events-auto" onmouseenter="this.style.color='transparent'; this.style.webkitTextStroke='1.5px rgba(255, 255, 255, 0.9)';" onmouseleave="this.style.color='#ffffff'; this.style.webkitTextStroke='0px transparent';">
                    ${slideData.marquee} • ${slideData.marquee} • &nbsp;
                  </span>
                </div>
              </div>
            </div>
          </div>
        `;
        return slide;
      };

      // 4. Infinite Zero-Jitter Marquee Engine (100% Mathematically Seamless Wrap at -50%)
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

      return () => {
        gsap.ticker.remove(animateMarquee);
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
            <div className="slide-marquee w-full overflow-hidden py-16 sm:py-24 lg:py-28 flex items-center">
              <div className="marquee-track flex whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
                <div className="marquee-group flex items-center shrink-0 pr-8">
                  <span
                    className="marquee-text font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[120px] leading-[1.4] py-4 text-white tracking-tight shrink-0 transition-colors duration-300 cursor-pointer pointer-events-auto"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'transparent';
                      e.currentTarget.style.WebkitTextStroke = '1.5px rgba(255, 255, 255, 0.9)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.WebkitTextStroke = '0px transparent';
                    }}
                  >
                    {PAGES[0].marquee} • {PAGES[0].marquee} • &nbsp;
                  </span>
                </div>
                <div className="marquee-group flex items-center shrink-0 pr-8">
                  <span
                    className="marquee-text font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[120px] leading-[1.4] py-4 text-white tracking-tight shrink-0 transition-colors duration-300 cursor-pointer pointer-events-auto"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'transparent';
                      e.currentTarget.style.WebkitTextStroke = '1.5px rgba(255, 255, 255, 0.9)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.WebkitTextStroke = '0px transparent';
                    }}
                  >
                    {PAGES[0].marquee} • {PAGES[0].marquee} • &nbsp;
                  </span>
                </div>
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
    </section>
  );
}
