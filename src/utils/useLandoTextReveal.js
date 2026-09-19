import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import '../styles/landoTextReveal.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * useLandoTextReveal
 * 
 * Lando Norris Text Cover Reveal Animation:
 * 1. Dynamically calculates lines across phone, tablet (including 1024x1366 / 1204x1366), and desktop.
 * 2. Wraps each line in .lando-line-wrapper with an overlay .lando-line-cover.
 * 3. Initial state: scaleX: 1 (covering line).
 * 4. Animates: scaleX: 0, transformOrigin: 'right center', ease: 'power4.inOut'.
 * 5. Trigger: fires when each element crosses start (default 'top 80%') of window height individually.
 * 6. Animates once only (once: true).
 * 7. Zero markers (markers: false).
 * 8. Dual color system: 'dark' (#ffffff cover on black bg) vs 'light' (#000000 cover on white bg).
 */
export function useLandoTextReveal(triggerRef, targetsOrSelector, options = {}) {
  const {
    theme = 'dark', // 'dark' = white cover (#ffffff), 'light' = black cover (#000000)
    start = 'top 80%',
    duration = 0.4,
    stagger = 0.04,
    ease = 'power1.out',
    delay = 0,
    scrollTrigger = true,
    individualTrigger = true,
    playRef = null,
  } = options;

  useEffect(() => {
    const trigger = triggerRef?.current;
    if (!trigger) return;

    let splits = [];
    let covers = [];
    let activeTweens = [];
    let hasAnimated = false;
    let lastWidth = window.innerWidth;
    let resizeTimer = null;
    let isDisposed = false;

    const setupReveal = () => {
      if (isDisposed) return;

      // Clean up previous animations & splits
      activeTweens.forEach((tw) => {
        if (tw && tw.scrollTrigger) tw.scrollTrigger.kill();
        if (tw && tw.kill) tw.kill();
      });
      activeTweens = [];

      splits.forEach((s) => s && s.revert && s.revert());
      splits = [];
      covers = [];

      // Determine target elements
      let elements = [];
      if (typeof targetsOrSelector === 'string') {
        elements = Array.from(trigger.querySelectorAll(targetsOrSelector));
      } else if (Array.isArray(targetsOrSelector)) {
        targetsOrSelector.forEach((target) => {
          if (!target) return;
          if (typeof target === 'string') {
            const found = Array.from(trigger.querySelectorAll(target));
            elements.push(...found);
          } else if (target.current) {
            elements.push(target.current);
          } else if (target instanceof HTMLElement) {
            elements.push(target);
          }
        });
      } else if (targetsOrSelector?.current) {
        elements = [targetsOrSelector.current];
      } else if (targetsOrSelector instanceof HTMLElement) {
        elements = [targetsOrSelector];
      } else if (!targetsOrSelector) {
        elements = [trigger];
      }

      if (elements.length === 0) return;

      // Split each element into lines dynamically
      const elementData = [];

      elements.forEach((el) => {
        // Cache original innerHTML to revert cleanly on resize
        if (el.dataset.originalLando) {
          el.innerHTML = el.dataset.originalLando;
        } else {
          el.dataset.originalLando = el.innerHTML;
        }

        const split = new SplitText(el, {
          type: 'lines',
          linesClass: 'lando-line',
        });
        splits.push(split);

        const elCovers = [];
        split.lines.forEach((line) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'lando-line-wrapper';

          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);

          const cover = document.createElement('div');
          cover.className = `lando-line-cover ${theme === 'light' ? 'light' : 'dark'}`;
          wrapper.appendChild(cover);

          elCovers.push(cover);
          covers.push(cover);
        });

        elementData.push({
          el,
          covers: elCovers,
          lines: split.lines.length,
        });
      });

      if (covers.length === 0) return;

      // If already animated, keep revealed state
      if (hasAnimated) {
        gsap.set(covers, { scaleX: 0 });
        return;
      }

      // Initial state: fully covered
      gsap.set(covers, { scaleX: 1, transformOrigin: 'left center' });

      const playReveal = () => {
        if (hasAnimated || covers.length === 0) return;
        hasAnimated = true;
        const tw = gsap.to(covers, {
          scaleX: 0,
          duration: duration,
          ease: ease,
          stagger: stagger,
          delay: delay,
          transformOrigin: 'right center',
        });
        activeTweens.push(tw);
      };

      if (playRef) {
        playRef.current = playReveal;
      }

      if (scrollTrigger) {
        if (individualTrigger && elementData.length > 0) {
          // Animate each element individually when THAT element enters the viewport
          elementData.forEach((item) => {
            const itemStagger = item.lines > 1 ? stagger : 0;
            const tw = gsap.to(item.covers, {
              scaleX: 0,
              duration: duration,
              ease: ease,
              stagger: itemStagger,
              delay: delay,
              transformOrigin: 'right center',
              scrollTrigger: {
                trigger: item.el,
                start: start,
                once: true,
                markers: false,
                invalidateOnRefresh: true,
              },
            });
            activeTweens.push(tw);
          });
        } else {
          // Animate bundled to parent trigger
          const totalLines = elementData.reduce((sum, item) => sum + item.lines, 0);
          const tw = gsap.to(covers, {
            scaleX: 0,
            duration: duration,
            ease: ease,
            stagger: totalLines > 1 ? stagger : 0,
            delay: delay,
            transformOrigin: 'right center',
            scrollTrigger: {
              trigger: trigger,
              start: start,
              once: true,
              markers: false,
              invalidateOnRefresh: true,
              onEnter: () => {
                hasAnimated = true;
              },
            },
          });
          activeTweens.push(tw);
        }

        ScrollTrigger.refresh();
      }
    };

    // Ensure layout and fonts are ready before running SplitText
    const initTimer = setTimeout(() => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          requestAnimationFrame(setupReveal);
        });
      } else {
        requestAnimationFrame(setupReveal);
      }
    }, 120);

    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupReveal();
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isDisposed = true;
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      activeTweens.forEach((tw) => {
        if (tw && tw.scrollTrigger) tw.scrollTrigger.kill();
        if (tw && tw.kill) tw.kill();
      });
      splits.forEach((s) => s && s.revert && s.revert());
    };
  }, [theme, start, duration, stagger, ease, delay, individualTrigger]);
}
