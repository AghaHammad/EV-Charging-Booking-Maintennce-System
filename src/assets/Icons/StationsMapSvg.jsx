import React from "react";

export default function StationsMapSvg() {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M99 180 L136 168 ..." fill="rgba(17,36,48,0.95)" stroke="rgba(17,233,255,0.18)" strokeWidth="3" />
      <path d="M180 212 C250 225..." fill="none" stroke="rgba(120,145,164,0.18)" strokeWidth="5" strokeLinecap="round" />
      <path d="M344 245 C430 215..." fill="none" stroke="rgba(120,145,164,0.18)" strokeWidth="5" strokeLinecap="round" />
      <path d="M590 218 C650 228..." fill="none" stroke="rgba(120,145,164,0.16)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}