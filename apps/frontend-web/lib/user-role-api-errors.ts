import { ApiError } from "@/lib/api-client";

export type RoleFieldErrors = Record<string, string>;

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

function extractFieldErrors(apiError: ApiErrorPayload["error"]): RoleFieldErrors {
  const fieldErrors: RoleFieldErrors = {};

  for (const entry of apiError?.metadata?.fields ?? []) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseRoleCreateErrors(error: unknown): {
  fieldErrors: RoleFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  invalidPermission: boolean;
} {
  const fieldErrors: RoleFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let invalidPermission = false;

  if (!(error instanceof ApiError)) {
    return { fieldErrors, generalError: "Failed to create role.", forbidden, invalidPermission };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to create roles.",
      forbidden,
      invalidPermission,
    };
  }

  if (code === "ROLE_NAME_EXISTS") {
    fieldErrors.name = apiError?.message ?? "A role with this name already exists.";
    return { fieldErrors, generalError: null, forbidden, invalidPermission };
  }

  if (code === "ROLE_CODE_EXISTS") {
    fieldErrors.code = apiError?.message ?? "A role with this code already exists.";
    return { fieldErrors, generalError: null, forbidden, invalidPermission };
  }

  if (code === "INVALID_PERMISSION") {
    invalidPermission = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "One or more permissions are invalid.",
      forbidden,
      invalidPermission,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, invalidPermission };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to create role.",
    forbidden,
    invalidPermission,
  };
}

export function parseRoleFetchErrors(error: unknown): {
  message: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
} {
  if (!(error instanceof ApiError)) {
    return { message: "Failed to load role.", forbidden: false, tenantMismatch: false, notFound: false };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to view roles.",
      forbidden: true,
      tenantMismatch: false,
      notFound: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot access roles from another tenant.",
      forbidden: true,
      tenantMismatch: true,
      notFound: false,
    };
  }

  if (code === "ROLE_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Role does not exist.",
      forbidden: false,
      tenantMismatch: false,
      notFound: true,
    };
  }

  return {
    message: apiError?.message ?? "Failed to load role.",
    forbidden: false,
    tenantMismatch: false,
    notFound: false,
  };
}

export function parseRoleUpdateErrors(error: unknown): {
  fieldErrors: RoleFieldErrors;
  generalError: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  invalidPermission: boolean;
  systemRole: boolean;
} {
  const fieldErrors: RoleFieldErrors = {};
  let generalError: string | null = null;
  let forbidden = false;
  let tenantMismatch = false;
  let notFound = false;
  let invalidPermission = false;
  let systemRole = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      generalError: "Failed to update role.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidPermission,
      systemRole,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    forbidden = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You do not have permission to update roles.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidPermission,
      systemRole,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "You cannot modify roles from another tenant.",
      forbidden: true,
      tenantMismatch,
      notFound,
      invalidPermission,
      systemRole,
    };
  }

  if (code === "ROLE_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "Role does not exist.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidPermission,
      systemRole,
    };
  }

  if (code === "SYSTEM_ROLE_CANNOT_BE_MODIFIED") {
    systemRole = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "System roles cannot be modified.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidPermission,
      systemRole,
    };
  }

  if (code === "ROLE_NAME_EXISTS") {
    fieldErrors.name = apiError?.message ?? "A role with this name already exists.";
    return { fieldErrors, generalError: null, forbidden, tenantMismatch, notFound, invalidPermission, systemRole };
  }

  if (code === "ROLE_CODE_EXISTS") {
    fieldErrors.code = apiError?.message ?? "A role with this code already exists.";
    return { fieldErrors, generalError: null, forbidden, tenantMismatch, notFound, invalidPermission, systemRole };
  }

  if (code === "INVALID_PERMISSION") {
    invalidPermission = true;
    return {
      fieldErrors,
      generalError: apiError?.message ?? "One or more permissions are invalid.",
      forbidden,
      tenantMismatch,
      notFound,
      invalidPermission,
      systemRole,
    };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, generalError, forbidden, tenantMismatch, notFound, invalidPermission, systemRole };
  }

  return {
    fieldErrors,
    generalError: apiError?.message ?? "Failed to update role.",
    forbidden,
    tenantMismatch,
    notFound,
    invalidPermission,
    systemRole,
  };
}

export function parseRoleListErrors(error: unknown): { toastError: string | null } {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load roles. Please try again." };
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
    toastError: apiError?.message ?? error.message ?? "Failed to load roles. Please try again.",
  };
}

export function parseRoleDeleteErrors(error: unknown): {
  message: string | null;
  forbidden: boolean;
  tenantMismatch: boolean;
  notFound: boolean;
  systemRole: boolean;
  assignedToUsers: boolean;
} {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to delete role.",
      forbidden: false,
      tenantMismatch: false,
      notFound: false,
      systemRole: false,
      assignedToUsers: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "FORBIDDEN") {
    return {
      message: apiError?.message ?? "You do not have permission to delete roles.",
      forbidden: true,
      tenantMismatch: false,
      notFound: false,
      systemRole: false,
      assignedToUsers: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return {
      message: apiError?.message ?? "You cannot delete roles from another tenant.",
      forbidden: true,
      tenantMismatch: true,
      notFound: false,
      systemRole: false,
      assignedToUsers: false,
    };
  }

  if (code === "ROLE_NOT_FOUND") {
    return {
      message: apiError?.message ?? "Role does not exist.",
      forbidden: false,
      tenantMismatch: false,
      notFound: true,
      systemRole: false,
      assignedToUsers: false,
    };
  }

  if (code === "SYSTEM_ROLE_CANNOT_BE_DELETED") {
    return {
      message: apiError?.message ?? "System roles cannot be deleted.",
      forbidden: false,
      tenantMismatch: false,
      notFound: false,
      systemRole: true,
      assignedToUsers: false,
    };
  }

  if (code === "ROLE_ASSIGNED_TO_USERS") {
    return {
      message: apiError?.message ?? "This role cannot be deleted because it is assigned to users.",
      forbidden: false,
      tenantMismatch: false,
      notFound: false,
      systemRole: false,
      assignedToUsers: true,
    };
  }

  return {
    message: apiError?.message ?? "Failed to delete role.",
    forbidden: false,
    tenantMismatch: false,
    notFound: false,
    systemRole: false,
    assignedToUsers: false,
  };
}
