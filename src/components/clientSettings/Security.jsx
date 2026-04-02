import React from "react";

export default function SecurityActionCard({
  icon,
  title,
  description,
  buttonLabel,
  onClick,
}) {
  return (
    <div className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b4a61]/55">
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-[18px] font-semibold text-white">{title}</div>
          <div className="mt-1 text-[15px] leading-6 text-white/40">
            {description}
          </div>
        </div>
      </div>

      <button
        onClick={onClick}
        className="mt-5 inline-flex h-12 items-center justify-center rounded-[16px] border border-white/12 bg-white/[0.02] px-5 text-[15px] font-medium text-white transition hover:bg-white/[0.04]"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
