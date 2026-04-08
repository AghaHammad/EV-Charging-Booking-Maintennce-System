import React from 'react';
import { cn } from '../Helper';

export const Badge = ({
  children,
  variant = 'neutral',
  className,
  dot = false,
}) => {
  const variants = {
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-500 border-red-500/20',
    info: 'bg-brand/10 text-brand border-brand/20',
    neutral: 'bg-surface-light text-text-secondary border-border',
  };

  const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-brand',
    neutral: 'bg-text-secondary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-200',
        variants[variant],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full mr-2', dotColors[variant])} />}
      {children}
    </span>
  );
};
