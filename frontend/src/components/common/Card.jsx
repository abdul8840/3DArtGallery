import React from 'react';
import clsx from 'clsx';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false,
  border = true,
  onClick,
  variant = 'white',
}) => {
  const paddings = {
    none: '',
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-[0_4px_16px_rgba(2,11,24,0.08)]',
    lg: 'shadow-[0_8px_32px_rgba(2,11,24,0.12)]',
    xl: 'shadow-[0_16px_48px_rgba(2,11,24,0.16)]',
  };

  const variants = {
    white: 'bg-white',
    light: 'bg-[#f8fafc]',
    navy: 'bg-[#0f2447] text-white',
    'navy-dark': 'bg-[#0a1628] text-white',
    glass: 'glass-white',
    'glass-navy': 'glass-navy text-white',
  };

  const borderStyles = {
    white: 'border border-[#e2e8f0]',
    light: 'border border-[#e2e8f0]',
    navy: 'border border-[#1d4480]',
    'navy-dark': 'border border-[#163461]',
    glass: '',
    'glass-navy': '',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-2xl transition-all duration-300',
        variants[variant],
        border && borderStyles[variant],
        paddings[padding],
        shadows[shadow],
        hover && [
          'cursor-pointer',
          variant === 'white' || variant === 'light'
            ? 'hover:shadow-[0_12px_40px_rgba(15,36,71,0.15)] hover:-translate-y-1 hover:border-[#a8c8f5]'
            : 'hover:shadow-[0_12px_40px_rgba(2,11,24,0.4)] hover:-translate-y-1',
        ],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
