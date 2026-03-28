import React from "react";
import { Download } from "lucide-react";
import { joinClasses, formatDateShortLabel as formatDateLabel, formatTimeLabel } from "../../utils/common/helper";
import { getPaymentMethodDotClasses, formatAmountCell } from "./utils";

export default function MobileTransactionCard({
  transaction,
  onOpenTransaction,
  onOpenAmount,
  onOpenMethod,
  onDownloadInvoice,
}) {
  return (
    <div className="rounded-[24px] border border-white/6 bg-[#102d3b]/65 p-4">
      <div className="flex items-start justify-between gap-4">
        <button onClick={() => onOpenTransaction(transaction)} className="text-left">
          <div className="text-[17px] font-semibold text-white">
            {transaction.stationName}
          </div>
          <div className="mt-1 text-[14px] text-white/42">{transaction.stationMeta}</div>
        </button>

        <button
          onClick={() => onDownloadInvoice(transaction)}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-2 text-white/70"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <button onClick={() => onOpenTransaction(transaction)} className="text-left">
          <div className="text-[12px] uppercase tracking-[0.12em] text-white/38">
            Date & Time
          </div>
          <div className="mt-2 text-[15px] text-white">
            {formatDateLabel(transaction.dateTime)}
          </div>
          <div className="mt-1 text-[14px] text-white/44">
            {formatTimeLabel(transaction.dateTime)}
          </div>
        </button>

        <button onClick={() => onOpenAmount(transaction)} className="text-left">
          <div className="text-[12px] uppercase tracking-[0.12em] text-white/38">
            Amount
          </div>
          <div
            className={joinClasses(
              "mt-2 text-[18px] font-semibold",
              transaction.transactionType === "credit" ? "text-[#35d3a4]" : "text-white"
            )}
          >
            {formatAmountCell(transaction.amount, transaction.transactionType)}
          </div>
          <div className="mt-1 text-[14px] text-white/44">{transaction.energyText}</div>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button onClick={() => onOpenMethod(transaction)} className="flex items-center gap-3 text-left">
          <span
            className={joinClasses(
              "h-2.5 w-2.5 rounded-full",
              getPaymentMethodDotClasses(transaction.paymentMethodTone)
            )}
          />
          <span className="text-[15px] text-white/86">{transaction.paymentMethod}</span>
        </button>

        <button
          onClick={() => onDownloadInvoice(transaction)}
          className="text-[13px] text-white/36"
        >
          {transaction.invoiceLabel}
        </button>
      </div>
    </div>
  );
}
