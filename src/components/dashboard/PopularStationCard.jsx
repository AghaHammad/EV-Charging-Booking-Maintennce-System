import React from "react";
import { Fuel, MapPin } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";

export default function PopularStationCard({ station, onClick }) {
  const isAvailable = station.badgeTone === "available";

  return (
    <button
      onClick={() => onClick(station.name)}
      className="rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(15,40,53,0.96),rgba(12,34,46,0.96))] p-5 text-left transition hover:border-[#12dfff]/12"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0c5f79]/35">
          <Fuel className="h-6 w-6 text-[#18d8ff]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[16px] font-semibold leading-6 text-white">
              {station.name}
            </div>
            <div
              className={joinClasses(
                "text-[12px] font-medium",
                isAvailable ? "text-[#38e6a8]" : "text-[#f0a43b]"
              )}
            >
              {station.badgeText}
            </div>
          </div>

          <div className="mt-1 text-[14px] text-white/50">
            {station.power} • {station.connector} • {station.price}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div
              className={joinClasses(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                isAvailable
                  ? "bg-[#12dfff]/10 text-[#12dfff]"
                  : "bg-[#8e96cb]/18 text-[#c0c6ff]"
              )}
            >
              {station.accentText}
            </div>

            <div className="flex items-center gap-1 text-[12px] text-white/38">
              <MapPin className="h-3.5 w-3.5" />
              {station.distance}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
