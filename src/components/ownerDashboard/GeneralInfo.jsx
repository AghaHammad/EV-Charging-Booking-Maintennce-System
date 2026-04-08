import React from 'react';
import { Info } from 'lucide-react';
import { Card } from '../../utils/common/ui/Card';
import { Input } from '../../utils/common/ui/Input';
import { Badge } from '../../utils/common/ui/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { updateStationName, updateAccessInstructions } from '../../redux/slices/stationSlice';

export const GeneralInfo = () => {
  const dispatch = useDispatch();
  const { name, status, accessInstructions } = useSelector((state) => state.station);

  return (
    <Card
      title="General Information"
      headerAction={<Info size={18} className="text-text-secondary hover:text-brand cursor-pointer transition-colors" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Input
          label="Station Name"
          value={name}
          onChange={(e) => dispatch(updateStationName(e.target.value))}
          placeholder="Enter station name..."
        />
        <div className="space-y-2.5">
          <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest">Connectivity Status</label>
          <div className="h-[52px] flex items-center px-5 bg-surface-light border border-border rounded-xl">
            <Badge variant="info" dot>
              {status}
            </Badge>
          </div>
        </div>
      </div>

      <Input
        label="Access Instructions"
        isTextArea
        value={accessInstructions}
        onChange={(e) => dispatch(updateAccessInstructions(e.target.value))}
        placeholder="Provide instructions for accessing the station..."
        className="min-h-[140px] leading-relaxed text-text-secondary"
      />
    </Card>
  );
};
