import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

import { SpiralRibbonMesh } from './SpiralRibbonMesh';

const SpiralScene = ({ projects, scrollProgress }) => {
  const mainGroupRef = useRef();
  const spiralGroupRef = useRef();
  const { camera, viewport } = useThree();

  const minRadius = 2.9;
  const maxRadius = 4;
  const totalTurns = 2.9;
  const totalHeight = 5.5;
  const cardHeight = 1.6;

  const scrollPosRef = useRef(0);
  const targetScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousMouseYRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e) => {
      const delta = e.deltaY * 0.0025;
      targetScrollRef.current += delta;
    };

    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      previousMouseYRef.current = e.clientY;
    };

    const handlePointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosRef.current = { x: normX, y: normY };

      if (!isDraggingRef.current) return;
      const deltaY = e.clientY - previousMouseYRef.current;
      previousMouseYRef.current = e.clientY;
      targetScrollRef.current -= deltaY * 0.005;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame((state) => {
    if (!spiralGroupRef.current || !mainGroupRef.current) return;

    const mouseX = mousePosRef.current.x;
    const mouseY = mousePosRef.current.y;

    // Scroll entrance interpolation
    const entranceY = THREE.MathUtils.lerp(-4.2, 0, scrollProgress);
    mainGroupRef.current.position.y = THREE.MathUtils.lerp(
      mainGroupRef.current.position.y,
      entranceY,
      0.08
    );

    // Feature 1: Left mouse -> spiral moves right (+X), Right mouse -> spiral moves left (-X)
    const targetPosX = -mouseX * 1.6;
    spiralGroupRef.current.position.x = THREE.MathUtils.lerp(
      spiralGroupRef.current.position.x,
      targetPosX,
      0.06
    );

    // Feature 1 & 2 (Transform-origin -top tilt effect):
    // Pivot tilt around top origin using Z and X rotations (Smoothly resets to 0 when mouse leaves)
    const targetRotZ = mouseX * 0.12;
    const targetRotX = -mouseY * 0.1;
    spiralGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      spiralGroupRef.current.rotation.z,
      targetRotZ,
      0.06
    );
    spiralGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      spiralGroupRef.current.rotation.x,
      targetRotX,
      0.06
    );

    // Smooth scroll rotation
    scrollPosRef.current = THREE.MathUtils.lerp(
      scrollPosRef.current,
      targetScrollRef.current,
      0.08
    );

    const currentScroll = scrollPosRef.current + (scrollProgress * 3.5);
    const initialAngleOffset = -totalTurns * Math.PI * 2;
    spiralGroupRef.current.rotation.y = initialAngleOffset + (currentScroll * 1.2);

    // Camera look target
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* 1. BACKGROUND ATMOSPHERE COLOR */}
      <color attach="background" args={['#161618']} />

      {/* 2. SCENE LIGHTING & HIGHLIGHTS */}
      <ambientLight intensity={1.6} />
      <directionalLight position={[0, 14, 16]} intensity={2.5} />
      <directionalLight position={[0, -14, -16]} intensity={1.4} />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#ffffff" distance={15} />

      <group ref={mainGroupRef} position={[0, -4.2, 0]}>
        <group ref={spiralGroupRef}>
          <SpiralRibbonMesh
            projects={projects}
            minRadius={minRadius}
            maxRadius={maxRadius}
            totalTurns={totalTurns}
            totalHeight={totalHeight}
            cardHeight={cardHeight}
          />
        </group>
      </group>

      {/* 3. POST-PROCESSING: GLOOMY GLOW, BRIGHTNESS & HIGHLIGHT EFFECTS */}
      <EffectComposer multisampling={4}>
        {/* Luminous Gloomy Glow & Specular Highlights */}
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.8}
          intensity={1.25}
          mipmapBlur={true}
        />
        {/* Brightness & Contrast Booster */}
        <BrightnessContrast
          brightness={0.06}
          contrast={0.18}
        />
        {/* Moody Gloomy Vignette on Viewport Edges */}
        <Vignette
          offset={0.25}
          darkness={0.6}
          eskil={false}
        />
      </EffectComposer>
    </>
  );
};

export const SpiralGalleryCanvas = ({ projects, scrollProgress }) => {
  return (
    <div className="canvas-wrapper">
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera
          makeDefault
          fov={42}
          position={[0, 0.3, 9.5]}
        />
        <React.Suspense fallback={null}>
          <SpiralScene projects={projects} scrollProgress={scrollProgress} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
