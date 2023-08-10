export function parseTime(date) {
  if (!(date instanceof Date && !isNaN(date.getTime()))) {
    return "Invalid Date";
  }
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
