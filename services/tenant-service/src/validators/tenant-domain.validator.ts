import type {
  CreateTenantDomainPayload,
  DomainType,
  TenantDomainValidationFieldError,
} from "@/models/TenantDomain";
import { DOMAIN_TYPES } from "@/models/TenantDomain";

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

export function isValidDomainFormat(value: string): boolean {
  if (!value || value.includes("://")) {
    return false;
  }

  return DOMAIN_REGEX.test(value);
}

export function validateDomain(payload: CreateTenantDomainPayload): TenantDomainValidationFieldError[] {
  const errors: TenantDomainValidationFieldError[] = [];
  const domain = normalizeDomainInput(payload.domain ?? "");
  const type = payload.type?.trim().toUpperCase() ?? "";

  if (!domain) {
    errors.push({ field: "domain", message: "Invalid domain format." });
  } else if (!isValidDomainFormat(domain)) {
    errors.push({ field: "domain", message: "Invalid domain format." });
  }

  if (!type) {
    errors.push({ field: "type", message: 'Type must be "PRIMARY" or "CUSTOM".' });
  } else if (!(DOMAIN_TYPES as readonly string[]).includes(type)) {
    errors.push({ field: "type", message: 'Type must be "PRIMARY" or "CUSTOM".' });
  }

  return errors;
}

export function normalizeDomainPayload(payload: CreateTenantDomainPayload) {
  return {
    domain: normalizeDomainInput(payload.domain ?? ""),
    type: payload.type?.trim().toUpperCase() as DomainType,
  };
}
