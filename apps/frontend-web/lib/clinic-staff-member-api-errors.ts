import { ApiError } from "@/lib/api-client";

export type StaffMemberFieldErrors = Record<string, string>;

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

function extractFieldErrors(apiError: ApiErrorPayload["error"]): StaffMemberFieldErrors {
  const fieldErrors: StaffMemberFieldErrors = {};

  for (const entry of apiError?.metadata?.fields ?? []) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseStaffMemberListErrors(error: unknown): { toastError: string | null } {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load staff members. Please try again." };
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
      toastError: apiError?.message ?? "Invalid filter value.",
    };
  }

  return {
    toastError: apiError?.message ?? error.message ?? "Failed to load staff members. Please try again.",
  };
}

export function parseStaffMemberCreateErrors(error: unknown): {
  fieldErrors: StaffMemberFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  invalidRole: boolean;
  invalidLocation: boolean;
  emailExists: boolean;
} {
  const fieldErrors: StaffMemberFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let invalidRole = false;
  let invalidLocation = false;
  let emailExists = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to create staff member.",
      forbidden,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create staff.",
      forbidden,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "STAFF_EMAIL_EXISTS") {
    emailExists = true;
    fieldErrors.email = apiError?.message ?? "A staff member with this email already exists.";
    return { fieldErrors, generalError: null, forbidden, invalidRole, invalidLocation, emailExists };
  }

  if (code === "INVALID_ROLE") {
    invalidRole = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "The selected role is not valid for this tenant.",
      forbidden,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "INVALID_LOCATION") {
    invalidLocation = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "One or more locations do not belong to this tenant.",
      forbidden,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, invalidRole, invalidLocation, emailExists };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to create staff member.",
    forbidden,
    invalidRole,
    invalidLocation,
    emailExists,
  };
}

export function parseStaffMemberFetchErrors(error: unknown): {
  message: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
} {
  if (!(error instanceof ApiError)) {
    return { message: "Failed to load staff member.", forbidden: false, tenantMismatch: false, notFound: false };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to view staff.",
      forbidden: true,
      tenantMismatch: false,
      notFound: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot access staff from another tenant.",
      forbidden: true,
      tenantMismatch: true,
      notFound: false,
    };
  }

  if (code === "STAFF_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Staff member does not exist.",
      forbidden: false,
      tenantMismatch: false,
      notFound: true,
    };
  }

  return {
    message: apiError?.message ?? "Failed to load staff member.",
    forbidden: false,
    tenantMismatch: false,
    notFound: false,
  };
}

export function parseStaffMemberUpdateErrors(error: unknown): {
  fieldErrors: StaffMemberFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  invalidRole: boolean;
  invalidLocation: boolean;
  emailExists: boolean;
} {
  const fieldErrors: StaffMemberFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let notFound = false;
  let invalidRole = false;
  let invalidLocation = false;
  let emailExists = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update staff member.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update staff.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify staff from another tenant.",
      forbidden: true,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "STAFF_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Staff member does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "STAFF_EMAIL_EXISTS") {
    emailExists = true;
    fieldErrors.email = apiError?.message ?? "A staff member with this email already exists.";
    return {
      fieldErrors,
      generalError: null,
      forbidden,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "INVALID_ROLE") {
    invalidRole = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "The selected role is not valid for this tenant.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "INVALID_LOCATION") {
    invalidLocation = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "One or more locations do not belong to this tenant.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return {
      fieldErrors,
      generalError,
      forbidden,
      tenantMismatch,
      notFound,
      invalidRole,
      invalidLocation,
      emailExists,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to update staff member.",
    forbidden,
    tenantMismatch,
    notFound,
    invalidRole,
    invalidLocation,
    emailExists,
  };
}

export function parseStaffMemberStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update staff status.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to modify staff.",
      notFound: false,
      forbidden: true,
      tenantMismatch: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot modify staff from another tenant.",
      notFound: false,
      forbidden: true,
      tenantMismatch: true,
    };
  }

  if (code === "STAFF_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Staff member does not exist.",
      notFound: true,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (
    code === "STAFF_ALREADY_INACTIVE" ||
    code === "STAFF_ALREADY_ACTIVE" ||
    code === "STAFF_HAS_ACTIVE_APPOINTMENTS"
  ) {
    return {
      message: apiError?.message ?? "Staff status could not be updated.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update staff status.",
    notFound: false,
    forbidden: false,
    tenantMismatch: false,
  };
}

export function parseStaffMemberConfigErrors(error: unknown): {
  fieldErrors: StaffMemberFieldErrors;
  generalError: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
  invalidNamespace: boolean;
} {
  const fieldErrors: StaffMemberFieldErrors = {};
  let generalError: string | null = null;
  let notFound = false;
  let forbidden = false;
  let tenantMismatch = false;
  let invalidNamespace = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update configuration.",
      notFound,
      forbidden,
      tenantMismatch,
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
        apiError?.message ?? "You do not have permission to modify staff configuration.",
      notFound,
      forbidden: true,
      tenantMismatch,
      invalidNamespace,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      fieldErrors,
      generalError:
        apiError?.message ??
        "You cannot modify configuration for another tenant's staff member.",
      notFound,
      forbidden: true,
      tenantMismatch: true,
      invalidNamespace,
    };
  }

  if (code === "STAFF_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Staff member does not exist.",
      notFound: true,
      forbidden,
      tenantMismatch,
      invalidNamespace,
    };
  }

  if (code === "INVALID_NAMESPACE") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Unknown configuration namespace.",
      notFound,
      forbidden,
      tenantMismatch,
      invalidNamespace: true,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return {
      fieldErrors,
      generalError,
      notFound,
      forbidden,
      tenantMismatch,
      invalidNamespace,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to update configuration.",
    notFound,
    forbidden,
    tenantMismatch,
    invalidNamespace,
  };
}
