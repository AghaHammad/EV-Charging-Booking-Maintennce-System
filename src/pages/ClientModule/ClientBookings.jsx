import React, { useMemo, useState } from "react";
import { Plus, Clock3, CheckCircle2, WalletCards } from "lucide-react";
import {
  joinClasses,
  formatDateLabel,
  formatTimeRangeLabel,
  formatCurrency as formatCurrencyAmount,
  getCurrentMonthName,
  getCurrentYearValue,
} from "../../utils/common/helper";
import {
  appointmentsPerPage,
  bookingAppointments as bookingAppointmentsData,
} from "../../data/Constant";
import BookingSummaryCard from "../../components/clientBookings/BookingSummaryCard";
import BookingsList from "../../components/clientBookings/BookingsList";
import { getStatusLabel } from "../../components/clientBookings/Utils";

export default function ClientBookings() {
  const [bookingAppointments, setBookingAppointments] = useState(bookingAppointmentsData);
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [toastMessage, setToastMessage] = useState("");

  const currentMonthName = getCurrentMonthName();
  const currentYearValue = getCurrentYearValue();

  const upcomingAppointmentsCount = bookingAppointments.filter(
    (appointment) => appointment.status === "upcoming"
  ).length;

  const completedAppointmentsCount = bookingAppointments.filter(
    (appointment) => appointment.status === "completed"
  ).length;

  const totalSpentThisMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return bookingAppointments
      .filter((appointment) => {
        if (appointment.status !== "completed") return false;
        const appointmentDate = new Date(appointment.startDateTime);
        return (
          appointmentDate.getMonth() === currentMonth &&
          appointmentDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, appointment) => sum + appointment.estimatedCost, 0);
  }, [bookingAppointments]);

  const filteredBookingAppointments = useMemo(() => {
    if (activeStatusFilter === "all") {
      return bookingAppointments;
    }

    return bookingAppointments.filter(
      (appointment) => appointment.status === activeStatusFilter
    );
  }, [bookingAppointments, activeStatusFilter]);

  const totalPageCount = Math.max(
    1,
    Math.ceil(filteredBookingAppointments.length / appointmentsPerPage)
  );

  const paginatedBookingAppointments = useMemo(() => {
    const startIndex = (currentPageNumber - 1) * appointmentsPerPage;
    return filteredBookingAppointments.slice(
      startIndex,
      startIndex + appointmentsPerPage
    );
  }, [filteredBookingAppointments, currentPageNumber]);

  const visibleStartIndex =
    filteredBookingAppointments.length === 0
      ? 0
      : (currentPageNumber - 1) * appointmentsPerPage + 1;

  const visibleEndIndex = Math.min(
    currentPageNumber * appointmentsPerPage,
    filteredBookingAppointments.length
  );

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);
  };

  const handleAddNewBookingClick = () => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() + 2);
    startDate.setHours(12, 30, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const newBookingAppointment = {
      id: bookingAppointments.length + 1,
      stationName: `New Booking ${bookingAppointments.length + 1}`,
      stationLocation: "Berlin Center • Plug #3",
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString(),
      status: "upcoming",
      estimatedCost: 10.75,
    };

    setBookingAppointments((previousAppointments) => [
      newBookingAppointment,
      ...previousAppointments,
    ]);
    setActiveStatusFilter("all");
    setCurrentPageNumber(1);
    showToast("New booking added");
  };

  const handleFilterClick = () => {
    const filterSequence = ["all", "upcoming", "completed", "canceled"];
    const currentFilterIndex = filterSequence.indexOf(activeStatusFilter);
    const nextFilterValue =
      filterSequence[(currentFilterIndex + 1) % filterSequence.length];

    setActiveStatusFilter(nextFilterValue);
    setCurrentPageNumber(1);
    showToast(`Filter changed to ${nextFilterValue}`);
  };

  const handleExportCsvClick = () => {
    const csvHeader = [
      "Station Name",
      "Location",
      "Date",
      "Time",
      "Status",
      "Estimated Cost",
    ];

    const csvRows = filteredBookingAppointments.map((appointment) => [
      appointment.stationName,
      appointment.stationLocation,
      formatDateLabel(appointment.startDateTime),
      formatTimeRangeLabel(appointment.startDateTime, appointment.endDateTime),
      getStatusLabel(appointment.status),
      formatCurrencyAmount(appointment.estimatedCost),
    ]);

    const csvContent = [csvHeader, ...csvRows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const downloadUrl = URL.createObjectURL(csvBlob);
    const temporaryLink = document.createElement("a");

    temporaryLink.href = downloadUrl;
    temporaryLink.setAttribute(
      "download",
      `bookings-${currentYearValue}-${String(new Date().getMonth() + 1).padStart(2, "0")}.csv`
    );
    document.body.appendChild(temporaryLink);
    temporaryLink.click();
    document.body.removeChild(temporaryLink);
    URL.revokeObjectURL(downloadUrl);

    showToast("CSV exported");
  };

  const handleBookingRowClick = (appointment) => {
    showToast(`${appointment.stationName} opened`);
  };

  const handleDeleteBookingClick = (appointmentId) => {
    const targetAppointment = bookingAppointments.find(
      (appointment) => appointment.id === appointmentId
    );

    setBookingAppointments((previousAppointments) =>
      previousAppointments.filter((appointment) => appointment.id !== appointmentId)
    );

    const updatedCount = filteredBookingAppointments.length - 1;
    const updatedPageCount = Math.max(
      1,
      Math.ceil(updatedCount / appointmentsPerPage)
    );

    if (currentPageNumber > updatedPageCount) {
      setCurrentPageNumber(updatedPageCount);
    }

    showToast(`${targetAppointment?.stationName || "Booking"} removed`);
  };

  const handleInfoClick = (appointment) => {
    showToast(`${appointment.stationName} details opened`);
  };

  const handlePageButtonClick = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
    showToast(`Page ${pageNumber} opened`);
  };

  const handlePreviousPageClick = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber((previousPage) => previousPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPageNumber < totalPageCount) {
      setCurrentPageNumber((previousPage) => previousPage + 1);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden text-white">
      <div className="mx-auto w-full max-w-[1280px] space-y-8 pb-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-[36px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[42px]">
              Bookings
            </h1>
            <p className="mt-3 text-[18px] text-white/56">
              Manage your upcoming and past charging appointments.
            </p>
          </div>

          <button
            onClick={handleAddNewBookingClick}
            className="inline-flex h-14 items-center justify-center gap-3 self-start rounded-[18px] bg-[#12dfff] px-7 text-[16px] font-semibold text-[#06141b] shadow-[0_16px_30px_rgba(18,223,255,0.22)] transition hover:brightness-105"
          >
            <Plus className="h-5 w-5" />
            Add New Booking
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <BookingSummaryCard
            title="Upcoming"
            value={upcomingAppointmentsCount}
            subtitle="Appointments scheduled"
            badgeText="UPCOMING"
            icon={<Clock3 className="h-6 w-6 text-[#12dfff]" />}
            iconWrapperClasses="bg-[#0b4b63]/45"
            badgeClasses="text-[#12dfff]"
          />

          <BookingSummaryCard
            title="Completed"
            value={completedAppointmentsCount}
            subtitle="Total historical sessions"
            badgeText="COMPLETED"
            icon={<CheckCircle2 className="h-6 w-6 text-emerald-400" />}
            iconWrapperClasses="bg-[#10483f]/45"
            badgeClasses="text-emerald-400"
          />

          <BookingSummaryCard
            title="Total Spent"
            value={formatCurrencyAmount(totalSpentThisMonth)}
            subtitle={`${currentMonthName} ${currentYearValue} total`}
            badgeText="TOTAL SPENT"
            icon={<WalletCards className="h-6 w-6 text-amber-400" />}
            iconWrapperClasses="bg-[#4b4022]/45"
            badgeClasses="text-amber-400"
          />
        </div>

        <BookingsList
          paginatedBookingAppointments={paginatedBookingAppointments}
          filteredBookingAppointments={filteredBookingAppointments}
          handleFilterClick={handleFilterClick}
          handleExportCsvClick={handleExportCsvClick}
          handleBookingRowClick={handleBookingRowClick}
          handleDeleteBookingClick={handleDeleteBookingClick}
          handleInfoClick={handleInfoClick}
          visibleStartIndex={visibleStartIndex}
          visibleEndIndex={visibleEndIndex}
          currentPageNumber={currentPageNumber}
          totalPageCount={totalPageCount}
          handlePreviousPageClick={handlePreviousPageClick}
          handlePageButtonClick={handlePageButtonClick}
          handleNextPageClick={handleNextPageClick}
        />
      </div>

      <div
        className={joinClasses(
          "pointer-events-none fixed bottom-5 right-5 z-[100] rounded-2xl border border-[#10e8ff]/15 bg-[#0c2230]/95 px-4 py-3 text-[14px] text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition",
          toastMessage ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        {toastMessage}
      </div>
    </div>
  );
}