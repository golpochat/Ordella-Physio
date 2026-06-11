const DOMAIN_REGEX =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

export function normalizeDomainInput(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

export function validateTenantDomain(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Domain is required";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return "Domain cannot contain protocol (http/https)";
  }

  const normalized = normalizeDomainInput(trimmed);
  if (!DOMAIN_REGEX.test(normalized)) {
    return "Enter a valid domain";
  }

  return null;
}
