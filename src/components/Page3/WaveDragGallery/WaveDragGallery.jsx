import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { WaveCardVertexShader, WaveCardFragmentShader } from './WaveCardShader';
import './WaveDragGallery.css';

/**
 * 21 Fine Art Photography Works from images/section10
 * Formatted in exact 16:9 cinematic aspect ratio
 */
const SECTION10_WORKS = [
  { src: '/assets/section10/photo_01.webp', title: 'REF 01 // 35MM CONTRAST', meta: 'LEICA M11 • 50MM' },
  { src: '/assets/section10/photo_02.webp', title: 'REF 02 // SEPIA TONING', meta: 'GELATIN SILVER • 6×7' },
  { src: '/assets/section10/photo_03.webp', title: 'REF 03 // AMBER CHIAROSCURO', meta: 'ZEISS PLANAR • T* 80MM' },
  { src: '/assets/section10/photo_04.webp', title: 'REF 04 // MONOCHROME GRAIN', meta: 'KODAK TRI-X 400' },
  { src: '/assets/section10/photo_05.webp', title: 'REF 05 // OPTICAL APERTURE', meta: 'HASSELBLAD 500C/M' },
  { src: '/assets/section10/photo_06.webp', title: 'REF 06 // LATENT EXPOSURE', meta: 'ILFORD HP5 PLUS' },
  { src: '/assets/section10/photo_07.webp', title: 'REF 07 // SILVER EMULSION', meta: 'LEICA NOCTILUX • f/0.95' },
  { src: '/assets/section10/photo_08.webp', title: 'REF 08 // ARCHIVAL GELATIN', meta: 'DARKROOM ARCHIVE // 2026' },
  { src: '/assets/section10/photo_09.webp', title: 'REF 09 // CONTACT PROOF', meta: 'MAMIYA 7II • 65MM' },
  { src: '/assets/section10/photo_10.webp', title: 'REF 10 // SELENIUM TONE', meta: 'PLATINUM PALLADIUM' },
  { src: '/assets/section10/photo_11.webp', title: 'REF 11 // TUNGSTEN SHADOW', meta: 'STUDIO APERTURE' },
  { src: '/assets/section10/photo_12.webp', title: 'REF 12 // HIGH-KEY PORTRAIT', meta: 'HASSELBLAD H6D' },
  { src: '/assets/section10/photo_13.webp', title: 'REF 13 // KODACHROME STUDY', meta: 'COLOR REVERSAL' },
  { src: '/assets/section10/photo_14.webp', title: 'REF 14 // FRESNEL HIGHLIGHT', meta: 'OPTICAL BENCH' },
  { src: '/assets/section10/photo_15.webp', title: 'REF 15 // SHUTTER VELOCITY', meta: '1/2000s • LEICA M' },
  { src: '/assets/section10/photo_16.webp', title: 'REF 16 // DARKROOM CONTACT', meta: 'FIBER BASE PRINT' },
  { src: '/assets/section10/photo_17.webp', title: 'REF 17 // DEPTH OF FIELD', meta: 'f/1.4 CHIAROSCURO' },
  { src: '/assets/section10/photo_18.webp', title: 'REF 18 // BROMIDE HALIDE', meta: 'CHEMICAL ATELIER' },
  { src: '/assets/section10/photo_19.webp', title: 'REF 19 // SPECTRUM REFRACTION', meta: 'COATED GLASS' },
  { src: '/assets/section10/photo_20.webp', title: 'REF 20 // PRISM GEOMETRY', meta: 'ZEISS DISTAGON' },
  { src: '/assets/section10/photo_21.webp', title: 'REF 21 // FINAL ATELIER', meta: 'SIMON PHOTOGRAPHY' },
];

/**
 * Creates an exact 16:9 Canvas (1024x576) with rounded corners and photography metadata
 */
