import React from 'react';
import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const base =
    'relative inline-flex items-center justify-center font-semibold tracking-wide ' +
    'transition-all duration-300 focus:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ' +
    'overflow-hidden select-none btn-ripple';

  const variants = {
    primary:
      'bg-[#0f2447] text-white hover:bg-[#163461] active:bg-[#0a1628] ' +
      'shadow-md hover:shadow-[0_8px_24px_rgba(15,36,71,0.4)] focus-visible:ring-[#0f2447] ' +
      'border border-[#1d4480]',
    secondary:
      'bg-white text-[#0f2447] hover:bg-[#eef5ff] active:bg-[#d4e8ff] ' +
      'shadow-md hover:shadow-[0_8px_24px_rgba(15,36,71,0.15)] focus-visible:ring-[#0f2447] ' +
      'border border-[#a8c8f5]',
    outline:
      'bg-transparent text-[#0f2447] border-2 border-[#0f2447] ' +
      'hover:bg-[#0f2447] hover:text-white active:bg-[#0a1628] ' +
      'focus-visible:ring-[#0f2447]',
    'outline-white':
      'bg-transparent text-white border-2 border-white ' +
      'hover:bg-white hover:text-[#0f2447] active:bg-[#eef5ff] active:text-[#0f2447] ' +
      'focus-visible:ring-white',
    ghost:
      'bg-transparent text-[#0f2447] hover:bg-[#eef5ff] active:bg-[#d4e8ff] ' +
      'focus-visible:ring-[#0f2447]',
    accent:
      'bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] ' +
      'shadow-md hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] focus-visible:ring-[#2563eb]',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 ' +
      'shadow-md focus-visible:ring-red-500',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs rounded-md gap-1',
    sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-xl gap-2',
    xl: 'px-9 py-4.5 text-lg rounded-2xl gap-2.5',
  };

  const iconEl = icon ? (
    <span className={clsx('flex-shrink-0', loading && 'opacity-0')}>{icon}</span>
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {/* Hover shine overlay */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
        }}
      />

      {loading && (
        <svg
          className="absolute animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      <span className={clsx('flex items-center gap-inherit', loading && 'opacity-0')}>
        {iconPosition === 'left' && iconEl}
        {children}
        {iconPosition === 'right' && iconEl}
      </span>
    </button>
  );
};

export default Button;
