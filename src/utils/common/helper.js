export function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}


export function createToastHandler(setToastMessage, duration = 2200) {
  let timeoutId = null;

  return function showToast(message) {
    setToastMessage(message);
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, duration);
  };
}




export function formatDateLabel(dateTimeString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateTimeString));
}


export function formatDateShortLabel(dateTimeString) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateTimeString));
}


export function formatTimeRangeLabel(startDateTimeString, endDateTimeString) {
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${timeFormatter.format(new Date(startDateTimeString))} - ${timeFormatter.format(
    new Date(endDateTimeString)
  )}`;
}


export function formatTimeLabel(dateTimeString) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateTimeString));
}


export function formatCurrentDate() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}


export function getCurrentMonthName() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date());
}


export function getCurrentYearValue() {
  return new Date().getFullYear();
}


export function formatCurrentTimeLabel() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}


export function getFutureTaskDate(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  return {
    monthLabel: new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(date)
      .toUpperCase(),
    dayLabel: String(date.getDate()).padStart(2, "0"),
  };
}


export function getIsoDateTimePlusDays(daysToAdd = 0, hour = 12, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}




export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}




export function downloadTextFile(fileName, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const fileUrl = URL.createObjectURL(blob);
  const linkElement = document.createElement("a");

  linkElement.href = fileUrl;
  linkElement.setAttribute("download", fileName);
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);

  URL.revokeObjectURL(fileUrl);
}


export function downloadCsvFile(fileName, headers, rows) {
  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");

  const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(csvBlob);
  const temporaryLink = document.createElement("a");

  temporaryLink.href = downloadUrl;
  temporaryLink.setAttribute("download", fileName);
  document.body.appendChild(temporaryLink);
  temporaryLink.click();
  document.body.removeChild(temporaryLink);
  URL.revokeObjectURL(downloadUrl);
}
