import React from "react";
import { Search, Bell, Download } from "lucide-react";
import { joinClasses, formatDateShortLabel as formatDateLabel, formatTimeLabel } from "../../utils/common/helper";
import MobileTransactionCard from "./MobileTransactionCard";
import { formatAmountCell, getPaymentMethodDotClasses } from "./utils";

export default function TransactionsList({
  filteredTransactions,
  invoiceSearchText,
  setInvoiceSearchText,
  activeTimeFilter,
  handleTimeFilterClick,
  handleOpenTransactionClick,
  handleOpenAmountClick,
  handleOpenMethodClick,
  handleDownloadInvoiceClick,
  handleLoadMoreHistoryClick,
  showToast,
  currentMonthName,
  currentYearValue,
}) {
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <div className="relative w-full max-w-[340px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
          <input
            value={invoiceSearchText}
            onChange={(event) => setInvoiceSearchText(event.target.value)}
            placeholder="Search invoices..."
            className="h-[46px] w-full rounded-[18px] border border-white/6 bg-[#102535] pl-12 pr-4 text-[15px] text-white outline-none placeholder:text-white/28 focus:border-[#12dfff]/20"
          />
        </div>

        <button
          onClick={() => showToast("Notifications clicked")}
          className="flex h-[46px] w-[46px] items-center justify-center rounded-[16px] bg-[#102535] text-white/75"
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-hidden rounded-[34px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 border-b border-white/5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
            Transaction History
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTimeFilterClick}
              className="rounded-[14px] bg-[#22304f] px-4 py-2 text-[15px] text-white/90"
            >
              {activeTimeFilter === "all"
                ? "All Time"
                : activeTimeFilter === "month"
                ? currentMonthName
                : currentYearValue}
            </button>

            <button
              onClick={handleTimeFilterClick}
              className="rounded-[14px] bg-[#22304f] px-4 py-2 text-[15px] text-white/90"
            >
              Filter
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-[1.2fr_1.4fr_0.9fr_0.9fr_70px] border-b border-white/5 px-7 py-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
            <div>Date & Time</div>
            <div>Station</div>
            <div>Amount</div>
            <div>Method</div>
            <div>Invoice</div>
          </div>

          <div>
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[1.2fr_1.4fr_0.9fr_0.9fr_70px] items-center border-b border-white/[0.04] px-7 py-6"
              >
                <button
                  onClick={() => handleOpenTransactionClick(transaction)}
                  className="text-left"
                >
                  <div className="text-[16px] font-semibold text-white">
                    {formatDateLabel(transaction.dateTime)}
                  </div>
                  <div className="mt-1 text-[14px] text-white/40">
                    {formatTimeLabel(transaction.dateTime)}
                  </div>
                </button>

                <button
                  onClick={() => handleOpenTransactionClick(transaction)}
                  className="text-left"
                >
                  <div className="text-[16px] font-semibold text-white">
                    {transaction.stationName}
                  </div>
                  <div className="mt-1 text-[14px] text-white/40">
                    {transaction.stationMeta}
                  </div>
                </button>

                <button
                  onClick={() => handleOpenAmountClick(transaction)}
                  className="text-left"
                >
                  <div
                    className={joinClasses(
                      "text-[16px] font-semibold",
                      transaction.transactionType === "credit"
                        ? "text-[#35d3a4]"
                        : "text-white"
                    )}
                  >
                    {formatAmountCell(transaction.amount, transaction.transactionType)}
                  </div>
                  <div className="mt-1 text-[14px] text-white/40">
                    {transaction.energyText}
                  </div>
                </button>

                <button
                  onClick={() => handleOpenMethodClick(transaction)}
                  className="flex items-center gap-3 text-left"
                >
                  <span
                    className={joinClasses(
                      "h-2.5 w-2.5 rounded-full",
                      getPaymentMethodDotClasses(transaction.paymentMethodTone)
                    )}
                  />
                  <span className="text-[15px] text-white/86">{transaction.paymentMethod}</span>
                </button>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleDownloadInvoiceClick(transaction)}
                    className="rounded-xl p-2 text-white/45 transition hover:bg-white/[0.03] hover:text-white/80"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 p-4 lg:hidden">
          {filteredTransactions.map((transaction) => (
            <MobileTransactionCard
              key={transaction.id}
              transaction={transaction}
              onOpenTransaction={handleOpenTransactionClick}
              onOpenAmount={handleOpenAmountClick}
              onOpenMethod={handleOpenMethodClick}
              onDownloadInvoice={handleDownloadInvoiceClick}
            />
          ))}
        </div>

        <div className="flex justify-center border-t border-white/5 px-6 py-6">
          <button
            onClick={handleLoadMoreHistoryClick}
            className="text-[16px] font-semibold text-white/72 transition hover:text-white"
          >
            Load More History
          </button>
        </div>
      </div>
    </>
  );
}
