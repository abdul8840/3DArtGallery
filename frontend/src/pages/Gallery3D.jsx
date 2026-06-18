import React, { Suspense } from 'react';
import Gallery3DScene from '@components/gallery3d/Gallery3DScene';
import LoadingScreen from '@components/gallery3d/LoadingScreen';

const Gallery3D = () => {
  return (
    <>

      <Suspense fallback={<LoadingScreen progress={0} />}>
        <Gallery3DScene />
      </Suspense>
    </>
  );
};

export default Gallery3D;