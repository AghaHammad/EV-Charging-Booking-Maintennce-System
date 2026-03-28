import React from "react";
import { joinClasses } from "../../utils/common/helper";

export default function NotificationPreferenceRow({
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] px-5 py-5 text-left transition hover:border-[#12dfff]/10"
    >
      <div className="min-w-0">
        <div className="text-[18px] font-medium text-white">{title}</div>
        <div className="mt-1 text-[15px] text-white/38">{description}</div>
      </div>

      <div
        className={joinClasses(
          "relative h-8 w-12 shrink-0 rounded-full transition",
          enabled ? "bg-[#19d6ff]" : "bg-[#33435a]"
        )}
      >
        <span
          className={joinClasses(
            "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition",
            enabled ? "left-[22px]" : "left-1"
          )}
        />
      </div>
    </button>
  );
}
