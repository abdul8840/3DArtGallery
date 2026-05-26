import React from 'react';

const GalleryLights = () => {
  return (
    <>
      {/* Ambient Light - Overall scene illumination */}
      <ambientLight intensity={0.4} />

      {/* Main Directional Light - Simulates sunlight */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Spotlight for dramatic effect */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* Point lights for accent lighting */}
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffd700" />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ffffff" />

      {/* Hemisphere light for natural ambient */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.3}
      />
    </>
  );
};

export default GalleryLights;