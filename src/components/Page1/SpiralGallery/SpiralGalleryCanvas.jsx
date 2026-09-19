import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SpiralRibbonMesh } from './SpiralRibbonMesh';
import { projectsData } from '../../../data/page1/projectsData';

if (typeof window !== 'undefined') {
  projectsData.forEach((p) => {
    try {
      useTexture.preload(p.image);
    } catch {
    }
  });
}

export const MOBILE_SPIRAL_SCALE = 0.45;
export const MOBILE_SPIRAL_Y = -0.1;
export const MOBILE_SPIRAL_TOTAL_HEIGHT = 10;
export const MOBILE_SPIRAL_CARD_HEIGHT = 2.5;
export const MOBILE_SCROLL_CLIMB = 1.2;
export const DESKTOP_SCROLL_CLIMB = 1.2;

const SpiralScene = ({ projects, scrollProgressRef }) => {
  const mainGroupRef = useRef();
  const spiralGroupRef = useRef();
  const { camera, size } = useThree();

  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width <= 1024;
  const isMobileOrTablet = size.width <= 1024;
  const aspect = size.width / Math.max(size.height, 1);
  const heightRatio = Math.max(size.height, 1) / 667;

  const responsiveScale = isMobileOrTablet
    ? Math.min(Math.max(MOBILE_SPIRAL_SCALE * (aspect / 0.5622), 0.38), 0.72)
    : 1.0;

  const responsiveY = isTablet
    ? (MOBILE_SPIRAL_Y - 0.55 - (heightRatio - 1) * 0.15)
    : isMobileOrTablet
      ? (MOBILE_SPIRAL_Y + (heightRatio - 1) * 0.28)
      : 0;

  const minRadius = 2.9;
  const maxRadius = 4;
  const totalTurns = 2.9;
  const totalHeight = isTablet
    ? 6.5
    : isMobileOrTablet
      ? (MOBILE_SPIRAL_TOTAL_HEIGHT * (1 + (heightRatio - 1) * 0.22))
      : 5.5;
  const cardHeight = isTablet ? 1.65 : isMobileOrTablet ? MOBILE_SPIRAL_CARD_HEIGHT : 1.6;

  const scrollPosRef = useRef(0);
  const targetScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousMouseYRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (e.pointerType === 'touch') {
        mousePosRef.current = { x: 0, y: 0 };
        return;
      }
      isDraggingRef.current = true;
      previousMouseYRef.current = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') {
        mousePosRef.current = { x: 0, y: 0 };
        return;
      }

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosRef.current = { x: normX, y: normY };

      if (!isDraggingRef.current) return;
      const deltaY = e.clientY - previousMouseYRef.current;
      previousMouseYRef.current = e.clientY;
      targetScrollRef.current -= deltaY * 0.005;
    };

    const handlePointerUp = (e) => {
      if (e && e.pointerType === 'touch') {
        mousePosRef.current = { x: 0, y: 0 };
      }
      isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame(() => {
    if (!spiralGroupRef.current || !mainGroupRef.current) return;

    const scrollProgress = scrollProgressRef?.current ?? 0;

    const isTouchOrCoarse = isMobileOrTablet || (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    const mouseX = isTouchOrCoarse ? 0 : mousePosRef.current.x;
    const mouseY = isTouchOrCoarse ? 0 : mousePosRef.current.y;

    const entranceStartY = isMobileOrTablet ? -3.4 : -4.2;
    const scrollClimb = isMobileOrTablet ? MOBILE_SCROLL_CLIMB : DESKTOP_SCROLL_CLIMB;
    const entranceEndY = responsiveY + scrollClimb;
    const entranceY = THREE.MathUtils.lerp(entranceStartY, entranceEndY, scrollProgress);
    mainGroupRef.current.position.y = THREE.MathUtils.lerp(
      mainGroupRef.current.position.y,
      entranceY,
      0.08
    );

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
      <color attach="background" args={['#000000']} />

      <ambientLight intensity={1.6} />
      <directionalLight position={[0, 14, 16]} intensity={2.5} />
      <directionalLight position={[0, -14, -16]} intensity={1.4} />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#ffffff" distance={15} />

      <group
        ref={mainGroupRef}
        position={[0, -4.2, 0]}
        scale={[responsiveScale, responsiveScale, responsiveScale]}
      >
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

      <EffectComposer multisampling={0}>
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

export const SpiralGalleryCanvas = React.memo(({ projects, scrollProgressRef, isActive = true }) => {
  const dprVal = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;

  return (
    <div className="canvas-wrapper" style={{ display: isActive ? 'block' : 'none' }}>
      <Canvas
        frameloop={isActive ? "always" : "never"}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5
        }}
        dpr={[1, dprVal]}
      >
        <PerspectiveCamera
          makeDefault
          fov={42}
          position={[0, 0.3, 9.5]}
        />
        <React.Suspense fallback={null}>
          <SpiralScene projects={projects} scrollProgressRef={scrollProgressRef} />
        </React.Suspense>
      </Canvas>
    </div>
  );
});

export default SpiralGalleryCanvas;
