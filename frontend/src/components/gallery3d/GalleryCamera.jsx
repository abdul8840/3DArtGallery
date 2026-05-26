import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

const GalleryCamera = ({ target = [0, 1.6, 0] }) => {
  const cameraRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (cameraRef.current) {
      // Smooth camera follow
      cameraRef.current.lookAt(...target);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 1.6, 5]}
      fov={75}
      near={0.1}
      far={1000}
    />
  );
};

export default GalleryCamera;