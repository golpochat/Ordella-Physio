export function validateLocalizationTimezone(value: string): string | null {
  if (!value) {
    return "Timezone is required";
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return null;
  } catch {
    return "Timezone is required";
  }
}

export function validateLocalizationCurrency(value: string): string | null {
  if (!value) {
    return "Currency is required";
  }
  if (!/^[A-Z]{3}$/.test(value)) {
    return "Currency is required";
  }
  return null;
}

export function validateLocalizationDateFormat(value: string): string | null {
  if (!value) {
    return "Date format is required";
  }
  return null;
}

export function validateLocalizationTimeFormat(value: string): string | null {
  if (!value) {
    return "Time format is required";
  }
  return null;
}

export function validateLocalizationNumberFormat(value: string): string | null {
  if (!value || (value !== "EU" && value !== "US")) {
    return "Number format is required";
  }
  return null;
}
