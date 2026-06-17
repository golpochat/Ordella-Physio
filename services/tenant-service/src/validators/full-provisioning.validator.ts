import { EMAIL_REGEX, PHONE_REGEX } from "@ordella/validation";

import type {
  FullProvisioningPayload,
  FullProvisioningBillingModel,
  NormalizedFullProvisioningPayload,
} from "@/models/FullProvisioning";
import { FULL_PROVISIONING_BILLING_MODELS } from "@/models/FullProvisioning";
import type { TenantValidationFieldError } from "@/models/Tenant";
import { validateCreateTenant } from "@/validators/tenant.validator";

export type FullProvisioningValidationResult =
  | { valid: true; payload: NormalizedFullProvisioningPayload }
  | { valid: false; fields: TenantValidationFieldError[] };

function prefixFields(
  fields: TenantValidationFieldError[],
  prefix: string,
): TenantValidationFieldError[] {
  return fields.map((field) => ({
    field: `${prefix}.${field.field}`,
    message: field.message,
  }));
}

function normalizeBillingModel(value: unknown): FullProvisioningBillingModel | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (FULL_PROVISIONING_BILLING_MODELS.includes(normalized as FullProvisioningBillingModel)) {
    return normalized as FullProvisioningBillingModel;
  }

  return null;
}

function validateOrganizationSection(
  organization: FullProvisioningPayload["organization"],
): TenantValidationFieldError[] {
  const fields: TenantValidationFieldError[] = [];

  const organizationName = organization.organizationName?.trim() ?? "";
  const primaryContactName = organization.primaryContactName?.trim() ?? "";
  const primaryContactEmail = organization.primaryContactEmail?.trim() ?? "";
  const primaryContactPhone = organization.primaryContactPhone?.trim() ?? "";
  const billingModel = normalizeBillingModel(organization.billingModel);

  if (!organizationName) {
    fields.push({ field: "organizationName", message: "Organization name is required." });
  } else if (organizationName.length < 3) {
    fields.push({
      field: "organizationName",
      message: "Organization name must be at least 3 characters.",
    });
  }

  if (!primaryContactName) {
    fields.push({ field: "primaryContactName", message: "Primary contact name is required." });
  }

  if (!primaryContactEmail) {
    fields.push({ field: "primaryContactEmail", message: "Primary contact email is required." });
  } else if (!EMAIL_REGEX.test(primaryContactEmail)) {
    fields.push({ field: "primaryContactEmail", message: "Enter a valid email." });
  }

  if (!primaryContactPhone) {
    fields.push({ field: "primaryContactPhone", message: "Primary contact phone is required." });
  } else if (!PHONE_REGEX.test(primaryContactPhone)) {
    fields.push({ field: "primaryContactPhone", message: "Enter a valid phone number." });
  }

  if (!billingModel) {
    fields.push({
      field: "billingModel",
      message: 'Billing model must be "tenant-level" or "organization-level".',
    });
  }

  return fields;
}

export function validateFullProvisioning(payload: unknown): FullProvisioningValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as FullProvisioningPayload;
  const fields: TenantValidationFieldError[] = [];

  if (!body.organization || typeof body.organization !== "object") {
    fields.push({ field: "organization", message: "Organization section is required." });
  }

  if (!body.tenant || typeof body.tenant !== "object") {
    fields.push({ field: "tenant", message: "Tenant section is required." });
  }

  if (!body.owner || typeof body.owner !== "object") {
    fields.push({ field: "owner", message: "Owner section is required." });
  }

  if (fields.length > 0) {
    return { valid: false, fields };
  }

  const organizationFields = validateOrganizationSection(body.organization);
  if (organizationFields.length > 0) {
    return { valid: false, fields: prefixFields(organizationFields, "organization") };
  }

  const tenantValidation = validateCreateTenant({
    tenantName: body.tenant.tenantName,
    organizationId: "pending",
    timezone: body.tenant.timezone,
    currency: body.tenant.currency,
    ownerUserId: body.owner.ownerUserId,
    ownerEmail: body.owner.ownerEmail,
  });

  const tenantFields = tenantValidation.filter((field) => field.field !== "organizationId");
  const ownerFields = tenantValidation.filter(
    (field) =>
      field.field === "ownerUserId" || field.field === "ownerEmail" || field.field === "owner",
  );

  if (tenantFields.length > 0 || ownerFields.length > 0) {
    return {
      valid: false,
      fields: [
        ...prefixFields(
          tenantFields.filter(
            (field) =>
              field.field !== "ownerUserId" &&
              field.field !== "ownerEmail" &&
              field.field !== "owner",
          ),
          "tenant",
        ),
        ...prefixFields(ownerFields, "owner"),
      ],
    };
  }

  const billingModel = normalizeBillingModel(body.organization.billingModel)!;

  return {
    valid: true,
    payload: {
      organization: {
        organizationName: body.organization.organizationName!.trim(),
        primaryContactName: body.organization.primaryContactName!.trim(),
        primaryContactEmail: body.organization.primaryContactEmail!.trim(),
        primaryContactPhone: body.organization.primaryContactPhone!.trim(),
        billingModel,
        description: body.organization.description?.trim() || undefined,
      },
      tenant: {
        tenantName: body.tenant.tenantName!.trim(),
        timezone: body.tenant.timezone?.trim() ?? "UTC",
        currency: body.tenant.currency?.trim().toUpperCase() ?? "USD",
      },
      owner: {
        ownerUserId: body.owner.ownerUserId?.trim() || undefined,
        ownerEmail: body.owner.ownerEmail?.trim().toLowerCase() || undefined,
      },
    },
  };
}
