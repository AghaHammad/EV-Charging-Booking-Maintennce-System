import React from "react";
import { Search, Bell, Download } from "lucide-react";
import {
  joinClasses,
  formatDateShortLabel,
  formatTimeLabel,
} from "../../utils/common/helper";
import MobileTransactionCard from "./MobileTransactionCard";
import { formatAmountCell, getPaymentMethodDotClasses } from "./Utils";

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
  const filterLabel =
    activeTimeFilter === "all"
      ? "All Time"
      : activeTimeFilter === "month"
      ? currentMonthName
      : currentYearValue;

  const hasTransactions = filteredTransactions.length > 0;

  return (
    <section className="min-w-0">
      
      
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="relative w-full sm:max-w-[320px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={invoiceSearchText}
            onChange={(e) => setInvoiceSearchText(e.target.value)}
            placeholder="Search transactions..."
            className="h-11 w-full rounded-[14px] border border-white/8 bg-[#102535] pl-10 pr-4 text-[14px] text-white"
          />
        </div>

        <button
          onClick={() => showToast("Notifications clicked")}
          className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#102535] text-white/75"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(16,42,56,0.96),rgba(12,34,46,0.98))]">
        
       
        <div className="flex justify-between border-b border-white/5 px-6 py-5">
          <h2 className="text-[20px] font-semibold text-white">
            Transaction History
          </h2>

          <button
            onClick={handleTimeFilterClick}
            className="rounded-[12px] bg-[#22304f] px-3 py-2 text-[13px] text-white"
          >
            {filterLabel}
          </button>
        </div>

       
        <div className="grid gap-4 p-4 md:hidden">
          {hasTransactions ? (
            filteredTransactions.map((transaction) => (
              <MobileTransactionCard
                key={transaction.id}
                transaction={transaction}
                onOpenTransaction={handleOpenTransactionClick}
                onOpenAmount={handleOpenAmountClick}
                onOpenMethod={handleOpenMethodClick}
                onDownloadInvoice={handleDownloadInvoiceClick}
              />
            ))
          ) : (
            <div className="text-center text-white/45">
              No transactions found.
            </div>
          )}
        </div>

        
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            
           
            <thead className="border-b border-white/5 text-[12px] uppercase text-white/40">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Station</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4 text-right">Invoice</th>
              </tr>
            </thead>

            
            <tbody>
              {hasTransactions ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-white/[0.04]"
                  >
                   
                    <td
                      onClick={() => handleOpenTransactionClick(transaction)}
                      className="px-6 py-5 cursor-pointer"
                    >
                      <p className="font-semibold text-white">
                        {formatDateShortLabel(transaction.dateTime)}
                      </p>
                      <p className="text-sm text-white/40">
                        {formatTimeLabel(transaction.dateTime)}
                      </p>
                    </td>

                    
                    <td
                      onClick={() => handleOpenTransactionClick(transaction)}
                      className="px-6 py-5 cursor-pointer"
                    >
                      <p className="font-semibold text-white">
                        {transaction.stationName}
                      </p>
                      <p className="text-sm text-white/40">
                        {transaction.stationMeta}
                      </p>
                    </td>

                    
                    <td
                      onClick={() => handleOpenAmountClick(transaction)}
                      className="px-6 py-5 cursor-pointer"
                    >
                      <p
                        className={joinClasses(
                          "font-semibold",
                          transaction.transactionType === "credit"
                            ? "text-[#35d3a4]"
                            : "text-white"
                        )}
                      >
                        {formatAmountCell(
                          transaction.amount,
                          transaction.transactionType
                        )}
                      </p>
                      <p className="text-sm text-white/40">
                        {transaction.energyText}
                      </p>
                    </td>

                   
                    <td
                      onClick={() => handleOpenMethodClick(transaction)}
                      className="px-6 py-5 cursor-pointer flex items-center gap-2"
                    >
                      <span
                        className={joinClasses(
                          "h-2.5 w-2.5 rounded-full",
                          getPaymentMethodDotClasses(
                            transaction.paymentMethodTone
                          )
                        )}
                      />
                      {transaction.paymentMethod}
                    </td>

                    
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() =>
                          handleDownloadInvoiceClick(transaction)
                        }
                      >
                        <Download className="h-4 w-4 text-white/60" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-white/45">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-center border-t border-white/5 px-6 py-6">
          <button
            onClick={handleLoadMoreHistoryClick}
            className="text-white/70 hover:text-white"
          >
            Load More History
          </button>
        </div>
      </div>
    </section>
  );
}