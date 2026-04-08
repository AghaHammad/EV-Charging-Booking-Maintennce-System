import React from 'react';
import { cn } from '../Helper';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  const variants = {
    primary: 'bg-brand text-bg-dark hover:bg-brand/90 active:scale-95 shadow-lg shadow-brand/10',
    secondary: 'bg-surface-light text-text-primary hover:bg-surface-light/80 active:scale-95',
    outline: 'border border-border text-text-primary hover:bg-surface active:scale-95',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase',
    md: 'px-4 py-2 text-xs font-bold tracking-wider uppercase',
    lg: 'px-8 py-3 text-xs font-bold tracking-wider uppercase',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
