import React from "react";

export default function SessionProgressRing({ value = 72 }) {
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
