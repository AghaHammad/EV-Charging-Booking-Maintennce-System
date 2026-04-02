import React from "react";
import { Filter, Download } from "lucide-react";
import AppointmentHistorys from "./AppointmentHistorys";
import BookingsPagination from "./BookingsPagination";


export default function BookingsList({
  paginatedBookingAppointments,
  filteredBookingAppointments,
  handleFilterClick,
  handleExportCsvClick,
  handleBookingRowClick,
  handleDeleteBookingClick,
  handleInfoClick,
  visibleStartIndex,
  visibleEndIndex,
  currentPageNumber,
  totalPageCount,
  handlePreviousPageClick,
  handlePageButtonClick,
  handleNextPageClick,
}) {
  return (
    <div className="overflow-hidden rounded-[34px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-4 border-b border-white/5 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
          Appointment History
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleFilterClick}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-[#091e29] px-5 text-[15px] font-medium text-white transition hover:border-[#12dfff]/18"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>

          <button
            type="button"
            onClick={handleExportCsvClick}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-[#091e29] px-5 text-[15px] font-medium text-white transition hover:border-[#12dfff]/18"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <AppointmentHistorys
        appointments={paginatedBookingAppointments}
        handleBookingRowClick={handleBookingRowClick}
        handleDeleteBookingClick={handleDeleteBookingClick}
        handleInfoClick={handleInfoClick}
      />

      <BookingsPagination
        visibleStartIndex={visibleStartIndex}
        visibleEndIndex={visibleEndIndex}
        totalItems={filteredBookingAppointments.length}
        currentPageNumber={currentPageNumber}
        totalPageCount={totalPageCount}
        handlePreviousPageClick={handlePreviousPageClick}
        handleNextPageClick={handleNextPageClick}
        handlePageButtonClick={handlePageButtonClick}
      />
    </div>
  );
}