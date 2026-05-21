import React from 'react';
import clsx from 'clsx';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false,
  onClick,
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-xl border border-gray-200 transition-all duration-300',
        paddings[padding],
        shadows[shadow],
        hover && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;