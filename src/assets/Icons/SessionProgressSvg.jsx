import React from "react";

export default function SessionProgressSvg({ radius, progressLength, circumference }) {
  return (
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
        <linearGradient id="stationsSessionGradient">
          <stop offset="0%" stopColor="#11e9ff" />
          <stop offset="100%" stopColor="#18c7ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}