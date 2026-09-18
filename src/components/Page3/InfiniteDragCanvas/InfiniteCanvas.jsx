import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { STAMPS } from './stamps';
import { StampCard } from './StampCard';

export const InfiniteCanvas = ({ isExpanded, onToggleExpand }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [imagesReady, setImagesReady] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const panRef = useRef({ x: 0, y: 0 });
  const targetPanRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const startPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const animFrameRef = useRef(null);

  const mousePosRef = useRef({ normX: 0, normY: 0 });
  const mouseTiltRef = useRef({ x: 0, y: 0 });

  const spreadProgressRef = useRef({ value: 0 });
  const smoothProgressRef = useRef(0);

  const [gridDimensions, setGridDimensions] = useState(() => {
    if (typeof window === 'undefined') return { cellWidth: 340, cellHeight: 400 };
    if (window.innerWidth <= 640) return { cellWidth: 195, cellHeight: 245 };
    if (window.innerWidth <= 1024) return { cellWidth: 255, cellHeight: 315 };
    return { cellWidth: 340, cellHeight: 400 };
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setGridDimensions({ cellWidth: 195, cellHeight: 245 });
      } else if (window.innerWidth <= 1024) {
        setGridDimensions({ cellWidth: 255, cellHeight: 315 });
      } else {
        setGridDimensions({ cellWidth: 340, cellHeight: 400 });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cols = 6;
  const rows = 6;
  const { cellWidth, cellHeight } = gridDimensions;
  const gridWidth = cols * cellWidth;
  const gridHeight = rows * cellHeight;

  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  useEffect(() => {
    let isSubscribed = true;
    const preloads = STAMPS.map((stamp) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = stamp.thumbSrc;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(preloads).then(() => {
      if (isSubscribed) {
        setImagesReady(true);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;

      mousePosRef.current = {
        normX: (e.clientX - halfW) / halfW,
        normY: (e.clientY - halfH) / halfH
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gridItems = useMemo(() => {
    const totalSlots = cols * rows;
    const items = [];

    for (let i = 0; i < totalSlots; i++) {
      const stamp = STAMPS[i % STAMPS.length];
      const col = i % cols;
      const row = Math.floor(i / cols);

      const baseX = col * cellWidth - gridWidth / 2 + cellWidth / 2;
      const baseY = row * cellHeight - gridHeight / 2 + cellHeight / 2;

      const seed = i + 1;
      const offsetX = Math.sin(seed * 73) * 35;
      const offsetY = Math.cos(seed * 59) * 35;

      const stackRot = Math.sin(seed * 17) * 16;
      const stackOffsetX = Math.sin(seed * 29) * 8;
      const stackOffsetY = Math.cos(seed * 43) * 8;
      const stackScale = 1 - Math.min(i * 0.006, 0.18);

      items.push({
        id: `grid-item-${i}`,
        stamp,
        baseX: baseX + offsetX,
        baseY: baseY + offsetY,
        stackRot,
        stackOffsetX,
        stackOffsetY,
        stackScale
      });
    }

    return items;
  }, [cols, rows, cellWidth, cellHeight, gridWidth, gridHeight]);

  const handlePointerDown = (e) => {
    if (!isExpanded) return;
    if (e.target.closest('button')) return;

    isDraggingRef.current = true;
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !isExpanded || e.buttons !== 1) {
      isDraggingRef.current = false;
      return;
    }

    const dx = e.clientX - startPointerRef.current.x;
    const dy = e.clientY - startPointerRef.current.y;

    targetPanRef.current.x += dx;
    targetPanRef.current.y += dy;

    startPointerRef.current = { x: e.clientX, y: e.clientY };

    const now = performance.now();
    const dt = Math.max(now - lastPointerRef.current.time, 16);
    velocityRef.current.x = ((e.clientX - lastPointerRef.current.x) / dt) * 16;
    velocityRef.current.y = ((e.clientY - lastPointerRef.current.y) / dt) * 16;

    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: now };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleGlobalUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointerup', handleGlobalUp);
    window.addEventListener('pointercancel', handleGlobalUp);
    window.addEventListener('blur', handleGlobalUp);

    return () => {
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('pointercancel', handleGlobalUp);
      window.removeEventListener('blur', handleGlobalUp);
    };
  }, []);

  useEffect(() => {
    const updatePositions = () => {
      const time = performance.now();

      const targetP = spreadProgressRef.current.value;
      smoothProgressRef.current += (targetP - smoothProgressRef.current) * 0.15;
      const p = smoothProgressRef.current;

      const targetTiltX = mousePosRef.current.normX * 8;
      const targetTiltY = mousePosRef.current.normY * 8;
      mouseTiltRef.current.x += (targetTiltX - mouseTiltRef.current.x) * 0.1;
      mouseTiltRef.current.y += (targetTiltY - mouseTiltRef.current.y) * 0.1;

      if (isExpanded && p > 0.05) {
        if (!isDraggingRef.current) {
          targetPanRef.current.x += velocityRef.current.x;
          targetPanRef.current.y += velocityRef.current.y;

          velocityRef.current.x *= 0.88;
          velocityRef.current.y *= 0.88;
        }

        panRef.current.x += (targetPanRef.current.x - panRef.current.x) * 0.18;
        panRef.current.y += (targetPanRef.current.y - panRef.current.y) * 0.18;
      }

      const halfW = gridWidth / 2;
      const halfH = gridHeight / 2;

      gridItems.forEach((item, index) => {
        const cardEl = cardsRef.current[index];
        if (!cardEl) return;

        const rawX = item.baseX + panRef.current.x;
        const rawY = item.baseY + panRef.current.y;

        const wrappedX = (((rawX + halfW) % gridWidth) + gridWidth) % gridWidth - halfW;
        const wrappedY = (((rawY + halfH) % gridHeight) + gridHeight) % gridHeight - halfH;

        const idleFloatY = Math.sin(time * 0.002 + index * 0.4) * 8 * (1 - p);
        const idleFloatRot = Math.cos(time * 0.0015 + index * 0.3) * 2 * (1 - p);
        const idleTilt = mouseTiltRef.current.x * (1 - p);

        const currentX = lerp(item.stackOffsetX, wrappedX, p);
        const currentY = lerp(item.stackOffsetY + idleFloatY, wrappedY, p);
        const currentRotation = lerp(item.stackRot + idleFloatRot + idleTilt, 0, p);
        const currentScale = lerp(item.stackScale, 1, p);

        const staticZIndex = gridItems.length - index;

        gsap.set(cardEl, {
          x: currentX,
          y: currentY,
          rotation: currentRotation,
          scale: currentScale,
          force3D: true,
          zIndex: staticZIndex
        });
      });

      animFrameRef.current = requestAnimationFrame(updatePositions);
    };

    if (isInView) {
      animFrameRef.current = requestAnimationFrame(updatePositions);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInView, isExpanded, gridItems, gridWidth, gridHeight]);

  useEffect(() => {
    if (!cardsRef.current.length || !imagesReady) return;

    if (isExpanded) {
      gsap.to(spreadProgressRef.current, {
        value: 1,
        duration: 1.5,
        ease: 'power4.out',
        overwrite: 'auto'
      });
    } else {
      targetPanRef.current = { x: 0, y: 0 };
      panRef.current = { x: 0, y: 0 };
      velocityRef.current = { x: 0, y: 0 };

      gsap.to(spreadProgressRef.current, {
        value: 0,
        duration: 0.5,
        ease: 'power4.out',
        overwrite: 'auto'
      });
    }
  }, [isExpanded, cardsRef, imagesReady]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: isExpanded ? 'none' : 'pan-y' }}
      className="relative w-full h-full overflow-hidden bg-[#0c0d10] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {!imagesReady && (
        <div className="absolute inset-0 z-50 bg-[#0c0d10] flex items-center justify-center text-xs font-mono tracking-widest text-white/40">
          LOADING ARCHIVAL STAMPS...
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-0 h-0 flex items-center justify-center pointer-events-auto">
          {gridItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute left-0 top-0 touch-none will-change-transform"
              style={{ transformOrigin: 'center center' }}
            >
              <div style={{ marginLeft: '-115px', marginTop: '-145px' }}>
                <StampCard
                  stamp={item.stamp}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExpanded) {
                      onToggleExpand();
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
