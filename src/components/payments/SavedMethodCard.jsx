import React from "react";
import { Trash2 } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";
import { getSavedMethodVisual } from "./utils";

export default function SavedMethodCard({
  method,
  onCardClick,
  onSetPrimaryClick,
  onDeleteClick,
}) {
  const visual = getSavedMethodVisual(method.type);

  return (
    <div className="rounded-[22px] border border-white/6 bg-[linear-gradient(180deg,rgba(14,37,50,0.96),rgba(11,30,42,0.98))] px-4 py-5 transition hover:border-[#12dfff]/12">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onCardClick(method)}
          className="flex min-w-0 flex-1 items-center gap-4 text-left"
        >
          <div
            className={joinClasses(
              "flex h-9 w-14 shrink-0 items-center justify-center rounded-xl",
              visual.wrapperClasses
            )}
          >
            {visual.icon ? <>{visual.icon}</> : <span className={visual.labelClasses}>{visual.label}</span>}
          </div>

          <div className="min-w-0">
            <div className="truncate text-[16px] font-semibold text-white">
              {method.displayName}
            </div>
            <div className="mt-1 text-[13px] text-white/44">{method.subtitle}</div>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {method.isPrimary ? (
            <button
              onClick={() => onCardClick(method)}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-[12px] text-white/52"
            >
              Primary
            </button>
          ) : (
            <button
              onClick={() => onSetPrimaryClick(method)}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-white/72 transition hover:bg-white/[0.05]"
            >
              Set Primary
            </button>
          )}

          <button
            onClick={() => onDeleteClick(method)}
            className="rounded-xl p-2 text-white/40 transition hover:bg-white/[0.03] hover:text-white/80"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
