import React from "react";
import SessionProgressSvg from "../../assets/icons/SessionProgressSvg";

export default function SessionProgressRing({ value = 72 }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progressLength = (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <SessionProgressSvg
        radius={radius}
        progressLength={progressLength}
        circumference={circumference}
      />

      <div className="absolute text-center">
        <div className="text-[34px] font-semibold text-white">
          {value}%
        </div>
        <div className="text-[10px] text-white/52">
          CHARGING
        </div>
      </div>
    </div>
  );
}