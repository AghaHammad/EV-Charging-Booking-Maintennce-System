export function getStatusPresentation(status) {
  if (status === "available") {
    return {
      badgeClasses: "bg-[#09dcb0]/12 text-[#0feabf]",
      iconClasses: "text-[#10e8ff] border-[#10e8ff]/20",
      accentClasses: "text-[#0fe8ff]",
      buttonClasses: "bg-[#4a5778] hover:bg-[#5a6789] text-white",
    };
  }

  if (status === "busy") {
    return {
      badgeClasses: "bg-[#f3c63d]/12 text-[#f3c63d]",
      iconClasses: "text-[#f3c63d] border-[#f3c63d]/20",
      accentClasses: "text-[#f3c63d]",
      buttonClasses: "bg-[#4a5778] hover:bg-[#5a6789] text-white",
    };
  }

  return {
    badgeClasses: "bg-[#d94f55]/12 text-[#e65c62]",
    iconClasses: "text-[#e65c62] border-[#e65c62]/20",
    accentClasses: "text-[#e65c62]",
    buttonClasses: "bg-[#333b52] hover:bg-[#434c66] text-white/90",
  };
}

export function getStatusLabel(station) {
  if (station.status === "available") return "AVAILABLE";
  if (station.status === "busy") return `BUSY (${station.busySlots})`;
  return "OFFLINE";
}
