import React, { useMemo, useState } from "react";
import { ChevronDown, Funnel } from "lucide-react";
import { joinClasses, formatCurrentDate } from "../../utils/common/helper";
import { stationsList, stationsRecentTrips } from "../../data/constant";

import StationsSidebar from "../../components/clientStations/RecentTrips";
import StationsMap from "../../components/clientStations/StationsMap";
import StationStatusCard from "../../components/clientStations/StationStatusCard";

export default function ClientStations() {
  const [searchText, setSearchText] = useState("");
  const [powerFilterValue, setPowerFilterValue] = useState("all");
  const [statusFilterValue, setStatusFilterValue] = useState("all");
  const [stationItems, setStationItems] = useState(stationsList);
  const [selectedStationId, setSelectedStationId] = useState(1);
  const [sessionRunning, setSessionRunning] = useState(true);
  const [sessionPercentage, setSessionPercentage] = useState(72);
  const [recentTripItems, setRecentTripItems] = useState(stationsRecentTrips);

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
        statusFilterValue === "all"
          ? true
          : station.status === statusFilterValue;

      return matchesSearch && matchesPower && matchesStatus;
    });
  }, [stationItems, searchText, powerFilterValue, statusFilterValue]);

  const handleStationCardAction = (station) => {
    setSelectedStationId(station.id);

    if (station.status === "offline") {
      return;
    }

    if (station.status === "busy" && station.actionLabel === "Notify Me") {
      setStationItems((prev) =>
        prev.map((item) =>
          item.id === station.id ? { ...item, actionLabel: "Notified" } : item
        )
      );
      return;
    }

    if (station.status === "busy" && station.actionLabel === "Notified") {
      setStationItems((prev) =>
        prev.map((item) =>
          item.id === station.id ? { ...item, actionLabel: "Notify Me" } : item
        )
      );
      return;
    }
  };

  const handleSessionButtonClick = () => {
    if (sessionRunning) {
      setSessionRunning(false);
    } else {
      setSessionRunning(true);
      setSessionPercentage((prev) => Math.min(prev + 3, 100));
    }
  };

  const handleSeeAllTripsClick = () => {
    setRecentTripItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Highway FastCharge ${prev.length + 1}`,
        dateText: currentDateLabel,
        amountText: `€${(10 + prev.length * 2.1).toFixed(2)}`,
      },
    ]);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden text-white">
      <div className="grid w-full grid-cols-1 gap-6 min-[1180px]:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0">
          <div className="rounded-[34px] border border-[#0fe1ff]/8 bg-[linear-gradient(180deg,rgba(4,18,25,0.98),rgba(4,18,25,1)_100%)] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.22)] sm:p-7">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h1 className="text-[42px] font-semibold text-white sm:text-[56px]">
                    Charging <br /> Stations
                  </h1>

                  <p className="mt-4 text-[18px] text-white/58">
                    Found {filteredStationItems.length} stations in{" "}
                    <span className="font-medium text-[#10e8ff]">
                      Berlin, Germany
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    value={powerFilterValue}
                    onChange={(e) => setPowerFilterValue(e.target.value)}
                    className="h-12 min-w-[180px] rounded-2xl bg-[#122a38] px-4 text-white"
                  >
                    <option value="all">Power: All</option>
                    <option value="high">250kW+</option>
                    <option value="mid">100-249kW</option>
                    <option value="low">under 100kW</option>
                  </select>

                  <select
                    value={statusFilterValue}
                    onChange={(e) => setStatusFilterValue(e.target.value)}
                    className="h-12 min-w-[160px] rounded-2xl bg-[#122a38] px-4 text-white"
                  >
                    <option value="all">Status: All</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>

                  <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#10ddff] px-6 text-[16px] font-semibold text-[#05131a] shadow-[0_16px_35px_rgba(16,221,255,0.22)]">
                    <Funnel className="h-4 w-4" /> Filter
                  </button>
                </div>
              </div>

              <StationsMap
                filteredStationItems={filteredStationItems}
                selectedStationId={selectedStationId}
                setSelectedStationId={setSelectedStationId}
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
          currentDateLabel={currentDateLabel}
        />
      </div>
    </div>
  );
}