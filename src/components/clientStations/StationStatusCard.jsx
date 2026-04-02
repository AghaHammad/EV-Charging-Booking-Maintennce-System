import React from "react";
import { Bolt } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";
import { getStatusPresentation, getStatusLabel } from "./utils";

export default function StationStatusCard({ station, onActionClick }) {
  const statusPresentation = getStatusPresentation(station.status);

  return (
    <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(14,37,50,0.98),rgba(12,33,46,0.98))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div
          className={joinClasses(
            "flex h-14 w-14 items-center justify-center rounded-2xl border bg-[#0a2231]",
            statusPresentation.iconClasses
          )}
        >
          <Bolt className="h-5 w-5" />
        </div>

        <div
          className={joinClasses(
            "rounded-full px-3 py-1.5 text-[11px] font-semibold",
            statusPresentation.badgeClasses
          )}
        >
          {getStatusLabel(station)}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-[20px] font-semibold leading-[1.35] tracking-[-0.03em] text-white">
          {station.name}
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-white/56">
          {station.city} • {station.distanceKm} km
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-[#202d48]/70 px-2.5 py-1.5 text-[12px] text-white/62">
          {station.powerKw}kW
        </span>
        <span className="rounded-lg bg-[#202d48]/70 px-2.5 py-1.5 text-[12px] text-white/62">
          {station.connector}
        </span>
        {station.pricePerKwh !== null && (
          <span className="rounded-lg bg-[#202d48]/70 px-2.5 py-1.5 text-[12px] text-white/62">
            €{station.pricePerKwh}/kWh
          </span>
        )}
      </div>

      <div className="mt-7 h-px bg-white/7" />

      <div className="mt-5 flex items-center justify-between gap-4">
        <div
          className={joinClasses(
            "text-[13px] font-medium uppercase tracking-[0.12em]",
            statusPresentation.accentClasses
          )}
        >
          {station.accentLabel}
        </div>

        <button
          onClick={() => onActionClick(station)}
          className={joinClasses(
            "rounded-2xl px-5 py-3 text-[14px] font-semibold transition whitespace-nowrap",
            statusPresentation.buttonClasses
          )}
        >
          {station.actionLabel}
        </button>
      </div>
    </div>
  );
}
