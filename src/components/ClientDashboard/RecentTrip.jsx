import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";

export default function RecentTripRow({ trip, onClick }) {
  const isSuccess = trip.status === "success";

  return (
    <button
      onClick={() => onClick(trip.title)}
      className="flex w-full items-center justify-between gap-3 text-left"
    >
      <div className="flex items-center gap-3">
        <div
          className={joinClasses(
            "flex h-10 w-10 items-center justify-center rounded-full",
            isSuccess ? "bg-[#19d6a8]/12" : "bg-white/8"
          )}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-[#31dfb0]" />
          ) : (
            <XCircle className="h-5 w-5 text-white/35" />
          )}
        </div>

        <div>
          <div className={joinClasses("text-[15px] font-semibold", isSuccess ? "text-white" : "text-white/46")}>
            {trip.title}
          </div>
          <div className="mt-0.5 text-[13px] text-white/38">{trip.date}</div>
        </div>
      </div>

      <div className="text-right">
        <div className={joinClasses("text-[16px] font-semibold", isSuccess ? "text-white" : "text-white/46")}>
          {trip.amount}
        </div>
        <div className="mt-0.5 text-[13px] text-white/35">{trip.energy}</div>
      </div>
    </button>
  );
}
