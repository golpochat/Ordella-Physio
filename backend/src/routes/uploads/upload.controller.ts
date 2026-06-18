import type { Request, Response } from "express";
import { ValidationError } from "../../utils/api-error";
import {
  assertFileStorageScanOk,
  forwardUploadToFileStorage,
} from "../../integrations/file-storage.client";

function getAuthorizationHeader(request: Request): string {
  const header = request.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new ValidationError("Authorization header is required.");
  }

  return header;
}

export const uploadController = {
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

    assertFileStorageScanOk(result);

    response.status(201).json({
      fileId: result.fileId ?? result.file?.id,
      fileName: result.fileName ?? result.file?.filename,
      mimeType: result.mimeType ?? result.file?.mimeType,
      size: result.size ?? result.file?.sizeBytes,
      signedUrl: result.signedUrl ?? result.accessUrl ?? null,
      scanResult: result.scanResult ?? "OK",
    });
  },
};
