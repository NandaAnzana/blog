export function formatDate(date: string): string {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(newDate);
  return formattedDate;
}
