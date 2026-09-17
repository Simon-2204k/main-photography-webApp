import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { CylindricalLayerStack } from './CylindricalLayerStack';
import { CentralWireframeS } from './CentralWireframeS';

function AdaptiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    if (aspect < 1) {
      // Tall portrait viewports (1024x1366, iPads, mobile phones)
      camera.position.z = Math.min(13.5, 9.5 / Math.max(0.72, aspect));
      camera.fov = aspect < 0.6 ? 54 : 50;
    } else {
      camera.position.z = 10.0;
      camera.fov = 50;
    }
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera]);
  return null;
}

export const CylindricalGalleryCanvas = React.memo(function CylindricalGalleryCanvas({
  physicsRef,
  isVisible = true,
  scrollY,
  rotationY,
  scrollVelocity,
  onSelectCard,
  onActiveLayerChange
}) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-[#212121]">
      <Canvas
        camera={{ position: [0, 0, 10.0], fov: 50, near: 0.1, far: 50 }}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
      >
        <AdaptiveCamera />
        {/* Environment Background Color #000000 & Atmospheric Fog */}
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 30]} />

        {/* Studio Lighting */}
        <ambientLight intensity={1.6} />
        <directionalLight position={[5, 10, 8]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-6, -4, 5]} intensity={1.0} color="#c0d0f0" />
        <pointLight position={[0, 0, 6]} intensity={1.2} color="#ffffff" />

        {/* Central Dynamic Wireframe "S" Sculpture */}
        <CentralWireframeS physicsRef={physicsRef} scrollVelocity={scrollVelocity} />

        {/* Multi-Cylindrical Stack */}
        <CylindricalLayerStack
          physicsRef={physicsRef}
          scrollY={scrollY}
          rotationY={rotationY}
          scrollVelocity={scrollVelocity}
          onSelectCard={onSelectCard}
          onActiveLayerChange={onActiveLayerChange}
        />

        {/* Wide Soft Spreading Bloom Effect with zero multisampling for performance */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.8}
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
});

export default CylindricalGalleryCanvas;
