export function roundTo(amount: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(amount * factor) / factor;
}

export function safeNumber(input: unknown, fallback = 0): number {
  if (typeof input === "number" && Number.isFinite(input)) {
    return input;
  }

  if (typeof input === "string" && input.trim() !== "") {
    const parsed = Number(input);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}
