import React from "react";
import * as lucideReact from "lucide-react";
import { joinClasses } from "../../utils/common/helper";
import { getStatusPresentation } from "./utils";

export default function StationMapMarker({ station, selected, onClick }) {
  const statusPresentation = getStatusPresentation(station.status);

  return (
    <button
      onClick={onClick}
      style={{ left: `${station.mapXPercent}%`, top: `${station.mapYPercent}%` }}
      className={joinClasses(
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-[#0d2231]/95 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition",
        statusPresentation.iconClasses,
        selected && "scale-110 ring-2 ring-[#10e8ff]/35"
      )}
    >
      <lucideReact.Bolt className="h-5 w-5" />
    </button>
  );
}
