import React from "react";
import StationMapMarker from "./StationMapMarker";
import StationsMapSvg from "../../assets/Icons/StationsMapSvg";
import { joinClasses } from "../../utils/common/helper";
import { getStatusPresentation, getStatusLabel } from "./utils";

export default function StationsMap({
  filteredStationItems,
  selectedStationId,
  setSelectedStationId,
  showToast,
  currentDateLabel,
}) {
  const selectedStation = filteredStationItems.find(s => s.id === selectedStationId) || filteredStationItems[0];

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(9,30,41,0.98),rgba(8,25,35,0.98))]">
      <div className="border-b border-white/5 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[18px] font-semibold tracking-[-0.03em] text-white">
              United States station map
            </div>
            <div className="mt-1 text-[14px] text-white/48">
              Interactive charging points with live status • {currentDateLabel}
            </div>
          </div>

          <button
            onClick={() => showToast("Map opened")}
            className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-2 text-[14px] text-white/70"
          >
            View Network
          </button>
        </div>
      </div>

      <div className="relative h-[280px] overflow-hidden sm:h-[340px] lg:h-[360px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(16,221,255,0.08),transparent_28%),radial-gradient(circle_at_75%_35%,rgba(16,221,255,0.05),transparent_28%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,auto,32px_32px,32px_32px]" />


        {filteredStationItems.map((station) => (
          <StationMapMarker
            key={station.id}
            station={station}
            selected={selectedStationId === station.id}
            onClick={() => {
              setSelectedStationId(station.id);
              showToast(`${station.name} selected`);
            }}
          />
        ))}

        {selectedStation && (
          <div className="absolute bottom-4 left-4 right-4 rounded-[24px] border border-[#0fe1ff]/10 bg-[#0b2130]/92 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:right-auto sm:w-[360px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                  {selectedStation.name}
                </div>
                <div className="mt-1 text-[14px] text-white/52">
                  {selectedStation.city} • {selectedStation.distanceKm} km
                </div>
              </div>

              <div
                className={joinClasses(
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold",
                  getStatusPresentation(selectedStation.status).badgeClasses
                )}
              >
                {getStatusLabel(selectedStation)}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-white/65">
                {selectedStation.powerKw}kW
              </span>
              <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-white/65">
                {selectedStation.connector}
              </span>
              {selectedStation.pricePerKwh !== null && (
                <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-white/65">
                  €{selectedStation.pricePerKwh}/kWh
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
