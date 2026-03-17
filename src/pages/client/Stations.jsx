import React, { useMemo, useState } from "react";
import * as lucideReact from "lucide-react";

const initialStations = [
  {
    id: 1,
    name: "Berlin Hypercharger",
    city: "Mitte, Berlin",
    distanceKm: 0.8,
    powerKw: 350,
    connector: "CCS2",
    pricePerKwh: 0.45,
    status: "available",
    accentLabel: "FAST CHARGE",
    actionLabel: "Details",
    mapXPercent: 18,
    mapYPercent: 35,
  },
  {
    id: 2,
    name: "Potsdamer Plaza",
    city: "Tiergarten, Berlin",
    distanceKm: 2.1,
    powerKw: 50,
    connector: "Type 2",
    pricePerKwh: 0.29,
    status: "busy",
    busySlots: "2/4",
    accentLabel: "ECO CHARGE",
    actionLabel: "Details",
    mapXPercent: 38,
    mapYPercent: 29,
  },
  {
    id: 3,
    name: "Alexanderplatz East",
    city: "Mitte, Berlin",
    distanceKm: 4.5,
    powerKw: 150,
    connector: "CCS2",
    pricePerKwh: null,
    status: "offline",
    accentLabel: "UNDER MAINTENANCE",
    actionLabel: "Locked",
    mapXPercent: 61,
    mapYPercent: 24,
  },
  {
    id: 4,
    name: "Station Alpha-12",
    city: "Prenzlauer Berg, Berlin",
    distanceKm: 1.2,
    powerKw: 350,
    connector: "CCS2",
    pricePerKwh: null,
    status: "available",
    accentLabel: "FAST CHARGE",
    actionLabel: "Details",
    mapXPercent: 25,
    mapYPercent: 66,
  },
  {
    id: 5,
    name: "Charlottenburg Hub",
    city: "Charlottenburg",
    distanceKm: 3.2,
    powerKw: 120,
    connector: "CCS2/CHAdeMO",
    pricePerKwh: null,
    status: "available",
    accentLabel: "STANDARD PLUS",
    actionLabel: "Details",
    mapXPercent: 47,
    mapYPercent: 58,
  },
  {
    id: 6,
    name: "Tempelhof Supercharger",
    city: "Tempelhof",
    distanceKm: 6.7,
    powerKw: 250,
    connector: "Tesla Plug",
    pricePerKwh: null,
    status: "busy",
    busySlots: "8/8",
    accentLabel: "WAIT TIME: 15M",
    actionLabel: "Notify Me",
    mapXPercent: 74,
    mapYPercent: 72,
  },
];

const initialRecentTrips = [
  {
    id: 1,
    title: "Airport FastCharge",
    dateText: "Yesterday, 14:20",
    amountText: "€18.40",
  },
  {
    id: 2,
    title: "City Mall Level 2",
    dateText: "10 Jun, 09:15",
    amountText: "€8.25",
  },
];

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatCurrentDate() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function getStatusPresentation(status) {
  if (status === "available") {
    return {
      badgeClasses: "bg-[#09dcb0]/12 text-[#0feabf]",
      iconClasses: "text-[#10e8ff] border-[#10e8ff]/20",
      accentClasses: "text-[#0fe8ff]",
      buttonClasses: "bg-[#4a5778] hover:bg-[#5a6789] text-white",
    };
  }

  if (status === "busy") {
    return {
      badgeClasses: "bg-[#f3c63d]/12 text-[#f3c63d]",
      iconClasses: "text-[#f3c63d] border-[#f3c63d]/20",
      accentClasses: "text-[#f3c63d]",
      buttonClasses: "bg-[#4a5778] hover:bg-[#5a6789] text-white",
    };
  }

  return {
    badgeClasses: "bg-[#d94f55]/12 text-[#e65c62]",
    iconClasses: "text-[#e65c62] border-[#e65c62]/20",
    accentClasses: "text-[#e65c62]",
    buttonClasses: "bg-[#333b52] hover:bg-[#434c66] text-white/90",
  };
}

