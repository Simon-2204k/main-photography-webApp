import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CentralSculpture({ scrollVelocity = 0 }) {
  const outerGroupRef = useRef();
  const innerCoreRef = useRef();
  const topRingRef = useRef();
  const bottomRingRef = useRef();

  useFrame((state, delta) => {
    if (!outerGroupRef.current) return;

    // Continuous slow rotation + reaction to scroll velocity
    const speedBoost = Math.abs(scrollVelocity) * 2.5;
    outerGroupRef.current.rotation.y += (0.2 + speedBoost) * delta;
    
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += (0.4 + speedBoost * 0.5) * delta;
      innerCoreRef.current.rotation.z += (0.3 + speedBoost * 0.5) * delta;
    }

    if (topRingRef.current && bottomRingRef.current) {
      topRingRef.current.rotation.y -= 0.5 * delta;
      bottomRingRef.current.rotation.y += 0.5 * delta;
    }
  });

  return (
    <group ref={outerGroupRef} position={[0, 0, 0]}>
      {/* Central Icosahedron Wireframe Core */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial
          wireframe
          color="#d0d5e8"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Futuristic Stacked Pedestal Wireframe Sculpture */}
      <group position={[0, -0.6, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 1.2, 0.7, 6]} />
          <meshBasicMaterial
            wireframe
            color="#8892b0"
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>

      <group position={[0, 0.6, 0]}>
        <mesh>
          <cylinderGeometry args={[1.2, 0.9, 0.7, 6]} />
          <meshBasicMaterial
            wireframe
            color="#8892b0"
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>

      {/* Orbiting Thin Wireframe Rings */}
      <group ref={topRingRef} position={[0, 1.2, 0]}>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[1.5, 0.015, 8, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
        </mesh>
      </group>

      <group ref={bottomRingRef} position={[0, -1.2, 0]}>
        <mesh rotation={[-Math.PI / 6, 0, 0]}>
          <torusGeometry args={[1.5, 0.015, 8, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* Minimal Wireframe Cube Bounding Frame */}
      <mesh>
        <boxGeometry args={[2.8, 3.2, 2.8]} />
        <meshBasicMaterial
          wireframe
          color="#4e5467"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Soft Center Light Glow */}
      <pointLight color="#a0c0ff" intensity={1.5} distance={6} />
    </group>
  );
}
