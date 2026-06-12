export type ReminderOffsetUnit = "minutes" | "hours" | "days";

export function formatReminderOffset(offsetMinutes: number): string {
  if (offsetMinutes % 1440 === 0) {
    const days = offsetMinutes / 1440;
    return `${days} day${days === 1 ? "" : "s"} before`;
  }

  if (offsetMinutes % 60 === 0) {
    const hours = offsetMinutes / 60;
    return `${hours} hour${hours === 1 ? "" : "s"} before`;
  }

  return `${offsetMinutes} minute${offsetMinutes === 1 ? "" : "s"} before`;
}

export function offsetMinutesToFormValue(offsetMinutes: number): {
  amount: number;
  unit: ReminderOffsetUnit;
} {
  if (offsetMinutes % 1440 === 0) {
    return { amount: offsetMinutes / 1440, unit: "days" };
  }

  if (offsetMinutes % 60 === 0) {
    return { amount: offsetMinutes / 60, unit: "hours" };
  }

  return { amount: offsetMinutes, unit: "minutes" };
}

export function formValueToOffsetMinutes(amount: number, unit: ReminderOffsetUnit): number {
  if (unit === "hours") {
    return amount * 60;
  }

  if (unit === "days") {
    return amount * 1440;
  }

  return amount;
}
