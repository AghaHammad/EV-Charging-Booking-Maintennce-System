import React from "react";
import { PlugZap, Activity, Gauge, Ban } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";
import { getHardwareCardPresentation } from "./utils";

export default function HardwareStatusCard({
  component,
  onCardClick,
  onTitleClick,
  onStatusClick,
}) {
  const presentation = getHardwareCardPresentation(component.statusTone);

  return (
    <div
      className={joinClasses(
        "rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition",
        presentation.hoverBorderClasses
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onCardClick(component)}
          className={joinClasses(
            "flex h-12 w-12 items-center justify-center rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.12)]",
            presentation.iconWrapperClasses
          )}
        >
          {component.iconType === "power" ? (
            <PlugZap className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          ) : component.iconType === "cooling" ? (
            <Activity className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          ) : component.iconType === "connector" ? (
            <Gauge className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          ) : (
            <Ban className={joinClasses("h-5 w-5", presentation.iconClasses)} />
          )}
        </button>

        <button
          onClick={() => onStatusClick(component)}
          className={joinClasses(
            "rounded-xl px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em]",
            presentation.badgeClasses
          )}
        >
          {component.statusLabel}
        </button>
      </div>

      <div className="mt-5">
        <button
          onClick={() => onTitleClick(component)}
          className="text-left text-[15px] text-white/58"
        >
          {component.title}
        </button>

        <button
          onClick={() => onCardClick(component)}
          className="mt-1 block text-left text-[22px] font-semibold tracking-[-0.03em] text-white"
        >
          {component.value}
        </button>

        <div className="mt-2 text-[14px] text-white/38">{component.subtitle}</div>
      </div>
    </div>
  );
}
