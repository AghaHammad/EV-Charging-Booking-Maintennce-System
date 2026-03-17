import React, { useMemo, useState } from "react";
import {
  TimerReset,
  Wallet,
  Wrench,
  Bolt,
  Plus,
  Minus,
  Fuel,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const dashboardStatCards = [
  {
    id: "active-bookings",
    title: "Active Bookings",
    value: "24",
    subtitle: "",
    badgeText: "+12%",
    iconType: "booking",
  },
  {
    id: "wallet-balance",
    title: "Wallet Balance",
    value: "€2,450.80",
    subtitle: "",
    badgeText: "",
    iconType: "wallet",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    value: "Operational",
    subtitle: "",
    badgeText: "2 Pending",
    iconType: "maintenance",
  },
  {
    id: "energy-delivered",
    title: "Total Energy Delivered",
    value: "1.2 MW",
    subtitle: "",
    badgeText: "",
    iconType: "energy",
  },
];

const initialMapStations = [
  {
    id: 1,
    name: "Station Alpha-12",
    area: "Mitte, Berlin",
    distance: "1.2km away",
    left: "34%",
    top: "27%",
  },
  {
    id: 2,
    name: "Station Beta-09",
    area: "Tiergarten, Berlin",
    distance: "2.8km away",
    left: "51%",
    top: "52%",
  },
  {
    id: 3,
    name: "Station Gamma-03",
    area: "Kreuzberg, Berlin",
    distance: "4.1km away",
    left: "75%",
    top: "66%",
  },
];

const initialPopularStations = [
  {
    id: 1,
    name: "Berlin Hypercharger",
    power: "350kW",
    connector: "CCS2",
    price: "€0.45/kWh",
    badgeText: "Available",
    badgeTone: "available",
    accentText: "FAST CHARGE",
    distance: "0.8 km",
  },
  {
    id: 2,
    name: "Potsdamer Plaza",
    power: "50kW",
    connector: "Type 2",
    price: "€0.29/kWh",
    badgeText: "Busy (2/4)",
    badgeTone: "busy",
    accentText: "ECO CHARGE",
    distance: "2.1 km",
  },
];

const initialRecentTrips = [
  {
    id: 1,
    title: "Airport FastCharge",
    date: "Yesterday, 14:20",
    amount: "€18.40",
    energy: "55kWh",
    status: "success",
  },
  {
    id: 2,
    title: "City Mall Level 2",
    date: "10 Jun, 09:15",
    amount: "€8.25",
    energy: "22kWh",
    status: "success",
  },
  {
    id: 3,
    title: "Highway Hub X",
    date: "08 Jun, 18:30",
    amount: "€0.00",
    energy: "Failed",
    status: "failed",
  },
];

const vehicleHealthItems = [
  {
    id: 1,
    label: "Tire Pressure",
    value: "Optimal",
    tone: "good",
  },
  {
    id: 2,
    label: "Brake Fluid",
    value: "Due in 500km",
    tone: "warning",
  },
  {
    id: 3,
    label: "Battery Coolant",
    value: "Optimal",
    tone: "good",
  },
];

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CircularChargingProgress({ value = 72 }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const filledLength = (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="170" height="170" viewBox="0 0 170 170" className="-rotate-90">
        <circle
          cx="85"
          cy="85"
          r={radius}
          fill="none"
          stroke="rgba(74,92,114,0.18)"
          strokeWidth="10"
        />
        <circle
          cx="85"
          cy="85"
          r={radius}
          fill="none"
          stroke="url(#chargingProgressGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filledLength} ${circumference - filledLength}`}
        />
        <defs>
          <linearGradient id="chargingProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#12dfff" />
            <stop offset="100%" stopColor="#1ab7ff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute text-center">
        <div className="text-[28px] font-semibold leading-none tracking-[-0.05em] text-white">
          {value}%
        </div>
        <div className="mt-1 text-[10px] tracking-[0.18em] text-white/55">
          CHARGING
        </div>
      </div>
    </div>
  );
}

function DashboardStatCard({ card, onClick }) {
  const iconWrapperClasses =
    card.iconType === "booking" || card.iconType === "energy"
      ? "bg-[#0c4f68]/45"
      : card.iconType === "wallet"
      ? "bg-[#154c42]/45"
      : "bg-[#5a4124]/45";

  const iconColorClasses =
    card.iconType === "booking" || card.iconType === "energy"
      ? "text-[#12dfff]"
      : card.iconType === "wallet"
      ? "text-[#35d3a4]"
      : "text-[#f0a43b]";

  const badgeClasses =
    card.iconType === "maintenance"
      ? "text-[#f0a43b] bg-[#f0a43b]/12"
      : "text-[#12dfff] bg-[#12dfff]/10";

  return (
    <button
      onClick={() => onClick(card.title)}
      className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.20)] transition hover:border-[#12dfff]/12"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={joinClasses("flex h-14 w-14 items-center justify-center rounded-full", iconWrapperClasses)}>
          {card.iconType === "booking" ? (
            <TimerReset className={joinClasses("h-6 w-6", iconColorClasses)} />
          ) : card.iconType === "wallet" ? (
            <Wallet className={joinClasses("h-6 w-6", iconColorClasses)} />
          ) : card.iconType === "maintenance" ? (
            <Wrench className={joinClasses("h-6 w-6", iconColorClasses)} />
          ) : (
            <Bolt className={joinClasses("h-6 w-6", iconColorClasses)} />
          )}
        </div>

        {card.badgeText ? (
          <div className={joinClasses("rounded-full px-3 py-1 text-[11px] font-semibold", badgeClasses)}>
            {card.badgeText}
          </div>
        ) : null}
      </div>

      <div className="mt-5 text-[15px] text-white/60">{card.title}</div>
      <div className="mt-2 text-[28px] font-semibold tracking-[-0.05em] text-white">
        {card.value}
      </div>
    </button>
  );
}

