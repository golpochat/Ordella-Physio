import { ApiError } from "@/lib/api-client";

export type TerminalFieldErrors = Record<string, string>;

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

function extractFieldErrors(apiError: ApiErrorPayload["error"]): TerminalFieldErrors {
  const fieldErrors: TerminalFieldErrors = {};

  for (const entry of apiError?.metadata?.fields ?? []) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseTerminalCreateErrors(error: unknown): {
  fieldErrors: TerminalFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  locationMismatch: boolean;
} {
  const fieldErrors: TerminalFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let locationMismatch = false;

  if (!(error instanceof ApiError)) {
    return { fieldErrors, generalError: "Failed to create terminal.", forbidden, locationMismatch };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create terminals.",
      forbidden,
      locationMismatch,
    };
  }

  if (code === "LOCATION_NOT_IN_TENANT") {
    locationMismatch = true;
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "You cannot create terminals for another tenant's location.",
      forbidden: true,
      locationMismatch,
    };
  }

  if (code === "TERMINAL_CODE_EXISTS") {
    fieldErrors.code =
      apiError?.message ?? "This terminal code is already in use for this location.";
    return { fieldErrors, generalError: null, forbidden, locationMismatch };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, locationMismatch };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to create terminal.",
    forbidden,
    locationMismatch,
  };
}

export function parseTerminalUpdateErrors(error: unknown): {
  fieldErrors: TerminalFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  locationMismatch: boolean;
} {
  const fieldErrors: TerminalFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let notFound = false;
  let locationMismatch = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update terminal.",
      forbidden,
      tenantMismatch,
      notFound,
      locationMismatch,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update terminals.",
      forbidden,
      tenantMismatch,
      notFound,
      locationMismatch,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify terminals from another tenant.",
      forbidden: true,
      tenantMismatch,
      notFound,
      locationMismatch,
    };
  }

  if (code === "LOCATION_NOT_IN_TENANT") {
    locationMismatch = true;
    return {
      fieldErrors,
      generalError:
        apiError?.message ?? "You cannot assign terminals to another tenant's location.",
      forbidden: true,
      tenantMismatch,
      notFound,
      locationMismatch,
    };
  }

  if (code === "TERMINAL_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Terminal does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      locationMismatch,
    };
  }

  if (code === "TERMINAL_CODE_EXISTS") {
    fieldErrors.code =
      apiError?.message ?? "This terminal code is already in use for this location.";
    return {
      fieldErrors,
      generalError: null,
      forbidden,
      tenantMismatch,
      notFound,
      locationMismatch,
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
      locationMismatch,
    };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? error.message ?? "Failed to update terminal.",
    forbidden,
    tenantMismatch,
    notFound,
    locationMismatch,
  };
}

export function parseTerminalFetchErrors(error: unknown): {
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  message: string | null;
} {
  if (!(error instanceof ApiError)) {
    return {
      forbidden: false,
      tenantMismatch: false,
      notFound: false,
      message: "Failed to load terminal.",
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      forbidden: true,
      tenantMismatch: false,
      notFound: false,
      message: apiError?.message ?? "You do not have permission to view this terminal.",
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      forbidden: true,
      tenantMismatch: true,
      notFound: false,
      message: apiError?.message ?? "You cannot access terminals from another tenant.",
    };
  }

  if (code === "TERMINAL_NOT_FOUND") {
    return {
      forbidden: false,
      tenantMismatch: false,
      notFound: true,
      message: apiError?.message ?? "Terminal does not exist.",
    };
  }

  return {
    forbidden: false,
    tenantMismatch: false,
    notFound: false,
    message: apiError?.message ?? error.message ?? "Failed to load terminal.",
  };
}

export function parseTerminalListErrors(error: unknown): { toastError: string | null } {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load terminals. Please try again." };
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
      toastError: apiError?.message ?? "Invalid type or status filter.",
    };
  }

  return {
    toastError: apiError?.message ?? error.message ?? "Failed to load terminals. Please try again.",
  };
}

export function parseTerminalStatusActionErrors(error: unknown): {
  message: string | null;
  notFound: boolean;
  forbidden: boolean;
  tenantMismatch: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update terminal status.",
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
      message: apiError?.message ?? "You do not have permission to modify terminals.",
      notFound: false,
      forbidden: true,
      tenantMismatch: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot modify terminals from another tenant.",
      notFound: false,
      forbidden: true,
      tenantMismatch: true,
    };
  }

  if (code === "TERMINAL_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Terminal does not exist.",
      notFound: true,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (code === "TERMINAL_ALREADY_INACTIVE" || code === "TERMINAL_ALREADY_ACTIVE") {
    return {
      message: apiError?.message ?? "Terminal status is already set to this value.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  if (code === "TERMINAL_IN_ACTIVE_USE") {
    return {
      message:
        apiError?.message ??
        "This terminal cannot be deactivated because it is currently in use.",
      notFound: false,
      forbidden: false,
      tenantMismatch: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update terminal status.",
    notFound: false,
    forbidden: false,
    tenantMismatch: false,
  };
}
