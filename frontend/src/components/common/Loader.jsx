import React from 'react';
import clsx from 'clsx';

const Loader = ({ size = 'md', fullScreen = false, message = '', variant = 'navy' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const trackColors = {
    navy: 'border-[#0f2447]/15',
    blue: 'border-[#3b82f6]/15',
    white: 'border-white/20',
  };

  const spinColors = {
    navy: 'border-[#0f2447]',
    blue: 'border-[#3b82f6]',
    white: 'border-white',
  };

  const dotColors = {
    navy: 'bg-[#0f2447]',
    blue: 'bg-[#3b82f6]',
    white: 'bg-white',
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Dual-ring spinner */}
      <div className="relative" style={{ width: sizes[size].split(' ')[0].replace('h-', '') * 4 }}>
        <div className={clsx('rounded-full border-4', sizes[size], trackColors[variant])} />
        <div
          className={clsx(
            'absolute top-0 left-0 rounded-full border-4 border-t-transparent animate-spin',
            sizes[size],
            spinColors[variant]
          )}
          style={{ animationDuration: '0.75s' }}
        />
        {/* Inner dot */}
        <div
          className={clsx(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
            dotColors[variant]
          )}
          style={{ width: '6px', height: '6px', animation: 'pulse 1.5s ease-in-out infinite' }}
        />
      </div>

      {message && (
        <p
          className={clsx(
            'text-sm font-medium tracking-wide animate-pulse',
            variant === 'white' ? 'text-white/80' : 'text-[#475569]'
          )}
        >
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Logo mark */}
          <div className="w-14 h-14 rounded-2xl bg-[#0f2447] flex items-center justify-center shadow-[0_8px_24px_rgba(15,36,71,0.35)] animate-pulse">
            <span className="text-white text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              V
            </span>
          </div>
          {loader}
        </div>
      </div>
    );
  }

  return loader;
};

export default Loader;
