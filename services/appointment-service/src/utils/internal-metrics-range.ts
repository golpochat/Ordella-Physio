export function parseInternalMetricsRange(
  start: string | undefined,
  end: string | undefined,
): { start: Date; end: Date } | null {
  if (!start?.trim() || !end?.trim()) {
    return null;
  }

  const rangeStart = new Date(`${start.trim()}T00:00:00.000Z`);
  const rangeEnd = new Date(`${end.trim()}T23:59:59.999Z`);

  if (Number.isNaN(rangeStart.getTime()) || Number.isNaN(rangeEnd.getTime())) {
    return null;
  }

  if (rangeStart > rangeEnd) {
    return null;
  }

  return { start: rangeStart, end: rangeEnd };
}
