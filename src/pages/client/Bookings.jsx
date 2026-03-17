import React, { useMemo, useState } from "react";
import { Plus, Download, Trash2, Info, ChevronLeft, ChevronRight, Clock3, CheckCircle2, WalletCards, Zap, Check, X, Filter,} from "lucide-react";

const APPOINTMENTS_PER_PAGE = 5;

const initialBookingAppointments = [
  {
    id: 1,
    stationName: "Station Alpha-12",
    stationLocation: "Mitte, Berlin • Plug #4",
    startDateTime: "2024-06-15T14:00:00",
    endDateTime: "2024-06-15T15:30:00",
    status: "upcoming",
    estimatedCost: 12.4,
  },
  {
    id: 2,
    stationName: "Potsdamer Plaza",
    stationLocation: "Berlin • Plug #1",
    startDateTime: "2024-06-18T09:15:00",
    endDateTime: "2024-06-18T10:00:00",
    status: "upcoming",
    estimatedCost: 8.15,
  },
  {
    id: 3,
    stationName: "Airport FastCharge",
    stationLocation: "Terminal 2 • CCS2",
    startDateTime: "2024-06-11T14:20:00",
    endDateTime: "2024-06-11T15:10:00",
    status: "completed",
    estimatedCost: 18.4,
  },
  {
    id: 4,
    stationName: "City Mall Level 2",
    stationLocation: "West Entrance • Type 2",
    startDateTime: "2024-06-10T09:15:00",
    endDateTime: "2024-06-10T11:45:00",
    status: "completed",
    estimatedCost: 8.25,
  },
  {
    id: 5,
    stationName: "Highway Hub X",
    stationLocation: "A1 Autobahn • Fast",
    startDateTime: "2024-06-08T18:30:00",
    endDateTime: "2024-06-08T18:45:00",
    status: "canceled",
    estimatedCost: 0,
  },
];

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatDateLabel(dateTimeString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateTimeString));
}

