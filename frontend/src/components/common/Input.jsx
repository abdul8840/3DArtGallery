import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconRight,
      className = '',
      type = 'text',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const inputBase =
      'block w-full rounded-xl border transition-all duration-200 ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-0 ' +
      'placeholder:text-[#94a3b8] text-[#0f172a] font-medium text-sm';

    const variants = {
      default:
        'bg-white border-[#e2e8f0] hover:border-[#a8c8f5] ' +
        'focus:border-[#0f2447] focus:ring-[#0f2447]/10 ' +
        'shadow-sm',
      navy:
        'bg-[#0a1628] border-[#163461] text-white placeholder:text-[#6fa3e8] ' +
        'hover:border-[#2d5a9e] focus:border-[#3b82f6] focus:ring-[#3b82f6]/20',
      ghost:
        'bg-transparent border-transparent hover:border-[#e2e8f0] ' +
        'focus:border-[#0f2447] focus:ring-[#0f2447]/10',
    };

    const errorStyle =
      'border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500/15';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-[#0f2447] mb-1.5">
            {label}
            {props.required && (
              <span className="text-[#2563eb] ml-1 font-bold">*</span>
            )}
          </label>
        )}

        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-[#0f2447] transition-colors duration-200">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={clsx(
              inputBase,
              variants[variant],
              error ? errorStyle : '',
              icon ? 'pl-10' : 'px-4',
              iconRight ? 'pr-10' : 'pr-4',
              'py-3',
              props.disabled && 'opacity-60 cursor-not-allowed bg-[#f8fafc]',
              className
            )}
            {...props}
          />

          {iconRight && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94a3b8]">
              {iconRight}
            </div>
          )}

          {/* Focus bottom border accent */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0f2447] rounded-full transition-all duration-300 group-focus-within:w-full" />
        </div>

        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-xs text-[#64748b]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
