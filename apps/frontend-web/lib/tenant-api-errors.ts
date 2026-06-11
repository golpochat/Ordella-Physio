import { ApiError } from "@/lib/api-client";

export type TenantFieldErrors = Record<string, string>;

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    metadata?: {
      fields?: Array<{ field?: string; message?: string }>;
      field?: string;
    };
  };
};

function extractFieldErrors(apiError: ApiErrorPayload["error"]): TenantFieldErrors {
  const fieldErrors: TenantFieldErrors = {};
  const fields = apiError?.metadata?.fields ?? [];

  for (const entry of fields) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseTenantFormErrors(
  error: unknown,
  fallbackMessage: string,
): {
  fieldErrors: TenantFieldErrors;
  generalError: string | null;
  notFound: boolean;
} {
  const fieldErrors: TenantFieldErrors = {};
  let generalError: string | null = null;
  let notFound = false;

  if (!(error instanceof ApiError)) {
    return { fieldErrors, generalError: fallbackMessage, notFound };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "TENANT_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Tenant not found.",
      notFound,
    };
  }

  if (code === "TENANT_CODE_EXISTS") {
    fieldErrors.code = apiError?.message ?? "This tenant code is already in use.";
    return { fieldErrors, generalError: null, notFound };
  }

  if (code === "OWNER_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Selected owner does not exist.",
      notFound,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, notFound };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? fallbackMessage,
    notFound,
  };
}

export function parseTenantCreateErrors(error: unknown) {
  const result = parseTenantFormErrors(error, "Failed to create tenant.");
  return { fieldErrors: result.fieldErrors, generalError: result.generalError };
}

export function parseTenantUpdateErrors(error: unknown) {
  return parseTenantFormErrors(error, "Failed to update tenant.");
}

export function parseTenantBillingErrors(error: unknown): {
  fieldErrors: TenantFieldErrors;
  generalError: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
} {
  const fieldErrors: TenantFieldErrors = {};
  let generalError: string | null = null;
  let notFound = false;
  let tenantMismatch = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update billing settings.",
      notFound,
      tenantMismatch,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "TENANT_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Tenant not found.",
      notFound: true,
      tenantMismatch,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify billing settings for another tenant.",
      notFound,
      tenantMismatch: true,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, notFound, tenantMismatch };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update billing settings.",
    notFound,
    tenantMismatch,
  };
}

export function parseTenantConfigErrors(error: unknown): {
  fieldErrors: TenantFieldErrors;
  generalError: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
  invalidNamespace: boolean;
} {
  const fieldErrors: TenantFieldErrors = {};
  let generalError: string | null = null;
  let notFound = false;
  let tenantMismatch = false;
  let invalidNamespace = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update configuration.",
      notFound,
      tenantMismatch,
      invalidNamespace,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "TENANT_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Tenant not found.",
      notFound: true,
      tenantMismatch,
      invalidNamespace,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify configuration for another tenant.",
      notFound,
      tenantMismatch: true,
      invalidNamespace,
    };
  }

  if (code === "INVALID_NAMESPACE") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Invalid configuration section.",
      notFound,
      tenantMismatch,
      invalidNamespace: true,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, notFound, tenantMismatch, invalidNamespace };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update configuration.",
    notFound,
    tenantMismatch,
    invalidNamespace,
  };
}

export function parseTenantDomainErrors(error: unknown): {
  fieldErrors: TenantFieldErrors;
  generalError: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
  cannotDeletePrimary: boolean;
  invalidVerification: boolean;
} {
  const fieldErrors: TenantFieldErrors = {};
  let generalError: string | null = null;
  let notFound = false;
  let tenantMismatch = false;
  let cannotDeletePrimary = false;
  let invalidVerification = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update domain settings.",
      notFound,
      tenantMismatch,
      cannotDeletePrimary,
      invalidVerification,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "TENANT_NOT_FOUND" || code === "DOMAIN_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Tenant not found.",
      notFound: code === "TENANT_NOT_FOUND",
      tenantMismatch,
      cannotDeletePrimary,
      invalidVerification,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify domains for another tenant.",
      notFound,
      tenantMismatch: true,
      cannotDeletePrimary,
      invalidVerification,
    };
  }

  if (code === "DOMAIN_EXISTS") {
    fieldErrors.domain = apiError?.message ?? "This domain is already mapped to another tenant.";
    return { fieldErrors, generalError: null, notFound, tenantMismatch, cannotDeletePrimary, invalidVerification };
  }

  if (code === "INVALID_VERIFICATION_TOKEN") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Verification failed.",
      notFound,
      tenantMismatch,
      cannotDeletePrimary,
      invalidVerification: true,
    };
  }

  if (code === "CANNOT_DELETE_PRIMARY_DOMAIN") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Primary domain cannot be removed.",
      notFound,
      tenantMismatch,
      cannotDeletePrimary: true,
      invalidVerification,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, notFound, tenantMismatch, cannotDeletePrimary, invalidVerification };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update domain settings.",
    notFound,
    tenantMismatch,
    cannotDeletePrimary,
    invalidVerification,
  };
}

export function parseTenantLocalizationErrors(error: unknown): {
  fieldErrors: TenantFieldErrors;
  generalError: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
} {
  const fieldErrors: TenantFieldErrors = {};
  let generalError: string | null = null;
  let notFound = false;
  let tenantMismatch = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update localization settings.",
      notFound,
      tenantMismatch,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "TENANT_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Tenant not found.",
      notFound: true,
      tenantMismatch,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "You cannot modify localization settings for another tenant.",
      notFound,
      tenantMismatch: true,
    };
  }

  if (code === "INVALID_TIMEZONE") {
    fieldErrors.timezone = apiError?.message ?? "Timezone must be a valid IANA timezone.";
    return { fieldErrors, generalError: null, notFound, tenantMismatch };
  }

  if (code === "INVALID_CURRENCY") {
    fieldErrors.currency = apiError?.message ?? "Currency must be a valid ISO 4217 code.";
    return { fieldErrors, generalError: null, notFound, tenantMismatch };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, notFound, tenantMismatch };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update localization settings.",
    notFound,
    tenantMismatch,
  };
}

export function parseTenantStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
} {
  if (!(error instanceof ApiError)) {
    return { message: "Failed to update tenant status.", notFound: false };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "TENANT_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Tenant not found.",
      notFound: true,
    };
  }

  if (code === "TENANT_ALREADY_SUSPENDED") {
    return {
      message: apiError?.message ?? "Tenant is already suspended.",
      notFound: false,
    };
  }

  if (code === "TENANT_ALREADY_ACTIVE") {
    return {
      message: apiError?.message ?? "Tenant is already active.",
      notFound: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update tenant status.",
    notFound: false,
  };
}
