import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@store/slices/productSlice';
import GalleryCamera from './GalleryCamera';
import GalleryLights from './GalleryLights';
import GalleryModel from './GalleryModel';
import GalleryControls from './GalleryControls';
import InteractivePainting from './InteractivePainting';
import PaintingDetails from './PaintingDetails';
import LoadingScreen from './LoadingScreen';
import { IoExpand, IoContract, IoInformationCircleOutline } from 'react-icons/io5';

const Gallery3DScene = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [controlsLocked, setControlsLocked] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Fetch products with meshName for 3D gallery
    dispatch(fetchProducts({ limit: 50 }));

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (loadingProgress === 100) {
      setTimeout(() => setSceneLoaded(true), 500);
    }
  }, [loadingProgress]);

  const handlePaintingClick = (product) => {
    setSelectedPainting(product);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTimeout(() => setSelectedPainting(null), 300);
  };

  // Map products to painting positions (example positions)
  const paintingPositions = products
    .filter((p) => p.meshName)
    .map((product, index) => ({
      product,
      position: [
        Math.cos((index / products.length) * Math.PI * 2) * 8,
        1.6,
        Math.sin((index / products.length) * Math.PI * 2) * 8,
      ],
      rotation: [
        0,
        -Math.atan2(
          Math.sin((index / products.length) * Math.PI * 2),
          Math.cos((index / products.length) * Math.PI * 2)
        ),
        0,
      ],
    }));

  if (!sceneLoaded) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Instructions */}
      {showInstructions && !controlsLocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
          <div className="glass-dark text-white px-8 py-6 rounded-2xl text-center max-w-md">
            <IoInformationCircleOutline className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-display font-bold mb-2">
              Click to Enter Gallery
            </h3>
            <p className="text-gray-300 mb-4">
              Use <kbd className="px-2 py-1 bg-white text-black rounded">W A S D</kbd> to move
            </p>
            <p className="text-sm text-gray-400">
              Click on paintings to view details
            </p>
          </div>
        </div>
      )}

      {/* Controls Hint */}
      {controlsLocked && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
          <div className="glass-dark text-white px-6 py-3 rounded-full text-sm">
            <span className="text-yellow-500 font-semibold">ESC</span> to exit • 
            <span className="text-yellow-500 font-semibold ml-2">WASD</span> to move • 
            <span className="text-yellow-500 font-semibold ml-2">MOUSE</span> to look
          </div>
        </div>
      )}

      {/* Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000');
        }}
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <GalleryCamera />

          {/* Lights */}
          <GalleryLights />

          {/* Gallery Model */}
          <GalleryModel
            modelPath="/models/gallery.glb"
            onLoad={() => console.log('Gallery loaded')}
          />

          {/* Interactive Paintings */}
          {paintingPositions.map(({ product, position, rotation }, index) => (
            <InteractivePainting
              key={product._id}
              position={position}
              rotation={rotation}
              productData={product}
              meshName={product.meshName}
              onClick={handlePaintingClick}
            />
          ))}

          {/* Environment */}
          <Environment preset="warehouse" />
          
          {/* Sky */}
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />

          {/* Controls */}
          <GalleryControls
            onLock={() => {
              setControlsLocked(true);
              setShowInstructions(false);
            }}
            onUnlock={() => setControlsLocked(false)}
          />

          {/* Ground */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Suspense>
      </Canvas>

      {/* Painting Details Panel */}
      <PaintingDetails
        product={selectedPainting}
        isOpen={detailsOpen}
        onClose={handleCloseDetails}
      />

      {/* Exit Button */}
      {controlsLocked && (
        <button
          onClick={() => window.history.back()}
          className="absolute top-6 right-6 z-30 glass-dark text-white px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
        >
          Exit Gallery
        </button>
      )}
    </div>
  );
};

export default Gallery3DScene;