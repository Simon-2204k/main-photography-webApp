import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useSplitTextLines(triggerRef, targetsOrSelector, options = {}) {
  const {
    type = 'lines',
    stagger: customStagger,
    duration: customDuration,
    ease = 'power3.out',
    start = 'top 85%',
    delay = 0,
    scrollTrigger = true,
  } = options;

  useEffect(() => {
    const trigger = triggerRef?.current;
    if (!trigger) return;

    let splits = [];
    let tweens = [];
    let lastWidth = window.innerWidth;
    let resizeTimer = null;
    let isDisposed = false;

    const getElements = () => {
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
      return elements;
    };

    const initialElements = getElements();
    initialElements.forEach((el) => {
      if (scrollTrigger) {
        el.style.visibility = 'hidden';
      }
    });

    const setup = () => {
      if (isDisposed) return;

      tweens.forEach((tw) => {
        if (tw && tw.scrollTrigger) tw.scrollTrigger.kill();
        if (tw && tw.kill) tw.kill();
      });
      tweens = [];

      splits.forEach((s) => s && s.revert && s.revert());
      splits = [];

      const elements = getElements();
      if (elements.length === 0) return;

      elements.forEach((el) => {
        if (el.dataset.originalSplitText) {
          el.innerHTML = el.dataset.originalSplitText;
        } else {
          el.dataset.originalSplitText = el.innerHTML;
        }

        if (type === 'chars') {

          const split = new SplitText(el, {
            type: 'lines,words,chars',
            linesClass: 'split-line-mask',
            wordsClass: 'split-word-mask',
            charsClass: 'split-char-child',
          });
          splits.push(split);

          if (!split.chars || split.chars.length === 0) {
            el.style.visibility = 'visible';
            return;
          }

          split.lines.forEach((line) => {
            line.style.overflow = 'hidden';
            line.style.display = 'block';
            line.style.paddingBottom = '0.08em';
            line.style.marginBottom = '-0.08em';
          });

          split.words.forEach((word) => {
            word.style.display = 'inline-block';
            word.style.whiteSpace = 'nowrap';
          });

          split.chars.forEach((char) => {
            char.style.display = 'inline-block';
            char.style.willChange = 'transform, opacity';
          });

          gsap.set(split.chars, {
            yPercent: 110,
            opacity: 0,
          });
          el.style.visibility = 'visible';

          const calcStagger = customStagger !== undefined
            ? customStagger
            : Math.max(0.004, Math.min(0.012, 0.45 / split.chars.length));
          const calcDuration = customDuration !== undefined ? customDuration : 0.38;

          const animConfig = {
            yPercent: 0,
            opacity: 1,
            duration: calcDuration,
            ease: ease,
            stagger: split.chars.length > 1 ? calcStagger : 0,
            delay: delay,
          };

          if (scrollTrigger) {
            animConfig.scrollTrigger = {
              trigger: el,
              start: start,
              once: true,
              markers: false,
              invalidateOnRefresh: true,
            };
          }

          const tw = gsap.to(split.chars, animConfig);
          tweens.push(tw);
        } else if (type === 'words') {

          const split = new SplitText(el, {
            type: 'lines,words',
            linesClass: 'split-line-mask',
            wordsClass: 'split-word-child',
          });
          splits.push(split);

          if (!split.words || split.words.length === 0) {
            el.style.visibility = 'visible';
            return;
          }

          split.lines.forEach((line) => {
            line.style.overflow = 'hidden';
            line.style.display = 'block';
            line.style.paddingBottom = '0.08em';
            line.style.marginBottom = '-0.08em';
          });

          split.words.forEach((word) => {
            word.style.display = 'inline-block';
            word.style.whiteSpace = 'nowrap';
          });

          gsap.set(split.words, {
            yPercent: 110,
            opacity: 0,
          });
          el.style.visibility = 'visible';

          const calcStagger = customStagger !== undefined
            ? customStagger
            : Math.max(0.025, Math.min(0.055, 0.75 / split.words.length));
          const calcDuration = customDuration !== undefined ? customDuration : 0.5;

          const animConfig = {
            yPercent: 0,
            opacity: 1,
            duration: calcDuration,
            ease: ease,
            stagger: split.words.length > 1 ? calcStagger : 0,
            delay: delay,
          };

          if (scrollTrigger) {
            animConfig.scrollTrigger = {
              trigger: el,
              start: start,
              once: true,
              markers: false,
              invalidateOnRefresh: true,
            };
          }

          const tw = gsap.to(split.words, animConfig);
          tweens.push(tw);
        } else {

          const split = new SplitText(el, {
            type: 'lines',
            linesClass: 'split-line-child',
          });
          splits.push(split);

          if (!split.lines || split.lines.length === 0) {
            el.style.visibility = 'visible';
            return;
          }

          split.lines.forEach((line) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'split-line-wrapper';
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            wrapper.style.paddingBottom = '0.08em';
            wrapper.style.marginBottom = '-0.08em';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
            line.style.display = 'block';
            line.style.willChange = 'transform, opacity';
          });

          gsap.set(split.lines, {
            yPercent: 110,
            opacity: 0,
          });
          el.style.visibility = 'visible';

          const calcStagger = customStagger !== undefined
            ? customStagger
            : Math.max(0.065, Math.min(0.12, 0.85 / split.lines.length));
          const calcDuration = customDuration !== undefined ? customDuration : 0.85;

          const animConfig = {
            yPercent: 0,
            opacity: 1,
            duration: calcDuration,
            ease: ease,
            stagger: split.lines.length > 1 ? calcStagger : 0,
            delay: delay,
          };

          if (scrollTrigger) {
            animConfig.scrollTrigger = {
              trigger: el,
              start: start,
              once: true,
              markers: false,
              invalidateOnRefresh: true,
            };
          }

          const tw = gsap.to(split.lines, animConfig);
          tweens.push(tw);
        }
      });

      if (scrollTrigger) {
        ScrollTrigger.refresh();
      }
    };

    const initTimer = setTimeout(() => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          requestAnimationFrame(setup);
        });
      } else {
        requestAnimationFrame(setup);
      }
    }, 60);

    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isDisposed = true;
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      tweens.forEach((tw) => {
        if (tw && tw.scrollTrigger) tw.scrollTrigger.kill();
        if (tw && tw.kill) tw.kill();
      });
      splits.forEach((s) => s && s.revert && s.revert());
    };
  }, [type, customStagger, customDuration, ease, start, delay, scrollTrigger]);
}
