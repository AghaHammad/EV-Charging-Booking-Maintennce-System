import React from "react";
import { Download } from "lucide-react";
import {
  joinClasses,
  formatDateShortLabel,
  formatTimeLabel,
} from "../../utils/common/helper";
import { getPaymentMethodDotClasses, formatAmountCell } from "./utils";

export default function MobileTransactionCard({
  transaction,
  onOpenTransaction,
  onOpenAmount,
  onOpenMethod,
  onDownloadInvoice,
}) {
  const amountClasses = joinClasses(
    "mt-1 text-[17px] font-semibold",
    transaction.transactionType === "credit" ? "text-[#35d3a4]" : "text-white"
  );

  return (
    <div className="rounded-[20px] border border-white/6 bg-[#102d3b]/65 p-4">
      <div className="flex items-start justify-between gap-3">
        <div
          onClick={() => onOpenTransaction(transaction)}
          className="min-w-0 cursor-pointer"
        >
          <p className="truncate text-[16px] font-semibold text-white">
            {transaction.stationName}
          </p>
          <p className="mt-1 truncate text-[13px] text-white/42">
            {transaction.stationMeta}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDownloadInvoice(transaction)}
          className="shrink-0 rounded-xl border border-white/10 bg-white/[0.02] p-2 text-white/70"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div
          onClick={() => onOpenTransaction(transaction)}
          className="min-w-0 cursor-pointer"
        >
          <p className="text-[11px] uppercase tracking-[0.10em] text-white/38">
            Date
          </p>
          <p className="mt-1 text-[14px] text-white">
            {formatDateShortLabel(transaction.dateTime)}
          </p>
          <p className="mt-1 text-[13px] text-white/44">
            {formatTimeLabel(transaction.dateTime)}
          </p>
        </div>

        <div
          onClick={() => onOpenAmount(transaction)}
          className="min-w-0 cursor-pointer"
        >
          <p className="text-[11px] uppercase tracking-[0.10em] text-white/38">
            Amount
          </p>
          <p className={amountClasses}>
            {formatAmountCell(transaction.amount, transaction.transactionType)}
          </p>
          <p className="mt-1 text-[13px] text-white/44">
            {transaction.energyText}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div
          onClick={() => onOpenMethod(transaction)}
          className="flex min-w-0 cursor-pointer items-center gap-2"
        >
          <span
            className={joinClasses(
              "h-2.5 w-2.5 shrink-0 rounded-full",
              getPaymentMethodDotClasses(transaction.paymentMethodTone)
            )}
          />
          <span className="truncate text-[14px] text-white/86">
            {transaction.paymentMethod}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onDownloadInvoice(transaction)}
          className="shrink-0 text-[12px] text-white/36"
        >
          {transaction.invoiceLabel}
        </button>
      </div>
    </div>
  );
}