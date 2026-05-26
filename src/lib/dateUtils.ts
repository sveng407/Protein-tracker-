// Dates are always in local time. We parse stored "YYYY-MM-DD" strings with
// T12:00:00 to avoid DST boundary shifts that would roll the date back by one day.

function localISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function today(): string {
  return localISO(new Date());
}

export function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localISO(d);
}

export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return localISO(d);
}
