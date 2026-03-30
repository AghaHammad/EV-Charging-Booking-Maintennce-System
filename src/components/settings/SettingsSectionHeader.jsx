import React from "react";

export default function SettingsSectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b4a61]/55">
        {icon}
      </div>
      <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
    </div>
  );
}
