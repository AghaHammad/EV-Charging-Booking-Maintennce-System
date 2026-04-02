import React from "react";
import { CalendarDays } from "lucide-react";
import ScheduledTaskCard from "./ScheduledTasks";

export default function MaintenanceSidebar({
  scheduledTasks,
  handleManageTasksClick,
  handleScheduledTaskClick,
  handleScheduledTaskDateClick,
  handleScheduledTaskTitleClick,
  handleInitiateFullSweepClick,
  showToast,
}) {
  return (
    <aside className="min-w-0">
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-[#12dfff]" />
              <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
                Scheduled Tasks
              </h2>
            </div>
            <button onClick={handleManageTasksClick} className="text-[16px] font-medium text-[#12dfff]">
              Manage
            </button>
          </div>
          <div className="space-y-4">
            {scheduledTasks.map((task) => (
              <ScheduledTaskCard
                key={task.id}
                task={task}
                onCardClick={handleScheduledTaskClick}
                onDateClick={handleScheduledTaskDateClick}
                onTitleClick={handleScheduledTaskTitleClick}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
          <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-white">
            Automated Diagnostics
          </h3>
          <button onClick={() => showToast("Automated diagnostics info opened")} className="mt-4 text-left text-[16px] leading-7 text-white/56">
            Run a full system sweep to detect potential failures before they occur.
          </button>
          <button onClick={handleInitiateFullSweepClick} className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-[16px] border border-white/16 bg-transparent px-6 text-[16px] font-medium text-white transition hover:bg-white/[0.03]">
            Initiate Full Sweep
          </button>
        </div>
      </div>
    </aside>
  );
}
