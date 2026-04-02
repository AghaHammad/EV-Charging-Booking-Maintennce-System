import React from "react";
import { ChevronRight } from "lucide-react";

export default function ScheduledTaskCard({
  task,
  onCardClick,
  onDateClick,
  onTitleClick,
}) {
  return (
    <div
      onClick={() => onCardClick(task)}
      className="flex w-full items-center justify-between gap-4 rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:border-[#12dfff]/12"
    >
      <div className="flex min-w-0 items-center gap-4">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onDateClick(task);
          }}
          className="flex h-18 w-18 shrink-0 flex-col items-center justify-center rounded-[18px] bg-[#1e3948]/70"
        >
          <div className="text-[12px] uppercase tracking-[0.08em] text-white/46">
            {task.monthLabel}
          </div>
          <div className="mt-1 text-[20px] font-semibold leading-none text-white">
            {task.dayLabel}
          </div>
        </button>

        <div className="min-w-0">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onTitleClick(task);
            }}
            className="truncate text-left text-[16px] font-semibold text-white"
          >
            {task.title}
          </button>
          <div className="mt-1 truncate text-[14px] text-white/46">
            {task.subtitle}
          </div>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-white/42" />
    </div>
  );
}
