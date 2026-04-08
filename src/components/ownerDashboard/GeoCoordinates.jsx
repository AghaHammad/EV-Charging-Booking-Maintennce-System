import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card } from '../../utils/common/ui/Card';
import { useSelector } from 'react-redux';

export const GeoCoordinates = () => {
  const { latitude, longitude } = useSelector((state) => state.station);

  return (
    <Card title="Geocoordinates">
      <div className="relative h-56 mb-8 rounded-2xl overflow-hidden border border-border group">
        <img
          src={`https://picsum.photos/seed/map-dark-37-122/600/400?grayscale&blur=1`}
          alt="Map"
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-brand rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-14 h-14 bg-brand/10 border-2 border-brand rounded-full flex items-center justify-center shadow-2xl shadow-brand/40">
              <MapPin className="text-brand" size={28} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2.5">
          <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Latitude</label>
          <div className="bg-surface-light border border-border rounded-xl px-5 py-4 text-sm font-black text-text-primary flex items-center justify-between shadow-sm">
            <span>{latitude.toFixed(4)}° N</span>
            <Navigation size={14} className="text-brand rotate-45" />
          </div>
        </div>
        <div className="space-y-2.5">
          <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Longitude</label>
          <div className="bg-surface-light border border-border rounded-xl px-5 py-4 text-sm font-black text-text-primary flex items-center justify-between shadow-sm">
            <span>{Math.abs(longitude).toFixed(4)}° W</span>
            <Navigation size={14} className="text-brand rotate-[135deg]" />
          </div>
        </div>
      </div>
    </Card>
  );
};
