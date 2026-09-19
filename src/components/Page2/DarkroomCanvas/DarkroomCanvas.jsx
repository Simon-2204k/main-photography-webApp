import React, { useEffect, useRef, useState, memo } from 'react';
import './DarkroomCanvas.css';

const INITIAL_BOXES = [
  { id: 1, width: 480, height: 200, top: 70, left: 60, zIndex: 10 },
  { id: 2, width: 520, height: 320, top: 80, right: 60, zIndex: 10 },
  { id: 3, width: 380, height: 260, bottom: 90, left: 90, zIndex: 10 },
  { id: 4, width: 580, height: 380, bottom: 50, right: 80, zIndex: 10 },
  { id: 5, width: 420, height: 300, top: null, left: null, isCenter: true, zIndex: 11 },
];

const MOBILE_BOXES = [
  { id: 1, width: 270, height: 130, top: 65, left: 18, zIndex: 10 },
  { id: 2, width: 290, height: 160, top: null, left: null, isCenter: true, zIndex: 12 },
  { id: 3, width: 270, height: 140, bottom: 75, left: 20, zIndex: 10 },
];

export const DarkroomCanvasComponent = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const boxRefs = useRef([]);
  const badgeRefs = useRef([]);
  const canvasRefs = useRef([]);
  const highestZIndexRef = useRef(20);
  const animFrameIdRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeBoxes = isMobile ? MOBILE_BOXES : INITIAL_BOXES;

  useEffect(() => {
    const initBoxes = () => {
      const mobile = window.innerWidth < 768;
      const boxes = mobile ? MOBILE_BOXES : INITIAL_BOXES;

      boxRefs.current.forEach((el, idx) => {
        if (!el) return;
        const config = boxes[idx];
        if (!config) return;

        if (mobile) {
          el.style.width = `${config.width}px`;
          el.style.height = `${config.height}px`;
          el.style.zIndex = config.zIndex;

          if (config.isCenter) {
            const top = Math.round((window.innerHeight - config.height) / 2);
            const left = Math.round((window.innerWidth - config.width) / 2);
            el.style.top = `${Math.max(10, top)}px`;
            el.style.left = `${Math.max(10, left)}px`;
          } else {
            let topVal, leftVal;
            if (config.top !== undefined) topVal = config.top;
            if (config.left !== undefined) leftVal = config.left;
            if (config.right !== undefined)
              leftVal = window.innerWidth - config.width - config.right;
            if (config.bottom !== undefined)
              topVal = window.innerHeight - config.height - config.bottom;

            leftVal = Math.max(8, Math.min(window.innerWidth - config.width - 8, leftVal));
            topVal = Math.max(8, Math.min(window.innerHeight - config.height - 8, topVal));

            el.style.top = `${topVal}px`;
            el.style.left = `${leftVal}px`;
          }
        } else {
          const isTablet = window.innerWidth <= 1024;
          const scaleFactor = isTablet ? 0.78 : 1;
          const boxWidth = Math.round(config.width * scaleFactor);
          const boxHeight = Math.round(config.height * scaleFactor);

          el.style.width = `${boxWidth}px`;
          el.style.height = `${boxHeight}px`;
          el.style.zIndex = config.zIndex;

          if (config.isCenter) {
            const top = Math.round((window.innerHeight - boxHeight) / 2 + 10);
            const left = Math.round((window.innerWidth - boxWidth) / 2);
            el.style.top = `${Math.max(10, top)}px`;
            el.style.left = `${Math.max(10, left)}px`;
          } else {
            let topVal, leftVal;
            if (config.top !== undefined) topVal = Math.round(config.top * scaleFactor);
            if (config.left !== undefined) leftVal = Math.round(config.left * scaleFactor);
            if (config.right !== undefined)
              leftVal = window.innerWidth - boxWidth - Math.round(config.right * scaleFactor);
            if (config.bottom !== undefined)
              topVal = window.innerHeight - boxHeight - Math.round(config.bottom * scaleFactor);

            leftVal = Math.max(8, Math.min(window.innerWidth - boxWidth - 8, leftVal));
            topVal = Math.max(8, Math.min(window.innerHeight - boxHeight - 8, topVal));

            el.style.top = `${topVal}px`;
            el.style.left = `${leftVal}px`;
          }
        }

        updateBadge(idx);
      });
    };

    initBoxes();
    window.addEventListener('resize', initBoxes);
    return () => window.removeEventListener('resize', initBoxes);
  }, [isMobile]);

  const updateBadge = (idx) => {
    const box = boxRefs.current[idx];
    const badge = badgeRefs.current[idx];
    if (!box || !badge) return;

    const rect = box.getBoundingClientRect();
    const x = Math.round(rect.left).toString().padStart(4, '0');
    const y = Math.round(rect.top).toString().padStart(4, '0');
    badge.textContent = `X:${x}PX Y:${y}PX`;
  };

  const handlePointerDown = (e, idx) => {
    if (e.button !== undefined && e.button !== 0) return;
    const box = boxRefs.current[idx];
    if (!box) return;

    isDraggingRef.current = true;
    highestZIndexRef.current = Math.min(500, highestZIndexRef.current + 1);
    box.style.zIndex = highestZIndexRef.current;
    box.classList.add('is-dragging');

    const rect = box.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handlePointerMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const newLeft = moveEvent.clientX - offsetX;
      const newTop = moveEvent.clientY - offsetY;

      box.style.left = `${newLeft}px`;
      box.style.top = `${newTop}px`;

      updateBadge(idx);
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      box.classList.remove('is-dragging');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const drawClipped = (ctx, rect) => {
      if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;

      const videoAspect = video.videoWidth / video.videoHeight;
      const windowAspect = window.innerWidth / window.innerHeight;

      let displayWidth, displayHeight, displayX, displayY;

      if (videoAspect > windowAspect) {
        displayHeight = window.innerHeight;
        displayWidth = displayHeight * videoAspect;
        displayX = (window.innerWidth - displayWidth) / 2;
        displayY = 0;
      } else {
        displayWidth = window.innerWidth;
        displayHeight = displayWidth / videoAspect;
        displayX = 0;
        displayY = (window.innerHeight - displayHeight) / 2;
      }

      const scaleX = video.videoWidth / displayWidth;
      const scaleY = video.videoHeight / displayHeight;

      const sourceX = (rect.left - displayX) * scaleX;
      const sourceY = (rect.top - displayY) * scaleY;
      const sourceWidth = rect.width * scaleX;
      const sourceHeight = rect.height * scaleY;

      ctx.drawImage(
        video,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        rect.width,
        rect.height
      );
    };

    const renderLoop = () => {
      boxRefs.current.forEach((box, idx) => {
        const canvas = canvasRefs.current[idx];
        if (!box || !canvas) return;

        const rect = box.getBoundingClientRect();

        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          drawClipped(ctx, rect);
        }
      });

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    let isVisible = true;

    const startLoop = () => {
      if (!animFrameIdRef.current && isVisible && !document.hidden) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const stopLoop = () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    startLoop();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="darkroom-canvas-container">

      <video
        ref={videoRef}
        className="darkroom-source-video"
        src="/assets/page2/darkroom_hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="darkroom-middle-bar-segmented">

        <div className="darkroom-segment segment-grip">
          <div className="grip-matrix">
            <span /><span />
            <span /><span />
            <span /><span />
          </div>
        </div>

        <div className="darkroom-segment segment-path">
          <span>C: \DARKROOM \HOME</span>
          <span className="segment-plus">+</span>
        </div>

        <div className="darkroom-segment segment-title">
          CHRONICLES_IN_LIGHT
        </div>

        <div className="darkroom-segment segment-category">
          ANALOG, SILVER HALIDE
        </div>

        <div className="darkroom-segment segment-status">
          LIVE
        </div>

        <div className="darkroom-segment segment-count">
          001/001
        </div>
      </div>

      {activeBoxes.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => (boxRefs.current[idx] = el)}
          className="darkroom-mask-box"
          onPointerDown={(e) => handlePointerDown(e, idx)}
        >
          <div
            ref={(el) => (badgeRefs.current[idx] = el)}
            className="darkroom-pos-badge"
          >
            X:0000PX Y:0000PX
          </div>
          <canvas ref={(el) => (canvasRefs.current[idx] = el)} />
          <div className="darkroom-grab-label">GRAB</div>
        </div>
      ))}
    </div>
  );
};

export const DarkroomCanvas = memo(DarkroomCanvasComponent);
export default DarkroomCanvas;
