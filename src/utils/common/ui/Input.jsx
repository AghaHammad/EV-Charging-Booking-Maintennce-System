import React from 'react';
import { cn } from '../Helper';

export const Input = ({
  label,
  error,
  isTextArea = false,
  className,
  ...props
}) => {
  const inputClasses = cn(
    'w-full bg-surface-light border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    error && 'border-red-500 focus:border-red-500',
    className
  );

  return (
    <div className="space-y-2.5">
      {label && <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest">{label}</label>}
      {isTextArea ? (
        <textarea className={cn(inputClasses, 'resize-none min-h-[100px]')} {...props} />
      ) : (
        <input className={inputClasses} {...props} />
      )}
      {error && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{error}</p>}
    </div>
  );
};
