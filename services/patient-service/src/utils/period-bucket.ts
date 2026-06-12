export type ReportGroupBy = "day" | "week" | "month";

export function toPeriodKey(date: Date, groupBy: ReportGroupBy): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  if (groupBy === "day") {
    return `${year}-${month}-${day}`;
  }

  if (groupBy === "month") {
    return `${year}-${month}`;
  }

  const week = getIsoWeek(date);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

export function listPeriodKeys(
  start: Date,
  end: Date,
  groupBy: ReportGroupBy,
): string[] {
  const keys: string[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const key = toPeriodKey(cursor, groupBy);
    if (!keys.includes(key)) {
      keys.push(key);
    }

    if (groupBy === "day") {
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    } else if (groupBy === "week") {
      cursor.setUTCDate(cursor.getUTCDate() + 7);
    } else {
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
  }

  return keys;
}

function getIsoWeek(date: Date): number {
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
