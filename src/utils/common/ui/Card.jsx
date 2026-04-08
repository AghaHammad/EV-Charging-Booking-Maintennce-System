import React from 'react';
import { cn } from '../Helper';

export const Card = ({
  children,
  title,
  className,
  headerAction,
  footer,
}) => {
  return (
    <div className={cn('bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl', className)}>
      {(title || headerAction) && (
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          {title && <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">{title}</h3>}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-border bg-surface-light">{footer}</div>}
    </div>
  );
};
