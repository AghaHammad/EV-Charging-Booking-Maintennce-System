import React, { useMemo, useState } from "react";
import {
  Search,
  Bell,
  WalletCards,
  Plus,
  Filter,
  Download,
  Smartphone,
  Trash2,
  CreditCard,
} from "lucide-react";

const initialSavedMethods = [
  {
    id: 1,
    type: "visa",
    displayName: "•••• 4242",
    subtitle: "Expires 12/26",
    isPrimary: true,
  },
  {
    id: 2,
    type: "mastercard",
    displayName: "•••• 8812",
    subtitle: "Expires 08/25",
    isPrimary: false,
  },
  {
    id: 3,
    type: "applepay",
    displayName: "Apple Pay",
    subtitle: "Connected",
    isPrimary: false,
  },
];

const initialTransactions = [
  {
    id: 1,
    dateTime: "2024-06-14T14:20:00",
    stationName: "Airport FastCharge",
    stationMeta: "Supercharger #4",
    amount: 18.4,
    energyText: "55 kWh",
    paymentMethod: "Wallet",
    paymentMethodTone: "wallet",
    invoiceLabel: "INV-1001",
    invoiceAvailable: true,
    transactionType: "charge",
  },
  {
    id: 2,
    dateTime: "2024-06-10T09:15:00",
    stationName: "City Mall Level 2",
    stationMeta: "Wallbox #12",
    amount: 8.25,
    energyText: "22 kWh",
    paymentMethod: "Visa ••42",
    paymentMethodTone: "card",
    invoiceLabel: "INV-1002",
    invoiceAvailable: true,
    transactionType: "charge",
  },
  {
    id: 3,
    dateTime: "2024-06-05T18:45:00",
    stationName: "Potsdamer Plaza",
    stationMeta: "Rapid #2",
    amount: 12.5,
    energyText: "38 kWh",
    paymentMethod: "Wallet",
    paymentMethodTone: "wallet",
    invoiceLabel: "INV-1003",
    invoiceAvailable: true,
    transactionType: "charge",
  },
  {
    id: 4,
    dateTime: "2024-06-01T12:00:00",
    stationName: "Loyalty Reward",
    stationMeta: "Monthly Bonus",
    amount: 5,
    energyText: "Credit",
    paymentMethod: "System",
    paymentMethodTone: "system",
    invoiceLabel: "N/A",
    invoiceAvailable: false,
    transactionType: "credit",
  },
  {
    id: 5,
    dateTime: "2024-05-28T14:10:00",
    stationName: "Highway Hub X",
    stationMeta: "UltraFast #1",
    amount: 32.1,
    energyText: "85 kWh",
    paymentMethod: "Apple Pay",
    paymentMethodTone: "card",
    invoiceLabel: "INV-1005",
    invoiceAvailable: true,
    transactionType: "charge",
  },
];

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatFullCurrency(value) {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatAmountCell(value, transactionType) {
  const currencyText = formatFullCurrency(value);
  return transactionType === "credit" ? `+${currencyText}` : currencyText;
}

function formatDateLabel(dateTimeString) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateTimeString));
}

function formatTimeLabel(dateTimeString) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateTimeString));
}

function getCurrentMonthName() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date());
}

function getCurrentYearValue() {
  return new Date().getFullYear();
}

