import { env } from "../config";

const FILE_STORAGE_PREFIX = "file-storage:";

export type FileStorageUploadResult = {
  fileId?: string;
  fileName?: string;
  mimeType?: string;
  size?: number;
  s3Key?: string;
  signedUrl?: string | null;
  file?: {
    id: string;
    filename: string;
    mimeType: string;
    sizeBytes: number;
    storageKey?: string;
    accessUrl?: string;
  };
  accessUrl?: string;
  message?: string;
};

export type ForwardedUploadInput = {
  authorization: string;
  tenantId: string;
  file: Express.Multer.File;
  fields: Record<string, string | undefined>;
};

function getFileStorageBaseUrl(): string {
  return (env.FILE_STORAGE_SERVICE_URL ?? "http://localhost:3071").replace(/\/$/, "");
}

export function buildFileStorageReference(fileId: string): string {
  return `${FILE_STORAGE_PREFIX}${fileId}`;
}

export function parseFileStorageReference(storagePath: string): string | null {
  if (!storagePath.startsWith(FILE_STORAGE_PREFIX)) {
    return null;
  }

  const fileId = storagePath.slice(FILE_STORAGE_PREFIX.length).trim();
  return fileId || null;
}

export async function forwardUploadToFileStorage(
  input: ForwardedUploadInput,
): Promise<FileStorageUploadResult> {
  const formData = new FormData();
  const blob = new Blob([input.file.buffer], { type: input.file.mimetype });
  formData.append("file", blob, input.file.originalname);

  for (const [key, value] of Object.entries(input.fields)) {
    if (value !== undefined && value !== "") {
      formData.append(key, value);
    }
  }

  const response = await fetch(`${getFileStorageBaseUrl()}/upload`, {
    method: "POST",
    headers: {
      authorization: input.authorization,
      [env.TENANT_HEADER]: input.tenantId,
    },
    body: formData,
  });

  const payload = (await response.json().catch(() => null)) as
    | FileStorageUploadResult
    | { message?: string; error?: { message?: string } }
    | null;

  if (!response.ok) {
    const message =
      (payload as { message?: string } | null)?.message ??
      (payload as { error?: { message?: string } } | null)?.error?.message ??
      "File upload failed.";
    const error = new Error(message);
    (error as Error & { statusCode?: number }).statusCode = response.status;
    throw error;
  }

  return payload as FileStorageUploadResult;
}

export async function forwardFileStorageRequest(
  method: string,
  path: string,
  options: {
    authorization?: string;
    tenantId?: string;
    body?: unknown;
    headers?: Record<string, string>;
  } = {},
): Promise<globalThis.Response> {
  const headers = new Headers(options.headers);
  if (options.authorization) {
    headers.set("authorization", options.authorization);
  }
  if (options.tenantId) {
    headers.set(env.TENANT_HEADER, options.tenantId);
  }

  return fetch(`${getFileStorageBaseUrl()}${path}`, {
    method,
    headers,
    body: options.body as FormData | string | undefined,
  });
}

export async function uploadBufferToFileStorageInternal(input: {
  tenantId: string;
  ownerUserId: string;
  actorRole?: string;
  filename: string;
  mimeType: string;
  buffer: Buffer;
  entityType?: string;
  entityId?: string;
}): Promise<FileStorageUploadResult> {
  const response = await fetch(`${getFileStorageBaseUrl()}/files/internal/upload`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      tenantId: input.tenantId,
      ownerUserId: input.ownerUserId,
      actorRole: input.actorRole,
      filename: input.filename,
      mimeType: input.mimeType,
      contentBase64: input.buffer.toString("base64"),
      entityType: input.entityType,
      entityId: input.entityId,
    }),
  });

  const payload = (await response.json().catch(() => null)) as FileStorageUploadResult | null;
  if (!response.ok || !payload) {
    const message =
      (payload as { message?: string } | null)?.message ?? "File upload failed.";
    const error = new Error(message);
    (error as Error & { statusCode?: number }).statusCode = response.status;
    throw error;
  }

  return payload;
}
