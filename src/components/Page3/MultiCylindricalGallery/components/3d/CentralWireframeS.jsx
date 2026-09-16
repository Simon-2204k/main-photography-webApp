import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CentralWireframeS = React.memo(function CentralWireframeS({ physicsRef, scrollVelocity = 0 }) {
  const groupRef = useRef();

  // Construct a compact 3D "S" curve path
  const tubeGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0.5, 1.0, 0),
      new THREE.Vector3(0.0, 1.3, 0.15),
      new THREE.Vector3(-0.5, 0.9, 0),
      new THREE.Vector3(-0.35, 0.35, -0.15),
      new THREE.Vector3(0.0, 0.0, 0),
      new THREE.Vector3(0.35, -0.35, 0.15),
      new THREE.Vector3(0.5, -0.9, 0),
      new THREE.Vector3(0.0, -1.3, -0.15),
      new THREE.Vector3(-0.5, -1.0, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 64, 0.32, 10, false);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Read dynamic velocity from physicsRef without triggering React re-renders
    const currentVelocity = physicsRef?.current?.scrollVelocity ?? scrollVelocity;
    const absVelocity = Math.abs(currentVelocity);
    const scrollSpin = currentVelocity * 2.2;
    groupRef.current.rotation.y += (delta * 0.4 + scrollSpin);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      currentVelocity * 0.4,
      0.1
    );

    // 2. Dynamic Scale: Shrinks on scroll velocity, expands smoothly back on stop
    const targetScale = Math.max(0.4, 0.7 - Math.min(0.3, absVelocity * 5.0));
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.15);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.15);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.15);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[0.7, 0.7, 0.7]}>
      {/* Compact 3D Volumetric Wireframe "S" Sculpture */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          wireframe
          color="#d5d5e2"
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Framing Geodesic Wireframe Core Sphere */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshBasicMaterial
          wireframe
          color="#808095"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbital Trajectory Ring */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.6, 0.012, 16, 80]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
});
