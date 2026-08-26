import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

const SingleRibbonSegment = ({
  item,
  startT,
  endT,
  minRadius,
  maxRadius,
  totalTurns,
  totalHeight,
  cardHeight,
  subdivisions = 8
}) => {
  const groupRef = useRef();
  const hoverValRef = useRef({ offset: 0 });
  const texture = useTexture(item.image);

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    }
  }, [texture]);

  // Construct smooth quad ribbon geometry for this card
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = [];
    const uvs = [];
    const indices = [];

    for (let s = 0; s <= subdivisions; s++) {
      const subFrac = s / subdivisions;
      const t = startT + (endT - startT) * subFrac;

      const radius = minRadius + (maxRadius - minRadius) * t;
      const angle = t * totalTurns * Math.PI * 2;
      const y = (t - 0.5) * totalHeight;

      const x = radius * Math.sin(angle);
      const z = radius * Math.cos(angle);

      positions.push(x, y + cardHeight / 2, z);
      uvs.push(subFrac, 1);

      positions.push(x, y - cardHeight / 2, z);
      uvs.push(subFrac, 0);
    }

    for (let s = 0; s < subdivisions; s++) {
      const topLeft = s * 2;
      const bottomLeft = s * 2 + 1;
      const topRight = (s + 1) * 2;
      const bottomRight = (s + 1) * 2 + 1;

      indices.push(topLeft, bottomLeft, topRight);
      indices.push(bottomLeft, bottomRight, topRight);
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }, [startT, endT, minRadius, maxRadius, totalTurns, totalHeight, cardHeight, subdivisions]);

  // Midpoint radial vector for pop-out animation
  const midAngle = ((startT + endT) / 2) * totalTurns * Math.PI * 2;
  const normalX = Math.sin(midAngle);
  const normalZ = Math.cos(midAngle);

  // Frame Loop - Smooth hover displacement
  useFrame(() => {
    if (!groupRef.current) return;
    const currentOffset = hoverValRef.current.offset;
    groupRef.current.position.x = normalX * currentOffset;
    groupRef.current.position.z = normalZ * currentOffset;
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    gsap.to(hoverValRef.current, {
      offset: 0.35,
      duration: 0.35,
      ease: 'back.out(1.7)'
    });
  };

  const handlePointerOut = () => {
    gsap.to(hoverValRef.current, {
      offset: 0.0,
      duration: 0.35,
      ease: 'power2.out'
    });
  };

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Front Face (Bright Full Color with Gloomy Luminous Glow & Crisp Highlights) */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive={new THREE.Color(0xffffff)}
          emissiveIntensity={1}  /* <-- Change here: Boost/lower front card glow brightness */
          side={THREE.FrontSide}
          roughness={0.01}          /* <-- Change here: Lower roughness (e.g. 0.05) gives shiny highlights */
          metalness={0.3}          /* <-- Change here: Higher metalness gives sharper specular reflections */
        />
      </mesh>

      {/* Back Face (Darker Shaded Backing) */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive={new THREE.Color(0x222222)}
          emissiveIntensity={0.15}
          color={new THREE.Color(0x444444)}
          side={THREE.BackSide}
          roughness={0.35}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
};

export const SpiralRibbonMesh = ({
  projects,
  minRadius = 2.9,
  maxRadius = 4.0,
  totalTurns = 2.9,
  totalHeight = 5.5,
  cardHeight = 1.6
}) => {
  const ribbonCards = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const avgRadius = (minRadius + maxRadius) / 2;
    const totalArcLength = totalTurns * Math.PI * 2 * avgRadius;
    const targetCardWidth = cardHeight * (9 / 16);
    const cardCount = Math.max(Math.round(totalArcLength / targetCardWidth), projects.length);

    const list = [];
    for (let i = 0; i < cardCount; i++) {
      const item = projects[i % projects.length];
      const startT = i / cardCount;
      const endT = (i + 1) / cardCount;
      list.push({ item, startT, endT, idx: i });
    }
    return list;
  }, [projects, minRadius, maxRadius, totalTurns, cardHeight]);

  return (
    <group>
      {ribbonCards.map((card) => (
        <SingleRibbonSegment
          key={`ribbon-card-${card.idx}`}
          item={card.item}
          startT={card.startT}
          endT={card.endT}
          minRadius={minRadius}
          maxRadius={maxRadius}
          totalTurns={totalTurns}
          totalHeight={totalHeight}
          cardHeight={cardHeight}
          subdivisions={8}
        />
      ))}
    </group>
  );
};
