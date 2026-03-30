import React, { useMemo, useState } from "react";
import * as lucideReact from "lucide-react";
import { joinClasses, formatCurrentDate } from "../../utils/common/helper";
import { STATIONS_LIST as initialStations, STATIONS_RECENT_TRIPS as initialRecentTrips } from "../../data/constants";

import StationsSidebar from "../../components/stations/StationsSidebar";
import StationsMap from "../../components/stations/StationsMap";
import StationStatusCard from "../../components/stations/StationStatusCard";

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
                    onClick={() => showToast(`Filters applied • ${currentDateLabel}`)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#10ddff] px-6 text-[16px] font-semibold text-[#05131a] shadow-[0_16px_35px_rgba(16,221,255,0.22)]"
                  >
                    <lucideReact.Funnel className="h-4 w-4" />
                    Filter
                  </button>
                </div>
              </div>

              <StationsMap
                filteredStationItems={filteredStationItems}
                selectedStationId={selectedStationId}
                setSelectedStationId={setSelectedStationId}
                showToast={showToast}
                currentDateLabel={currentDateLabel}
              />

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

        <StationsSidebar
          sessionPercentage={sessionPercentage}
          sessionRunning={sessionRunning}
          handleSessionButtonClick={handleSessionButtonClick}
          recentTripItems={recentTripItems}
          handleSeeAllTripsClick={handleSeeAllTripsClick}
          showToast={showToast}
          currentDateLabel={currentDateLabel}
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
