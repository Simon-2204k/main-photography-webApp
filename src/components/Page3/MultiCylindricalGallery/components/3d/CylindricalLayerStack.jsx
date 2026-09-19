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
  const layerSpacing = 3.2;
  const totalStackHeight = layerCount * layerSpacing;
  const halfStackHeight = totalStackHeight / 2;

  const layerRotationsRef = useRef(LAYERS_DATA.map(() => 0));
  const activeLayerIdRef = useRef(-1);

  useFrame((state, delta) => {
    const p = physicsRef?.current;
    const curScrollY = p ? p.scrollY : scrollY;
    const curRotY = p ? p.rotationY : rotationY;
    const curVel = p ? p.scrollVelocity : scrollVelocity;
    const absVelocity = Math.abs(curVel);

    if (towerRef.current) {
      towerRef.current.rotation.y = curRotY;
    }

    let minDistance = Infinity;
    let closestLayerIndex = 0;
    let closestFocus = 0;

    LAYERS_DATA.forEach((layer, idx) => {

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

      const direction = idx % 2 === 0 ? 1 : -1;
      layerRotationsRef.current[idx] += direction * layer.rotationSpeed * delta;

      const ringGroup = ringRefs.current[idx];
      if (ringGroup) {
        ringGroup.position.y = currentY;
        ringGroup.rotation.y = layerRotationsRef.current[idx];

        const focusFactor = Math.max(0, 1 - absY / 5.2);
        const smoothFocus = focusFactor * focusFactor * (3 - 2 * focusFactor);

        const verticalScale = 0.62 + smoothFocus * 0.43;

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
