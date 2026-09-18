import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const artists = [
  {
    name: 'Adrian Fernandez',
    role: 'Artist',
    location: 'ES, Madrid',
    color1: '#3b82f6',
    color2: '#1d4ed8',
    image: '/images/section2/adrian-fernandez-t1jlLrsMpjc-unsplash.jpg',
  },
  {
    name: 'Christine V.',
    role: 'Curator',
    location: 'FR, Paris',
    color1: '#ec4899',
    color2: '#be185d',
    image: '/images/section2/christine-v-60zxhCQaCWs-unsplash.jpg',
  },
  {
    name: 'De Andre Bush',
    role: 'Photographer',
    location: 'US, New York',
    color1: '#10b981',
    color2: '#047857',
    image: '/images/section2/de-andre-bush-aJuhvp7VMBk-unsplash.jpg',
  },
  {
    name: 'Dun Alrubaie',
    role: 'Director',
    location: 'AE, Dubai',
    color1: '#8b5cf6',
    color2: '#6d28d9',
    image: '/images/section2/dun-alrubaie-FtL9tNGmdDI-unsplash.jpg',
  },
  {
    name: 'Mihai',
    role: 'Architect',
    location: 'RO, Bucharest',
    color1: '#f59e0b',
    color2: '#d97706',
    image: '/images/section2/mihai-GV8PBDjFOf4-unsplash.jpg',
  },
  {
    name: 'Otabek Xatipov',
    role: 'Visual Artist',
    location: 'UZ, Tashkent',
    color1: '#ef4444',
    color2: '#b91c1c',
    image: '/images/section2/otabek-xatipov-pAwF4e9B1XI-unsplash.jpg',
  },
  {
    name: 'Rayul',
    role: 'Artist',
    location: 'KR, Seoul',
    color1: '#14b8a6',
    color2: '#0f766e',
    image: '/images/section2/rayul-SPcn3U14mjk-unsplash.jpg',
  },
  {
    name: 'Shamin Haky',
    role: 'Curator',
    location: 'GB, London',
    color1: '#6366f1',
    color2: '#4338ca',
    image: '/images/section2/shamin-haky-yC_BW5x_wuo-unsplash.jpg',
  },
];

