import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const InteractivePainting = ({
  position,
  rotation,
  productData,
  onClick,
  meshName,
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const glowIntensity = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      // Glow effect on hover
      if (hovered) {
        glowIntensity.current = Math.min(glowIntensity.current + 0.05, 1);
      } else {
        glowIntensity.current = Math.max(glowIntensity.current - 0.05, 0);
      }

      // Apply glow
      if (meshRef.current.material) {
        meshRef.current.material.emissive = new THREE.Color(0xffd700);
        meshRef.current.material.emissiveIntensity = glowIntensity.current * 0.3;
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Painting Mesh */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(productData)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial
          map={productData.texture}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[2.2, 1.7, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Hover Label */}
      {hovered && (
        <Html
          position={[0, -1, 0]}
          center
          distanceFactor={5}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="bg-black bg-opacity-80 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-xl">
            <p className="font-semibold text-sm">{productData.title}</p>
            <p className="text-xs text-gray-300">{productData.artist.name}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default InteractivePainting;