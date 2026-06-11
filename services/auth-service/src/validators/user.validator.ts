import { EMAIL_REGEX, PHONE_REGEX } from "@ordella/validation";
import { isSecurityRole } from "@ordella/security";
import {
  ALLOWED_AVATAR_MIME_TYPES,
  MAX_AVATAR_BYTES,
  type AvatarUploadFile,
} from "@/utils/fileUpload";
import type {
  AdminResetPasswordPayload,
  ChangePasswordPayload,
  ChangeRolePayload,
  CreateUserPayload,
  SelfUpdatePayload,
  UpdateUserPayload,
  UserStatus,
  UserValidationFieldError,
} from "@/models/User";
import { RESTRICTED_SELF_UPDATE_FIELDS, USER_ROLES, USER_STATUSES } from "@/models/User";

export type UserValidationResult =
  | { valid: true; payload: CreateUserPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: UserValidationFieldError[] };

export type UserUpdateValidationResult =
  | { valid: true; payload: UpdateUserPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: UserValidationFieldError[] };

export type AdminResetPasswordValidationResult =
  | { valid: true; payload: AdminResetPasswordPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: UserValidationFieldError[] };

export type ChangePasswordValidationResult =
  | { valid: true; payload: ChangePasswordPayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: UserValidationFieldError[] };

export type ChangeRoleValidationResult =
  | { valid: true; payload: ChangeRolePayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: UserValidationFieldError[] };

export type SelfUpdateValidationResult =
  | { valid: true; payload: SelfUpdatePayload }
  | { valid: false; error: "VALIDATION_ERROR"; fields: UserValidationFieldError[] }
  | { valid: false; error: "FORBIDDEN_FIELD"; field: string };

function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}

