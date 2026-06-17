import type { Request, Response } from "express";
import { ValidationError } from "../../utils/api-error";
import {
  forwardFileStorageRequest,
  forwardUploadToFileStorage,
} from "../../integrations/file-storage.client";

function getAuthorizationHeader(request: Request): string {
  const header = request.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new ValidationError("Authorization header is required.");
  }

  return header;
}

async function relayJsonResponse(upstream: globalThis.Response, response: Response) {
  const body = await upstream.text();
  response.status(upstream.status);
  const contentType = upstream.headers.get("content-type");
  if (contentType) {
    response.setHeader("content-type", contentType);
  }
  response.send(body);
}

async function relaySanitizedFileJsonResponse(upstream: globalThis.Response, response: Response) {
  const body = await upstream.text();
  response.status(upstream.status);
  response.setHeader("content-type", "application/json");

  try {
    const parsed = JSON.parse(body) as unknown;
    response.send(JSON.stringify(sanitizeFileApiPayload(parsed)));
    return;
  } catch {
    response.send(body);
  }
}

function sanitizeFileApiPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  const record = payload as Record<string, unknown>;

  if (record.file && typeof record.file === "object") {
    const file = { ...(record.file as Record<string, unknown>) };
    delete file.storageKey;
    return { ...record, file };
  }

  if (Array.isArray(record.data)) {
    return {
      ...record,
      data: record.data.map((item) => {
        if (!item || typeof item !== "object") {
          return item;
        }

        const file = { ...(item as Record<string, unknown>) };
        delete file.storageKey;
        return file;
      }),
    };
  }

  return payload;
}

export const filesController = {
  async upload(request: Request, response: Response) {
    if (!request.file) {
      throw new ValidationError("File is required.");
    }

    const result = await forwardUploadToFileStorage({
      authorization: getAuthorizationHeader(request),
      tenantId: request.tenantId!,
      file: request.file,
      fields: {
        entityType: typeof request.body.entityType === "string" ? request.body.entityType : undefined,
        entityId: typeof request.body.entityId === "string" ? request.body.entityId : undefined,
        isPublic: typeof request.body.isPublic === "string" ? request.body.isPublic : undefined,
        replaceFileId:
          typeof request.body.replaceFileId === "string" ? request.body.replaceFileId : undefined,
        expiresAt: typeof request.body.expiresAt === "string" ? request.body.expiresAt : undefined,
      },
    });

    response.status(201).json({
      fileId: result.fileId ?? result.file?.id,
      fileName: result.fileName ?? result.file?.filename,
      mimeType: result.mimeType ?? result.file?.mimeType,
      size: result.size ?? result.file?.sizeBytes,
      signedUrl: result.signedUrl ?? result.accessUrl ?? null,
    });
  },

  async getSignedUrl(request: Request, response: Response) {
    const upstream = await forwardFileStorageRequest("GET", `/file/${request.params.id}/signed-url`, {
      authorization: getAuthorizationHeader(request),
      tenantId: request.tenantId!,
    });
    await relayJsonResponse(upstream, response);
  },

  async getMetadata(request: Request, response: Response) {
    const upstream = await forwardFileStorageRequest("GET", `/files/${request.params.id}`, {
      authorization: getAuthorizationHeader(request),
      tenantId: request.tenantId!,
    });
    await relaySanitizedFileJsonResponse(upstream, response);
  },

  async list(request: Request, response: Response) {
    const query = new URLSearchParams(request.query as Record<string, string>).toString();
    const upstream = await forwardFileStorageRequest("GET", `/files${query ? `?${query}` : ""}`, {
      authorization: getAuthorizationHeader(request),
      tenantId: request.tenantId!,
    });
    await relaySanitizedFileJsonResponse(upstream, response);
  },

  async getById(request: Request, response: Response) {
    return filesController.getSignedUrl(request, response);
  },

  async getAccessUrl(request: Request, response: Response) {
    return filesController.getSignedUrl(request, response);
  },

  async softDelete(request: Request, response: Response) {
    const upstream = await forwardFileStorageRequest("DELETE", `/files/${request.params.id}`, {
      authorization: getAuthorizationHeader(request),
      tenantId: request.tenantId!,
    });
    await relayJsonResponse(upstream, response);
  },

  async hardDelete(request: Request, response: Response) {
    const upstream = await forwardFileStorageRequest("DELETE", `/files/${request.params.id}/hard`, {
      authorization: getAuthorizationHeader(request),
      tenantId: request.tenantId!,
    });
    await relayJsonResponse(upstream, response);
  },
};
