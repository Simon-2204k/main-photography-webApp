import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SpiralRibbonMesh } from './SpiralRibbonMesh';
import { projectsData } from '../../../data/page1/projectsData';

// Eagerly preload all 44 spiral gallery textures into GPU cache
if (typeof window !== 'undefined') {
  projectsData.forEach((p) => {
    try {
      useTexture.preload(p.image);
    } catch {
      // safe fallback
    }
  });
}

const SpiralScene = ({ projects, scrollProgress }) => {
  const mainGroupRef = useRef();
  const spiralGroupRef = useRef();
  const { camera } = useThree();

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

  useFrame(() => {
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

    // Mouse movement interaction
    const targetPosX = -mouseX * 1.6;
    spiralGroupRef.current.position.x = THREE.MathUtils.lerp(
      spiralGroupRef.current.position.x,
      targetPosX,
      0.06
    );

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

    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={['#161618']} />

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

      <EffectComposer multisampling={4}>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.8}
          intensity={1.25}
          mipmapBlur={true}
        />
        <BrightnessContrast
          brightness={0.06}
          contrast={0.18}
        />
        <Vignette
          offset={0.25}
          darkness={0.6}
          eskil={false}
        />
      </EffectComposer>
    </>
  );
};

export const SpiralGalleryCanvas = React.memo(({ projects, scrollProgress }) => {
  return (
    <div className="canvas-wrapper">
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5
        }}
        dpr={[1, 1.75]}
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
});

export default SpiralGalleryCanvas;