function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateCreateUser(payload: unknown): UserValidationResult {
  const fields: UserValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as Record<string, unknown>;
  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = typeof body.role === "string" ? body.role.trim().toUpperCase() : "";
  const phoneRaw = body.phone;

  if (!firstName) {
    fields.push({ field: "firstName", message: "First name is required." });
  } else if (firstName.length < 2) {
    fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
  }

  if (!lastName) {
    fields.push({ field: "lastName", message: "Last name is required." });
  } else if (lastName.length < 2) {
    fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
  }

  if (!email) {
    fields.push({ field: "email", message: "Email is required." });
  } else if (!isValidEmail(email)) {
    fields.push({ field: "email", message: "Enter a valid email." });
  }

  if (!role) {
    fields.push({ field: "role", message: "Role is required." });
  } else if (!isSecurityRole(role) || !(USER_ROLES as readonly string[]).includes(role)) {
    fields.push({ field: "role", message: "Role must be a valid role." });
  }

  if (!password) {
    fields.push({ field: "password", message: "Password is required." });
  } else if (password.length < 8) {
    fields.push({ field: "password", message: "Password must be at least 8 characters." });
  }

  if (phoneRaw !== undefined && phoneRaw !== null && phoneRaw !== "") {
    const phone = typeof phoneRaw === "string" ? phoneRaw.trim() : "";
    if (!phone) {
      fields.push({ field: "phone", message: "Enter a valid phone number." });
    } else if (!isValidPhone(phone)) {
      fields.push({ field: "phone", message: "Enter a valid phone number." });
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  const phone =
    phoneRaw !== undefined && phoneRaw !== null && phoneRaw !== ""
      ? String(phoneRaw).trim()
      : undefined;

  return {
    valid: true,
    payload: {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      role: role as CreateUserPayload["role"],
      password,
    },
  };
}

export function validateUpdateUser(payload: unknown): UserUpdateValidationResult {
  const fields: UserValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as Record<string, unknown>;
  const result: UpdateUserPayload = {};

  if ("firstName" in body) {
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    if (!firstName) {
      fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
    } else if (firstName.length < 2) {
      fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
    } else {
      result.firstName = firstName;
    }
  }

  if ("lastName" in body) {
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    if (!lastName) {
      fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
    } else if (lastName.length < 2) {
      fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
    } else {
      result.lastName = lastName;
    }
  }

  if ("email" in body) {
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      fields.push({ field: "email", message: "Enter a valid email." });
    } else if (!isValidEmail(email)) {
      fields.push({ field: "email", message: "Enter a valid email." });
    } else {
      result.email = email.toLowerCase();
    }
  }

  if ("phone" in body) {
    const phoneRaw = body.phone;
    if (phoneRaw === null || phoneRaw === "") {
      result.phone = null;
    } else if (typeof phoneRaw === "string") {
      const phone = phoneRaw.trim();
      if (!phone || !isValidPhone(phone)) {
        fields.push({ field: "phone", message: "Enter a valid phone number." });
      } else {
        result.phone = phone;
      }
    } else {
      fields.push({ field: "phone", message: "Enter a valid phone number." });
    }
  }

  if ("role" in body) {
    const role = typeof body.role === "string" ? body.role.trim().toUpperCase() : "";
    if (!role) {
      fields.push({ field: "role", message: "Role must be a valid role." });
    } else if (!isSecurityRole(role) || !(USER_ROLES as readonly string[]).includes(role)) {
      fields.push({ field: "role", message: "Role must be a valid role." });
    } else {
      result.role = role as UpdateUserPayload["role"];
    }
  }

  if ("status" in body) {
    const status = typeof body.status === "string" ? body.status.trim().toUpperCase() : "";
    if (!(USER_STATUSES as readonly string[]).includes(status)) {
      fields.push({ field: "status", message: "Status must be ACTIVE or DISABLED." });
    } else {
      result.status = status as UserStatus;
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, payload: result };
}

export function validateAdminResetPassword(payload: unknown): AdminResetPasswordValidationResult {
  const fields: UserValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as Record<string, unknown>;
  const password = typeof body.password === "string" ? body.password : "";

  if (!password) {
    fields.push({ field: "password", message: "Password is required." });
  } else if (password.length < 8) {
    fields.push({ field: "password", message: "Password must be at least 8 characters." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, payload: { password } };
}

export function validateChangePassword(payload: unknown): ChangePasswordValidationResult {
  const fields: UserValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as Record<string, unknown>;
  const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";

  if (!currentPassword) {
    fields.push({ field: "currentPassword", message: "Current password is required." });
  }

  if (!newPassword) {
    fields.push({ field: "newPassword", message: "New password must be at least 8 characters." });
  } else if (newPassword.length < 8) {
    fields.push({ field: "newPassword", message: "New password must be at least 8 characters." });
  }

  if (!confirmPassword) {
    fields.push({ field: "confirmPassword", message: "Passwords do not match." });
  } else if (newPassword && newPassword !== confirmPassword) {
    fields.push({ field: "confirmPassword", message: "Passwords do not match." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return {
    valid: true,
    payload: { currentPassword, newPassword, confirmPassword },
  };
}

export function validateChangeRole(payload: unknown): ChangeRoleValidationResult {
  const fields: UserValidationFieldError[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as Record<string, unknown>;
  const role = typeof body.role === "string" ? body.role.trim().toUpperCase() : "";

  if (!role) {
    fields.push({ field: "role", message: "Role is required." });
  } else if (!isSecurityRole(role) || !(USER_ROLES as readonly string[]).includes(role)) {
    fields.push({ field: "role", message: "Invalid role." });
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, payload: { role: role as ChangeRolePayload["role"] } };
}

export function validateSelfUpdate(payload: unknown): SelfUpdateValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const body = payload as Record<string, unknown>;

  for (const field of RESTRICTED_SELF_UPDATE_FIELDS) {
    if (field in body) {
      return { valid: false, error: "FORBIDDEN_FIELD", field };
    }
  }

  const fields: UserValidationFieldError[] = [];
  const result: SelfUpdatePayload = {};

  if ("firstName" in body) {
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    if (!firstName || firstName.length < 2) {
      fields.push({ field: "firstName", message: "First name must be at least 2 characters." });
    } else {
      result.firstName = firstName;
    }
  }

  if ("lastName" in body) {
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    if (!lastName || lastName.length < 2) {
      fields.push({ field: "lastName", message: "Last name must be at least 2 characters." });
    } else {
      result.lastName = lastName;
    }
  }

  if ("phone" in body) {
    const phoneRaw = body.phone;
    if (phoneRaw === null || phoneRaw === "") {
      result.phone = null;
    } else if (typeof phoneRaw === "string") {
      const phone = phoneRaw.trim();
      if (!phone || !isValidPhone(phone)) {
        fields.push({ field: "phone", message: "Enter a valid phone number." });
      } else {
        result.phone = phone;
      }
    } else {
      fields.push({ field: "phone", message: "Enter a valid phone number." });
    }
  }

  if ("avatarUrl" in body) {
    const avatarRaw = body.avatarUrl;
    if (avatarRaw === null || avatarRaw === "") {
      result.avatarUrl = null;
    } else if (typeof avatarRaw === "string") {
      const avatarUrl = avatarRaw.trim();
      if (!avatarUrl || !isValidUrl(avatarUrl)) {
        fields.push({ field: "avatarUrl", message: "Enter a valid URL." });
      } else {
        result.avatarUrl = avatarUrl;
      }
    } else {
      fields.push({ field: "avatarUrl", message: "Enter a valid URL." });
    }
  }

  if (fields.length > 0) {
    return { valid: false, error: "VALIDATION_ERROR", fields };
  }

  return { valid: true, payload: result };
}

export type AvatarValidationResult =
  | { valid: true; file: AvatarUploadFile }
  | { valid: false; error: "VALIDATION_ERROR"; fields: UserValidationFieldError[] }
  | { valid: false; error: "INVALID_FILE" };

function hasAllowedAvatarExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return (
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".webp")
  );
}

export function validateAvatarUpload(
  file: AvatarUploadFile | undefined,
): AvatarValidationResult {
  if (!file || !file.buffer?.length) {
    return {
      valid: false,
      error: "VALIDATION_ERROR",
      fields: [{ field: "avatar", message: "Avatar image is required." }],
    };
  }

  if (file.size > MAX_AVATAR_BYTES) {
    return { valid: false, error: "INVALID_FILE" };
  }

  if (!ALLOWED_AVATAR_MIME_TYPES.includes(file.mimetype as (typeof ALLOWED_AVATAR_MIME_TYPES)[number])) {
    return { valid: false, error: "INVALID_FILE" };
  }

  if (!hasAllowedAvatarExtension(file.originalname)) {
    return { valid: false, error: "INVALID_FILE" };
  }

  return { valid: true, file };
}

const LIST_USERS_SORT_FIELDS = [
  "createdAt",
  "firstName",
  "lastName",
  "email",
  "role",
] as const;

export type ListUsersSortField = (typeof LIST_USERS_SORT_FIELDS)[number];

export type ListUsersQuery = {
  page: number;
  limit: number;
  search?: string;
  role?: (typeof USER_ROLES)[number];
  status?: UserStatus;
  sortBy: ListUsersSortField;
  sortOrder: "asc" | "desc";
};

export type ListUsersQueryResult =
  | { valid: true; payload: ListUsersQuery }
  | { valid: false; error: "INVALID_PAGINATION" }
  | { valid: false; error: "INVALID_FILTER" };

function readQueryString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return undefined;
}

function parsePositiveInt(
  value: unknown,
  fallback: number,
  required = false,
): number | null {
  if (value === undefined || value === null || value === "") {
    return required ? null : fallback;
  }

  const raw = readQueryString(value);
  if (raw === undefined || raw === "") {
    return required ? null : fallback;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export function parseListUsersQuery(query: unknown): ListUsersQueryResult {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const body = query as Record<string, unknown>;
  const hasPage = "page" in body && body.page !== undefined && body.page !== "";
  const hasLimit = "limit" in body && body.limit !== undefined && body.limit !== "";

  const page = parsePositiveInt(body.page, 1, hasPage);
  if (page === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const limit = parsePositiveInt(body.limit, 20, hasLimit);
  if (limit === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const safeLimit = Math.min(limit, 100);
  const searchRaw = readQueryString(body.search)?.trim();
  const search = searchRaw ? searchRaw : undefined;

  let role: ListUsersQuery["role"];
  const roleRaw = readQueryString(body.role)?.trim();
  if (roleRaw) {
    if (!USER_ROLES.includes(roleRaw as (typeof USER_ROLES)[number])) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    role = roleRaw as (typeof USER_ROLES)[number];
  }

  let status: ListUsersQuery["status"];
  const statusRaw = readQueryString(body.status)?.trim().toUpperCase();
  if (statusRaw) {
    if (!USER_STATUSES.includes(statusRaw as UserStatus)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    status = statusRaw as UserStatus;
  }

  const sortByRaw = readQueryString(body.sortBy)?.trim();
  let sortBy: ListUsersSortField = "createdAt";
  if (sortByRaw) {
    if (!LIST_USERS_SORT_FIELDS.includes(sortByRaw as ListUsersSortField)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortBy = sortByRaw as ListUsersSortField;
  }

  const sortOrderRaw = readQueryString(body.sortOrder)?.trim().toLowerCase();
  let sortOrder: "asc" | "desc" = "desc";
  if (sortOrderRaw) {
    if (sortOrderRaw !== "asc" && sortOrderRaw !== "desc") {
      return { valid: false, error: "INVALID_FILTER" };
    }
    sortOrder = sortOrderRaw;
  }

  return {
    valid: true,
    payload: {
      page,
      limit: safeLimit,
      search,
      role,
      status,
      sortBy,
      sortOrder,
    },
  };
}
