import React, { useState } from "react";
import CircularChargingProgress from "./CircularChargingProgress";
import { joinClasses } from "../../utils/common/helper";

export default function ActiveSessionCard({ showToast }) {
  const [chargingSessionActive, setChargingSessionActive] = useState(true);
  const [chargingPercentage, setChargingPercentage] = useState(72);

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

  return (
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
  );
}
