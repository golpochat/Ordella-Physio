import { EMAIL_REGEX } from "@ordella/validation";
import {
  TENANT_STATUSES,
  type CreateTenantPayload,
  type NormalizedCreateTenantPayload,
  type TenantStatus,
  type TenantValidationFieldError,
  type UpdateTenantPayload,
} from "@/models/Tenant";

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
  const body = payload as CreateTenantPayload & {
    name?: string;
    code?: string;
    tenantCode?: string;
    slug?: string;
    address?: string;
    phone?: string;
  };

  if (body.code !== undefined || body.tenantCode !== undefined || body.slug !== undefined) {
    errors.push({
      field: "tenantCode",
      message: "Tenant code is auto-generated and cannot be supplied.",
    });
  }

  if (body.address !== undefined || body.phone !== undefined) {
    errors.push({
      field: "contact",
      message: "Contact info belongs to the organization, not the tenant.",
    });
  }

  const name = (body.tenantName ?? body.name)?.trim() ?? "";
  const organizationId = body.organizationId?.trim() ?? "";
  const ownerUserId = body.ownerUserId?.trim() ?? "";
  const ownerEmail = body.ownerEmail?.trim().toLowerCase() ?? "";
  const timezone = body.timezone?.trim() ?? "";
  const currency = body.currency?.trim().toUpperCase() ?? "";

  if (!name) {
    errors.push({ field: "tenantName", message: "Tenant name is required." });
  } else if (name.length < 3) {
    errors.push({ field: "tenantName", message: "Tenant name must be at least 3 characters." });
  }

  if (!organizationId) {
    errors.push({ field: "organizationId", message: "Organization is required." });
  }

  if (ownerUserId && ownerEmail) {
    errors.push({
      field: "owner",
      message: "Provide either an existing owner or a new owner email, not both.",
    });
  } else if (!ownerUserId && !ownerEmail) {
    errors.push({
      field: "ownerUserId",
      message: "Tenant owner is required. Select an existing user or enter an email.",
    });
  } else if (ownerEmail && !EMAIL_REGEX.test(ownerEmail)) {
    errors.push({ field: "ownerEmail", message: "Enter a valid owner email." });
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
  const body = payload as UpdateTenantPayload & { code?: string; tenantCode?: string };

  if (body.code !== undefined || body.tenantCode !== undefined) {
    errors.push({
      field: "tenantCode",
      message: "Tenant code is immutable and cannot be changed.",
    });
  }

  if (payload.name !== undefined) {
    const name = payload.name.trim();
    if (!name) {
      errors.push({ field: "name", message: "Tenant name is required." });
    } else if (name.length < 3) {
      errors.push({ field: "name", message: "Tenant name must be at least 3 characters." });
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

export function normalizeCreateTenantPayload(payload: CreateTenantPayload): NormalizedCreateTenantPayload {
  const body = payload as CreateTenantPayload & { name?: string };

  return {
    name: (body.tenantName ?? body.name)?.trim() ?? "",
    organizationId: body.organizationId?.trim() ?? "",
    ownerUserId: body.ownerUserId?.trim() || undefined,
    ownerEmail: body.ownerEmail?.trim().toLowerCase() || undefined,
    timezone: body.timezone?.trim() ?? "UTC",
    currency: body.currency?.trim().toUpperCase() ?? "USD",
  };
}
