import type { UploadFilePayload } from "@/validators/file.types";
import { fileTooLargeError, fileValidationError, invalidPaginationError } from "@/utils/file-errors";
import { loadStorageConfig } from "@/config/storage.config";

export type UploadMultipartFile = {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalname: string;
};

export type ValidatedUploadInput = {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  entityType?: string;
  entityId?: string;
  expiresAt?: Date;
  isPublic: boolean;
  replaceFileId?: string;
};

export type FileAccessUrlQuery = {
  variant?: string;
  useCdn?: boolean;
};

export type ListFilesQuery = {
  page: number;
  limit: number;
  entityType?: string;
  entityId?: string;
  ownerUserId?: string;
  includeDeleted?: boolean;
};

function readString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return undefined;
}

export function validateUploadFile(
  payload: UploadFilePayload,
  file: UploadMultipartFile | undefined,
): ValidatedUploadInput {
  const fields: Array<{ field: string; message: string }> = [];

  if (!file) {
    fields.push({ field: "file", message: "File is required." });
  }

  const filename = file?.originalname?.trim() ?? "";
  const mimeType = file?.mimetype?.trim() ?? "";
  const sizeBytes = file?.size ?? 0;

  if (!filename) {
    fields.push({ field: "filename", message: "filename is required." });
  }

  if (!mimeType) {
    fields.push({ field: "mimeType", message: "mimeType is required." });
  }

  if (!sizeBytes || sizeBytes <= 0) {
    fields.push({ field: "sizeBytes", message: "sizeBytes must be greater than 0." });
  }

  const maxBytes = loadStorageConfig().maxFileBytes;
  if (sizeBytes > maxBytes) {
    throw fileTooLargeError();
  }

  const entityType = readString(payload.entityType);
  const entityId = readString(payload.entityId);
  const replaceFileId = readString(payload.replaceFileId);
  const expiresAtRaw = readString(payload.expiresAt);
  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : undefined;
  const isPublic = readString(payload.isPublic)?.toLowerCase() === "true";

  if (expiresAtRaw && Number.isNaN(expiresAt?.getTime())) {
    fields.push({ field: "expiresAt", message: "expiresAt must be a valid date." });
  }

  if (entityType && !entityId) {
    fields.push({ field: "entityId", message: "entityId is required when entityType is provided." });
  }

  if (entityId && !entityType) {
    fields.push({ field: "entityType", message: "entityType is required when entityId is provided." });
  }

  if (fields.length > 0) {
    throw fileValidationError(fields);
  }

  return {
    filename,
    mimeType,
    sizeBytes,
    entityType,
    entityId,
    expiresAt,
    isPublic,
    replaceFileId,
  };
}

function readBooleanQuery(value: unknown): boolean | undefined {
  const raw = readString(value);
  if (!raw) {
    return undefined;
  }

  return raw.toLowerCase() === "true";
}

export function parseFileAccessUrlQuery(
  query: Record<string, string | string[] | undefined>,
): FileAccessUrlQuery {
  const variant = readString(query.variant)?.toUpperCase();
  const useCdn = readBooleanQuery(query.useCdn);

  if (
    variant &&
    variant !== "ORIGINAL" &&
    variant !== "THUMB_SMALL" &&
    variant !== "THUMB_MEDIUM"
  ) {
    throw fileValidationError([{ field: "variant", message: "variant is invalid." }]);
  }

  return {
    variant,
    useCdn,
  };
}

export function validateInternalUploadPayload(payload: {
  tenantId?: string;
  ownerUserId?: string;
  filename?: string;
  mimeType?: string;
  contentBase64?: string;
  entityType?: string;
  entityId?: string;
  expiresAt?: string;
}) {
  const fields: Array<{ field: string; message: string }> = [];

  const tenantId = readString(payload.tenantId);
  const ownerUserId = readString(payload.ownerUserId);
  const filename = readString(payload.filename);
  const mimeType = readString(payload.mimeType);
  const contentBase64 = readString(payload.contentBase64);
  const entityType = readString(payload.entityType);
  const entityId = readString(payload.entityId);
  const expiresAtRaw = readString(payload.expiresAt);

  if (!tenantId) fields.push({ field: "tenantId", message: "tenantId is required." });
  if (!ownerUserId) fields.push({ field: "ownerUserId", message: "ownerUserId is required." });
  if (!filename) fields.push({ field: "filename", message: "filename is required." });
  if (!mimeType) fields.push({ field: "mimeType", message: "mimeType is required." });
  if (!contentBase64) fields.push({ field: "contentBase64", message: "contentBase64 is required." });

  if (entityType && !entityId) {
    fields.push({ field: "entityId", message: "entityId is required when entityType is provided." });
  }

  if (entityId && !entityType) {
    fields.push({ field: "entityType", message: "entityType is required when entityId is provided." });
  }

  let expiresAt: Date | undefined;
  if (expiresAtRaw) {
    expiresAt = new Date(expiresAtRaw);
    if (Number.isNaN(expiresAt.getTime())) {
      fields.push({ field: "expiresAt", message: "expiresAt must be a valid date." });
    }
  }

  if (fields.length > 0) {
    throw fileValidationError(fields);
  }

  const buffer = Buffer.from(contentBase64!, "base64");
  if (!buffer.length) {
    throw fileValidationError([{ field: "contentBase64", message: "contentBase64 is empty." }]);
  }

  const maxBytes = loadStorageConfig().maxFileBytes;
  if (buffer.length > maxBytes) {
    throw fileTooLargeError();
  }

  return {
    tenantId: tenantId!,
    ownerUserId: ownerUserId!,
    filename: filename!,
    mimeType: mimeType!,
    buffer,
    sizeBytes: buffer.length,
    entityType,
    entityId,
    expiresAt,
  };
}

export function parseListFilesQuery(query: Record<string, string | string[] | undefined>): ListFilesQuery {
  const page = Number(readString(query.page) ?? "1");
  const limit = Number(readString(query.limit) ?? "20");
  const entityType = readString(query.entityType);
  const entityId = readString(query.entityId);
  const ownerUserId = readString(query.ownerUserId);
  const includeDeleted = readString(query.includeDeleted)?.toLowerCase() === "true";

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw invalidPaginationError();
  }

  if (entityType && !entityId) {
    throw fileValidationError([
      { field: "entityId", message: "entityId is required when entityType is provided." },
    ]);
  }

  if (entityId && !entityType) {
    throw fileValidationError([
      { field: "entityType", message: "entityType is required when entityId is provided." },
    ]);
  }

  return {
    page,
    limit,
    entityType,
    entityId,
    ownerUserId,
    includeDeleted,
  };
}
