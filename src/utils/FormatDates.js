export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  const amPm = date.getHours() >= 12 ? "PM" : "AM";
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  let fullDate =
    formattedDate +
    " " +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    "" +
    amPm;
  fullDate = fullDate?.split(",");
  let fullDatesss = fullDate[1]?.split(" ");
  if (fullDatesss) {
    fullDate = fullDate?.[0];
    fullDate = fullDate + " " + fullDatesss[fullDatesss?.length - 1];
  }
  return fullDate || "";
}
