import React from "react";

export default function MapBackgroundSvg() {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="absolute inset-0 h-full w-full opacity-90"
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" width="1000" height="500" fill="rgba(7,18,28,0.78)" />

      <path d="M60 40 L220 40 L330 110 L470 110 L570 40 L710 40 L820 120 L940 120" stroke="rgba(180,190,205,0.20)" strokeWidth="3" fill="none"/>
      <path d="M50 260 L180 260 L300 180 L500 180 L660 260 L840 260 L970 180" stroke="rgba(180,190,205,0.22)" strokeWidth="4" fill="none"/>
      <path d="M80 430 L220 430 L390 310 L600 310 L760 430 L930 430" stroke="rgba(180,190,205,0.16)" strokeWidth="3" fill="none"/>

      <path d="M150 20 L150 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2"/>
      <path d="M320 20 L320 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2"/>
      <path d="M500 20 L500 470" stroke="rgba(255,255,255,0.20)" strokeWidth="4"/>
      <path d="M680 20 L680 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2"/>
      <path d="M860 20 L860 470" stroke="rgba(180,190,205,0.16)" strokeWidth="2"/>

      <path d="M70 110 L930 110" stroke="rgba(110,125,145,0.13)" strokeWidth="1"/>
      <path d="M70 185 L930 185" stroke="rgba(110,125,145,0.13)" strokeWidth="1"/>
      <path d="M70 260 L930 260" stroke="rgba(255,255,255,0.16)" strokeWidth="2"/>
      <path d="M70 335 L930 335" stroke="rgba(110,125,145,0.13)" strokeWidth="1"/>
      <path d="M70 410 L930 410" stroke="rgba(110,125,145,0.13)" strokeWidth="1"/>
    </svg>
  );
}