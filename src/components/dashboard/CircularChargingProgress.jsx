import React from "react";

export default function CircularChargingProgress({ value = 72 }) {
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
