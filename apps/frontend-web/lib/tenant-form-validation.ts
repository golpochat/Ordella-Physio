export const TENANT_CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateTenantName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return "Tenant name is required";
  }
  if (trimmed.length < 3) {
    return "Tenant name must be at least 3 characters";
  }
  return null;
}

export function validateTenantCode(code: string): string | null {
  const trimmed = code.trim();
  if (!trimmed) {
    return "Tenant code is required";
  }
  if (!TENANT_CODE_REGEX.test(trimmed)) {
    return "Tenant code must be lowercase and can contain letters, numbers, and hyphens";
  }
  return null;
}

export function validateTenantTimezone(timezone: string): string | null {
  if (!timezone) {
    return "Timezone is required";
  }
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return null;
  } catch {
    return "Timezone is invalid";
  }
}

export function validateTenantCurrency(currency: string): string | null {
  if (!currency) {
    return "Currency is required";
  }
  if (!/^[A-Z]{3}$/.test(currency)) {
    return "Currency is invalid";
  }
  return null;
}
