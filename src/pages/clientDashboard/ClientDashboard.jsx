import React, { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  dashboardStatData,
  mapStations,
  popularStations,
  recentTrips as recentTripsData,
  vehicleHealthItems,
} from "../../data/constant";

import ActiveSession from "../../Components/ClientDashboard/ActiveSession";
import DashboardMap from "../../Components/ClientDashboard/DashboardMap";
import DashboardStatCard from "../../Components/ClientDashboard/DashboardStatCard";
import PopularStationCard from "../../Components/ClientDashboard/PopularStationCard";
import RecentTrip from "../../Components/ClientDashboard/RecentTrip";
import VehicleHealth from "../../Components/ClientDashboard/VehicleHealth";

export default function ClientDashboard() {
  const [recentTrips, setRecentTrips] = useState(recentTripsData);

  const visiblePopularStations = useMemo(() => {
    return popularStations;
  }, []);

  const handleDashboardStatCardClick = (title) => {};

  const handleBookNearestClick = (station) => {};

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
              <p className="font-medium text-[#11dfff]">All systems operational</p>
              <p className="text-white/68">March 11, 2026</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
            {dashboardStatData.map((card) => (
              <DashboardStatCard
                key={card.id}
                card={card}
                onClick={handleDashboardStatCardClick}
              />
            ))}
          </div>

          <DashboardMap
            initialMapStations={mapStations}
            handleBookNearestClick={handleBookNearestClick}
          />

          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-white">
                Popular Stations
              </h2>
              <button
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
                />
              ))}
            </div>
          </div>
        </section>

        <aside className="min-w-0">
          <div className="grid gap-6 xl:sticky xl:top-[96px]">
            <ActiveSession />

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
                  <RecentTrip
                    key={trip.id}
                    trip={trip}
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
                  <VehicleHealth
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}