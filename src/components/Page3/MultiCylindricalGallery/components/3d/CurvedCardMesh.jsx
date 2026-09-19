import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import '../../shaders/CurvedCardMaterial';

function useSafeTexture(url) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    loader.load(
      url,
      (tex) => {
        if (!isMounted) return;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        setTexture(tex);
      },
      undefined,
      (err) => {
        console.warn('Texture load error for:', url, err);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [url]);

  return texture;
}

export const CurvedCardMesh = React.memo(function CurvedCardMesh({
  card,
  angle,
  radius,
  layerY = 0,
  layerFocus = 1.0,
  scrollVelocity = 0,
  layerOpacity = 1.0,
  cardWidth = 3.2,
  cardHeight = 2.0,
  layerIndex = 0,
  onSelectCard
}) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  const texture = useSafeTexture(card.image);

  const planeGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 1);
  }, [cardWidth, cardHeight]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const targetScale = hovered ? 1.15 : 1.0;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.18);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.18);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.18);

    if (texture) {
      materialRef.current.uTexture = texture;
    }
    materialRef.current.uRadius = radius;
    materialRef.current.uHover = THREE.MathUtils.lerp(materialRef.current.uHover, hovered ? 1.0 : 0.0, 0.15);
    materialRef.current.uTime = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={planeGeometry}
      position={[radius * Math.sin(angle), layerY, radius * Math.cos(angle)]}
      rotation={[0, angle, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelectCard) onSelectCard(card);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'default';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <customCurvedCardMaterial
        ref={materialRef}
        uTexture={texture}
        uRadius={radius}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});

export default CurvedCardMesh;
