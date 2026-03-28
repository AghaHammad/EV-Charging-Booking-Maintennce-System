import React, { useState } from "react";
import { Fuel, Plus, Minus } from "lucide-react";

export default function DashboardMap({
  initialMapStations,
  handleBookNearestClick,
  showToast,
}) {
  const [mapZoomLevel, setMapZoomLevel] = useState(1);
  const [selectedMapStation, setSelectedMapStation] = useState(initialMapStations[0]);

  const handleMapZoomIn = () => {
    setMapZoomLevel((previousZoom) => Math.min(previousZoom + 0.1, 1.5));
    showToast("Map zoomed in");
  };

  const handleMapZoomOut = () => {
    setMapZoomLevel((previousZoom) => Math.max(previousZoom - 0.1, 0.9));
    showToast("Map zoomed out");
  };

  const handleMapStationClick = (station) => {
    setSelectedMapStation(station);
    showToast(`${station.name} selected`);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-[30px] border border-[#12dfff]/14 bg-[linear-gradient(180deg,rgba(8,26,36,0.98),rgba(7,23,32,0.98))] shadow-[0_20px_50px_rgba(0,0,0,0.24)]">
      <div className="relative h-[350px] overflow-hidden rounded-[30px] sm:h-[390px]">
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${mapZoomLevel})` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_18%_80%,rgba(18,223,255,0.05),transparent_25%),radial-gradient(circle_at_85%_82%,rgba(18,223,255,0.05),transparent_25%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:auto,auto,auto,18px_18px,18px_18px]" />

          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 h-full w-full opacity-90"
            preserveAspectRatio="none"
          >
            <rect x="0" y="0" width="1000" height="500" fill="rgba(7,18,28,0.78)" />
            <path
              d="M60 40 L220 40 L330 110 L470 110 L570 40 L710 40 L820 120 L940 120"
              stroke="rgba(180,190,205,0.20)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M50 260 L180 260 L300 180 L500 180 L660 260 L840 260 L970 180"
              stroke="rgba(180,190,205,0.22)"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M80 430 L220 430 L390 310 L600 310 L760 430 L930 430"
              stroke="rgba(180,190,205,0.16)"
              strokeWidth="3"
              fill="none"
            />
            <path d="M150 20 L150 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
            <path d="M320 20 L320 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
            <path d="M500 20 L500 470" stroke="rgba(255,255,255,0.20)" strokeWidth="4" />
            <path d="M680 20 L680 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
            <path d="M860 20 L860 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
            <path d="M70 110 L930 110" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
            <path d="M70 185 L930 185" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
            <path d="M70 260 L930 260" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
            <path d="M70 335 L930 335" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
            <path d="M70 410 L930 410" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
          </svg>

          {initialMapStations.map((station) => (
            <button
              key={station.id}
              onClick={() => handleMapStationClick(station)}
              className="absolute h-5 w-5 rounded-full border-2 border-white bg-[#18d8ff] shadow-[0_0_20px_rgba(24,216,255,0.85)]"
              style={{ left: station.left, top: station.top }}
            />
          ))}
        </div>

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <button
            onClick={handleMapZoomIn}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#12dfff]/14 bg-[#071d28]/92 text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={handleMapZoomOut}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#12dfff]/14 bg-[#071d28]/92 text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <button
            onClick={() => showToast(`${selectedMapStation.name} opened`)}
            className="flex min-w-0 items-center gap-4 rounded-[22px] border border-[#12dfff]/20 bg-[#092635]/95 px-4 py-4 text-left shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b87af]/26">
              <Fuel className="h-6 w-6 text-[#1bd6ff]" />
            </div>

            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-white">
                {selectedMapStation.name}
              </div>
              <div className="mt-1 text-[14px] text-white/54">
                {selectedMapStation.area}, {selectedMapStation.distance}
              </div>

              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-4 rounded-full bg-[#12dfff]" />
                <span className="h-1.5 w-4 rounded-full bg-[#12dfff]" />
                <span className="h-1.5 w-4 rounded-full bg-white/25" />
                <span className="h-1.5 w-4 rounded-full bg-white/18" />
              </div>
            </div>
          </button>

          <button
            onClick={() => handleBookNearestClick(selectedMapStation)}
            className="self-start rounded-full bg-[#12dfff] px-7 py-4 text-[18px] font-semibold text-[#06141b] shadow-[0_14px_30px_rgba(18,223,255,0.22)] transition hover:brightness-105"
          >
            Book Nearest
          </button>
        </div>
      </div>
    </div>
  );
}