function PopularStationCard({ station, onClick }) {
  const isAvailable = station.badgeTone === "available";

  return (
    <button
      onClick={() => onClick(station.name)}
      className="rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(15,40,53,0.96),rgba(12,34,46,0.96))] p-5 text-left transition hover:border-[#12dfff]/12"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0c5f79]/35">
          <Fuel className="h-6 w-6 text-[#18d8ff]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[16px] font-semibold leading-6 text-white">
              {station.name}
            </div>
            <div
              className={joinClasses(
                "text-[12px] font-medium",
                isAvailable ? "text-[#38e6a8]" : "text-[#f0a43b]"
              )}
            >
              {station.badgeText}
            </div>
          </div>

          <div className="mt-1 text-[14px] text-white/50">
            {station.power} • {station.connector} • {station.price}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div
              className={joinClasses(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                isAvailable
                  ? "bg-[#12dfff]/10 text-[#12dfff]"
                  : "bg-[#8e96cb]/18 text-[#c0c6ff]"
              )}
            >
              {station.accentText}
            </div>

            <div className="flex items-center gap-1 text-[12px] text-white/38">
              <MapPin className="h-3.5 w-3.5" />
              {station.distance}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function RecentTripRow({ trip, onClick }) {
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

function VehicleHealthRow({ item, onClick }) {
  return (
    <button
      onClick={() => onClick(item.label)}
      className="flex w-full items-center justify-between rounded-full border border-white/6 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.05]"
    >
      <span className="text-[15px] text-white/82">{item.label}</span>
      <span
        className={joinClasses(
          "text-[14px] font-medium",
          item.tone === "good" ? "text-[#31dfb0]" : "text-[#f0a43b]"
        )}
      >
        {item.value}
      </span>
    </button>
  );
}

export default function ClientDashboard() {
  const [mapZoomLevel, setMapZoomLevel] = useState(1);
  const [selectedMapStation, setSelectedMapStation] = useState(initialMapStations[0]);
  const [chargingSessionActive, setChargingSessionActive] = useState(true);
  const [chargingPercentage, setChargingPercentage] = useState(72);
  const [recentTrips, setRecentTrips] = useState(initialRecentTrips);
  const [toastMessage, setToastMessage] = useState("");

  const visiblePopularStations = useMemo(() => {
    return initialPopularStations;
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);
  };

  const handleDashboardStatCardClick = (title) => {
    showToast(`${title} opened`);
  };

  const handleMapZoomIn = () => {
    setMapZoomLevel((previousZoom) => Math.min(previousZoom + 0.1, 1.5));
    showToast("Map zoomed in");
  };

  const handleMapZoomOut = () => {
    setMapZoomLevel((previousZoom) => Math.max(previousZoom - 0.1, 0.9));
    showToast("Map zoomed out");
  };

  const handleMapStationClick = (station) => {
    setSelectedMapStation(station);
    showToast(`${station.name} selected`);
  };

  const handleBookNearestClick = () => {
    showToast(`Booked nearest station: ${selectedMapStation.name}`);
  };

  const handleSessionButtonClick = () => {
    if (chargingSessionActive) {
      setChargingSessionActive(false);
      showToast("Charging session stopped");
    } else {
      setChargingSessionActive(true);
      setChargingPercentage((previousValue) => Math.min(previousValue + 3, 100));
      showToast("Charging session resumed");
    }
  };

  const handleSeeAllTripsClick = () => {
    setRecentTrips((previousTrips) => [
      ...previousTrips,
      {
        id: previousTrips.length + 1,
        title: `Downtown Charge ${previousTrips.length + 1}`,
        date: "Just now",
        amount: `€${(7.5 + previousTrips.length * 1.8).toFixed(2)}`,
        energy: `${18 + previousTrips.length * 3}kWh`,
        status: "success",
      },
    ]);
    showToast("More trips loaded");
  };

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_258px]">
        
        <section className="min-w-0">
          <div>
            <h1 className="text-[36px] font-semibold tracking-[-0.05em] text-white sm:text-[44px]">
              System Overview
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-white/56">
              <span>Status:</span>
              <button
                onClick={() => showToast("System status clicked")}
                className="font-medium text-[#11dfff]"
              >
                All systems operational
              </button>
              <span>•</span>
              <button
                onClick={() => showToast("Date clicked")}
                className="text-white/68"
              >
                March 11, 2026
              </button>
            </div>
          </div>

         
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
            {dashboardStatCards.map((card) => (
              <DashboardStatCard
                key={card.id}
                card={card}
                onClick={handleDashboardStatCardClick}
              />
            ))}
          </div>

          
          <div className="mt-6 overflow-hidden rounded-[30px] border border-[#12dfff]/14 bg-[linear-gradient(180deg,rgba(8,26,36,0.98),rgba(7,23,32,0.98))] shadow-[0_20px_50px_rgba(0,0,0,0.24)]">
            <div className="relative h-[350px] overflow-hidden rounded-[30px] sm:h-[390px]">
              <div
                className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `scale(${mapZoomLevel})` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_18%_80%,rgba(18,223,255,0.05),transparent_25%),radial-gradient(circle_at_85%_82%,rgba(18,223,255,0.05),transparent_25%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:auto,auto,auto,18px_18px,18px_18px]" />

                <svg
                  viewBox="0 0 1000 500"
                  className="absolute inset-0 h-full w-full opacity-90"
                  preserveAspectRatio="none"
                >
                  <rect x="0" y="0" width="1000" height="500" fill="rgba(7,18,28,0.78)" />
                  <path
                    d="M60 40 L220 40 L330 110 L470 110 L570 40 L710 40 L820 120 L940 120"
                    stroke="rgba(180,190,205,0.20)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M50 260 L180 260 L300 180 L500 180 L660 260 L840 260 L970 180"
                    stroke="rgba(180,190,205,0.22)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M80 430 L220 430 L390 310 L600 310 L760 430 L930 430"
                    stroke="rgba(180,190,205,0.16)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path d="M150 20 L150 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
                  <path d="M320 20 L320 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
                  <path d="M500 20 L500 470" stroke="rgba(255,255,255,0.20)" strokeWidth="4" />
                  <path d="M680 20 L680 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
                  <path d="M860 20 L860 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2" />
                  <path d="M70 110 L930 110" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
                  <path d="M70 185 L930 185" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
                  <path d="M70 260 L930 260" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
                  <path d="M70 335 L930 335" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
                  <path d="M70 410 L930 410" stroke="rgba(110,125,145,0.13)" strokeWidth="1" />
                </svg>

                {initialMapStations.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => handleMapStationClick(station)}
                    className="absolute h-5 w-5 rounded-full border-2 border-white bg-[#18d8ff] shadow-[0_0_20px_rgba(24,216,255,0.85)]"
                    style={{ left: station.left, top: station.top }}
                  />
                ))}
              </div>

             
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <button
                  onClick={handleMapZoomIn}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#12dfff]/14 bg-[#071d28]/92 text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={handleMapZoomOut}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#12dfff]/14 bg-[#071d28]/92 text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>

              
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <button
                  onClick={() => showToast(`${selectedMapStation.name} opened`)}
                  className="flex min-w-0 items-center gap-4 rounded-[22px] border border-[#12dfff]/20 bg-[#092635]/95 px-4 py-4 text-left shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b87af]/26">
                    <Fuel className="h-6 w-6 text-[#1bd6ff]" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-white">
                      {selectedMapStation.name}
                    </div>
                    <div className="mt-1 text-[14px] text-white/54">
                      {selectedMapStation.area}, {selectedMapStation.distance}
                    </div>

                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="h-1.5 w-4 rounded-full bg-[#12dfff]" />
                      <span className="h-1.5 w-4 rounded-full bg-[#12dfff]" />
                      <span className="h-1.5 w-4 rounded-full bg-white/25" />
                      <span className="h-1.5 w-4 rounded-full bg-white/18" />
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleBookNearestClick}
                  className="self-start rounded-full bg-[#12dfff] px-7 py-4 text-[18px] font-semibold text-[#06141b] shadow-[0_14px_30px_rgba(18,223,255,0.22)] transition hover:brightness-105"
                >
                  Book Nearest
                </button>
              </div>
            </div>
          </div>

          
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-white">
                Popular Stations
              </h2>

              <button
                onClick={() => showToast("View all stations clicked")}
                className="text-[16px] font-medium text-[#12dfff]"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {visiblePopularStations.map((station) => (
                <PopularStationCard
                  key={station.id}
                  station={station}
                  onClick={showToast}
                />
              ))}
            </div>
          </div>
        </section>

       
        <aside className="min-w-0">
          <div className="grid gap-6 xl:sticky xl:top-[96px]">
           
            <div className="rounded-[30px] border border-[#12dfff] bg-[linear-gradient(180deg,rgba(16,42,56,0.95),rgba(13,35,48,0.96))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                  Active Session
                </h3>
                <span className="h-2.5 w-2.5 rounded-full bg-[#12dfff]" />
              </div>

              <div className="mt-5 flex justify-center">
                <CircularChargingProgress value={chargingPercentage} />
              </div>

              <div className="mt-3 text-center">
                <button
                  onClick={() => showToast("Vehicle details clicked")}
                  className="text-[18px] font-semibold tracking-[-0.03em] text-white"
                >
                  Model S Long Range
                </button>
                <div className="mt-1 text-[14px] text-white/50">
                  Station Alpha-12, Plug #4
                </div>
              </div>

              <div className="mt-6 border-t border-[#12dfff]/10 pt-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] tracking-[0.08em] text-white/35">TIME LEFT</div>
                    <div className="mt-1 text-[17px] font-semibold text-white">18 min</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] tracking-[0.08em] text-white/35">ENERGY</div>
                    <div className="mt-1 text-[17px] font-semibold text-white">42.5 kWh</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSessionButtonClick}
                className={joinClasses(
                  "mt-6 w-full rounded-full border px-5 py-4 text-[16px] font-semibold transition",
                  chargingSessionActive
                    ? "border-[#12dfff]/25 text-[#12dfff] hover:bg-[#12dfff]/6"
                    : "border-[#12dfff]/15 bg-[#12dfff] text-[#06141b]"
                )}
              >
                {chargingSessionActive ? "Stop Session" : "Resume Session"}
              </button>
            </div>

           
            <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.95),rgba(13,35,48,0.96))] p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                  Recent Trips
                </h3>
                <button
                  onClick={handleSeeAllTripsClick}
                  className="text-[13px] font-medium text-[#12dfff]"
                >
                  See All
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {recentTrips.map((trip) => (
                  <RecentTripRow
                    key={trip.id}
                    trip={trip}
                    onClick={showToast}
                  />
                ))}
              </div>
            </div>

           
            <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.95),rgba(13,35,48,0.96))] p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-[#f3a43d]" />
                <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-white">
                  Vehicle Health
                </h3>
              </div>

              <div className="mt-5 space-y-4">
                {vehicleHealthItems.map((item) => (
                  <VehicleHealthRow
                    key={item.id}
                    item={item}
                    onClick={showToast}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      
      <div
        className={joinClasses(
          "pointer-events-none fixed bottom-5 right-5 z-[100] rounded-2xl border border-[#12dfff]/14 bg-[#0a2431]/95 px-4 py-3 text-[14px] text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] transition",
          toastMessage ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        {toastMessage}
      </div>
    </div>
  );
}