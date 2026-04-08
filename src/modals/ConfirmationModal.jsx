import React from 'react';
import { Modal } from "../utils/common/ui/Modal";
import { Button } from "../utils/common/ui/Button";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  onConfirm, 
  confirmText = 'Confirm', 
  variant = 'primary' 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex w-full gap-4">
          <Button 
            variant="secondary" 
            onClick={onClose} 
            className="flex-1 py-4 text-[10px] tracking-[0.2em]"
          >
            Cancel
          </Button>
          <Button 
            variant={variant} 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className="flex-1 py-4 text-[10px] tracking-[0.2em]"
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center space-y-8 py-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className={`w-24 h-24 rounded-[2rem] flex items-center justify-center relative ${
            variant === 'primary' ? 'bg-brand/10 text-brand' : 'bg-red-500/10 text-red-500'
          }`}
        >
          <div className={`absolute inset-0 rounded-[2rem] blur-2xl opacity-20 animate-pulse ${
            variant === 'primary' ? 'bg-brand' : 'bg-red-500'
          }`} />
          {variant === 'primary' ? <CheckCircle2 size={48} strokeWidth={1.5} /> : <AlertTriangle size={48} strokeWidth={1.5} />}
        </motion.div>
        
        <div className="space-y-3 px-2">
          <motion.h4 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-black text-text-primary tracking-tight"
          >
            Are you absolutely sure?
          </motion.h4>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-text-secondary leading-relaxed font-medium"
          >
            {message}
          </motion.p>
        </div>
      </div>
    </Modal>
  );
};
