import React from "react";
import CircularProgressSvg from "../../assets/Icons/CircularProgressSvg";

export default function CircularChargingProgress({ value = 72 }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const filledLength = (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <CircularProgressSvg
        radius={radius}
        filledLength={filledLength}
        circumference={circumference}
      />

      <div className="absolute text-center">
        <div className="text-[28px] font-semibold text-white">
          {value}%
        </div>
        <div className="text-[10px] text-white/55">
          CHARGING
        </div>
      </div>
    </div>
  );
}