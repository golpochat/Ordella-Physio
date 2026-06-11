import { ApiError } from "@/lib/api-client";

export type UserFieldErrors = Record<string, string>;

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

function extractFieldErrors(apiError: ApiErrorPayload["error"]): UserFieldErrors {
  const fieldErrors: UserFieldErrors = {};
  const fields = apiError?.metadata?.fields ?? [];

  for (const entry of fields) {
    if (entry.field && entry.message) {
      fieldErrors[entry.field] = entry.message;
    }
  }

  return fieldErrors;
}

export function parseUserCreateErrors(error: unknown): {
  fieldErrors: UserFieldErrors;
  toastError: string | null;
  generalError: string | null;
} {
  const fieldErrors: UserFieldErrors = {};
  let toastError: string | null = null;
  let generalError: string | null = null;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      toastError: null,
      generalError: "Failed to create user. Please try again.",
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "EMAIL_EXISTS") {
    fieldErrors.email =
      apiError?.message ?? "A user with this email already exists in this tenant.";
    return { fieldErrors, toastError: null, generalError: null };
  }

  if (code === "ROLE_NOT_ALLOWED") {
    toastError =
      apiError?.message ?? "You cannot create a user with a higher role than yours.";
    return { fieldErrors, toastError, generalError: null };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, toastError: null, generalError };
  }

  return {
    fieldErrors,
    toastError: null,
    generalError: apiError?.message ?? error.message ?? "Failed to create user. Please try again.",
  };
}

export type UserUpdateErrorResult = {
  fieldErrors: UserFieldErrors;
  toastError: string | null;
  generalError: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
};

export function parseUserUpdateErrors(error: unknown): UserUpdateErrorResult {
  const fieldErrors: UserFieldErrors = {};
  let toastError: string | null = null;
  let generalError: string | null = null;
  let notFound = false;
  let tenantMismatch = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      toastError: null,
      generalError: "Failed to update user. Please try again.",
      notFound,
      tenantMismatch,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "USER_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      toastError: apiError?.message ?? "User not found.",
      generalError: null,
      notFound,
      tenantMismatch,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return { fieldErrors, toastError: null, generalError: null, notFound, tenantMismatch };
  }

  if (code === "EMAIL_EXISTS") {
    fieldErrors.email =
      apiError?.message ?? "A user with this email already exists in this tenant.";
    return { fieldErrors, toastError: null, generalError: null, notFound, tenantMismatch };
  }

  if (code === "ROLE_NOT_ALLOWED") {
    toastError = apiError?.message ?? "You cannot assign this role.";
    return { fieldErrors, toastError, generalError: null, notFound, tenantMismatch };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, toastError: null, generalError, notFound, tenantMismatch };
  }

  return {
    fieldErrors,
    toastError: null,
    generalError: apiError?.message ?? error.message ?? "Failed to update user. Please try again.",
    notFound,
    tenantMismatch,
  };
}

export type UserStatusActionErrorResult = {
  message: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
};

export function parseUserStatusActionErrors(error: unknown): UserStatusActionErrorResult {
  if (!(error instanceof ApiError)) {
    return {
      message: "Failed to update user status. Please try again.",
      notFound: false,
      tenantMismatch: false,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "USER_NOT_FOUND") {
    return {
      message: apiError?.message ?? "User not found.",
      notFound: true,
      tenantMismatch: false,
    };
  }

  if (code === "TENANT_MISMATCH") {
    return { message: null, notFound: false, tenantMismatch: true };
  }

  if (code === "USER_ALREADY_DISABLED") {
    return {
      message: apiError?.message ?? "User already disabled.",
      notFound: false,
      tenantMismatch: false,
    };
  }

  if (code === "USER_ALREADY_ACTIVE") {
    return {
      message: apiError?.message ?? "User already active.",
      notFound: false,
      tenantMismatch: false,
    };
  }

  if (code === "ROLE_NOT_ALLOWED") {
    return {
      message: apiError?.message ?? "You cannot modify this user.",
      notFound: false,
      tenantMismatch: false,
    };
  }

  if (code === "CANNOT_DISABLE_SYSTEM_USER") {
    return {
      message: apiError?.message ?? "System users cannot be disabled.",
      notFound: false,
      tenantMismatch: false,
    };
  }

  return {
    message: apiError?.message ?? error.message ?? "Failed to update user status. Please try again.",
    notFound: false,
    tenantMismatch: false,
  };
}

export type UserPasswordErrorResult = {
  fieldErrors: UserFieldErrors;
  toastError: string | null;
  generalError: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
};

export function parseUserPasswordErrors(
  error: unknown,
  fallbackMessage: string,
): UserPasswordErrorResult {
  const fieldErrors: UserFieldErrors = {};
  let toastError: string | null = null;
  let generalError: string | null = null;
  let notFound = false;
  let tenantMismatch = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      toastError: null,
      generalError: fallbackMessage,
      notFound,
      tenantMismatch,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "USER_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      toastError: apiError?.message ?? "User not found.",
      generalError: null,
      notFound,
      tenantMismatch,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return { fieldErrors, toastError: null, generalError: null, notFound, tenantMismatch };
  }

  if (code === "INVALID_CURRENT_PASSWORD") {
    fieldErrors.currentPassword =
      apiError?.message ?? "Your current password is incorrect.";
    return { fieldErrors, toastError: null, generalError: null, notFound, tenantMismatch };
  }

  if (code === "ROLE_NOT_ALLOWED") {
    toastError = apiError?.message ?? "You cannot modify this user.";
    return { fieldErrors, toastError, generalError: null, notFound, tenantMismatch };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, toastError: null, generalError, notFound, tenantMismatch };
  }

  return {
    fieldErrors,
    toastError: null,
    generalError: apiError?.message ?? error.message ?? fallbackMessage,
    notFound,
    tenantMismatch,
  };
}

