import React, { useMemo, useState } from "react";
import { joinClasses, getCurrentMonthName, getCurrentYearValue, getIsoDateTimePlusDays as getCurrentIsoDateTimePlusDays, downloadTextFile, formatDateShortLabel as formatDateLabel, formatTimeLabel } from "../../utils/common/helper";
import { SAVED_PAYMENT_METHODS as initialSavedMethods, PAYMENT_TRANSACTIONS as initialTransactions } from "../../data/constants";
import { formatAmountCell } from "../../components/payments/utils";
import SavedMethodCard from "../../components/payments/SavedMethodCard";
import WalletSection from "../../components/payments/WalletSection";
import TransactionsList from "../../components/payments/TransactionsList";

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

          <WalletSection
            walletBalance={walletBalance}
            activeWalletStatusText={activeWalletStatusText}
            handleTopUpClick={handleTopUpClick}
            handleWithdrawClick={handleWithdrawClick}
            showToast={showToast}
          />

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
          <TransactionsList
            filteredTransactions={filteredTransactions}
            invoiceSearchText={invoiceSearchText}
            setInvoiceSearchText={setInvoiceSearchText}
            activeTimeFilter={activeTimeFilter}
            handleTimeFilterClick={handleTimeFilterClick}
            handleOpenTransactionClick={handleOpenTransactionClick}
            handleOpenAmountClick={handleOpenAmountClick}
            handleOpenMethodClick={handleOpenMethodClick}
            handleDownloadInvoiceClick={handleDownloadInvoiceClick}
            handleLoadMoreHistoryClick={handleLoadMoreHistoryClick}
            showToast={showToast}
            currentMonthName={currentMonthName}
            currentYearValue={currentYearValue}
          />
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
