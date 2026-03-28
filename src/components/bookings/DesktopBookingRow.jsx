import React from "react";
import { Trash2, Info } from "lucide-react";
import { joinClasses, formatDateLabel, formatTimeRangeLabel, formatCurrency as formatCurrencyAmount } from "../../utils/common/helper";
import { getStatusBadgeClasses, getStatusLabel, getRowIconByStatus } from "./utils";

export default function DesktopBookingRow({
  appointment,
  handleBookingRowClick,
  handleDeleteBookingClick,
  handleInfoClick,
}) {
  return (
    <div className="grid grid-cols-[2.2fr_1.4fr_1fr_1fr_56px] items-center border-b border-white/[0.04] px-8 py-6">
      <button onClick={() => handleBookingRowClick(appointment)} className="flex items-center gap-4 text-left">
        {getRowIconByStatus(appointment.status)}
        <div className="min-w-0">
          <div className="truncate text-[16px] font-semibold text-white">{appointment.stationName}</div>
          <div className="mt-1 text-[14px] text-white/44">{appointment.stationLocation}</div>
        </div>
      </button>

      <button onClick={() => handleBookingRowClick(appointment)} className="text-left">
        <div className="text-[16px] text-white">{formatDateLabel(appointment.startDateTime)}</div>
        <div className="mt-1 text-[14px] text-white/44">
          {formatTimeRangeLabel(appointment.startDateTime, appointment.endDateTime)}
        </div>
      </button>

      <div>
        <button
          onClick={() => handleBookingRowClick(appointment)}
          className={joinClasses("rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em]", getStatusBadgeClasses(appointment.status))}
        >
          {getStatusLabel(appointment.status)}
        </button>
      </div>

      <button
        onClick={() => handleBookingRowClick(appointment)}
        className={joinClasses("text-left text-[16px] font-semibold", appointment.status === "upcoming" ? "text-[#12dfff]" : "text-white")}
      >
        {formatCurrencyAmount(appointment.estimatedCost)}
      </button>

      <div className="flex justify-end">
        {appointment.status === "upcoming" ? (
          <button onClick={() => handleDeleteBookingClick(appointment.id)} className="rounded-xl p-2 text-white/36 transition hover:bg-white/[0.03] hover:text-white/80">
            <Trash2 className="h-5 w-5" />
          </button>
        ) : (
          <button onClick={() => handleInfoClick(appointment)} className="rounded-xl p-2 text-white/36 transition hover:bg-white/[0.03] hover:text-white/80">
            <Info className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
