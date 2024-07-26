export function formatDate(dateRow: Date) {
  const date = new Date(dateRow);
  const time = date.toLocaleString().split(" ")[1];
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
  return `${time}, ${day} ${shortMonthNames[month]}, ${year}`;
}
