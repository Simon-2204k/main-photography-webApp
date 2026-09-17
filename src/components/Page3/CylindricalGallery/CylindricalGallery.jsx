import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import './CylindricalGallery.css';

export class CylindricalGalleryEngine {
  constructor(canvasElement, containerElement) {
    this.canvas = canvasElement;
    this.container = containerElement;

    this.totalCards = 4;
    this.radius = 3;
    this.cardHeight = 2.25;
    this.arcLength = 1.55;

    this.autoRotate = true;
    this.autoRotateSpeed = 0.0035;

    // Reordered image sequence: 1 -> 3 -> 2 -> 4
    this.imagePaths = [
      '/assets/page3/section1/card1.webp',
      '/assets/page3/section1/card3.webp',
      '/assets/page3/section1/card2.webp',
      '/assets/page3/section1/card4.webp'
    ];

    this.cards = [];
    this.isUserInteracting = false;
    this.animationFrameId = null;
    this.disposed = false;

    this.initScene();
    this.createCylindricalCards();
    this.setupPostProcessing();
    this.bindEvents();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#000000');

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const aspect = width / height;

    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);

    const baseZ = 6.5;
    const baseY = 0;
    const responsiveZ = aspect < 1 ? Math.min(7.2, baseZ / Math.max(0.85, aspect)) : baseZ;
    this.defaultCameraPos = new THREE.Vector3(0, baseY, responsiveZ);
    this.camera.position.copy(this.defaultCameraPos);

    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(this.cameraTarget);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // =========================================================================
    // BRIGHTNESS / EXPOSURE CONTROL LINE 1: Tone Mapping Exposure
    // Lower value = darker/richer contrast, higher value = brighter (Default: 1.0)
    // =========================================================================
    this.renderer.toneMappingExposure = 4.3;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.copy(this.cameraTarget);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    // Lock polar angle strictly to horizontal plane (Math.PI / 2) to eliminate vertical drag scaling glitch
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;

    // =========================================================================
    // BRIGHTNESS / EXPOSURE CONTROL LINE 2: Studio Lights Intensity
    // Tune ambientLight (0.5 to 0.8) and dirLight (0.4 to 0.7) for clarity
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 10, 10);
    this.scene.add(dirLight);

    this.carouselGroup = new THREE.Group();
    this.scene.add(this.carouselGroup);
  }

  createCylindricalCards() {
    this.geometry = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      this.cardHeight,
      32,
      1,
      true,
      -this.arcLength / 2,
      this.arcLength
    );

    const textureLoader = new THREE.TextureLoader();

    this.backMaterial = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.7,
      metalness: 0.2,
      side: THREE.BackSide
    });

    this.textures = [];
    this.materials = [];

    for (let i = 0; i < this.totalCards; i++) {
      const angle = (i / this.totalCards) * Math.PI * 2;

      const texture = textureLoader.load(this.imagePaths[i]);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      this.textures.push(texture);

      // =========================================================================
      // BRIGHTNESS / EXPOSURE CONTROL LINE 3: Card Emissive Glow
      // Set to 0.0 for pure raw photographic texture, or 0.05 for subtle cinematic glow (Default: 0.05)
      // =========================================================================
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.25,
        metalness: 0.0,
        emissiveMap: texture,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.18
      });
      this.materials.push(frontMaterial);

      const cardGroup = new THREE.Group();
      const frontMesh = new THREE.Mesh(this.geometry, frontMaterial);
      const backMesh = new THREE.Mesh(this.geometry, this.backMaterial);

      cardGroup.add(frontMesh);
      cardGroup.add(backMesh);

      cardGroup.position.set(0, 0, 0);
      cardGroup.rotation.y = angle;

      this.cards.push(cardGroup);
      this.carouselGroup.add(cardGroup);
    }
  }

  setupPostProcessing() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // =========================================================================
    // BRIGHTNESS / EXPOSURE CONTROL LINE 4: UnrealBloomPass Highlights
    // strength (0.10 - 0.25), radius (0.25 - 0.45), threshold (0.50 - 0.70)
    // =========================================================================
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.2,  // bloom strength
      0.2,  // bloom radius
      0.60   // bloom luminance threshold (only extreme highlights glow)
    );
    this.composer.addPass(this.bloomPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);
  }

  bindEvents() {
    this.handleResize = () => this.onResize();
    window.addEventListener('resize', this.handleResize);

    this.onStart = () => {
      this.isUserInteracting = true;
    };

    this.onEnd = () => {
      this.isUserInteracting = false;
    };

    if (this.controls) {
      this.controls.addEventListener('start', this.onStart);
      this.controls.addEventListener('end', this.onEnd);
    }
  }

  onResize() {
    if (this.disposed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const aspect = width / height;

    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    const baseZ = 6.5;
    const responsiveZ = aspect < 1 ? Math.min(7.2, baseZ / Math.max(0.85, aspect)) : baseZ;
    this.defaultCameraPos.z = responsiveZ;
    this.camera.position.z = responsiveZ;

    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }

  startLoop() {
    if (this.disposed || this.animationFrameId) return;
    this.animate();
  }

  stopLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animate() {
    if (this.disposed) return;
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.autoRotate && this.carouselGroup) {
      this.carouselGroup.rotation.y += this.autoRotateSpeed;
    }

    if (this.controls) {
      this.controls.update();
    }

    if (this.composer) {
      this.composer.render();
    }
  }

  dispose() {
    this.disposed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.handleResize);

    if (this.controls) {
      this.controls.removeEventListener('start', this.onStart);
      this.controls.removeEventListener('end', this.onEnd);
      this.controls.dispose();
    }

    this.geometry?.dispose();
    this.backMaterial?.dispose();
    this.materials.forEach((m) => m.dispose());
    this.textures.forEach((t) => t.dispose());

    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

export const CylindricalGallery = memo(function CylindricalGallery() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      engineRef.current = new CylindricalGalleryEngine(canvasRef.current, containerRef.current);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!engineRef.current) return;
        if (entry.isIntersecting) {
          engineRef.current.startLoop();
        } else {
          engineRef.current.stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="cylindrical-gallery-section" id="cylindrical-gallery-section">
      <canvas ref={canvasRef} className="cylindrical-gallery-canvas" />
    </div>
  );
});

export default CylindricalGallery;
