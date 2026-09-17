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

// ============================================================================
// MOBILE TUNING VALUES (Change these values if you want to adjust phone appearance)
// ============================================================================
// LINE 25: Scale of the 3D spiral on phone screens (< 768px):
export const MOBILE_SPIRAL_SCALE = 0.45;

// LINE 28: Base vertical Y offset on phone screens:
export const MOBILE_SPIRAL_Y = -0.1;

// LINE 32: UNIFORM VERTICAL GAP FOR MOBILE (Total spiral height on phone)
// Default desktop is 5.5. Increasing this for phone (e.g. 7.2) increases the vertical gap between spiral tiers!
export const MOBILE_SPIRAL_TOTAL_HEIGHT = 10;

// LINE 36: CARD HEIGHT FOR MOBILE (Default desktop is 1.6, set to 1.45 for balanced proportions)
export const MOBILE_SPIRAL_CARD_HEIGHT = 2.5;

// LINE 39: VERTICAL UPWARD CLIMB WHILE SCROLLING ON PHONE (< 768px)
// Default is 1.2 (~16.5% climb). Increase to 1.5 - 2.0 to climb higher/faster while scrolling, or lower if needed
export const MOBILE_SCROLL_CLIMB = 1.2;

// LINE 43: VERTICAL UPWARD CLIMB WHILE SCROLLING ON TABLET & LAPTOP (>= 768px)
// Default is 1.2. Increase to 1.5 - 2.0 to climb higher/faster while scrolling, or lower if needed
export const DESKTOP_SCROLL_CLIMB = 1.2;
// ============================================================================

const SpiralScene = ({ projects, scrollProgress }) => {
  const mainGroupRef = useRef();
  const spiralGroupRef = useRef();
  const { camera, size } = useThree();

  const isMobile = size.width < 768;
  const aspect = size.width / Math.max(size.height, 1);
  const heightRatio = Math.max(size.height, 1) / 667;

  // 1] Dynamically scales spiral width to preserve the exact ~88% width and side margins of the 375x667 reference:
  const responsiveScale = isMobile
    ? Math.min(Math.max(MOBILE_SPIRAL_SCALE * (aspect / 0.5622), 0.36), 0.68)
    : 1.0;

  // 2] Dynamically positions spiral Y on taller phones (iPhone 12/15/Pixel) so it stays right under the text:
  const responsiveY = isMobile
    ? (MOBILE_SPIRAL_Y + (heightRatio - 1) * 0.28)
    : 0;

  // 3] Spiral total height and card height scale proportionally:
  const minRadius = 2.9;
  const maxRadius = 4;
  const totalTurns = 2.9;
  const totalHeight = isMobile
    ? (MOBILE_SPIRAL_TOTAL_HEIGHT * (1 + (heightRatio - 1) * 0.22))
    : 5.5;
  const cardHeight = isMobile ? MOBILE_SPIRAL_CARD_HEIGHT : 1.6;

  const scrollPosRef = useRef(0);
  const targetScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousMouseYRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerDown = (e) => {
      // Allow touch swipe to cleanly scroll the page without locking pointer capture
      if (e.pointerType === 'touch') {
        mousePosRef.current = { x: 0, y: 0 };
        return;
      }
      isDraggingRef.current = true;
      previousMouseYRef.current = e.clientY;
    };

    const handlePointerMove = (e) => {
      // Ignore touch moves so swiping/scrolling doesn't tilt or shift the spiral
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

    // Zero out mouse tilt & pan parallax on touch devices (phones & tablets)
    const isTouchOrCoarse = isMobile || (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    const mouseX = isTouchOrCoarse ? 0 : mousePosRef.current.x;
    const mouseY = isTouchOrCoarse ? 0 : mousePosRef.current.y;

    // Scroll entrance interpolation
    const entranceStartY = isMobile ? -3.4 : -4.2;
    const scrollClimb = isMobile ? MOBILE_SCROLL_CLIMB : DESKTOP_SCROLL_CLIMB;
    const entranceEndY = responsiveY + scrollClimb;
    const entranceY = THREE.MathUtils.lerp(entranceStartY, entranceEndY, scrollProgress);
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

export const SpiralGalleryCanvas = React.memo(({ projects, scrollProgress, isActive = true }) => {
  return (
    <div className="canvas-wrapper">
      <Canvas
        frameloop={isActive ? "always" : "never"}
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
