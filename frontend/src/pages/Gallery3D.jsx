import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Gallery3DScene from '@components/gallery3d/Gallery3DScene';
import LoadingScreen from '@components/gallery3d/LoadingScreen';

const Gallery3D = () => {
  return (
    <>
      <Helmet>
        <title>3D Virtual Gallery | Virtual Art Gallery</title>
        <meta
          name="description"
          content="Experience art in an immersive 3D virtual gallery. Walk through our museum and interact with artworks in a realistic environment."
        />
      </Helmet>

      <Suspense fallback={<LoadingScreen progress={0} />}>
        <Gallery3DScene />
      </Suspense>
    </>
  );
};

export default Gallery3D;