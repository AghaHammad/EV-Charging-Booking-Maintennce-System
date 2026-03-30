import React from "react";
import { Trash2, Info } from "lucide-react";
import { joinClasses, formatDateLabel, formatTimeRangeLabel, formatCurrency as formatCurrencyAmount } from "../../utils/common/helper";
import { getStatusBadgeClasses, getStatusLabel, getRowIconByStatus } from "./utils";

export default function MobileBookingCard({
  appointment,
  handleBookingRowClick,
  handleDeleteBookingClick,
  handleInfoClick,
}) {
  return (
    <div className="rounded-[24px] border border-white/6 bg-[#102d3b]/65 p-4">
      <div className="flex items-start justify-between gap-4">
        <button onClick={() => handleBookingRowClick(appointment)} className="flex min-w-0 items-center gap-3 text-left">
          {getRowIconByStatus(appointment.status)}
          <div className="min-w-0">
            <div className="truncate text-[16px] font-semibold text-white">{appointment.stationName}</div>
            <div className="mt-1 text-[14px] text-white/44">{appointment.stationLocation}</div>
          </div>
        </button>
        <button
          onClick={() => handleBookingRowClick(appointment)}
          className={joinClasses("rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]", getStatusBadgeClasses(appointment.status))}
        >
          {getStatusLabel(appointment.status)}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button onClick={() => handleBookingRowClick(appointment)} className="text-left">
          <div className="text-[12px] uppercase tracking-[0.14em] text-white/38">Date & Time</div>
          <div className="mt-2 text-[15px] text-white">{formatDateLabel(appointment.startDateTime)}</div>
          <div className="mt-1 text-[14px] text-white/46">{formatTimeRangeLabel(appointment.startDateTime, appointment.endDateTime)}</div>
        </button>

        <button onClick={() => handleBookingRowClick(appointment)} className="text-left">
          <div className="text-[12px] uppercase tracking-[0.14em] text-white/38">Estimated Cost</div>
          <div className={joinClasses("mt-2 text-[18px] font-semibold", appointment.status === "upcoming" ? "text-[#12dfff]" : "text-white")}>
            {formatCurrencyAmount(appointment.estimatedCost)}
          </div>
        </button>
      </div>

      <div className="mt-4 flex justify-end">
        {appointment.status === "upcoming" ? (
          <button onClick={() => handleDeleteBookingClick(appointment.id)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-[14px] text-white/78">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        ) : (
          <button onClick={() => handleInfoClick(appointment)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-[14px] text-white/78">
            <Info className="h-4 w-4" />
            Details
          </button>
        )}
      </div>
    </div>
  );
}