function renderCardToCanvas(canvas, imgOrNull, title, meta) {
  canvas.width = 1024;
  canvas.height = 576; // 16:9 ratio
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 576);

  // Rounded card frame clipping path (32px radius)
  ctx.save();
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(8, 8, 1008, 560, 32);
  } else {
    ctx.rect(8, 8, 1008, 560);
  }
  ctx.clip();

  if (imgOrNull && imgOrNull.complete && imgOrNull.naturalWidth > 0) {
    // Draw real 16:9 photography image
    ctx.drawImage(imgOrNull, 8, 8, 1008, 560);
  } else {
    // Elegant Darkroom Placeholder while image loads
    ctx.fillStyle = '#141417';
    ctx.fillRect(8, 8, 1008, 560);

    // Subtle darkroom center grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(100, 80, 824, 416);
  }

  // Darkroom Lower Vignette for razor-sharp typography readability
  const grad = ctx.createLinearGradient(0, 380, 0, 568);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.55)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
  ctx.fillStyle = grad;
  ctx.fillRect(8, 380, 1008, 188);

  // Title in crisp monospace
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Space Grotesk", monospace, sans-serif';
  ctx.fillText(title, 38, 532);

  // Camera & Optics Meta Tag
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '600 15px "Space Grotesk", monospace, sans-serif';
  ctx.fillText(meta, 730, 532);

  ctx.restore();

  // Subtle Outer Card Border
  ctx.save();
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(8, 8, 1008, 560, 32);
  } else {
    ctx.rect(8, 8, 1008, 560);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

/**
 * Universal Modulo Wrap Function:
 * Constrains any number smoothly inside [min, max] without discontinuities
 */
function wrapRange(val, min, max) {
  const range = max - min;
  return ((((val - min) % range) + range) % range) + min;
}

export const WaveDragGalleryComponent = ({ onOpenMenu }) => {
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvasWrapper = canvasWrapperRef.current;
    if (!container || !canvasWrapper) return;

    let width = canvasWrapper.clientWidth || window.innerWidth;
    let height = canvasWrapper.clientHeight || window.innerHeight;

    // 1] Three.js Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f5f5f7');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, width <= 1024 ? 5.8 : 4.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    canvasWrapper.appendChild(renderer.domElement);

    // 2] 16:9 Aspect Ratio Metric Calibration
    const getCardMetrics = (w) => {
      // Exact 16:9 ratio: height = width * 9 / 16
      let cardW = 2.80;
      let cardH = 2.80 * (9 / 16); // 1.575
      let gap = 0.35;

      if (w <= 640) {
        // Mobile Phones
        cardW = 2.05;
        cardH = 2.05 * (9 / 16); // 1.153
        gap = 0.24;
      } else if (w <= 1024) {
        // Tablets & iPad Pro 1024x1366
        cardW = 2.45;
        cardH = 2.45 * (9 / 16); // 1.378
        gap = 0.28;
      }

      return { cardW, cardH, gap };
    };

    let { cardW, cardH, gap } = getCardMetrics(width);

    // 3] 21 High-Subdivision Wave Mesh Cards (16:9)
    const totalCards = SECTION10_WORKS.length;
    let stride = cardW + gap;
    let totalWidth = totalCards * stride;
    let halfTotal = totalWidth / 2;

    const cards = [];
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    let planeGeometry = new THREE.PlaneGeometry(cardW, cardH, 32, 32);

    const calcViewportWidth = () => {
      const vFov = (camera.fov * Math.PI) / 180;
      return 2 * camera.position.z * Math.tan(vFov / 2) * (width / height);
    };

    let viewportWidth = calcViewportWidth();

    // Instantiate each 16:9 Card with its real photography texture
    SECTION10_WORKS.forEach((work, index) => {
      const cardCanvas = document.createElement('canvas');
      renderCardToCanvas(cardCanvas, null, work.title, work.meta);

      const texture = new THREE.CanvasTexture(cardCanvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      // Asynchronously load real photo and update canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = work.src;
      img.onload = () => {
        renderCardToCanvas(cardCanvas, img, work.title, work.meta);
        texture.needsUpdate = true;
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: WaveCardVertexShader,
        fragmentShader: WaveCardFragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uWarpIntensity: { value: 0.0 },
          uViewportWidth: { value: viewportWidth },
          uIsMobile: { value: width <= 640 ? 1.0 : 0.0 },
        },
        side: THREE.DoubleSide,
        transparent: true,
      });

      const mesh = new THREE.Mesh(planeGeometry, material);
      const baseX = (index - totalCards / 2) * stride;
      mesh.position.set(baseX, 0, 0);

      cardGroup.add(mesh);
      cards.push({ mesh, material, texture, baseX, cardCanvas, work, img });
    });

    // 4] Momentum Physics & Infinite Carousel Loop
    let scrollX = 0;
    let targetScrollX = 0;
    let lastScrollX = 0;
    let smoothedVelocity = 0;
    let warpValue = 0;
    let isPointerDown = false;
    let startPointerX = 0;
    let lastPointerX = 0;
    let isCardDrag = false;
    let isVisible = true;
    let animationFrameId = null;
    let lastPointerTime = performance.now();
    let dragVelocity = 0;
    let flingVelocity = 0;

    const getUnitsPerPixel = () => {
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
      return visibleHeight / height;
    };

    let unitsPerPixel = getUnitsPerPixel();

    // 5] Pointer / Touch Interaction Handlers
    const handlePointerDown = (e) => {
      const clientX = e.clientX;
      if (clientX === undefined || clientX === null) return;

      isPointerDown = true;
      isCardDrag = true;
      startPointerX = clientX;
      lastPointerX = clientX;
      lastPointerTime = performance.now();
      dragVelocity = 0;
      flingVelocity = 0; // Cancel prior inertia on new touch

      canvasWrapper.classList.add('is-dragging');
      if (canvasWrapper.setPointerCapture && e.pointerId) {
        try {
          canvasWrapper.setPointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    const handlePointerMove = (e) => {
      if (!isPointerDown || !isCardDrag) return;

      const clientX = e.clientX;
      if (clientX === undefined || clientX === null || isNaN(clientX)) return;

      const now = performance.now();
      const dt = Math.max(now - lastPointerTime, 1);
      const deltaX = clientX - lastPointerX;
      lastPointerX = clientX;
      lastPointerTime = now;

      // Calibrate mobile touch swipe distance for swift, natural gestures
      const isTouch = e.pointerType === 'touch' || window.innerWidth <= 1024;
      const moveMultiplier = isTouch ? 2.7 : 1.5;
      const worldDelta = deltaX * unitsPerPixel * moveMultiplier;

      if (!isNaN(worldDelta) && isFinite(worldDelta)) {
        targetScrollX += worldDelta;
        // Calculate instantaneous velocity in world units per standard frame
        dragVelocity = (worldDelta / dt) * 16.6;
      }

      if (e.cancelable && Math.abs(clientX - startPointerX) > 6) {
        e.preventDefault();
      }
    };

    const handlePointerUp = (e) => {
      if (isPointerDown) {
        isPointerDown = false;
        isCardDrag = false;
        canvasWrapper.classList.remove('is-dragging');
        if (canvasWrapper.releasePointerCapture && e && e.pointerId) {
          try {
            canvasWrapper.releasePointerCapture(e.pointerId);
          } catch (_) {}
        }

        // Fling kinetic momentum: carry user's finger swipe through on release
        const isTouch = (e && e.pointerType === 'touch') || window.innerWidth <= 1024;
        const flingMultiplier = isTouch ? 1.45 : 1.0;
        flingVelocity = Math.max(-0.65, Math.min(0.65, dragVelocity * flingMultiplier));
      }
    };

    // Wheel / Trackpad horizontal scrolling
    const handleWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 1) {
        const move = -delta * unitsPerPixel * 0.8;
        if (!isNaN(move) && isFinite(move)) {
          targetScrollX += move;
        }
      }
    };

    canvasWrapper.addEventListener('pointerdown', handlePointerDown, { passive: false });
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    canvasWrapper.addEventListener('wheel', handleWheel, { passive: true });

    // 6] Resize Handler
    const handleResize = () => {
      if (!canvasWrapper) return;
      width = canvasWrapper.clientWidth || window.innerWidth;
      height = canvasWrapper.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.position.z = width <= 1024 ? 5.8 : 4.8;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      unitsPerPixel = getUnitsPerPixel();
      viewportWidth = calcViewportWidth();
      const newMetrics = getCardMetrics(width);
      cardW = newMetrics.cardW;
      cardH = newMetrics.cardH;
      gap = newMetrics.gap;
      stride = cardW + gap;
      totalWidth = totalCards * stride;
      halfTotal = totalWidth / 2;

      planeGeometry.dispose();
      planeGeometry = new THREE.PlaneGeometry(cardW, cardH, 32, 32);
      cards.forEach((c, idx) => {
        c.mesh.geometry = planeGeometry;
        c.baseX = (idx - totalCards / 2) * stride;
        c.material.uniforms.uViewportWidth.value = viewportWidth;
        c.material.uniforms.uIsMobile.value = width <= 640 ? 1.0 : 0.0;
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7] 60fps High-Performance Render Loop with NaughtyDuk Physics
    let lastTime = performance.now();

    const animate = (now) => {
      if (!isVisible) return;

      const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.1);
      // Apply and decay fling momentum on release
      if (!isPointerDown && Math.abs(flingVelocity) > 0.0001) {
        targetScrollX += flingVelocity;
        flingVelocity *= 0.935;
      } else if (!isPointerDown) {
        flingVelocity = 0;
      }

      // Smooth horizontal scroll position interpolation
      const scrollDiff = targetScrollX - scrollX;
      scrollX += scrollDiff * 0.14;

      // Strict NaN Safety Check
      if (isNaN(scrollX) || !isFinite(scrollX)) scrollX = 0;
      if (isNaN(targetScrollX) || !isFinite(targetScrollX)) targetScrollX = 0;

      // NaughtyDuk momentum and warp calculations
      const deltaMovement = scrollX - lastScrollX;
      smoothedVelocity += (deltaMovement - smoothedVelocity) * 0.2;
      lastScrollX = scrollX;

      if (isNaN(smoothedVelocity) || !isFinite(smoothedVelocity)) smoothedVelocity = 0;

      const O = 16, H = 8, B = 5, X = 1.6;
      const rawForce = Math.max(-20, Math.min(20, smoothedVelocity * O));
      const targetWarp = Math.tanh(rawForce / X) * X;
      const attackDecay = Math.abs(targetWarp) > Math.abs(warpValue) ? H : B;
      warpValue += (targetWarp - warpValue) * Math.min(attackDecay * dt, 1.0);

      if (isNaN(warpValue) || !isFinite(warpValue)) warpValue = 0;
      warpValue = Math.max(-1.8, Math.min(1.8, warpValue));

      // Infinite wrapping carousel position math (guarantees cards NEVER disappear)
      cards.forEach(({ mesh, material, baseX }) => {
        const posX = wrapRange(baseX + scrollX, -halfTotal, halfTotal);
        mesh.position.x = posX;

        // Subtle scale falloff from center
        const distFromCenter = posX / stride;
        const cardScale = Math.max(0.78, 1.0 - Math.abs(distFromCenter) * 0.06);
        mesh.scale.set(cardScale, cardScale, 1.0);

        // Update shader warp intensity
        material.uniforms.uWarpIntensity.value = warpValue;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Immediately start rendering on mount so cards are visible from frame 1
    handleResize();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(animate);

    // 8] IntersectionObserver with safety fallback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            handleResize();
            lastTime = performance.now();
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.0 }
    );

    observer.observe(container);

    // 9] Cleanup on Unmount
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      canvasWrapper.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      canvasWrapper.removeEventListener('wheel', handleWheel);

      planeGeometry.dispose();
      cards.forEach(({ material, texture }) => {
        material.dispose();
        texture.dispose();
      });
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      id="wave-drag-gallery-section" 
      ref={containerRef} 
      className="wave-drag-gallery-section"
      aria-label="Section 10: 3D Wave Drag Photography Gallery"
    >
      {/* 1] Perspective Vanishing Lines Grid */}
      <div className="wave-perspective-grid" aria-hidden="true">
        <div className="wave-grid-line diag-1" />
        <div className="wave-grid-line diag-2" />
        <div className="wave-grid-line vert-axis" />
      </div>

      {/* 2] Interactive 3D WebGL Canvas Layer */}
      <div 
        ref={canvasWrapperRef} 
        className="wave-canvas-wrapper"
        aria-label="Interactive 3D Wave Drag Carousel"
      />

      {/* 3] Bottom Partner / Photography Archive Bar */}
      <div className="wave-bottom-partner-bar">
        <div className="wave-partner-logos">
          <span className="wave-logo-item">LEICA</span>
          <span className="wave-logo-item serif">Hasselblad</span>
          <span className="wave-logo-item symbol">‡</span>
          <span className="wave-logo-item" style={{ fontStyle: 'italic' }}>ZEISS</span>
        </div>
        <div className="wave-partner-divider" />
        <div className="wave-partner-statement">
          THE FINE ART ATELIER ARCHIVING TIMELESS 35MM & MEDIUM FORMAT PHOTOGRAPHY
        </div>
      </div>

      {/* 4] Bottom-Right Interactive Menu Button */}
      <button 
        type="button" 
        className="wave-corner-menu-right"
        onClick={(e) => {
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          if (onOpenMenu) onOpenMenu(rect);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          if (onOpenMenu) onOpenMenu(rect);
        }}
        aria-label="Open Navigation Menu"
      >
        MENU
      </button>
    </div>
  );
};

export const WaveDragGallery = memo(WaveDragGalleryComponent);
export default WaveDragGallery;
