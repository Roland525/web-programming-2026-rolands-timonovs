export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysUntil(date: string, today = new Date()): number {
  const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const deadline = new Date(`${date}T00:00:00`);
  return Math.round((deadline.getTime() - currentDay.getTime()) / (1000 * 60 * 60 * 24));
}

export function deadlineText(days: number): string {
  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "1 day";
  return `${days} days`;
}