function formatTimeRangeLabel(startDateTimeString, endDateTimeString) {
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${timeFormatter.format(new Date(startDateTimeString))} - ${timeFormatter.format(
    new Date(endDateTimeString)
  )}`;
}

function formatCurrencyAmount(amount) {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}

function getCurrentMonthName() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date());
}

function getCurrentYearValue() {
  return new Date().getFullYear();
}

function getStatusBadgeClasses(status) {
  if (status === "upcoming") {
    return "bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/18";
  }

  if (status === "completed") {
    return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/18";
  }

  return "bg-rose-500/10 text-rose-400 border border-rose-500/18";
}

function getStatusLabel(status) {
  if (status === "upcoming") return "UPCOMING";
  if (status === "completed") return "COMPLETED";
  return "CANCELED";
}

function getRowIconByStatus(status) {
  if (status === "upcoming") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0c4a60]/50">
        <Zap className="h-5 w-5 text-[#00d2ff]" />
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f2d47]/55">
        <Check className="h-5 w-5 text-[#8d9ab2]" />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#20284a]/55">
      <X className="h-5 w-5 text-[#8d9ab2]" />
    </div>
  );
}

function BookingSummaryCard({
  title,
  value,
  subtitle,
  icon,
  badgeText,
  iconWrapperClasses,
  badgeClasses,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:border-[#12dfff]/12"
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={joinClasses(
            "flex h-14 w-14 items-center justify-center rounded-2xl",
            iconWrapperClasses
          )}
        >
          {icon}
        </div>

        <div className={joinClasses("text-[12px] font-semibold uppercase tracking-[0.10em]", badgeClasses)}>
          {badgeText}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[15px] text-white/60">{title}</div>
        <div className="mt-2 text-[34px] font-semibold tracking-[-0.05em] text-white">
          {value}
        </div>
        <div className="mt-1 text-[14px] text-white/50">{subtitle}</div>
      </div>
    </button>
  );
}

export default function Booking() {
  const [bookingAppointments, setBookingAppointments] = useState(initialBookingAppointments);
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
    Math.ceil(filteredBookingAppointments.length / APPOINTMENTS_PER_PAGE)
  );

  const paginatedBookingAppointments = useMemo(() => {
    const startIndex = (currentPageNumber - 1) * APPOINTMENTS_PER_PAGE;
    return filteredBookingAppointments.slice(
      startIndex,
      startIndex + APPOINTMENTS_PER_PAGE
    );
  }, [filteredBookingAppointments, currentPageNumber]);

  const visibleStartIndex =
    filteredBookingAppointments.length === 0
      ? 0
      : (currentPageNumber - 1) * APPOINTMENTS_PER_PAGE + 1;

  const visibleEndIndex = Math.min(
    currentPageNumber * APPOINTMENTS_PER_PAGE,
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
    const nextFilterValue = filterSequence[(currentFilterIndex + 1) % filterSequence.length];

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
      Math.ceil(updatedCount / APPOINTMENTS_PER_PAGE)
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
            onClick={() => {
              setActiveStatusFilter("upcoming");
              setCurrentPageNumber(1);
              showToast("Upcoming bookings opened");
            }}
          />

          <BookingSummaryCard
            title="Completed"
            value={completedAppointmentsCount}
            subtitle="Total historical sessions"
            badgeText="COMPLETED"
            icon={<CheckCircle2 className="h-6 w-6 text-emerald-400" />}
            iconWrapperClasses="bg-[#10483f]/45"
            badgeClasses="text-emerald-400"
            onClick={() => {
              setActiveStatusFilter("completed");
              setCurrentPageNumber(1);
              showToast("Completed bookings opened");
            }}
          />

          <BookingSummaryCard
            title="Total Spent"
            value={formatCurrencyAmount(totalSpentThisMonth)}
            subtitle={`${currentMonthName} ${currentYearValue} total`}
            badgeText="TOTAL SPENT"
            icon={<WalletCards className="h-6 w-6 text-amber-400" />}
            iconWrapperClasses="bg-[#4b4022]/45"
            badgeClasses="text-amber-400"
            onClick={() => showToast("Total spent details opened")}
          />
        </div>

       
        <div className="overflow-hidden rounded-[34px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
         
          <div className="flex flex-col gap-4 border-b border-white/5 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
              Appointment History
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleFilterClick}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-[#091e29] px-5 text-[15px] font-medium text-white transition hover:border-[#12dfff]/18"
              >
                <Filter className="h-4 w-4" />
                Filter
              </button>

              <button
                onClick={handleExportCsvClick}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-[#091e29] px-5 text-[15px] font-medium text-white transition hover:border-[#12dfff]/18"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>

          
          <div className="hidden lg:block">
            <div className="grid grid-cols-[2.2fr_1.4fr_1fr_1fr_56px] border-b border-white/5 px-8 py-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/42">
              <div>Station Name</div>
              <div>Date & Time</div>
              <div>Status</div>
              <div>Estimated Cost</div>
              <div />
            </div>

            <div>
              {paginatedBookingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="grid grid-cols-[2.2fr_1.4fr_1fr_1fr_56px] items-center border-b border-white/[0.04] px-8 py-6"
                >
                  <button
                    onClick={() => handleBookingRowClick(appointment)}
                    className="flex items-center gap-4 text-left"
                  >
                    {getRowIconByStatus(appointment.status)}

                    <div className="min-w-0">
                      <div className="truncate text-[16px] font-semibold text-white">
                        {appointment.stationName}
                      </div>
                      <div className="mt-1 text-[14px] text-white/44">
                        {appointment.stationLocation}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleBookingRowClick(appointment)}
                    className="text-left"
                  >
                    <div className="text-[16px] text-white">
                      {formatDateLabel(appointment.startDateTime)}
                    </div>
                    <div className="mt-1 text-[14px] text-white/44">
                      {formatTimeRangeLabel(
                        appointment.startDateTime,
                        appointment.endDateTime
                      )}
                    </div>
                  </button>

                  <div>
                    <button
                      onClick={() => handleBookingRowClick(appointment)}
                      className={joinClasses(
                        "rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em]",
                        getStatusBadgeClasses(appointment.status)
                      )}
                    >
                      {getStatusLabel(appointment.status)}
                    </button>
                  </div>

                  <button
                    onClick={() => handleBookingRowClick(appointment)}
                    className={joinClasses(
                      "text-left text-[16px] font-semibold",
                      appointment.status === "upcoming"
                        ? "text-[#12dfff]"
                        : "text-white"
                    )}
                  >
                    {formatCurrencyAmount(appointment.estimatedCost)}
                  </button>

                  <div className="flex justify-end">
                    {appointment.status === "upcoming" ? (
                      <button
                        onClick={() => handleDeleteBookingClick(appointment.id)}
                        className="rounded-xl p-2 text-white/36 transition hover:bg-white/[0.03] hover:text-white/80"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleInfoClick(appointment)}
                        className="rounded-xl p-2 text-white/36 transition hover:bg-white/[0.03] hover:text-white/80"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="grid gap-4 p-4 lg:hidden">
            {paginatedBookingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-[24px] border border-white/6 bg-[#102d3b]/65 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    onClick={() => handleBookingRowClick(appointment)}
                    className="flex min-w-0 items-center gap-3 text-left"
                  >
                    {getRowIconByStatus(appointment.status)}

                    <div className="min-w-0">
                      <div className="truncate text-[16px] font-semibold text-white">
                        {appointment.stationName}
                      </div>
                      <div className="mt-1 text-[14px] text-white/44">
                        {appointment.stationLocation}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleBookingRowClick(appointment)}
                    className={joinClasses(
                      "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
                      getStatusBadgeClasses(appointment.status)
                    )}
                  >
                    {getStatusLabel(appointment.status)}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => handleBookingRowClick(appointment)}
                    className="text-left"
                  >
                    <div className="text-[12px] uppercase tracking-[0.14em] text-white/38">
                      Date & Time
                    </div>
                    <div className="mt-2 text-[15px] text-white">
                      {formatDateLabel(appointment.startDateTime)}
                    </div>
                    <div className="mt-1 text-[14px] text-white/46">
                      {formatTimeRangeLabel(
                        appointment.startDateTime,
                        appointment.endDateTime
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => handleBookingRowClick(appointment)}
                    className="text-left"
                  >
                    <div className="text-[12px] uppercase tracking-[0.14em] text-white/38">
                      Estimated Cost
                    </div>
                    <div
                      className={joinClasses(
                        "mt-2 text-[18px] font-semibold",
                        appointment.status === "upcoming"
                          ? "text-[#12dfff]"
                          : "text-white"
                      )}
                    >
                      {formatCurrencyAmount(appointment.estimatedCost)}
                    </div>
                  </button>
                </div>

                <div className="mt-4 flex justify-end">
                  {appointment.status === "upcoming" ? (
                    <button
                      onClick={() => handleDeleteBookingClick(appointment.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-[14px] text-white/78"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInfoClick(appointment)}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-[14px] text-white/78"
                    >
                      <Info className="h-4 w-4" />
                      Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          
          <div className="flex flex-col gap-4 border-t border-white/5 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div className="text-[14px] text-white/46">
              Showing {visibleStartIndex} to {visibleEndIndex} of {filteredBookingAppointments.length} entries
            </div>

            <div className="flex items-center justify-start gap-2 md:justify-end">
              <button
                onClick={handlePreviousPageClick}
                disabled={currentPageNumber === 1}
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-[#091e29] text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPageCount }).map((_, index) => {
                const pageNumber = index + 1;
                const isActivePage = currentPageNumber === pageNumber;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageButtonClick(pageNumber)}
                    className={joinClasses(
                      "flex h-11 min-w-[44px] items-center justify-center rounded-[14px] border px-4 text-[15px] font-semibold transition",
                      isActivePage
                        ? "border-[#12dfff] bg-[#12dfff] text-[#04141c]"
                        : "border-white/10 bg-[#091e29] text-white"
                    )}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={handleNextPageClick}
                disabled={currentPageNumber === totalPageCount}
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-[#091e29] text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
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