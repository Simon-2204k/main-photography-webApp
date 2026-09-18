import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { LAYERS_DATA } from '../../data/galleryData';
import { CylindricalLayerRing } from './CylindricalLayerRing';

export const CylindricalLayerStack = React.memo(function CylindricalLayerStack({
  physicsRef,
  scrollY = 0,
  rotationY = 0,
  scrollVelocity = 0,
  onSelectCard,
  onActiveLayerChange
}) {
  const towerRef = useRef();
  const ringRefs = useRef([]);

  const layerCount = LAYERS_DATA.length;
  const layerSpacing = 3.2; // Cylindrical barrel tower spacing
  const totalStackHeight = layerCount * layerSpacing; // 22.4 units
  const halfStackHeight = totalStackHeight / 2;

  // Persistent per-layer rotation accumulators
  const layerRotationsRef = useRef(LAYERS_DATA.map(() => 0));
  const activeLayerIdRef = useRef(-1);

  useFrame((state, delta) => {
    const p = physicsRef?.current;
    const curScrollY = p ? p.scrollY : scrollY;
    const curRotY = p ? p.rotationY : rotationY;
    const curVel = p ? p.scrollVelocity : scrollVelocity;
    const absVelocity = Math.abs(curVel);

    // 1. Rotate whole tower smoothly
    if (towerRef.current) {
      towerRef.current.rotation.y = curRotY;
    }

    let minDistance = Infinity;
    let closestLayerIndex = 0;
    let closestFocus = 0;

    // 2. Transform individual rings directly in WebGL
    LAYERS_DATA.forEach((layer, idx) => {
      // Calculate wrapped Y coordinate
      let rawY = layer.baseY - curScrollY;
      let currentY = ((rawY + halfStackHeight) % totalStackHeight + totalStackHeight) % totalStackHeight - halfStackHeight;

      const absY = Math.abs(currentY);
      if (absY < minDistance) {
        minDistance = absY;
        closestLayerIndex = idx;
        const focusRange = 3.8;
        const rawFactor = Math.max(0, 1 - absY / focusRange);
        closestFocus = rawFactor * rawFactor * (3 - 2 * rawFactor);
      }

      // Directional idle rotation
      const direction = idx % 2 === 0 ? 1 : -1;
      layerRotationsRef.current[idx] += direction * layer.rotationSpeed * delta;

      // Update ring group position, rotation, and dynamic radius scale
      const ringGroup = ringRefs.current[idx];
      if (ringGroup) {
        ringGroup.position.y = currentY;
        ringGroup.rotation.y = layerRotationsRef.current[idx];

        // Dynamic focus factor: 1.0 at center (absY = 0), dropping smoothly as it scrolls away
        const focusFactor = Math.max(0, 1 - absY / 5.2);
        const smoothFocus = focusFactor * focusFactor * (3 - 2 * focusFactor);

        // Perspective scaling: center active ring is 1.05, distant rings scale down to 0.62
        const verticalScale = 0.62 + smoothFocus * 0.43;

        // Dynamic radius expansion and velocity contraction
        const focusExpandDelta = 0.6 * smoothFocus;
        const scrollContractDelta = Math.min(0.8, absVelocity * 4.0);
        const effectiveRadius = Math.max(3.2, Math.min(5.5, layer.baseRadius + focusExpandDelta - scrollContractDelta));
        const scaleRadius = (effectiveRadius / layer.baseRadius) * verticalScale;

        ringGroup.scale.set(scaleRadius, verticalScale, scaleRadius);
      }
    });

    if (closestLayerIndex !== activeLayerIdRef.current) {
      activeLayerIdRef.current = closestLayerIndex;
      if (onActiveLayerChange) {
        onActiveLayerChange({
          layer: LAYERS_DATA[closestLayerIndex],
          focus: closestFocus,
          index: closestLayerIndex,
          total: layerCount
        });
      }
    }
  });

  return (
    <group ref={towerRef}>
      {/* Vertical Stack of Cylindrical Layer Rings */}
      {LAYERS_DATA.map((layer, idx) => (
        <group
          key={layer.id}
          ref={(el) => (ringRefs.current[idx] = el)}
        >
          <CylindricalLayerRing
            layer={layer}
            onSelectCard={onSelectCard}
          />
        </group>
      ))}
    </group>
  );
});

export default CylindricalLayerStack;
