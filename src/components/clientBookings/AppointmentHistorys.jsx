import React from "react";
import {
  formatDateLabel,
  formatTimeRangeLabel,
  formatCurrency,
} from "../../utils/common/helper";
import { getStatusLabel } from "./Utils";

export default function AppointmentHistorys({
  appointments,
  handleBookingRowClick,
  handleDeleteBookingClick,
  handleInfoClick,
}) {
  const hasAppointments = appointments.length > 0;

  if (!hasAppointments) {
    return (
      <div className="px-6 py-12 text-center text-[15px] text-white/50">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="w-full">
     
      <div className="grid gap-4 p-4 md:hidden">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-[20px] border border-white/6 bg-[#0b2330]/80 p-4"
          >
            <div
              onClick={() => handleBookingRowClick(appointment)}
              className="cursor-pointer"
            >
              <p className="text-[16px] font-semibold leading-6 text-white">
                {appointment.stationName}
              </p>
              <p className="mt-1 text-[13px] leading-5 text-white/55">
                {appointment.stationLocation}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/40">
                  Date
                </p>
                <p className="mt-1 text-[14px] text-white">
                  {formatDateLabel(appointment.startDateTime)}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/40">
                  Time
                </p>
                <p className="mt-1 text-[14px] text-white">
                  {formatTimeRangeLabel(
                    appointment.startDateTime,
                    appointment.endDateTime
                  )}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/40">
                  Status
                </p>
                <span className="mt-1 inline-flex rounded-full border border-[#12dfff]/15 bg-[#12dfff]/8 px-3 py-1.5 text-[11px] font-medium text-[#baf6ff]">
                  {getStatusLabel(appointment.status)}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/40">
                  Cost
                </p>
                <p className="mt-1 text-[14px] font-semibold text-white">
                  {formatCurrency(appointment.estimatedCost)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleInfoClick(appointment)}
                className="inline-flex h-9 items-center justify-center rounded-[10px] border border-white/10 bg-[#0c2430] px-4 text-[13px] font-medium text-white transition hover:border-[#12dfff]/20"
              >
                Info
              </button>

              <button
                type="button"
                onClick={() => handleDeleteBookingClick(appointment.id)}
                className="inline-flex h-9 items-center justify-center rounded-[10px] border border-white/10 bg-[#0c2430] px-4 text-[13px] font-medium text-white transition hover:border-red-400/30"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div className="hidden w-full md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-left text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45">
              <th className="px-6 py-5">Station Name</th>
              <th className="px-4 py-5">Date</th>
              <th className="px-4 py-5">Time</th>
              <th className="px-4 py-5">Status</th>
              <th className="px-4 py-5">Cost</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-white/5 transition hover:bg-white/[0.02]"
              >
                <td className="px-6 py-6 align-middle">
                  <div
                    onClick={() => handleBookingRowClick(appointment)}
                    className="cursor-pointer"
                  >
                    <p className="text-[15px] font-semibold leading-6 text-white">
                      {appointment.stationName}
                    </p>
                    <p className="mt-1 text-[13px] text-white/55">
                      {appointment.stationLocation}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-6 align-middle">
                  <p className="text-[14px] text-white">
                    {formatDateLabel(appointment.startDateTime)}
                  </p>
                </td>

                <td className="px-4 py-6 align-middle">
                  <p className="whitespace-nowrap text-[14px] text-white">
                    {formatTimeRangeLabel(
                      appointment.startDateTime,
                      appointment.endDateTime
                    )}
                  </p>
                </td>

                <td className="px-4 py-6 align-middle">
                  <span className="inline-flex rounded-full border border-[#12dfff]/15 bg-[#12dfff]/8 px-3 py-1.5 text-[11px] font-medium text-[#baf6ff]">
                    {getStatusLabel(appointment.status)}
                  </span>
                </td>

                <td className="px-4 py-6 align-middle">
                  <p className="whitespace-nowrap text-[14px] font-semibold text-white">
                    {formatCurrency(appointment.estimatedCost)}
                  </p>
                </td>

                <td className="px-6 py-6 align-middle">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleInfoClick(appointment)}
                      className="inline-flex h-9 items-center justify-center rounded-[10px] border border-white/10 bg-[#0c2430] px-3 text-[13px] font-medium text-white transition hover:border-[#12dfff]/20"
                    >
                      Info
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteBookingClick(appointment.id)}
                      className="inline-flex h-9 items-center justify-center rounded-[10px] border border-white/10 bg-[#0c2430] px-3 text-[13px] font-medium text-white transition hover:border-red-400/30"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}