import React, { useRef, useMemo, memo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const CurvedCardMeshComponent = ({ 
  item, 
  radius = 2.0, 
  cardHeight = 1.6, 
  arcLength = 0.8,
  angle = 0, 
  posY = 0,
  coneTiltAngle = 0.0
}) => {
  const groupRef = useRef();

  const texture = useTexture(item.image);
  
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    }
  }, [texture]);

  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(
      radius,
      radius,
      cardHeight,
      32,
      1,
      true,
      -arcLength / 2,
      arcLength
    );
  }, [radius, cardHeight, arcLength]);

  const posX = radius * Math.sin(angle);
  const posZ = radius * Math.cos(angle);

  return (
    <group 
      ref={groupRef} 
      position={[posX, posY, posZ]}
      rotation={[coneTiltAngle, angle, 0]}
    >
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive={new THREE.Color(0xffffff)}
          emissiveIntensity={0.65}
          side={THREE.DoubleSide}
          roughness={0.06}
          metalness={0.14}
        />
      </mesh>
    </group>
  );
};

export const CurvedCardMesh = memo(CurvedCardMeshComponent);
export default CurvedCardMesh;
