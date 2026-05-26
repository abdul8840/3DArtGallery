import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const GalleryModel = ({ modelPath = '/models/gallery.glb', onLoad }) => {
  const { scene } = useGLTF(modelPath, true, true, (loader) => {
    loader.setDRACOLoader('/draco/');
  });
  const modelRef = useRef();
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    if (scene && !loaded) {
      // Configure shadows
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Optimize materials
          if (child.material) {
            child.material.needsUpdate = true;
          }
        }
      });
      
      setLoaded(true);
      onLoad?.();
    }
  }, [scene, loaded, onLoad]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// Preload the model
useGLTF.preload('/models/gallery.glb');

export default GalleryModel;