import React from "react";
import { CheckCircle2, TriangleAlert, CircleX } from "lucide-react";

export function getHardwareCardPresentation(statusTone) {
  if (statusTone === "optimal") {
    return {
      badgeClasses: "bg-[#15d79d]/10 text-[#22e2aa]",
      iconWrapperClasses: "bg-[#103d34]/55",
      iconClasses: "text-[#22e2aa]",
      hoverBorderClasses: "hover:border-[#22e2aa]/20",
    };
  }

  if (statusTone === "warning") {
    return {
      badgeClasses: "bg-[#f0ae3e]/12 text-[#f0ae3e]",
      iconWrapperClasses: "bg-[#493b1f]/55",
      iconClasses: "text-[#f0ae3e]",
      hoverBorderClasses: "hover:border-[#f0ae3e]/18",
    };
  }

  return {
    badgeClasses: "bg-[#ff545d]/10 text-[#ff545d]",
    iconWrapperClasses: "bg-[#40252b]/55",
    iconClasses: "text-[#ff545d]",
    hoverBorderClasses: "hover:border-[#ff545d]/18",
  };
}

export function getDiagnosticStatusPresentation(status) {
  if (status === "passed") {
    return {
      text: "Passed",
      textClasses: "text-[#21df9f]",
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-[#21df9f]" />,
    };
  }

  if (status === "degraded") {
    return {
      text: "Degraded",
      textClasses: "text-[#f0ae3e]",
      icon: <TriangleAlert className="h-4.5 w-4.5 text-[#f0ae3e]" />,
    };
  }

  return {
    text: "Failed",
    textClasses: "text-[#ff545d]",
    icon: <CircleX className="h-4.5 w-4.5 text-[#ff545d]" />,
  };
}
