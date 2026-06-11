import { ApiError } from "@/lib/api-client";

export type OrganizationFieldErrors = Record<string, string>;

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

function extractFieldErrors(apiError: ApiErrorPayload["error"]): OrganizationFieldErrors {
  const fieldErrors: OrganizationFieldErrors = {};
  const fields = apiError?.metadata?.fields ?? [];

  for (const entry of fields) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseOrganizationCreateErrors(error: unknown): {
  fieldErrors: OrganizationFieldErrors;
  generalError: string | null;
  forbidden: boolean;
} {
  const fieldErrors: OrganizationFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;

  if (!(error instanceof ApiError)) {
    return { fieldErrors, generalError: "Failed to create organization.", forbidden };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create organizations.",
      forbidden,
    };
  }

  if (code === "ORG_CODE_EXISTS") {
    fieldErrors.code = apiError?.message ?? "This organization code is already in use.";
    return { fieldErrors, generalError: null, forbidden };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to create organization.",
    forbidden,
  };
}

export function parseOrganizationUpdateErrors(error: unknown): {
  fieldErrors: OrganizationFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  notFound: boolean;
} {
  const fieldErrors: OrganizationFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let notFound = false;

  if (!(error instanceof ApiError)) {
    return { fieldErrors, generalError: "Failed to update organization.", forbidden, notFound };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update organizations.",
      forbidden,
      notFound,
    };
  }

  if (code === "ORG_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Organization does not exist.",
      forbidden,
      notFound,
    };
  }

  if (code === "ORG_CODE_EXISTS") {
    fieldErrors.code = apiError?.message ?? "This organization code is already in use.";
    return { fieldErrors, generalError: null, forbidden, notFound };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, notFound };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update organization.",
    forbidden,
    notFound,
  };
}

export function parseOrganizationListErrors(error: unknown): { toastError: string | null } {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load organizations. Please try again." };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "INVALID_PAGINATION") {
    return {
      toastError: apiError?.message ?? "Page and limit must be positive numbers.",
    };
  }

  if (code === "INVALID_FILTER") {
    return {
      toastError: apiError?.message ?? "Invalid status filter.",
    };
  }

  return {
    toastError: apiError?.message ?? error.message ?? "Failed to load organizations. Please try again.",
  };
}

export function parseOrganizationStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update organization status.",
      notFound: false,
      forbidden: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to modify organizations.",
      notFound: false,
      forbidden: true,
    };
  }

  if (code === "ORG_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Organization does not exist.",
      notFound: true,
      forbidden: false,
    };
  }

  if (code === "ORG_ALREADY_INACTIVE") {
    return {
      message: apiError?.message ?? "Organization already inactive.",
      notFound: false,
      forbidden: false,
    };
  }

  if (code === "ORG_ALREADY_ACTIVE") {
    return {
      message: apiError?.message ?? "Organization already active.",
      notFound: false,
      forbidden: false,
    };
  }

  if (code === "ORG_HAS_ACTIVE_TENANTS") {
    return {
      message: apiError?.message ?? "Cannot deactivate organization with active tenants.",
      notFound: false,
      forbidden: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update organization status.",
    notFound: false,
    forbidden: false,
  };
}

export function parseOrganizationTenantLinkErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  orgNotFound: boolean;
  forbidden: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update organization tenants.",
      notFound: false,
      orgNotFound: false,
      forbidden: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to modify organization tenants.",
      notFound: false,
      orgNotFound: false,
      forbidden: true,
    };
  }

  if (code === "ORG_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Organization does not exist.",
      notFound: false,
      orgNotFound: true,
      forbidden: false,
    };
  }

  if (code === "TENANT_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Tenant does not exist.",
      notFound: true,
      orgNotFound: false,
      forbidden: false,
    };
  }

  if (code === "TENANT_ALREADY_ASSIGNED") {
    return {
      message: apiError?.message ?? "This tenant is already linked to an organization.",
      notFound: false,
      orgNotFound: false,
      forbidden: false,
    };
  }

  if (code === "TENANT_NOT_IN_ORGANIZATION") {
    return {
      message: apiError?.message ?? "This tenant is not linked to the specified organization.",
      notFound: false,
      orgNotFound: false,
      forbidden: false,
    };
  }

  if (code === "TENANT_ACTIVE_CANNOT_REMOVE") {
    return {
      message: apiError?.message ?? "Active tenants cannot be removed from an organization.",
      notFound: false,
      orgNotFound: false,
      forbidden: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update organization tenants.",
    notFound: false,
    orgNotFound: false,
    forbidden: false,
  };
}

export function parseOrganizationConfigErrors(error: unknown): {
  fieldErrors: OrganizationFieldErrors;
  generalError: string | null;
  orgNotFound: boolean;
  forbidden: boolean;
  invalidNamespace: boolean;
} {
  const fieldErrors: OrganizationFieldErrors = {};
  let generalError: string | null = null;
  let orgNotFound = false;
  let forbidden = false;
  let invalidNamespace = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update configuration.",
      orgNotFound,
      forbidden,
      invalidNamespace,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "You do not have permission to modify organization configuration.",
      orgNotFound,
      forbidden: true,
      invalidNamespace,
    };
  }

  if (code === "ORG_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Organization does not exist.",
      orgNotFound: true,
      forbidden,
      invalidNamespace,
    };
  }

  if (code === "INVALID_NAMESPACE") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Unknown configuration namespace.",
      orgNotFound,
      forbidden,
      invalidNamespace: true,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, orgNotFound, forbidden, invalidNamespace };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update configuration.",
    orgNotFound,
    forbidden,
    invalidNamespace,
  };
}
