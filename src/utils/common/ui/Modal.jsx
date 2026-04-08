import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../Helper';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-dark/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40, rotateX: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative w-full bg-surface border border-brand/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden perspective-1000',
              sizes[size]
            )}
          >
            <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-surface-light/30">
              <div className="space-y-1">
                <h3 className="text-xs font-black text-brand uppercase tracking-[0.3em]">{title}</h3>
                <div className="h-1 w-8 bg-brand rounded-full" />
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-2xl text-text-secondary hover:text-text-primary hover:bg-surface-light hover:rotate-90 transition-all duration-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">{children}</div>
            {footer && <div className="px-8 py-6 border-t border-border bg-surface-light/50 flex justify-end gap-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
