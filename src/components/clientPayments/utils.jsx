import React from "react";
import { Smartphone } from "lucide-react";
import { formatCurrency } from "../../utils/common/helper";

export function formatAmountCell(amount, transactionType) {
  const formattedAmount = formatCurrency(amount);

  if (transactionType === "credit") {
    return `+${formattedAmount}`;
  }

  return formattedAmount;
}

export function getSavedMethodVisual(type) {
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
      labelClasses:
        "text-[10px] font-bold uppercase tracking-[0.06em] text-white/80",
    };
  }

  return {
    wrapperClasses: "bg-[#0b4a61]/60",
    icon: <Smartphone className="h-5 w-5 text-[#28ccff]" />,
  };
}

export function getPaymentMethodDotClasses(paymentMethodTone) {
  if (paymentMethodTone === "wallet") {
    return "bg-[#30d3ff]";
  }

  if (paymentMethodTone === "system") {
    return "bg-[#2fd8b0]";
  }

  return "bg-[#7f8ba7]";
}