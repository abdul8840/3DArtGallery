import React from 'react';
import clsx from 'clsx';

const Loader = ({ size = 'md', fullScreen = false, message = '' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div
          className={clsx(
            'rounded-full border-4 border-gray-200',
            sizes[size]
          )}
        />
        <div
          className={clsx(
            'absolute top-0 left-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin',
            sizes[size]
          )}
        />
      </div>
      {message && (
        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;