function getStatusLabel(station) {
  if (station.status === "available") return "AVAILABLE";
  if (station.status === "busy") return `BUSY (${station.busySlots})`;
  return "OFFLINE";
}

function SessionProgressRing({ value = 72 }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progressLength = (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="188" height="188" viewBox="0 0 188 188" className="-rotate-90">
        <circle
          cx="94"
          cy="94"
          r={radius}
          fill="none"
          stroke="rgba(76,95,125,0.18)"
          strokeWidth="12"
        />
        <circle
          cx="94"
          cy="94"
          r={radius}
          fill="none"
          stroke="url(#stationsSessionGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${progressLength} ${circumference - progressLength}`}
        />
        <defs>
          <linearGradient id="stationsSessionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#11e9ff" />
            <stop offset="100%" stopColor="#18c7ff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute text-center">
        <div className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-white">
          {value}%
        </div>
        <div className="mt-1 text-[10px] tracking-[0.18em] text-white/52">CHARGING</div>
      </div>
    </div>
  );
}

function StationStatusCard({ station, onActionClick }) {
  const statusPresentation = getStatusPresentation(station.status);

  return (
    <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(14,37,50,0.98),rgba(12,33,46,0.98))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div
          className={joinClasses(
            "flex h-14 w-14 items-center justify-center rounded-2xl border bg-[#0a2231]",
            statusPresentation.iconClasses
          )}
        >
          <lucideReact.Bolt className="h-5 w-5" />
        </div>

        <div
          className={joinClasses(
            "rounded-full px-3 py-1.5 text-[11px] font-semibold",
            statusPresentation.badgeClasses
          )}
        >
          {getStatusLabel(station)}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-[20px] font-semibold leading-[1.35] tracking-[-0.03em] text-white">
          {station.name}
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-white/56">
          {station.city} • {station.distanceKm} km
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-[#202d48]/70 px-2.5 py-1.5 text-[12px] text-white/62">
          {station.powerKw}kW
        </span>
        <span className="rounded-lg bg-[#202d48]/70 px-2.5 py-1.5 text-[12px] text-white/62">
          {station.connector}
        </span>
        {station.pricePerKwh !== null && (
          <span className="rounded-lg bg-[#202d48]/70 px-2.5 py-1.5 text-[12px] text-white/62">
            €{station.pricePerKwh}/kWh
          </span>
        )}
      </div>

      <div className="mt-7 h-px bg-white/7" />

      <div className="mt-5 flex items-center justify-between gap-4">
        <div
          className={joinClasses(
            "text-[13px] font-medium uppercase tracking-[0.12em]",
            statusPresentation.accentClasses
          )}
        >
          {station.accentLabel}
        </div>

        <button
          onClick={() => onActionClick(station)}
          className={joinClasses(
            "rounded-2xl px-5 py-3 text-[14px] font-semibold transition whitespace-nowrap",
            statusPresentation.buttonClasses
          )}
        >
          {station.actionLabel}
        </button>
      </div>
    </div>
  );
}

