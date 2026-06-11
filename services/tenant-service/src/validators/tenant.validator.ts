import {
  TENANT_STATUSES,
  type CreateTenantPayload,
  type TenantStatus,
  type TenantValidationFieldError,
  type UpdateTenantPayload,
} from "@/models/Tenant";

const TENANT_CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_CURRENCY_REGEX = /^[A-Z]{3}$/;

function isValidTimezone(value: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export function validateCreateTenant(payload: CreateTenantPayload): TenantValidationFieldError[] {
  const errors: TenantValidationFieldError[] = [];
  const name = payload.name?.trim() ?? "";
  const code = (payload.code ?? payload.slug ?? "").trim().toLowerCase();
  const ownerUserId = payload.ownerUserId?.trim() ?? "";
  const timezone = payload.timezone?.trim() ?? "";
  const currency = payload.currency?.trim().toUpperCase() ?? "";

  if (!name) {
    errors.push({ field: "name", message: "Tenant name is required." });
  } else if (name.length < 3) {
    errors.push({ field: "name", message: "Tenant name must be at least 3 characters." });
  }

  if (!code) {
    errors.push({ field: "code", message: "Tenant code is required." });
  } else if (!TENANT_CODE_REGEX.test(code)) {
    errors.push({
      field: "code",
      message: "Tenant code must be lowercase and can contain letters, numbers, and hyphens.",
    });
  }

  if (!ownerUserId) {
    errors.push({ field: "ownerUserId", message: "Owner is required." });
  }

  if (!timezone) {
    errors.push({ field: "timezone", message: "Timezone is required." });
  } else if (!isValidTimezone(timezone)) {
    errors.push({ field: "timezone", message: "Timezone must be a valid IANA timezone." });
  }

  if (!currency) {
    errors.push({ field: "currency", message: "Currency is required." });
  } else if (!ISO_CURRENCY_REGEX.test(currency)) {
    errors.push({ field: "currency", message: "Currency must be a valid ISO 4217 code." });
  }

  return errors;
}

export function validateUpdateTenant(payload: UpdateTenantPayload): TenantValidationFieldError[] {
  const errors: TenantValidationFieldError[] = [];

  if (payload.name !== undefined) {
    const name = payload.name.trim();
    if (!name) {
      errors.push({ field: "name", message: "Tenant name is required." });
    } else if (name.length < 3) {
      errors.push({ field: "name", message: "Tenant name must be at least 3 characters." });
    }
  }

  if (payload.code !== undefined) {
    const code = payload.code.trim().toLowerCase();
    if (!code) {
      errors.push({ field: "code", message: "Tenant code is required." });
    } else if (!TENANT_CODE_REGEX.test(code)) {
      errors.push({
        field: "code",
        message: "Tenant code must be lowercase and can contain letters, numbers, and hyphens.",
      });
    }
  }

  if (payload.timezone !== undefined) {
    const timezone = payload.timezone.trim();
    if (!timezone) {
      errors.push({ field: "timezone", message: "Timezone is required." });
    } else if (!isValidTimezone(timezone)) {
      errors.push({ field: "timezone", message: "Timezone is invalid." });
    }
  }

  if (payload.currency !== undefined) {
    const currency = payload.currency.trim().toUpperCase();
    if (!currency) {
      errors.push({ field: "currency", message: "Currency is required." });
    } else if (!ISO_CURRENCY_REGEX.test(currency)) {
      errors.push({ field: "currency", message: "Currency is invalid." });
    }
  }

  if (payload.status !== undefined) {
    if (!TENANT_STATUSES.includes(payload.status as TenantStatus)) {
      errors.push({ field: "status", message: 'Status must be "ACTIVE" or "SUSPENDED".' });
    }
  }

  return errors;
}

export function normalizeUpdateTenantPayload(payload: UpdateTenantPayload) {
  const normalized: {
    name?: string;
    code?: string;
    slug?: string;
    timezone?: string;
    currency?: string;
    status?: TenantStatus;
    isActive?: boolean;
    address?: string | null;
    phone?: string | null;
  } = {};

  if (payload.name !== undefined) {
    normalized.name = payload.name.trim();
  }

  if (payload.code !== undefined) {
    const code = payload.code.trim().toLowerCase();
    normalized.code = code;
    normalized.slug = code;
  }

  if (payload.timezone !== undefined) {
    normalized.timezone = payload.timezone.trim();
  }

  if (payload.currency !== undefined) {
    normalized.currency = payload.currency.trim().toUpperCase();
  }

  if (payload.status !== undefined) {
    const status = payload.status as TenantStatus;
    normalized.status = status;
    normalized.isActive = status === "ACTIVE";
  }

  if (payload.address !== undefined) {
    normalized.address = payload.address.trim() || null;
  }

  if (payload.phone !== undefined) {
    normalized.phone = payload.phone.trim() || null;
  }

  return normalized;
}

export function normalizeCreateTenantPayload(payload: CreateTenantPayload) {
  const code = (payload.code ?? payload.slug ?? "").trim().toLowerCase();

  return {
    name: payload.name?.trim() ?? "",
    code,
    slug: code,
    ownerUserId: payload.ownerUserId?.trim() ?? "",
    timezone: payload.timezone?.trim() ?? "UTC",
    currency: payload.currency?.trim().toUpperCase() ?? "USD",
    address: payload.address?.trim() || undefined,
    phone: payload.phone?.trim() || undefined,
    homeRegion: payload.homeRegion,
  };
}
