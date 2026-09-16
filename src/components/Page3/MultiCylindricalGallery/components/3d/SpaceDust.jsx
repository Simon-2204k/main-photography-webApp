import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SpaceDust({ count = 350 }) {
  const pointsRef = useRef();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a cylindrical volume around radius 2 to 9, height -15 to +15
      const radius = 2.5 + Math.random() * 7.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 30;

      pos[i * 3] = radius * Math.sin(angle);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.cos(angle);

      sz[i] = 0.02 + Math.random() * 0.04;
    }

    return [pos, sz];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Slow drifting rotation around Y
    pointsRef.current.rotation.y += 0.03 * delta;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a0b0d0"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
