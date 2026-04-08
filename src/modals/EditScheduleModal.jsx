import React from 'react';
import { Modal } from "../utils/common/ui/Modal";
import { Button } from "../utils/common/ui/Button";
import { Input } from "../utils/common/ui/Input";

export const EditScheduleModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Operating Schedule"
      footer={
        <div className="flex w-full gap-4">
          <Button 
            variant="secondary" 
            onClick={onClose} 
            className="flex-1 py-5 text-[10px] tracking-[0.2em]"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={onClose} 
            className="flex-1 py-5 text-[10px] tracking-[0.2em]"
          >
            Save Schedule
          </Button>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="space-y-3">
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            Define custom availability windows for this station. Changes will be propagated to all connected navigation systems.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-brand/30 to-transparent" />
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Standard Weekdays</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Opening Time" type="time" defaultValue="00:00" className="bg-surface-light/50" />
              <Input label="Closing Time" type="time" defaultValue="23:59" className="bg-surface-light/50" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Weekend Protocol</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Opening Time" type="time" defaultValue="00:00" className="bg-surface-light/50" />
              <Input label="Closing Time" type="time" defaultValue="23:59" className="bg-surface-light/50" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-surface-light/50 border border-border rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-black text-text-primary uppercase tracking-wider">24/7 Operation</p>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">Force always-on status</p>
          </div>
          <div className="w-12 h-6 bg-brand/20 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-brand rounded-full" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
