import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { TRAIL_IMAGES } from '../../../data/page1/trailImagesData';
import { globalImageCache } from '../../../utils/imagePreloadCache';

const IMAGE_SIZE = 200; // Crisp 200px display size
const DISTANCE_THRESHOLD = 30; // Min px distance during mouse movement to trigger image
const MAX_TRAIL_IMAGES = 14; // Strict FIFO queue limit of 14 images
const FAST_IDLE_SPAWN_INTERVAL = 150; // High-speed spawn rate when mouse STOPS inside container (150ms)
const MIN_LIFETIME_MS = 1000; // 1 second minimum visible time

export const CursorTrailComponent = ({ zIndex = 2 }) => {
  const containerRef = useRef(null);
  const clientPosRef = useRef({ x: -9999, y: -9999 });
  const lastSpawnPosRef = useRef({ x: -9999, y: -9999 });
  const isInsideRef = useRef(false);
  const isMouseMovingRef = useRef(false);
  const moveStopTimeoutRef = useRef(null);
  const idleFastTimerRef = useRef(null);
  const imageIndexRef = useRef(0);
  const trailQueueRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const parent = container.parentElement || container;

    const removeOldestImage = () => {
      if (trailQueueRef.current.length === 0) return;
      const oldestItem = trailQueueRef.current.shift();
      if (!oldestItem || !oldestItem.el) return;

      const { el, createdAt } = oldestItem;
      const ageMs = Date.now() - createdAt;
      const delayMs = Math.max(0, MIN_LIFETIME_MS - ageMs);

      gsap.to(el, {
        opacity: 0,
        scale: 0.75,
        duration: 0.45,
        delay: delayMs / 1000,
        ease: "power4.in",
        onComplete: () => {
          if (el.parentNode === container) {
            container.removeChild(el);
          }
        }
      });
    };

    const spawnImage = (x, y) => {
      if (trailQueueRef.current.length >= MAX_TRAIL_IMAGES) {
        removeOldestImage();
      }

      const currentImgObj = TRAIL_IMAGES[imageIndexRef.current % TRAIL_IMAGES.length];
      imageIndexRef.current += 1;

      const imgEl = document.createElement('img');
      imgEl.src = currentImgObj.url;
      imgEl.alt = "cursor trail asset";
      imgEl.style.position = 'absolute';
      imgEl.style.top = '0px';
      imgEl.style.left = '0px';
      imgEl.style.pointerEvents = 'none';
      imgEl.style.borderRadius = '0px';
      imgEl.style.objectFit = 'cover';
      imgEl.style.aspectRatio = '1 / 1';
      imgEl.style.width = `${IMAGE_SIZE}px`;
      imgEl.style.height = `${IMAGE_SIZE}px`;
      imgEl.style.willChange = 'transform, opacity';
      imgEl.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.55)';

      container.appendChild(imgEl);

      const randomRotation = (Math.random() - 0.5) * 22;

      // Absolute coordinates inside container coordinate space
      gsap.set(imgEl, {
        x: x - IMAGE_SIZE / 2,
        y: y - IMAGE_SIZE / 2,
        rotation: randomRotation,
        scale: 0.85,
        opacity: 1,
        zIndex: 1
      });

      gsap.to(imgEl, {
        scale: 1,
        duration: 0.2,
        ease: "power4.out"
      });

      const item = { el: imgEl, createdAt: Date.now() };
      trailQueueRef.current.push(item);
      lastSpawnPosRef.current = { x, y };

      setTimeout(() => {
        const index = trailQueueRef.current.findIndex(i => i.el === imgEl);
        if (index !== -1) {
          trailQueueRef.current.splice(index, 1);
          gsap.to(imgEl, {
            opacity: 0,
            scale: 0.75,
            duration: 0.45,
            ease: "power4.in",
            onComplete: () => {
              if (imgEl.parentNode === container) {
                container.removeChild(imgEl);
              }
            }
          });
        }
      }, MIN_LIFETIME_MS);
    };

    const startHighSpeedIdleTimer = () => {
      if (idleFastTimerRef.current) return;
      idleFastTimerRef.current = setInterval(() => {
        if (isInsideRef.current && !isMouseMovingRef.current) {
          const { x, y } = clientPosRef.current;
          if (x >= 0 && y >= 0) {
            spawnImage(x, y);
          }
        }
      }, FAST_IDLE_SPAWN_INTERVAL);
    };

    const stopHighSpeedIdleTimer = () => {
      if (idleFastTimerRef.current) {
        clearInterval(idleFastTimerRef.current);
        idleFastTimerRef.current = null;
      }
    };

    const handleMouseEnter = (e) => {
      isInsideRef.current = true;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      clientPosRef.current = { x, y };
      spawnImage(x, y);
    };

    const handleMouseLeave = () => {
      isInsideRef.current = false;
      isMouseMovingRef.current = false;
      stopHighSpeedIdleTimer();
      if (moveStopTimeoutRef.current) clearTimeout(moveStopTimeoutRef.current);
    };

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const { clientX, clientY } = e;

      // Strict parent boundary check
      const isInParent = (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );

      if (!isInParent) {
        if (isInsideRef.current) {
          handleMouseLeave();
        }
        return;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (!isInsideRef.current) {
        handleMouseEnter(e);
      }

      isInsideRef.current = true;
      isMouseMovingRef.current = true;
      stopHighSpeedIdleTimer();

      clientPosRef.current = { x, y };

      const dx = x - lastSpawnPosRef.current.x;
      const dy = y - lastSpawnPosRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= DISTANCE_THRESHOLD || trailQueueRef.current.length === 0) {
        spawnImage(x, y);
      }

      if (moveStopTimeoutRef.current) clearTimeout(moveStopTimeoutRef.current);
      moveStopTimeoutRef.current = setTimeout(() => {
        isMouseMovingRef.current = false;
        if (isInsideRef.current) {
          startHighSpeedIdleTimer();
        }
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      stopHighSpeedIdleTimer();
      if (moveStopTimeoutRef.current) clearTimeout(moveStopTimeoutRef.current);

      trailQueueRef.current.forEach(({ el }) => {
        gsap.killTweensOf(el);
        if (el.parentNode === container) container.removeChild(el);
      });
      trailQueueRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: zIndex
      }}
    />
  );
};
export const CursorTrail = memo(CursorTrailComponent);
export default CursorTrail;
