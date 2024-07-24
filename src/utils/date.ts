export function formatDate(dateRow: Date) {
  const date = new Date(dateRow);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const shortMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return `${hours}:${minutes}:${seconds}, ${day} ${shortMonthNames[month]}, ${year}`;
}
