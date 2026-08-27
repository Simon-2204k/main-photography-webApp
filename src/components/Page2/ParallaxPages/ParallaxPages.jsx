import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  {
    id: 4,
    image: '/img4.jpeg',
    marquee: 'Artistry in Canvas, Warm Sunlight, and Brushstrokes ',
  },
  {
    id: 5,
    image: '/img5.jpeg',
    marquee: 'Urban Glow, Electric Motion, and Freedom ',
  },
  {
    id: 6,
    image: '/img6.jpeg',
    marquee: 'Atmospheric Rays, Velvet Shadows, and Subtle Grace ',
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

  const newsContainerRef = useRef(null);
  const newsCardRef = useRef(null);
  const newsCtaRef = useRef(null);

  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);
  const pixelCanvasRef = useRef(null);
  const playBtnRef = useRef(null);

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

      // 3. Helper to Create Slide DOM Element
      const createSlideElement = (slideData) => {
        const slide = document.createElement('div');
        slide.className = 'slide absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-center items-center pointer-events-none select-none z-10';
        slide.innerHTML = `
          <div class="slide-img absolute inset-0 w-full h-full overflow-hidden z-0">
            <img src="${slideData.image}" alt="" class="w-full h-full object-cover object-center transform scale-100 opacity-100 will-change-transform" />
          </div>
          <div class="slide-copy absolute inset-0 flex items-center justify-center w-full overflow-hidden z-20 pointer-events-auto">
            <div class="slide-marquee w-full overflow-hidden">
              <div class="marquee-container w-[1000%] flex whitespace-nowrap gap-12 will-change-transform">
                <span class="font-sans font-extrabold text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] leading-none text-white tracking-tight shrink-0 transition-colors duration-300 cursor-pointer pointer-events-auto hover:scale-[1.04]" onmouseenter="this.style.color='transparent'; this.style.webkitTextStroke='1.5px rgba(255, 255, 255, 0.9)';" onmouseleave="this.style.color='#ffffff'; this.style.webkitTextStroke='0px transparent';">
                  ${slideData.marquee} ${slideData.marquee} ${slideData.marquee}
                </span>
              </div>
            </div>
          </div>
        `;
        return slide;
      };

      // 4. gsap.utils.wrap Bi-Directional Infinite Marquee Engine (Scroll Down -> Left, Scroll Up -> Right)
      const animateMarquee = () => {
        const containers = carousel.querySelectorAll('.marquee-container');
        if (!containers.length) return;

        const step = 0.09 * scrollDirRef.current;
        marqueeXRef.current -= step;

        const wrappedX = gsap.utils.wrap(-33.33, 0, marqueeXRef.current);

        containers.forEach((container) => {
          gsap.set(container, { xPercent: wrappedX });
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

          gsap.to([newSlideImg, newSlideCopy], {
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

      // 6. Codegrid Pinned ScrollTrigger (.carousel)
      ScrollTrigger.create({
        trigger: carouselRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 14}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          updateProgressBars(progress);

          // Update scroll direction instantly (1 = Scroll Down -> Left, -1 = Scroll Up -> Right)
          if (self.direction !== 0) {
            scrollDirRef.current = self.direction > 0 ? 1 : -1;
          }

          // Timeline Bar Visibility: Hidden before Carousel, Visible during Carousel & Beyond
          if (timelineBarRef.current) {
            const isAtOrPastStart = self.scroll() >= self.start;
            timelineBarRef.current.style.opacity = isAtOrPastStart ? '1' : '0';
          }

          if (isAnimatingRef.current) {
            previousProgressRef.current = progress;
            return;
          }

          const isScrollingForward = progress > previousProgressRef.current;
          const targetSlideIndex = Math.min(Math.floor(progress * PAGES.length), PAGES.length - 1);

          if (targetSlideIndex !== activeIndexRef.current) {
            isAnimatingRef.current = true;

            try {
              createAndAnimateSlide(targetSlideIndex, isScrollingForward);
              activeIndexRef.current = targetSlideIndex;
            } catch (err) {
              isAnimatingRef.current = false;
            }
          }

          previousProgressRef.current = progress;
        },
      });

      // 7. 3-Step 3D Card Flip GSAP Pinned Timeline Engine for SIMON Photography News Outro
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

        // Step 1: Scale down from full screen (1 -> 0.75) and round corners (0px -> 28px) simultaneously
        outroTl.to(newsCard, {
          scale: 0.75,
          borderRadius: '28px',
          duration: 1.2,
          ease: 'power2.inOut',
        });

        // Step 2: 3D Flip 180 degrees on Y-axis (Flips front face away & reveals back face)
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

      // 8. One-Time Hyperactive Random Square Block GSAP Reveal for Final Full-Screen Video Page
      const videoSection = videoSectionRef.current;
      const gridTiles = videoSection?.querySelectorAll('.video-grid-tile');

      if (videoSection && gridTiles && gridTiles.length) {
        gsap.to(gridTiles, {
          opacity: 0,
          duration: 0.1,
          ease: 'steps(1)',
          stagger: {
            amount: 1.2,
            from: 'random',
          },
          scrollTrigger: {
            trigger: videoSection,
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }

      // 9. Infinite Left-to-Right Marquee for Footer
      const footerMarquee = containerRef.current?.querySelector('.footer-marquee-container');
      if (footerMarquee) {
        let xPos = -50;
        const animateFooterMarquee = () => {
          xPos += 0.12;
          if (xPos >= 0) xPos = -50;
          gsap.set(footerMarquee, { xPercent: xPos });
        };
        gsap.ticker.add(animateFooterMarquee);
      }

      return () => {
        gsap.ticker.remove(animateMarquee);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePlayBtnMouseMove = (e) => {
    const btn = playBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 1.8;
    const deltaY = (e.clientY - centerY) * 1.8;
    const distance = Math.hypot(deltaX, deltaY);
    const maxDist = 160;
    const factor = distance > maxDist ? maxDist / distance : 1;
    const x = deltaX * factor;
    const y = deltaY * factor;
    gsap.to(btn, { x, y, duration: 0.8, ease: 'elastic.out(1.8, 0.25)' });
  };

  const handlePlayBtnMouseLeave = () => {
    const btn = playBtnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(2, 0.2)' });
  };

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

          <div className="slide-copy absolute inset-0 flex items-center justify-center w-full overflow-hidden z-20 pointer-events-auto">
            <div className="slide-marquee w-full overflow-hidden">
              <div className="marquee-container w-[1000%] flex whitespace-nowrap gap-12 will-change-transform">
                <span
                  className="font-sans font-extrabold text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] leading-none text-white tracking-tight shrink-0 transition-colors duration-300 cursor-pointer pointer-events-auto hover:scale-[1.04]"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.WebkitTextStroke = '1.5px rgba(255, 255, 255, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.WebkitTextStroke = '0px transparent';
                  }}
                >
                  {PAGES[0].marquee} {PAGES[0].marquee} {PAGES[0].marquee}
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
          <div className="w-full max-w-6xl mx-auto flex items-center gap-4 sm:gap-6">
            {PAGES.map((_, idx) => (
              <div
                key={idx}
                ref={(el) => (progressBarRefs.current[idx] = el)}
                className="progress-bar flex-1 h-[2px] bg-white/20 overflow-hidden relative backdrop-blur-sm rounded-full"
                style={{ '--progress': '0' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transitional Bio Statement Section with All 5 GIF Capsules & Culture-driven Typography */}
      <div className="relative w-full bg-black text-white py-32 sm:py-48 px-6 sm:px-12 lg:px-20 z-40 border-none">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-sans font-normal text-3xl sm:text-5xl lg:text-[52px] leading-[1.2] tracking-tight text-white select-none">
            Hi, I'm <span className="font-extrabold text-white">SIMON</span>.{' '}
            <span className="inline-flex align-middle mx-2 my-1 h-14 sm:h-20 lg:h-24 w-28 sm:w-44 lg:w-56 rounded-full border-none shadow-none overflow-hidden align-baseline transform hover:scale-105 transition-transform duration-300">
              <img
                src="/gifFolder/Camera Recording GIF by Amy Winehouse.gif"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </span>{' '}
            I believe that every great photograph is a blend of technical precision{' '}
            <span className="inline-flex align-middle mx-2 my-1 h-14 sm:h-20 lg:h-24 w-28 sm:w-44 lg:w-56 rounded-full border-none shadow-none overflow-hidden align-baseline transform hover:scale-105 transition-transform duration-300">
              <img
                src="/gifFolder/Fun Photography GIF by 2TON Agency.gif"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </span>{' '}
            and raw emotion. Whether I'm chasing the perfect natural light{' '}
            <span className="inline-flex align-middle mx-2 my-1 h-14 sm:h-20 lg:h-24 w-28 sm:w-44 lg:w-56 rounded-full border-none shadow-none overflow-hidden align-baseline transform hover:scale-105 transition-transform duration-300">
              <img
                src="/gifFolder/Photography Photo GIF by A$AP NAST.gif"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </span>{' '}
            or meticulously setting up a studio shoot, my goal is to capture the authentic essence of my subjects. When I don't have a camera in my hand,{' '}
            <span className="inline-flex align-middle mx-2 my-1 h-14 sm:h-20 lg:h-24 w-28 sm:w-44 lg:w-56 rounded-full border-none shadow-none overflow-hidden align-baseline transform hover:scale-105 transition-transform duration-300">
              <img
                src="/gifFolder/Photography Photo GIF by Reconnecting Roots.gif"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </span>{' '}
            I'm usually exploring new hiking trails or tweaking digital frontend experiences{' '}
            <span className="inline-flex align-middle mx-2 my-1 h-14 sm:h-20 lg:h-24 w-28 sm:w-44 lg:w-56 rounded-full border-none shadow-none overflow-hidden align-baseline transform hover:scale-105 transition-transform duration-300">
              <img
                src="/gifFolder/Toronto International Film Festival Camera GIF by TIFF.gif"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </span>
            . Take a look around, and let's create something beautiful together.
          </h2>
        </div>
      </div>

      {/* 3-Step Pinned GSAP Outro Section Page (Pins 100% Steady at top top, Pure Black & Borderless) */}
      <div
        ref={newsContainerRef}
        id="outro-black"
        className="relative w-full h-screen bg-black z-40 flex items-center justify-center overflow-hidden [perspective:1200px] border-none"
      >
        {/* Glossy Parent 3D Card Div (Scales down 1 -> 0.75 & Flips 180deg on Y-axis) */}
        <div
          ref={newsCardRef}
          className="relative w-full max-w-[92vw] bg-black border-none shadow-none p-8 sm:p-12 lg:p-14 overflow-visible rounded-none [transform-style:preserve-3d]"
          style={{ transformOrigin: 'center center' }}
        >
          {/* FRONT FACE: Heading + 3 News Cards Grid */}
          <div className="w-full flex flex-col justify-center [backface-visibility:hidden]">
            {/* Section Heading */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-white">
                Latest news from the world of SIMON Photography
              </h2>
            </div>

            {/* 3-Column News Card Grid with 10px Gap, Sharp Rectangular Corners, 0 Hover Effects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
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
                  className="flex flex-col bg-[#1c1c1c] rounded-none border-none overflow-hidden select-none"
                >
                  {/* Card Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900 rounded-none">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center rounded-none"
                    />
                  </div>

                  {/* Card Text Details Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
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

          {/* BACK FACE: Placed directly on back of card [rotateY(180deg)], holding the Video CTA Button */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black border-none rounded-[28px] p-8 [backface-visibility:hidden]"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div ref={newsCtaRef} className="opacity-0 filter blur-lg flex flex-col items-center gap-6">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
                Exclusive Content
              </span>
              <button className="flex items-center gap-4 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-none hover:bg-neutral-200 transition-colors">
                <span>[WATCH THE PHOTOGRAPHY TIPS VIDEO]</span>
                <span className="text-lg">▶</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final Full-Screen Video Page with 50px Margin Inset, 100% Perfect Square Grid Tile GSAP Reveal & Magnetic Elastic Play Button */}
      <div
        ref={videoSectionRef}
        id="video-outro"
        className="relative w-full h-screen bg-black z-40 p-6 sm:p-10 lg:p-[50px] select-none flex items-center justify-center"
      >
        <div className="relative w-full h-full bg-black rounded-[24px] overflow-hidden border border-white/10 shadow-none flex items-center justify-center">
          {/* Piece-by-Piece Staggered 100% Perfect Square Grid Tile Overlay Matrix */}
          <div className="absolute inset-0 w-full h-full grid grid-cols-10 sm:grid-cols-12 md:grid-cols-14 grid-rows-6 sm:grid-rows-8 z-30 pointer-events-none overflow-hidden bg-transparent">
            {[...Array(112)].map((_, i) => (
              <div key={i} className="video-grid-tile w-full h-full bg-black rounded-none border-none opacity-100" />
            ))}
          </div>

          {/* Background Video (100% Brightness & Opacity) */}
          <video
            ref={videoRef}
            src="/video/These are the only shots you will ever need..mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10 rounded-[24px]"
          />

          {/* Bottom-Left SIMON Photography Quote */}
          <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-12 lg:left-16 z-40 max-w-2xl text-white select-none">
            <blockquote className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-white mb-4">
              "If you want long-term visual impact, there's only one frame to capture. Here. Period. End of story. Amen."
            </blockquote>
            <div className="font-sans text-sm sm:text-base font-semibold text-neutral-300">
              SIMON <span className="font-normal text-neutral-400">— Founder & Lead Photographer, SIMON Photography</span>
            </div>
          </div>

          {/* Center-Right Play Button Badge (Static Positioning, No Magnetic Tracking) */}
          <div className="absolute top-1/2 right-12 sm:right-24 lg:right-32 -translate-y-1/2 z-40 p-12">
            <button
              ref={playBtnRef}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/40 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-white hover:text-black hover:scale-110 shadow-none"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl ml-1 text-white hover:text-black">▶</span>
            </button>
          </div>
        </div>
      </div>

      {/* 50vh Footer Section with Infinite Left-to-Right Marquee ("MADE BY SIMON") */}
      <footer className="relative w-full h-[50vh] bg-black text-white z-40 flex flex-col justify-between items-center border-t border-white/10 py-10 px-6 sm:px-12 select-none overflow-hidden">
        {/* Center Row: Infinite Left-to-Right Marquee Container */}
        <div className="w-full flex-1 flex items-center overflow-hidden">
          <div className="footer-marquee-container w-[400%] flex whitespace-nowrap gap-12 will-change-transform">
            <span className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight text-white/90 shrink-0">
              MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON •
            </span>
            <span className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-[115px] xl:text-[130px] leading-none uppercase tracking-tight text-white/90 shrink-0">
              MADE BY SIMON • MADE BY SIMON • MADE BY SIMON • MADE BY SIMON •
            </span>
          </div>
        </div>

        {/* Bottom Row Bar: Copyright & Back-to-Top Button */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-6 border-t border-white/10 text-xs sm:text-sm font-mono text-neutral-400">
          <div>© {new Date().getFullYear()} SIMON Photography. All Rights Reserved.</div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
          >
            <span>BACK TO TOP</span>
            <span className="text-base">↑</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
