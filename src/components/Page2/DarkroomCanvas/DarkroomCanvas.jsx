import React, { useEffect, useRef, memo } from 'react';
import './DarkroomCanvas.css';

const INITIAL_BOXES = [
  { id: 1, width: 480, height: 200, top: 70, left: 60, zIndex: 10 },
  { id: 2, width: 520, height: 320, top: 80, right: 60, zIndex: 10 },
  { id: 3, width: 380, height: 260, bottom: 90, left: 90, zIndex: 10 },
  { id: 4, width: 580, height: 380, bottom: 50, right: 80, zIndex: 10 },
  { id: 5, width: 420, height: 300, top: null, left: null, isCenter: true, zIndex: 11 },
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

  // Initialize initial CSS positions on mount
  useEffect(() => {
    boxRefs.current.forEach((el, idx) => {
      if (!el) return;
      const config = INITIAL_BOXES[idx];
      el.style.width = `${config.width}px`;
      el.style.height = `${config.height}px`;
      el.style.zIndex = config.zIndex;

      if (config.isCenter) {
        const top = Math.round((window.innerHeight - config.height) / 2 + 10);
        const left = Math.round((window.innerWidth - config.width) / 2);
        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
      } else {
        if (config.top !== undefined) el.style.top = `${config.top}px`;
        if (config.left !== undefined) el.style.left = `${config.left}px`;
        if (config.right !== undefined) el.style.left = `${window.innerWidth - config.width - config.right}px`;
        if (config.bottom !== undefined) el.style.top = `${window.innerHeight - config.height - config.bottom}px`;
      }

      updateBadge(idx);
    });
  }, []);

  const updateBadge = (idx) => {
    const box = boxRefs.current[idx];
    const badge = badgeRefs.current[idx];
    if (!box || !badge) return;

    const rect = box.getBoundingClientRect();
    const x = Math.round(rect.left).toString().padStart(4, '0');
    const y = Math.round(rect.top).toString().padStart(4, '0');
    badge.textContent = `X:${x}PX Y:${y}PX`;
  };

  // Drag and drop interaction handlers matching reference
  const handleMouseDown = (e, idx) => {
    e.preventDefault();
    const box = boxRefs.current[idx];
    if (!box) return;

    isDraggingRef.current = true;
    highestZIndexRef.current += 1;
    box.style.zIndex = highestZIndexRef.current;
    box.classList.add('is-dragging');

    const rect = box.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const newLeft = moveEvent.clientX - offsetX;
      const newTop = moveEvent.clientY - offsetY;

      box.style.left = `${newLeft}px`;
      box.style.top = `${newTop}px`;

      updateBadge(idx);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      box.classList.remove('is-dragging');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Real-time Canvas Frame Rendering Loop
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

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      } else {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="darkroom-canvas-container">
      {/* Hidden Offscreen Video Element */}
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

      {/* Middle Bar — Stylized matching reference */}
      <div className="darkroom-middle-bar">
        <span className="darkroom-dots-icon">⠿</span>
        <span>C: \DARKROOM \HOME</span>
        <span className="darkroom-sep">+</span>
        <span>CHRONICLES_IN_LIGHT</span>
        <span>ANALOG, SILVER HALIDE</span>
        <span>LIVE</span>
        <span className="darkroom-count">001/001</span>
      </div>

      {/* 5 Interactive HUD Mask Boxes with Canvas */}
      {INITIAL_BOXES.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => (boxRefs.current[idx] = el)}
          className="darkroom-mask-box"
          onMouseDown={(e) => handleMouseDown(e, idx)}
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
