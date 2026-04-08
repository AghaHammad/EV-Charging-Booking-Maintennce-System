import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, X, Zap } from 'lucide-react';
import { Sidebar } from '../../components/ownerDashboard/Sidebar';
import { Topbar } from '../../components/ownerDashboard/Topbar';
import { GeneralInfo } from '../../components/ownerDashboard/GeneralInfo';
import { SlotManagement } from '../../components/ownerDashboard/SlotManagement';
import { GeoCoordinates } from '../../components/ownerDashboard/GeoCoordinates';
import { OperatingHours } from '../../components/ownerDashboard/OperatingHours';
import { EfficiencyRating } from '../../components/ownerDashboard/EfficiencyRating';
import { Button } from '../../utils/common/ui/Button';
import { ConfirmationModal } from '../../modals/ConfirmationModal';

export default function StationManagement() {
  const [isDiscardModalOpen, setIsDiscardModalOpen] = React.useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary font-sans selection:bg-brand/30">
      <Sidebar />
      <Topbar />

      <main className="md:ml-64 pt-28 pb-16 px-4 md:px-8 lg:px-16 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-[1400px] mx-auto space-y-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <nav className="flex items-center space-x-3 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
                <span className="hover:text-brand cursor-pointer transition-colors">Stations</span>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-brand">Neon Hub West</span>
              </nav>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-text-primary">Station Configuration</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="secondary" 
                className="flex-1 md:flex-none px-10 py-4 group/btn"
                onClick={() => setIsDiscardModalOpen(true)}
              >
                <X size={16} className="mr-3 group-hover/btn:rotate-90 transition-transform duration-500" />
                Discard Changes
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 md:flex-none px-10 py-4 group/btn"
                onClick={() => setIsUpdateModalOpen(true)}
              >
                <Zap size={16} className="mr-3 group-hover/btn:scale-125 transition-transform duration-300" fill="currentColor" />
                Update Station
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            <div className="md:col-span-12 lg:col-span-8 space-y-10">
              <GeneralInfo />
              <SlotManagement />
            </div>

            <div className="md:col-span-12 lg:col-span-4 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10">
                <GeoCoordinates />
                <OperatingHours />
              </div>
              <EfficiencyRating />
            </div>
          </div>
        </motion.div>
      </main>

      <ConfirmationModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        title="Discard Changes"
        message="Are you sure you want to discard all unsaved changes? This action cannot be undone."
        onConfirm={() => console.log('Changes discarded')}
        variant="secondary"
        confirmText="Discard"
      />

      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Station"
        message="Your changes will be applied immediately. Do you want to proceed with the update?"
        onConfirm={() => console.log('Station updated')}
        variant="primary"
        confirmText="Update"
      />
    </div>
  );
}
