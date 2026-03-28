import React from "react";
import StationMapMarker from "./StationMapMarker";
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

        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M99 180 L136 168 L177 168 L201 156 L251 162 L291 156 L330 159 L357 145 L409 147 L454 142 L501 150 L540 154 L571 162 L611 162 L646 182 L698 185 L731 199 L773 197 L811 210 L852 214 L881 228 L905 248 L903 273 L881 286 L852 301 L828 316 L807 332 L776 343 L744 343 L703 353 L659 351 L621 337 L593 327 L546 326 L499 315 L460 316 L412 319 L378 307 L342 292 L311 284 L274 281 L241 267 L208 257 L177 247 L151 232 L119 213 Z"
            fill="rgba(17,36,48,0.95)"
            stroke="rgba(17,233,255,0.18)"
            strokeWidth="3"
          />
          <path
            d="M180 212 C250 225, 300 250, 345 248"
            fill="none"
            stroke="rgba(120,145,164,0.18)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M344 245 C430 215, 505 205, 590 218"
            fill="none"
            stroke="rgba(120,145,164,0.18)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M590 218 C650 228, 725 250, 810 248"
            fill="none"
            stroke="rgba(120,145,164,0.16)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

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
