import type { DashboardRangeType } from "@ordella/validation";

export type ResolvedDateRange = {
  start: Date;
  end: Date;
};

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}

function endOfUtcDay(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999),
  );
}

function parseIsoDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getDateRange(
  type: DashboardRangeType,
  customStart?: string,
  customEnd?: string,
): ResolvedDateRange | null {
  const now = new Date();
  const todayStart = startOfUtcDay(now);
  const todayEnd = endOfUtcDay(now);

  switch (type) {
    case "today":
      return { start: todayStart, end: todayEnd };
    case "yesterday": {
      const yesterday = new Date(todayStart);
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      return { start: startOfUtcDay(yesterday), end: endOfUtcDay(yesterday) };
    }
    case "last_7_days": {
      const start = new Date(todayStart);
      start.setUTCDate(start.getUTCDate() - 6);
      return { start, end: todayEnd };
    }
    case "last_30_days": {
      const start = new Date(todayStart);
      start.setUTCDate(start.getUTCDate() - 29);
      return { start, end: todayEnd };
    }
    case "this_month": {
      const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
      return { start, end: todayEnd };
    }
    case "last_month": {
      const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
      const end = endOfUtcDay(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0)));
      return { start, end };
    }
    case "custom": {
      if (!customStart || !customEnd) {
        return null;
      }

      const startDate = parseIsoDate(customStart);
      const endDate = parseIsoDate(customEnd);
      if (!startDate || !endDate) {
        return null;
      }

      const start = startOfUtcDay(startDate);
      const end = endOfUtcDay(endDate);
      if (start > end) {
        return null;
      }

      return { start, end };
    }
    default:
      return null;
  }
}

export function toIsoDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}