export type UserRoleChangeErrorResult = {
  fieldErrors: UserFieldErrors;
  toastError: string | null;
  generalError: string | null;
  notFound: boolean;
  tenantMismatch: boolean;
};

export function parseUserRoleChangeErrors(error: unknown): UserRoleChangeErrorResult {
  const fieldErrors: UserFieldErrors = {};
  let toastError: string | null = null;
  let generalError: string | null = null;
  let notFound = false;
  let tenantMismatch = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      toastError: null,
      generalError: "Failed to update user role. Please try again.",
      notFound,
      tenantMismatch,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "USER_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      toastError: apiError?.message ?? "User not found.",
      generalError: null,
      notFound,
      tenantMismatch,
    };
  }

  if (code === "TENANT_MISMATCH") {
    tenantMismatch = true;
    return { fieldErrors, toastError: null, generalError: null, notFound, tenantMismatch };
  }

  if (code === "ROLE_NOT_ALLOWED") {
    toastError = apiError?.message ?? "You cannot assign this role.";
    return { fieldErrors, toastError, generalError: null, notFound, tenantMismatch };
  }

  if (code === "CANNOT_MODIFY_SYSTEM_USER") {
    toastError = apiError?.message ?? "System users cannot be modified.";
    return { fieldErrors, toastError, generalError: null, notFound, tenantMismatch };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, toastError: null, generalError, notFound, tenantMismatch };
  }

  return {
    fieldErrors,
    toastError: null,
    generalError: apiError?.message ?? error.message ?? "Failed to update user role. Please try again.",
    notFound,
    tenantMismatch,
  };
}

export type UserProfileErrorResult = {
  fieldErrors: UserFieldErrors;
  toastError: string | null;
  generalError: string | null;
  notFound: boolean;
  forbiddenField: boolean;
};

export function parseUserProfileErrors(error: unknown): UserProfileErrorResult {
  const fieldErrors: UserFieldErrors = {};
  let toastError: string | null = null;
  let generalError: string | null = null;
  let notFound = false;
  let forbiddenField = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      toastError: null,
      generalError: "Failed to update profile. Please try again.",
      notFound,
      forbiddenField,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "USER_NOT_FOUND") {
    notFound = true;
    return {
      fieldErrors,
      toastError: apiError?.message ?? "User not found.",
      generalError: null,
      notFound,
      forbiddenField,
    };
  }

  if (code === "FORBIDDEN_FIELD") {
    forbiddenField = true;
    toastError = apiError?.message ?? "You cannot modify this field.";
    return { fieldErrors, toastError, generalError: null, notFound, forbiddenField };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, toastError: null, generalError, notFound, forbiddenField };
  }

  return {
    fieldErrors,
    toastError: null,
    generalError: apiError?.message ?? error.message ?? "Failed to update profile. Please try again.",
    notFound,
    forbiddenField,
  };
}

export type UserAvatarErrorResult = {
  fieldErrors: UserFieldErrors;
  toastError: string | null;
  generalError: string | null;
  notFound: boolean;
};

export function parseUserAvatarErrors(error: unknown): UserAvatarErrorResult {
  const fieldErrors: UserFieldErrors = {};
  let toastError: string | null = null;
  let generalError: string | null = null;
  let notFound = false;

  if (!(error instanceof ApiError)) {
    return {
      fieldErrors,
      toastError: null,
      generalError: "Failed to update avatar. Please try again.",
      notFound,
    };
  }

  const payload = error.payload as ApiErrorPayload | undefined;
  const apiError = payload?.error;
  const code = apiError?.code;

  if (code === "USER_NOT_FOUND") {
    notFound = true;
    return { fieldErrors, toastError: null, generalError: null, notFound };
  }

  if (code === "INVALID_FILE") {
    fieldErrors.avatar = apiError?.message ?? "Only image files up to 2MB are allowed.";
    return { fieldErrors, toastError: null, generalError: null, notFound };
  }

  if (code === "UPLOAD_FAILED") {
    toastError = apiError?.message ?? "Could not upload avatar. Try again.";
    return { fieldErrors, toastError, generalError: null, notFound };
  }

  if (code === "VALIDATION_ERROR") {
    Object.assign(fieldErrors, extractFieldErrors(apiError));

    if (Object.keys(fieldErrors).length === 0) {
      generalError = apiError?.message ?? "Please fix the highlighted fields and try again.";
    }

    return { fieldErrors, toastError: null, generalError, notFound };
  }

  return {
    fieldErrors,
    toastError: apiError?.message ?? error.message ?? "Failed to update avatar. Please try again.",
    generalError: null,
    notFound,
  };
}

export function parseUserListErrors(error: unknown): { toastError: string | null } {
  if (!(error instanceof ApiError)) {
    return { toastError: "Failed to load users. Please try again." };
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
      toastError: apiError?.message ?? "Invalid role or status filter.",
    };
  }

  return {
    toastError: apiError?.message ?? error.message ?? "Failed to load users. Please try again.",
  };
}
