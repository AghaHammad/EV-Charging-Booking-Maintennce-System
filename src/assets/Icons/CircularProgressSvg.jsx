import React from "react";

export default function CircularProgressSvg({ radius, filledLength, circumference }) {
  return (
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
        <linearGradient id="chargingProgressGradient">
          <stop offset="0%" stopColor="#12dfff" />
          <stop offset="100%" stopColor="#1ab7ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}