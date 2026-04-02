import React from "react";
import { TimerReset, Wallet, Wrench, Bolt } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";

export default function DashboardStatCard({ card, onClick }) {
  const iconWrapperClasses =
    card.iconType === "booking" || card.iconType === "energy"
      ? "bg-[#0c4f68]/45"
      : card.iconType === "wallet"
      ? "bg-[#154c42]/45"
      : "bg-[#5a4124]/45";

  const iconColorClasses =
    card.iconType === "booking" || card.iconType === "energy"
      ? "text-[#12dfff]"
      : card.iconType === "wallet"
      ? "text-[#35d3a4]"
      : "text-[#f0a43b]";

  const badgeClasses =
    card.iconType === "maintenance"
      ? "text-[#f0a43b] bg-[#f0a43b]/12"
      : "text-[#12dfff] bg-[#12dfff]/10";

  return (
    <button
      onClick={() => onClick(card.title)}
      className="rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.20)] transition hover:border-[#12dfff]/12"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={joinClasses("flex h-14 w-14 items-center justify-center rounded-full", iconWrapperClasses)}>
          {card.iconType === "booking" ? (
            <TimerReset className={joinClasses("h-6 w-6", iconColorClasses)} />
          ) : card.iconType === "wallet" ? (
            <Wallet className={joinClasses("h-6 w-6", iconColorClasses)} />
          ) : card.iconType === "maintenance" ? (
            <Wrench className={joinClasses("h-6 w-6", iconColorClasses)} />
          ) : (
            <Bolt className={joinClasses("h-6 w-6", iconColorClasses)} />
          )}
        </div>

        {card.badgeText ? (
          <div className={joinClasses("rounded-full px-3 py-1 text-[11px] font-semibold", badgeClasses)}>
            {card.badgeText}
          </div>
        ) : null}
      </div>

      <div className="mt-5 text-[15px] text-white/60">{card.title}</div>
      <div className="mt-2 text-[28px] font-semibold tracking-[-0.05em] text-white">
        {card.value}
      </div>
    </button>
  );
}
