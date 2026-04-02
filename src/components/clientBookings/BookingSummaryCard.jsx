import React from "react";
import { joinClasses } from "../../utils/common/helper";

export default function BookingSummaryCard({
  title,
  value,
  subtitle,
  icon,
  badgeText,
  iconWrapperClasses,
  badgeClasses,
  onClick,
}) {
  const cardClasses =
    "rounded-[30px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:border-[#12dfff]/12";

  const iconContainerClasses = joinClasses(
    "flex h-14 w-14 items-center justify-center rounded-2xl",
    iconWrapperClasses
  );

  const badgeTextClasses = joinClasses(
    "text-[12px] font-semibold uppercase tracking-[0.10em]",
    badgeClasses
  );

  return (
    <button type="button" onClick={onClick} className={cardClasses}>
      <div className="flex items-start justify-between gap-4">
        <div className={iconContainerClasses}>{icon}</div>
        <div className={badgeTextClasses}>{badgeText}</div>
      </div>

      <div className="mt-6">
        <p className="text-[15px] text-white/60">{title}</p>
        <p className="mt-2 text-[34px] font-semibold tracking-[-0.05em] text-white">
          {value}
        </p>
        <p className="mt-1 text-[14px] text-white/50">{subtitle}</p>
      </div>
    </button>
  );
}