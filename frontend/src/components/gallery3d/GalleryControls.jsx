import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

const GalleryControls = ({ onLock, onUnlock }) => {
  const controlsRef = useRef();
  const { camera } = useThree();
  const moveSpeed = 0.1;
  const keysPressed = useRef({});

  // Handle keyboard input
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!controlsRef.current?.isLocked) return;

    const direction = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(direction);
    right.crossVectors(camera.up, direction).normalize();

    // Movement
    if (keysPressed.current['w']) {
      camera.position.addScaledVector(direction, moveSpeed);
    }
    if (keysPressed.current['s']) {
      camera.position.addScaledVector(direction, -moveSpeed);
    }
    if (keysPressed.current['a']) {
      camera.position.addScaledVector(right, moveSpeed);
    }
    if (keysPressed.current['d']) {
      camera.position.addScaledVector(right, -moveSpeed);
    }

    // Constrain Y position (keep at eye level)
    camera.position.y = Math.max(0.5, Math.min(camera.position.y, 3));
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      onLock={onLock}
      onUnlock={onUnlock}
    />
  );
};

export default GalleryControls;