// Clean Pure Black Card Texture with subtle Image Box Drop Shadow
function drawCardCanvas(canvas, artist, imgElem = null) {
  const ctx = canvas.getContext('2d');
  const w = 512;
  const h = 720;
  canvas.width = w;
  canvas.height = h;

  // Reset shadow for card base
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // 1. PURE DEEP BLACK Card Background (#000000, 0px border-radius)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, w, h);

  // 2. Artist Details (Name, Role, Location ONLY)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px Syne, sans-serif';
  ctx.fillText(artist.name, 36, 76);

  ctx.fillStyle = '#a3a3a3';
  ctx.font = '500 24px Inter, sans-serif';
  ctx.fillText(artist.role, 36, 120);

  ctx.fillStyle = '#737373';
  ctx.font = '400 20px monospace';
  ctx.fillText(artist.location, 36, 154);

  // 3. Rectangular Image Box with Subtle Drop Shadow
  const imgX = 36;
  const imgY = 186;
  const imgW = 440;
  const imgH = 494;

  // Apply subtle drop shadow behind the image box
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 6;

  ctx.fillStyle = '#111111';
  ctx.fillRect(imgX, imgY, imgW, imgH);
  ctx.restore();

  // Clip for image drawing
  ctx.save();
  ctx.rect(imgX, imgY, imgW, imgH);
  ctx.clip();

  if (imgElem && imgElem.complete && imgElem.naturalWidth > 0) {
    try {
      // Draw image in 100% natural color tone (no overlays or tinting)
      ctx.drawImage(imgElem, imgX, imgY, imgW, imgH);
    } catch {
      const grad = ctx.createLinearGradient(imgX, imgY, imgX + imgW, imgY + imgH);
      grad.addColorStop(0, artist.color1);
      grad.addColorStop(1, artist.color2);
      ctx.fillStyle = grad;
      ctx.fillRect(imgX, imgY, imgW, imgH);
    }
  } else {
    const grad = ctx.createLinearGradient(imgX, imgY, imgX + imgW, imgY + imgH);
    grad.addColorStop(0, artist.color1);
    grad.addColorStop(1, artist.color2);
    ctx.fillStyle = grad;
    ctx.fillRect(imgX, imgY, imgW, imgH);

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(256, 360, 85, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(imgX, imgY, imgW, imgH);
}

export default function CylindricalCarousel3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    // Auto-calibrate camera distance on mobile and tablet to guarantee cards never clip or appear too big
    const getCameraZ = (w) => (w <= 640 ? 20.5 : (w <= 1024 ? 15.2 : 11.2));
    camera.position.set(0, 0, getCameraZ(width));

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. OUTER TILT GROUP (Holds the fixed Z slant angle: rotation.x = 0, rotation.z = 0.5)
    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.x = 0;   // NO X-AXIS TILT
    tiltGroup.rotation.z = 0.5; // FIXED Z-AXIS SLANT TILT (0.5 rad)
    scene.add(tiltGroup);

    // 2. INNER SPIN GROUP (Rotates around Y-axis smoothly: initial rotation.y = 0.2)
    const ringGroup = new THREE.Group();
    ringGroup.rotation.y = 0.2; // Initial Y-axis angle offset
    tiltGroup.add(ringGroup);

    // Ring Geometry parameters — Enlarged 3D Cylinder Size
    const totalCards = artists.length; // 8 Photographer Cards
    const cylinderRadius = 3.5;
    const cardHeight = 3.0;

    const segmentAngle = (Math.PI * 2) / totalCards; // 45 degrees per slot
    const gapAngle = 0.15; // Gap angle
    const cardArcAngle = segmentAngle - gapAngle;

    const meshes = [];

    artists.forEach((artist, index) => {
      const canvas = document.createElement('canvas');
      drawCardCanvas(canvas, artist);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Unlit MeshBasicMaterial with DoubleSide for crisp, natural image rendering
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
      });

      // Curved cylinder wall segment geometry for each card along the single 3D ring
      const thetaStart = index * segmentAngle + gapAngle / 2;
      const cardGeometry = new THREE.CylinderGeometry(
        cylinderRadius,
        cylinderRadius,
        cardHeight,
        32,
        1,
        true,
        thetaStart,
        cardArcAngle
      );

      const mesh = new THREE.Mesh(cardGeometry, material);
      ringGroup.add(mesh);
      meshes.push({ mesh, texture, canvas, artist, geometry: cardGeometry });

      // Optimized Image preloading & decode for buttery-smooth texture generation
      const img = new Image();
      img.src = artist.image;
      if (typeof img.decode === 'function') {
        img.decode()
          .then(() => {
            drawCardCanvas(canvas, artist, img);
            texture.needsUpdate = true;
          })
          .catch(() => {
            img.onload = () => {
              drawCardCanvas(canvas, artist, img);
              texture.needsUpdate = true;
            };
          });
      } else {
        img.onload = () => {
          drawCardCanvas(canvas, artist, img);
          texture.needsUpdate = true;
        };
      }
    });

    // Unified Single Rotation around Y-axis on the inner spin group with Viewport Gating
    let reqId = null;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      reqId = requestAnimationFrame(animate);
      ringGroup.rotation.y += 0.0035; // Continuous smooth Y-axis auto-rotation inside the fixed tiltGroup!
      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (!reqId && isVisible) {
        reqId = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (reqId) {
        cancelAnimationFrame(reqId);
        reqId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    startAnimation();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.position.z = getCameraZ(w);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stopAnimation();
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      meshes.forEach(({ mesh, texture, geometry }) => {
        geometry.dispose();
        texture.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', maxWidth: '1440px', height: '82vh', minHeight: '640px' }}
      className="relative flex items-center justify-center cursor-default select-none my-auto overflow-visible"
    />
  );
}
