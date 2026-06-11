import { ApiError } from "@/lib/api-client";

export type LocationFieldErrors = Record<string, string>;

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

function extractFieldErrors(apiError: ApiErrorPayload["error"]): LocationFieldErrors {
  const fieldErrors: LocationFieldErrors = {};

  for (const entry of apiError?.metadata?.fields ?? []) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseLocationCreateErrors(error: unknown): {
  fieldErrors: LocationFieldErrors;
  generalError: string | null;
  forbidden: boolean;
} {
  const fieldErrors: LocationFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;

  if (!(error instanceof ApiError)) {
    return { fieldErrors, generalError: "Failed to create location.", forbidden };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create locations.",
      forbidden,
    };
  }

  if (code === "LOCATION_CODE_EXISTS") {
    fieldErrors.code =
      apiError?.message ?? "This location code is already in use for this tenant.";
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
    generalError: apiError?.message ?? error.message ?? "Failed to create location.",
    forbidden,
  };
}

export function parseLocationUpdateErrors(error: unknown): {
  fieldErrors: LocationFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  notFound: boolean;
  tenantMismatch: boolean;
} {
  const fieldErrors: LocationFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let notFound = false;
  let tenantMismatch = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update location.",
      forbidden,
      notFound,
      tenantMismatch,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update locations.",
      forbidden,
      notFound,
      tenantMismatch,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "You cannot modify locations from another tenant.",
      forbidden: true,
      notFound,
      tenantMismatch,
    };
  }

  if (code === "LOCATION_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Location does not exist.",
      forbidden,
      notFound,
      tenantMismatch,
    };
  }

  if (code === "LOCATION_CODE_EXISTS") {
    fieldErrors.code =
      apiError?.message ?? "This location code is already in use for this tenant.";
    return { fieldErrors, generalError: null, forbidden, notFound, tenantMismatch };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, notFound, tenantMismatch };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update location.",
    forbidden,
    notFound,
    tenantMismatch,
  };
}

export function parseLocationFetchErrors(error: unknown): {
  forbidden: boolean;
  notFound: boolean;
  tenantMismatch: boolean;
  message: string | null;
} {
  if (!(error instanceof ApiError)) {
    return {
      forbidden: false,
      notFound: false,
      tenantMismatch: false,
      message: "Failed to load location.",
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      forbidden: true,
      notFound: false,
      tenantMismatch: false,
      message: apiError?.message ?? "You do not have permission to view this location.",
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      forbidden: true,
      notFound: false,
      tenantMismatch: true,
      message: apiError?.message ?? "You cannot access locations from another tenant.",
    };
  }

  if (code === "LOCATION_NOT_FOUND") {
    return {
      forbidden: false,
      notFound: true,
      tenantMismatch: false,
      message: apiError?.message ?? "Location does not exist.",
    };
  }

  return {
    forbidden: false,
    notFound: false,
    tenantMismatch: false,
    message: apiError?.message ?? error.message ?? "Failed to load location.",
  };
}

export function parseLocationListErrors(error: unknown): { toastError: string | null } {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load locations. Please try again." };
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
    toastError: apiError?.message ?? error.message ?? "Failed to load locations. Please try again.",
  };
}

export function parseLocationStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update location status.",
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
      message: apiError?.message ?? "You do not have permission to modify locations.",
      notFound: false,
      forbidden: true,
      tenantMismatch: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot modify locations from another tenant.",
      notFound: false,
      forbidden: true,
      tenantMismatch: true,
    };
  }

  if (code === "LOCATION_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Location does not exist.",
      notFound: true,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (code === "LOCATION_ALREADY_INACTIVE") {
    return {
      message: apiError?.message ?? "Location is already inactive.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (code === "LOCATION_ALREADY_ACTIVE") {
    return {
      message: apiError?.message ?? "Location is already active.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (code === "LOCATION_HAS_ACTIVE_APPOINTMENTS") {
    return {
      message:
        apiError?.message ??
        "This location cannot be deactivated because it has active appointments.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update location status.",
    notFound: false,
    forbidden: false,
    tenantMismatch: false,
  };
}

export function parseLocationConfigErrors(error: unknown): {
  fieldErrors: LocationFieldErrors;
  generalError: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
  invalidNamespace: boolean;
} {
  const fieldErrors: LocationFieldErrors = {};
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
        apiError?.message ?? "You do not have permission to modify location configuration.",
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
        apiError?.message ?? "You cannot modify configuration for another tenant's location.",
      notFound,
      forbidden: true,
      tenantMismatch: true,
      invalidNamespace,
    };
  }

  if (code === "LOCATION_NOT_FOUND") {
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Location does not exist.",
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

    return {
      fieldErrors,
      generalError:
        Object.keys(fieldErrors).length === 0
          ? (apiError?.message ?? "Validation failed.")
          : null,
      notFound,
      forbidden,
      tenantMismatch,
      invalidNamespace,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update configuration.",
    notFound,
    forbidden,
    tenantMismatch,
    invalidNamespace,
  };
}
