import React from "react";
import { joinClasses } from "../../utils/common/helper";

export default function VehicleHealthRow({ item, onClick }) {
  return (
    <button
      onClick={() => onClick(item.label)}
      className="flex w-full items-center justify-between rounded-full border border-white/6 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.05]"
    >
      <span className="text-[15px] text-white/82">{item.label}</span>
      <span
        className={joinClasses(
          "text-[14px] font-medium",
          item.tone === "good" ? "text-[#31dfb0]" : "text-[#f0a43b]"
        )}
      >
        {item.value}
      </span>
    </button>
  );
}
