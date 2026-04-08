import React from 'react';
import { Modal } from '../utils/common/ui/Modal';
import { Button } from '../utils/common/ui/Button';
import { Input } from '../utils/common/ui/Input';
import { useDispatch } from 'react-redux';
import { addSlot } from '../redux/slices/stationSlice';

export const ProvisionSlotModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('Level 3 Ultra Fast (350kW)');

  const handleProvision = () => {
    if (name) {
      dispatch(
        addSlot({
          id: Math.random().toString(36).substr(2, 9),
          name,
          type,
          status: 'AVAILABLE',
          health: 100,
        })
      );
      setName('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Provision New Slot"
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
            onClick={handleProvision} 
            className="flex-1 py-5 text-[10px] tracking-[0.2em]"
          >
            Confirm Provision
          </Button>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="space-y-3">
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            Configure technical specifications for the new charging slot. Ensure designation follows facility naming conventions.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-brand/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label="Slot Designation"
            placeholder="e.g. Slot A-103"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-surface-light/50 border-brand/10 focus:border-brand"
          />
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Hardware Profile</label>
            <div className="relative group">
              <select
                className="w-full bg-surface-light/50 border border-brand/10 rounded-xl px-5 py-4 text-sm text-text-primary focus:outline-none focus:border-brand transition-all appearance-none cursor-pointer group-hover:bg-surface-light"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Level 3 Ultra Fast (350kW)</option>
                <option>Level 2 Standard (22kW)</option>
                <option>Level 1 Basic (3.7kW)</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-brand group-hover:scale-110 transition-transform">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-brand/5 border border-brand/10 rounded-2xl flex items-start space-x-4">
          <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
            <svg className="text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-text-primary uppercase tracking-wider">Auto-Provisioning Active</p>
            <p className="text-[10px] text-text-secondary leading-relaxed uppercase font-bold tracking-widest opacity-60">
              System will automatically calibrate power distribution for the new node.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
