import type { Request, Response } from "express";
import { ForbiddenError, ValidationError } from "../../utils/api-error";
import {
  assertFileStorageScanOk,
  forwardUploadToFileStorage,
} from "../../integrations/file-storage.client";
import {
  stripExifFromImageBuffer,
  validateAndScanUpload,
} from "../../modules/security/file-upload";
import { logSecurityEvent } from "../../modules/security/security-events.service";

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

    const file = request.file;
    let buffer = file.buffer;

    const validation = await validateAndScanUpload({
      fileName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      buffer,
    });

    if (!validation.ok) {
      logSecurityEvent({
        type: "virus_scan",
        message: validation.reason,
        req: request,
        tenantId: request.tenantId,
        userId: request.user?.id,
        metadata: {
          fileName: file.originalname,
          mimeType: file.mimetype,
        },
      });
      throw new ForbiddenError(validation.reason);
    }

    buffer = stripExifFromImageBuffer(buffer, file.mimetype);

    const result = await forwardUploadToFileStorage({
      authorization: getAuthorizationHeader(request),
      tenantId: request.tenantId!,
      file: { ...file, buffer },
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
