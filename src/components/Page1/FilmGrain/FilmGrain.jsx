import React, { useEffect, useRef } from 'react';

export const FilmGrain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Fast 160x160 noise tile
    const patternCanvas = document.createElement('canvas');
    const patternSize = 160;
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) return;

    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const buffer32 = new Uint32Array(patternData.data.buffer);
    const len = buffer32.length;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    let animationFrameId;
    let lastFrameTime = 0;
    const fpsInterval = 1000 / 24; // 24 FPS rapid film shutter flicker

    const updateGrain = (timestamp) => {
      animationFrameId = requestAnimationFrame(updateGrain);

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < fpsInterval) return;
      lastFrameTime = timestamp - (elapsed % fpsInterval);

      // Generate randomized 35mm film grain noise
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.45) {
          const val = (Math.random() * 255) | 0;
          // Full alpha grayscale pixel (alpha 255)
          buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
        } else {
          buffer32[i] = 0; // Transparent
        }
      }

      patternCtx.putImageData(patternData, 0, 0);

      // Tile across screen with screen blending
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pattern = ctx.createPattern(patternCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameId = requestAnimationFrame(updateGrain);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99998,
        opacity: 0.06,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default FilmGrain;
