import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ progress = 0 }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-4xl font-display font-bold">V</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            Loading Virtual Gallery
          </h2>
          <p className="text-gray-400">Preparing your immersive art experience...</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-gold"
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-3">{Math.round(progress)}%</p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-yellow-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;