import React from 'react';
import { Plus, Zap } from 'lucide-react';
import { Card } from '../../utils/common/ui/Card';
import { Button } from '../../utils/common/ui/Button';
import { Badge } from '../../utils/common/ui/Badge';
import { useSelector } from 'react-redux';
import { ProvisionSlotModal } from '../../modals/ProvisionSlotModal';

export const SlotManagement = () => {
  const { slots } = useSelector((state) => state.station);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Card
      title="Slot Management"
      headerAction={
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="text-brand hover:bg-brand/10"
        >
          <Plus size={14} className="mr-2" />
          Provision New Slot
        </Button>
      }
    >
      <div className="space-y-4">
        {slots.map((slot) => (
            <div key={slot.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-surface-light border border-border rounded-2xl hover:border-brand/30 hover:bg-surface-light/80 transition-all duration-300 cursor-pointer shadow-sm">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center group-hover:bg-brand/10 group-hover:border-brand/30 transition-all shadow-inner shrink-0">
                  <Zap size={28} className="text-text-secondary group-hover:text-brand transition-colors" />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <h4 className="text-lg font-black text-text-primary group-hover:text-brand transition-colors truncate">{slot.name}</h4>
                  <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">{slot.type}</p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5">
                <div className="flex items-center justify-end">
                  <Badge variant={slot.status === 'AVAILABLE' ? 'success' : 'warning'} dot>
                    {slot.status}
                  </Badge>
                </div>
                <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] whitespace-nowrap">
                  {slot.status === 'AVAILABLE' ? `${slot.health}% Health` : `ETA ${slot.eta}`}
                </p>
              </div>
            </div>
        ))}
      </div>

      <ProvisionSlotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};
