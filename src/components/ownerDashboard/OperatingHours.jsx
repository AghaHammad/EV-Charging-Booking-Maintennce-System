import React from 'react';
import { Clock, Edit3 } from 'lucide-react';
import { Card } from '../../utils/common/ui/Card';
import { Button } from '../../utils/common/ui/Button';
import { Badge } from '../../utils/common/ui/Badge';
import { EditScheduleModal } from '../../modals/EditScheduleModal';

export const OperatingHours = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Card
      title="Operating Hours"
      headerAction={<Badge variant="info" dot>Always Open</Badge>}
    >
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-5 bg-surface-light border border-border rounded-xl hover:border-brand/30 transition-all duration-300 shadow-sm">
          <div className="flex items-center space-x-4">
            <Clock size={16} className="text-text-secondary" />
            <span className="text-sm font-black text-text-primary">Mon - Fri</span>
          </div>
          <span className="text-sm font-black text-brand tracking-widest">00:00 - 23:59</span>
        </div>
        <div className="flex items-center justify-between p-5 bg-surface-light border border-border rounded-xl hover:border-brand/30 transition-all duration-300 shadow-sm">
          <div className="flex items-center space-x-4">
            <Clock size={16} className="text-text-secondary" />
            <span className="text-sm font-black text-text-primary">Sat - Sun</span>
          </div>
          <span className="text-sm font-black text-brand tracking-widest">00:00 - 23:59</span>
        </div>
      </div>

      <Button
        variant="outline"
        fullWidth
        onClick={() => setIsModalOpen(true)}
        className="py-4 border-border text-text-secondary hover:text-brand hover:border-brand/50"
      >
        <Edit3 size={14} className="mr-3" />
        Edit Custom Schedule
      </Button>

      <EditScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};
