import React from "react";
import * as lucideReact from "lucide-react";
import { joinClasses } from "../../utils/common/helper";
import SessionProgressRing from "./SessionProgressRing";

export default function StationsSidebar({
  sessionPercentage,
  sessionRunning,
  handleSessionButtonClick,
  recentTripItems,
  handleSeeAllTripsClick,
  showToast,
  currentDateLabel,
}) {
  return (
    <aside className="min-w-0">
      <div className="grid gap-6 min-[1180px]:sticky min-[1180px]:top-[106px]">
        <div className="rounded-[34px] border border-[#10e8ff]/18 bg-[linear-gradient(180deg,rgba(10,29,40,0.98),rgba(8,24,34,0.98))] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-white">
              Active Session
            </h3>
            <span className="h-2.5 w-2.5 rounded-full bg-[#10e8ff]" />
          </div>

          <div className="mt-4 flex justify-center">
            <SessionProgressRing value={sessionPercentage} />
          </div>

          <div className="mt-2 text-center">
            <button
              onClick={() => showToast("Vehicle details opened")}
              className="text-[18px] font-semibold tracking-[-0.03em] text-white"
            >
              Model S Long Range
            </button>
            <div className="mt-1 text-[14px] text-white/48">
              Station Alpha-12, Plug #4
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/7 pt-5">
            <div>
              <div className="text-[11px] tracking-[0.08em] text-white/38">TIME LEFT</div>
              <div className="mt-1 flex items-center gap-2 text-[18px] font-semibold text-white">
                <lucideReact.Clock3 className="h-4 w-4 text-[#9bf6ff]" />
                18 min
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] tracking-[0.08em] text-white/38">ENERGY</div>
              <div className="mt-1 flex items-center justify-end gap-2 text-[18px] font-semibold text-white">
                <lucideReact.BatteryCharging className="h-4 w-4 text-[#9bf6ff]" />
                42.5 kWh
              </div>
            </div>
          </div>

          <button
            onClick={handleSessionButtonClick}
            className={joinClasses(
              "mt-6 w-full rounded-[20px] border px-4 py-4 text-[16px] font-semibold transition",
              sessionRunning
                ? "border-[#10e8ff]/25 text-[#10e8ff] hover:bg-[#10e8ff]/7"
                : "border-[#10e8ff]/15 bg-[#10ddff] text-[#05131a]"
            )}
          >
            {sessionRunning ? "Stop Session" : "Resume Session"}
          </button>
        </div>

        <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(8,25,35,0.98),rgba(8,25,35,0.98))] p-6">
          <div className="flex items-center justify-between">
            <div className="text-[18px] font-semibold tracking-[-0.03em] text-white">
              Recent Trips
            </div>
            <button
              onClick={handleSeeAllTripsClick}
              className="text-[13px] font-semibold text-[#10e8ff]"
            >
              See All
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {recentTripItems.map((trip) => (
              <button
                key={trip.id}
                onClick={() => showToast(`${trip.title} opened`)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0ce0b0]/12">
                    <lucideReact.Check className="h-4 w-4 text-[#11efbd]" />
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-white">{trip.title}</div>
                    <div className="mt-0.5 text-[13px] text-white/48">{trip.dateText}</div>
                  </div>
                </div>
                <div className="text-[16px] font-semibold text-white">{trip.amountText}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(8,25,35,0.98),rgba(8,25,35,0.98))] p-6">
          <div className="flex items-center gap-3">
            <lucideReact.TriangleAlert className="h-5 w-5 text-[#f3c63d]" />
            <div className="text-[18px] font-semibold tracking-[-0.03em] text-white">
              Vehicle Health
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-[14px]">
            <span className="text-white/56">Brake Fluid</span>
            <button
              onClick={() => showToast(`Brake fluid • ${currentDateLabel}`)}
              className="font-semibold text-[#f3c63d]"
            >
              Due in 500km
            </button>
          </div>

          <div className="mt-3 h-2 rounded-full bg-white/8">
            <div className="h-2 w-[84%] rounded-full bg-[#efbe35]" />
          </div>

          <div className="mt-4 flex items-center gap-2 text-[13px] text-white/40">
            <lucideReact.CalendarDays className="h-4 w-4" />
            Updated {currentDateLabel}
          </div>
        </div>
      </div>
    </aside>
  );
}