function StationMapMarker({ station, selected, onClick }) {
  const statusPresentation = getStatusPresentation(station.status);

  return (
    <button
      onClick={onClick}
      style={{ left: `${station.mapXPercent}%`, top: `${station.mapYPercent}%` }}
      className={joinClasses(
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-[#0d2231]/95 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition",
        statusPresentation.iconClasses,
        selected && "scale-110 ring-2 ring-[#10e8ff]/35"
      )}
    >
      <lucideReact.Bolt className="h-5 w-5" />
    </button>
  );
}

export default function Stations() {
  const [searchText, setSearchText] = useState("");
  const [powerFilterValue, setPowerFilterValue] = useState("all");
  const [statusFilterValue, setStatusFilterValue] = useState("all");
  const [stationItems, setStationItems] = useState(initialStations);
  const [selectedStationId, setSelectedStationId] = useState(1);
  const [sessionRunning, setSessionRunning] = useState(true);
  const [sessionPercentage, setSessionPercentage] = useState(72);
  const [recentTripItems, setRecentTripItems] = useState(initialRecentTrips);
  const [toastMessage, setToastMessage] = useState("");

  const currentDateLabel = useMemo(() => formatCurrentDate(), []);

  const filteredStationItems = useMemo(() => {
    return stationItems.filter((station) => {
      const searchValue = searchText.toLowerCase();

      const matchesSearch =
        station.name.toLowerCase().includes(searchValue) ||
        station.city.toLowerCase().includes(searchValue);

      const matchesPower =
        powerFilterValue === "all"
          ? true
          : powerFilterValue === "high"
            ? station.powerKw >= 250
            : powerFilterValue === "mid"
              ? station.powerKw >= 100 && station.powerKw < 250
              : station.powerKw < 100;

      const matchesStatus =
        statusFilterValue === "all" ? true : station.status === statusFilterValue;

      return matchesSearch && matchesPower && matchesStatus;
    });
  }, [stationItems, searchText, powerFilterValue, statusFilterValue]);

  const selectedStation =
    stationItems.find((station) => station.id === selectedStationId) || stationItems[0];

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  const handleStationCardAction = (station) => {
    setSelectedStationId(station.id);

    if (station.status === "offline") {
      showToast(`${station.name} is locked right now.`);
      return;
    }

    if (station.status === "busy" && station.actionLabel === "Notify Me") {
      setStationItems((previousStations) =>
        previousStations.map((item) =>
          item.id === station.id ? { ...item, actionLabel: "Notified" } : item
        )
      );
      showToast(`Notification enabled for ${station.name}`);
      return;
    }

    if (station.status === "busy" && station.actionLabel === "Notified") {
      setStationItems((previousStations) =>
        previousStations.map((item) =>
          item.id === station.id ? { ...item, actionLabel: "Notify Me" } : item
        )
      );
      showToast(`Notification removed for ${station.name}`);
      return;
    }

    showToast(`${station.name} opened`);
  };

  const handleSessionButtonClick = () => {
    if (sessionRunning) {
      setSessionRunning(false);
      showToast("Session stopped");
    } else {
      setSessionRunning(true);
      setSessionPercentage((previousValue) => Math.min(previousValue + 3, 100));
      showToast("Session resumed");
    }
  };

  const handleSeeAllTripsClick = () => {
    setRecentTripItems((previousTrips) => [
      ...previousTrips,
      {
        id: previousTrips.length + 1,
        title: `Highway FastCharge ${previousTrips.length + 1}`,
        dateText: currentDateLabel,
        amountText: `€${(10 + previousTrips.length * 2.1).toFixed(2)}`,
      },
    ]);
    showToast("More trips loaded");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden text-white">
      <div className="grid w-full grid-cols-1 gap-6 min-[1180px]:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">

        <section className="min-w-0">
          <div className="rounded-[34px] border border-[#0fe1ff]/8 bg-[linear-gradient(180deg,rgba(4,18,25,0.98),rgba(4,18,25,1)_100%)] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.22)] sm:p-7">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h1 className="text-[42px] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-[56px]">
                    Charging
                    <br />
                    Stations
                  </h1>

                  <p className="mt-4 text-[18px] text-white/58">
                    Found {filteredStationItems.length} stations in{" "}
                    <button
                      onClick={() => showToast(`Berlin, Germany • ${currentDateLabel}`)}
                      className="font-medium text-[#10e8ff]"
                    >
                      Berlin, Germany
                    </button>
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <select
                      value={powerFilterValue}
                      onChange={(event) => setPowerFilterValue(event.target.value)}
                      className="h-12 min-w-[180px] appearance-none rounded-2xl border border-white/10 bg-[#122a38] px-4 pr-10 text-[15px] text-white outline-none"
                    >
                      <option value="all">Power: All</option>
                      <option value="high">Power: 250kW+</option>
                      <option value="mid">Power: 100-249kW</option>
                      <option value="low">Power: under 100kW</option>
                    </select>
                    <lucideReact.ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </div>

                  <div className="relative">
                    <select
                      value={statusFilterValue}
                      onChange={(event) => setStatusFilterValue(event.target.value)}
                      className="h-12 min-w-[160px] appearance-none rounded-2xl border border-white/10 bg-[#122a38] px-4 pr-10 text-[15px] text-white outline-none"
                    >
                      <option value="all">Status: All</option>
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="offline">Offline</option>
                    </select>
                    <lucideReact.ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </div>

                  <button
                    onClick={() =>
                      showToast(
                        `Filters applied • ${currentDateLabel}`
                      )
                    }
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#10ddff] px-6 text-[16px] font-semibold text-[#05131a] shadow-[0_16px_35px_rgba(16,221,255,0.22)]"
                  >
                    <lucideReact.Funnel className="h-4 w-4" />
                    Filter
                  </button>
                </div>
              </div>


              <div className="overflow-hidden rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(9,30,41,0.98),rgba(8,25,35,0.98))]">
                <div className="border-b border-white/5 px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                        United States station map
                      </div>
                      <div className="mt-1 text-[14px] text-white/48">
                        Interactive charging points with live status • {currentDateLabel}
                      </div>
                    </div>

                    <button
                      onClick={() => showToast("Map opened")}
                      className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-2 text-[14px] text-white/70"
                    >
                      View Network
                    </button>
                  </div>
                </div>

                <div className="relative h-[280px] overflow-hidden sm:h-[340px] lg:h-[360px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(16,221,255,0.08),transparent_28%),radial-gradient(circle_at_75%_35%,rgba(16,221,255,0.05),transparent_28%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,auto,32px_32px,32px_32px]" />

                  <svg
                    viewBox="0 0 1000 500"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M99 180 L136 168 L177 168 L201 156 L251 162 L291 156 L330 159 L357 145 L409 147 L454 142 L501 150 L540 154 L571 162 L611 162 L646 182 L698 185 L731 199 L773 197 L811 210 L852 214 L881 228 L905 248 L903 273 L881 286 L852 301 L828 316 L807 332 L776 343 L744 343 L703 353 L659 351 L621 337 L593 327 L546 326 L499 315 L460 316 L412 319 L378 307 L342 292 L311 284 L274 281 L241 267 L208 257 L177 247 L151 232 L119 213 Z"
                      fill="rgba(17,36,48,0.95)"
                      stroke="rgba(17,233,255,0.18)"
                      strokeWidth="3"
                    />
                    <path
                      d="M180 212 C250 225, 300 250, 345 248"
                      fill="none"
                      stroke="rgba(120,145,164,0.18)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M344 245 C430 215, 505 205, 590 218"
                      fill="none"
                      stroke="rgba(120,145,164,0.18)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M590 218 C650 228, 725 250, 810 248"
                      fill="none"
                      stroke="rgba(120,145,164,0.16)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {filteredStationItems.map((station) => (
                    <StationMapMarker
                      key={station.id}
                      station={station}
                      selected={selectedStationId === station.id}
                      onClick={() => {
                        setSelectedStationId(station.id);
                        showToast(`${station.name} selected`);
                      }}
                    />
                  ))}

                  {selectedStation && (
                    <div className="absolute bottom-4 left-4 right-4 rounded-[24px] border border-[#0fe1ff]/10 bg-[#0b2130]/92 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:right-auto sm:w-[360px]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                            {selectedStation.name}
                          </div>
                          <div className="mt-1 text-[14px] text-white/52">
                            {selectedStation.city} • {selectedStation.distanceKm} km
                          </div>
                        </div>

                        <div
                          className={joinClasses(
                            "rounded-full px-3 py-1.5 text-[11px] font-semibold",
                            getStatusPresentation(selectedStation.status).badgeClasses
                          )}
                        >
                          {getStatusLabel(selectedStation)}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-white/65">
                          {selectedStation.powerKw}kW
                        </span>
                        <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-white/65">
                          {selectedStation.connector}
                        </span>
                        {selectedStation.pricePerKwh !== null && (
                          <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-white/65">
                            €{selectedStation.pricePerKwh}/kWh
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>


              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {filteredStationItems.map((station) => (
                  <StationStatusCard
                    key={station.id}
                    station={station}
                    onActionClick={handleStationCardAction}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


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
