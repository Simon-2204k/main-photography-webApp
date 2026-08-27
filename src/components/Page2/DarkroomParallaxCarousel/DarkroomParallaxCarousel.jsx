import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DarkroomParallaxCarousel.css';

gsap.registerPlugin(ScrollTrigger);

const PAGES = [
  {
    id: 1,
    image: '/assets/page2/images/img1.jpg',
    marquee: 'Cinematic Light, Raw Emotion, and Timeless Framing ',
  },
  {
    id: 2,
    image: '/assets/page2/images/img2.jpg',
    marquee: 'Shadows Define the Depth of Every Story ',
  },
  {
    id: 3,
    image: '/assets/page2/images/img3.jpg',
    marquee: 'Analog Grain, High Contrast, and Vivid Focus ',
  },
  {
    id: 4,
    image: '/assets/page2/images/img4.jpeg',
    marquee: 'Artistry in Canvas, Warm Sunlight, and Brushstrokes ',
  },
  {
    id: 5,
    image: '/assets/page2/images/img5.jpeg',
    marquee: 'Urban Glow, Electric Motion, and Freedom ',
  },
  {
    id: 6,
    image: '/assets/page2/images/img6.jpeg',
    marquee: 'Atmospheric Rays, Velvet Shadows, and Subtle Grace ',
  },
];

export const DarkroomParallaxCarouselComponent = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const timelineBarRef = useRef(null);
  const progressBarRefs = useRef([]);
  const marqueeXRef = useRef(0);
  const scrollDirRef = useRef(1); // 1 = Down (Left), -1 = Up (Right)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const previousProgressRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    progressBarRefs.current = progressBarRefs.current.slice(0, PAGES.length);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const ctx = gsap.context(() => {
      // 1. Update progress bar fill via CSS var --progress
      const updateProgressBars = (progress) => {
        progressBarRefs.current.forEach((barEl, index) => {
          if (!barEl) return;
          const barProgress = Math.min(Math.max(progress * PAGES.length - index, 0), 1);
          barEl.style.setProperty('--progress', barProgress);
        });
      };

      // 2. Initial Setup for First Slide
      const initialSlide = carousel.querySelector('.darkroom-slide');
      if (initialSlide) {
        gsap.set(initialSlide, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        });
        const initialImg = initialSlide.querySelector('.darkroom-slide-img img');
        if (initialImg) {
          gsap.set(initialImg, { y: '0%' });
        }
      }

      // 3. Slide Element Creator
      const createSlideElement = (slideData) => {
        const slide = document.createElement('div');
        slide.className = 'darkroom-slide';
        slide.innerHTML = `
          <div class="darkroom-slide-img">
            <img src="${slideData.image}" alt="" />
          </div>
          <div class="darkroom-slide-copy">
            <div class="darkroom-slide-marquee-wrap">
              <div class="darkroom-marquee-track">
                <span class="darkroom-marquee-text">
                  ${slideData.marquee} ${slideData.marquee} ${slideData.marquee}
                </span>
              </div>
            </div>
          </div>
        `;
        return slide;
      };

      // 4. Bi-directional horizontal marquee engine
      const animateMarquee = () => {
        const containers = carousel.querySelectorAll('.darkroom-marquee-track');
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
        const currentSlide = carousel.querySelector('.darkroom-slide');
        if (!currentSlide) {
          isAnimatingRef.current = false;
          return;
        }

        const newSlideData = PAGES[targetIndex];
        const newSlide = createSlideElement(newSlideData);

        const currentSlideImg = currentSlide.querySelector('.darkroom-slide-img img');
        const currentSlideCopy = currentSlide.querySelector('.darkroom-slide-copy');

        if (!currentSlideImg || !currentSlideCopy) {
          isAnimatingRef.current = false;
          return;
        }

        gsap.killTweensOf(currentSlide);
        gsap.killTweensOf(currentSlideImg);
        gsap.killTweensOf(currentSlideCopy);

        if (isScrollingForward) {
          const newSlideImg = newSlide.querySelector('.darkroom-slide-img img');
          const newSlideCopy = newSlide.querySelector('.darkroom-slide-copy');

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
          const newSlideImg = newSlide.querySelector('.darkroom-slide-img img');
          const newSlideCopy = newSlide.querySelector('.darkroom-slide-copy');

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

      // 6. Pinned ScrollTrigger for Carousel
      ScrollTrigger.create({
        trigger: carousel,
        start: 'top top',
        end: () => `+=${window.innerHeight * 10}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          updateProgressBars(progress);

          if (self.direction !== 0) {
            scrollDirRef.current = self.direction > 0 ? 1 : -1;
          }

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

      return () => {
        gsap.ticker.remove(animateMarquee);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="darkroom-parallax-wrapper">
      {/* Pinned Carousel Container */}
      <div ref={carouselRef} className="darkroom-carousel-container">
        {/* Initial Active Slide */}
        <div className="darkroom-slide">
          <div className="darkroom-slide-img">
            <img src={PAGES[0].image} alt="" />
          </div>

          <div className="darkroom-slide-copy">
            <div className="darkroom-slide-marquee-wrap">
              <div className="darkroom-marquee-track">
                <span className="darkroom-marquee-text">
                  {PAGES[0].marquee} {PAGES[0].marquee} {PAGES[0].marquee}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Multi-Segment Progress Indicator */}
        <div ref={timelineBarRef} className="darkroom-carousel-progress">
          <div className="darkroom-progress-track">
            {PAGES.map((_, idx) => (
              <div
                key={idx}
                ref={(el) => (progressBarRefs.current[idx] = el)}
                className="darkroom-progress-segment"
                style={{ '--progress': '0' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DarkroomParallaxCarousel = memo(DarkroomParallaxCarouselComponent);
export default DarkroomParallaxCarousel;