function getCurrentIsoDateTimePlusDays(daysToAdd = 0, hour = 12, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

function getSavedMethodVisual(type) {
  if (type === "visa") {
    return {
      wrapperClasses: "bg-[#2c3b57]",
      label: "VISA",
      labelClasses: "text-[14px] font-bold text-white",
    };
  }

  if (type === "mastercard") {
    return {
      wrapperClasses: "bg-[#2f3a4d]",
      label: "MASTERCARD",
      labelClasses: "text-[10px] font-bold uppercase text-white/80 tracking-[0.06em]",
    };
  }

  return {
    wrapperClasses: "bg-[#0b4a61]/60",
    icon: <Smartphone className="h-5 w-5 text-[#28ccff]" />,
  };
}

function getPaymentMethodDotClasses(paymentMethodTone) {
  if (paymentMethodTone === "wallet") return "bg-[#30d3ff]";
  if (paymentMethodTone === "system") return "bg-[#2fd8b0]";
  return "bg-[#7f8ba7]";
}

function SavedMethodCard({
  method,
  onCardClick,
  onSetPrimaryClick,
  onDeleteClick,
}) {
  const visual = getSavedMethodVisual(method.type);

  return (
    <div className="rounded-[22px] border border-white/6 bg-[linear-gradient(180deg,rgba(14,37,50,0.96),rgba(11,30,42,0.98))] px-4 py-5 transition hover:border-[#12dfff]/12">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onCardClick(method)}
          className="flex min-w-0 flex-1 items-center gap-4 text-left"
        >
          <div
            className={joinClasses(
              "flex h-9 w-14 shrink-0 items-center justify-center rounded-xl",
              visual.wrapperClasses
            )}
          >
            {visual.icon ? <>{visual.icon}</> : <span className={visual.labelClasses}>{visual.label}</span>}
          </div>

          <div className="min-w-0">
            <div className="truncate text-[16px] font-semibold text-white">
              {method.displayName}
            </div>
            <div className="mt-1 text-[13px] text-white/44">{method.subtitle}</div>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {method.isPrimary ? (
            <button
              onClick={() => onCardClick(method)}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-[12px] text-white/52"
            >
              Primary
            </button>
          ) : (
            <button
              onClick={() => onSetPrimaryClick(method)}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-white/72 transition hover:bg-white/[0.05]"
            >
              Set Primary
            </button>
          )}

          <button
            onClick={() => onDeleteClick(method)}
            className="rounded-xl p-2 text-white/40 transition hover:bg-white/[0.03] hover:text-white/80"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileTransactionCard({
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

export default function Payments() {
  const [walletBalance, setWalletBalance] = useState(2450.8);
  const [savedMethods, setSavedMethods] = useState(initialSavedMethods);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [invoiceSearchText, setInvoiceSearchText] = useState("");
  const [activeTimeFilter, setActiveTimeFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState("");

  const currentMonthName = getCurrentMonthName();
  const currentYearValue = getCurrentYearValue();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchValue = invoiceSearchText.toLowerCase();

      const matchesSearch =
        transaction.stationName.toLowerCase().includes(searchValue) ||
        transaction.stationMeta.toLowerCase().includes(searchValue) ||
        transaction.paymentMethod.toLowerCase().includes(searchValue) ||
        transaction.invoiceLabel.toLowerCase().includes(searchValue);

      const transactionDate = new Date(transaction.dateTime);
      const currentDate = new Date();

      let matchesTimeFilter = true;

      if (activeTimeFilter === "month") {
        matchesTimeFilter =
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear();
      }

      if (activeTimeFilter === "year") {
        matchesTimeFilter =
          transactionDate.getFullYear() === currentDate.getFullYear();
      }

      return matchesSearch && matchesTimeFilter;
    });
  }, [transactions, invoiceSearchText, activeTimeFilter]);

  const activeWalletStatusText = "ACTIVE";

  const downloadTextFile = (fileName, content) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const fileUrl = URL.createObjectURL(blob);
    const linkElement = document.createElement("a");

    linkElement.href = fileUrl;
    linkElement.setAttribute("download", fileName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);

    URL.revokeObjectURL(fileUrl);
  };

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);
  };

  const handleTopUpClick = () => {
    const topUpAmount = 50;
    const nextDateTime = getCurrentIsoDateTimePlusDays(0, 11, 30);

    setWalletBalance((previousBalance) => previousBalance + topUpAmount);

    setTransactions((previousTransactions) => [
      {
        id: previousTransactions.length + 1,
        dateTime: nextDateTime,
        stationName: "Wallet Top Up",
        stationMeta: `${currentMonthName} ${currentYearValue}`,
        amount: topUpAmount,
        energyText: "Balance Credit",
        paymentMethod: "System",
        paymentMethodTone: "system",
        invoiceLabel: "N/A",
        invoiceAvailable: false,
        transactionType: "credit",
      },
      ...previousTransactions,
    ]);

    showToast("Wallet topped up");
  };

  const handleWithdrawClick = () => {
    const withdrawAmount = 25;

    if (walletBalance < withdrawAmount) {
      showToast("Insufficient wallet balance");
      return;
    }

    const nextDateTime = getCurrentIsoDateTimePlusDays(0, 13, 15);

    setWalletBalance((previousBalance) => previousBalance - withdrawAmount);

    setTransactions((previousTransactions) => [
      {
        id: previousTransactions.length + 1,
        dateTime: nextDateTime,
        stationName: "Wallet Withdrawal",
        stationMeta: `${currentMonthName} ${currentYearValue}`,
        amount: withdrawAmount,
        energyText: "Wallet Debit",
        paymentMethod: "Wallet",
        paymentMethodTone: "wallet",
        invoiceLabel: "INV-WD-" + String(previousTransactions.length + 1).padStart(3, "0"),
        invoiceAvailable: true,
        transactionType: "charge",
      },
      ...previousTransactions,
    ]);

    showToast("Withdrawal completed");
  };

  const handleAddNewMethodClick = () => {
    const newMethodId = savedMethods.length + 1;

    const nextMethod =
      newMethodId % 3 === 1
        ? {
            id: newMethodId,
            type: "visa",
            displayName: `•••• ${4200 + newMethodId}`,
            subtitle: `Expires 0${(newMethodId % 9) + 1}/27`,
            isPrimary: false,
          }
        : newMethodId % 3 === 2
        ? {
            id: newMethodId,
            type: "mastercard",
            displayName: `•••• ${8800 + newMethodId}`,
            subtitle: `Expires 0${(newMethodId % 9) + 1}/26`,
            isPrimary: false,
          }
        : {
            id: newMethodId,
            type: "applepay",
            displayName: "Apple Pay",
            subtitle: "Connected",
            isPrimary: false,
          };

    setSavedMethods((previousMethods) => [...previousMethods, nextMethod]);
    showToast("New payment method added");
  };

  const handleSavedMethodCardClick = (method) => {
    showToast(`${method.displayName} opened`);
  };

  const handleSetPrimaryMethodClick = (method) => {
    setSavedMethods((previousMethods) =>
      previousMethods.map((item) => ({
        ...item,
        isPrimary: item.id === method.id,
      }))
    );

    showToast(`${method.displayName} set as primary`);
  };

  const handleDeleteMethodClick = (method) => {
    if (savedMethods.length === 1) {
      showToast("At least one payment method is required");
      return;
    }

    const methodWasPrimary = method.isPrimary;

    const updatedMethods = savedMethods.filter((item) => item.id !== method.id);

    if (methodWasPrimary && updatedMethods.length > 0) {
      updatedMethods[0] = {
        ...updatedMethods[0],
        isPrimary: true,
      };
    }

    setSavedMethods(updatedMethods);
    showToast(`${method.displayName} removed`);
  };

  const handleTimeFilterClick = () => {
    const filterOrder = ["all", "month", "year"];
    const currentFilterIndex = filterOrder.indexOf(activeTimeFilter);
    const nextFilter = filterOrder[(currentFilterIndex + 1) % filterOrder.length];

    setActiveTimeFilter(nextFilter);
    showToast(`Filter changed to ${nextFilter}`);
  };

  const handleOpenTransactionClick = (transaction) => {
    showToast(`${transaction.stationName} opened`);
  };

  const handleOpenAmountClick = (transaction) => {
    showToast(`${formatAmountCell(transaction.amount, transaction.transactionType)} opened`);
  };

  const handleOpenMethodClick = (transaction) => {
    showToast(`${transaction.paymentMethod} opened`);
  };

  const handleDownloadInvoiceClick = (transaction) => {
    if (!transaction.invoiceAvailable) {
      showToast("No invoice available");
      return;
    }

    const invoiceContent = `
Invoice: ${transaction.invoiceLabel}
Date: ${formatDateLabel(transaction.dateTime)}
Time: ${formatTimeLabel(transaction.dateTime)}
Station: ${transaction.stationName}
Details: ${transaction.stationMeta}
Amount: ${formatAmountCell(transaction.amount, transaction.transactionType)}
Method: ${transaction.paymentMethod}
Energy: ${transaction.energyText}
`.trim();

    downloadTextFile(`${transaction.invoiceLabel}.txt`, invoiceContent);
    showToast(`${transaction.invoiceLabel} downloaded`);
  };

  const handleLoadMoreHistoryClick = () => {
    const nextIndex = transactions.length + 1;
    const nextDateTime = getCurrentIsoDateTimePlusDays(-(nextIndex + 2), 15, 10);

    const nextTransaction = {
      id: nextIndex,
      dateTime: nextDateTime,
      stationName: `New Charge ${nextIndex}`,
      stationMeta: `Station #${nextIndex}`,
      amount: Number((12 + nextIndex * 1.35).toFixed(2)),
      energyText: `${20 + nextIndex} kWh`,
      paymentMethod: nextIndex % 2 === 0 ? "Wallet" : "Visa ••42",
      paymentMethodTone: nextIndex % 2 === 0 ? "wallet" : "card",
      invoiceLabel: `INV-${1000 + nextIndex}`,
      invoiceAvailable: true,
      transactionType: "charge",
    };

    setTransactions((previousTransactions) => [...previousTransactions, nextTransaction]);
    showToast("More history loaded");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden text-white">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        
        <section className="order-2 min-w-0 xl:order-1">
          <div>
            <h1 className="text-[36px] font-semibold tracking-[-0.05em] text-white sm:text-[44px]">
              Payments
            </h1>
            <p className="mt-2 text-[18px] text-white/56">
              Manage your wallet and review transaction history
            </p>
          </div>

          
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

          
          <div className="mt-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-white">
                Saved Methods
              </h2>

              <button
                onClick={handleAddNewMethodClick}
                className="text-[16px] font-medium text-[#12dfff]"
              >
                Add New
              </button>
            </div>

            <div className="space-y-4">
              {savedMethods.map((method) => (
                <SavedMethodCard
                  key={method.id}
                  method={method}
                  onCardClick={handleSavedMethodCardClick}
                  onSetPrimaryClick={handleSetPrimaryMethodClick}
                  onDeleteClick={handleDeleteMethodClick}
                />
              ))}
            </div>
          </div>
        </section>

        
        <section className="order-1 min-w-0 xl:order-2">
         
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
        </section>
      </div>

     
      <div
        className={joinClasses(
          "pointer-events-none fixed bottom-5 right-5 z-[100] rounded-2xl border border-[#10e8ff]/15 bg-[#0c2230]/95 px-4 py-3 text-[14px] text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition",
          toastMessage ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        {toastMessage}
      </div>
    </div>
  );
}
