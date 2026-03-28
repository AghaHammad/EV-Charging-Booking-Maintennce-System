import React from "react";
import { Zap, Check, X } from "lucide-react";

export function getStatusBadgeClasses(status) {
  if (status === "upcoming") {
    return "bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/18";
  }
  if (status === "completed") {
    return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/18";
  }
  return "bg-rose-500/10 text-rose-400 border border-rose-500/18";
}

export function getStatusLabel(status) {
  if (status === "upcoming") return "UPCOMING";
  if (status === "completed") return "COMPLETED";
  return "CANCELED";
}

export function getRowIconByStatus(status) {
  if (status === "upcoming") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0c4a60]/50">
        <Zap className="h-5 w-5 text-[#00d2ff]" />
      </div>
    );
  }
  if (status === "completed") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f2d47]/55">
        <Check className="h-5 w-5 text-[#8d9ab2]" />
      </div>
    );
  }
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#20284a]/55">
      <X className="h-5 w-5 text-[#8d9ab2]" />
    </div>
  );
}
