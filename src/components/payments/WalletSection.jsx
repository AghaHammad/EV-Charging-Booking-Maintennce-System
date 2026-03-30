import React from "react";
import { WalletCards } from "lucide-react";
import { formatCurrency as formatFullCurrency } from "../../utils/common/helper";

export default function WalletSection({
  walletBalance,
  activeWalletStatusText,
  handleTopUpClick,
  handleWithdrawClick,
  showToast,
}) {
  return (
    <div className="mt-8 rounded-[34px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => showToast("Wallet details opened")}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10483f]/45"
        >
          <WalletCards className="h-6 w-6 text-[#35d3a4]" />
        </button>

        <button
          onClick={() => showToast(`Wallet status: ${activeWalletStatusText}`)}
          className="rounded-full bg-[#19d6a8]/10 px-3 py-1 text-[11px] font-semibold text-[#35d3a4]"
        >
          {activeWalletStatusText}
        </button>
      </div>

      <button
        onClick={() => showToast("Wallet balance opened")}
        className="mt-5 block text-left text-[15px] text-white/58"
      >
        Total Wallet Balance
      </button>

      <button
        onClick={() => showToast(formatFullCurrency(walletBalance))}
        className="mt-2 block text-left text-[34px] font-semibold tracking-[-0.05em] text-white"
      >
        {formatFullCurrency(walletBalance)}
      </button>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <button
          onClick={handleTopUpClick}
          className="inline-flex h-14 items-center justify-center rounded-[18px] bg-[#12dfff] px-6 text-[16px] font-semibold text-[#06141b] shadow-[0_16px_30px_rgba(18,223,255,0.22)] transition hover:brightness-105"
        >
          Top Up
        </button>

        <button
          onClick={handleWithdrawClick}
          className="inline-flex h-14 items-center justify-center rounded-[18px] bg-[#22344c] px-6 text-[16px] font-semibold text-white transition hover:bg-[#2c4060]"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
