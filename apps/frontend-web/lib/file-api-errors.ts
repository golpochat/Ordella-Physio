import { getApiErrorCode } from "@/lib/session-manager";

export type ParsedFileApiError = {
  toastError?: string;
  redirectForbidden?: boolean;
};

export function parseFileApiError(error: unknown): ParsedFileApiError {
  const code = getApiErrorCode(error);

  if (code === "FORBIDDEN" || code === "TENANT_MISMATCH") {
    return { redirectForbidden: true };
  }

  if (code === "VIRUS_DETECTED") {
    return { toastError: "The uploaded file contains a virus." };
  }

  if (code === "FILE_TOO_LARGE") {
    return { toastError: "File exceeds the maximum allowed size." };
  }

  if (code === "FILE_ALREADY_DELETED") {
    return { toastError: "This file has already been deleted." };
  }

  if (code === "INVALID_DELETE_STATE") {
    return { toastError: "File must be soft-deleted before permanent deletion." };
  }

  if (code === "VALIDATION_ERROR") {
    return { toastError: "The uploaded file is invalid." };
  }

  if (code === "FILE_NOT_FOUND") {
    return { toastError: "File does not exist." };
  }

  if (code === "STORAGE_ERROR") {
    return { toastError: "File storage operation failed." };
  }

  if (code === "CDN_DISABLED") {
    return { toastError: "CDN access is not enabled." };
  }

  if (code === "UNSUPPORTED_IMAGE_TYPE") {
    return { toastError: "This file type cannot be transformed." };
  }

  return { toastError: "Unable to process the file request." };
}
