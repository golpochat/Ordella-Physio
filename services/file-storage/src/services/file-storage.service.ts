import { createHash, randomUUID } from "crypto";

import { Injectable } from "@nestjs/common";

import type { Response } from "express";

import type { FileVariant } from "@/generated/prisma";

import { loadStorageConfig } from "@/config/storage.config";

import { AuditLogClient } from "@/integrations/audit-log.client";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";

import { toFileObjectResponse, type FileObjectRecord } from "@/models/FileObject";

import { FileObjectRepository } from "@/repositories/file-object.repository";

import { TRANSFORMABLE_IMAGE_MIME_TYPES } from "@/services/image-transform.service";

import { StorageProviderService } from "@/services/storage-provider.service";

import { ThumbnailService } from "@/services/thumbnail.service";

import { VirusScanService } from "@/services/virus-scan.service";

import { assertTenantAccess } from "@/utils/file-helpers";

import {

  cdnDisabledError,

  fileAlreadyDeletedError,

  fileNotFoundError,

  fileTenantMismatchError,

  invalidDeleteStateError,

  storageFailoverWarning,

} from "@/utils/file-errors";

import type { AuthenticatedFileUser } from "@/utils/file-user";

import { createSignedAccessToken, verifySignedAccessToken } from "@/utils/signed-url";

import {

  parseFileAccessUrlQuery,

  parseListFilesQuery,

  validateInternalUploadPayload,

  validateUploadFile,

  type UploadMultipartFile,

} from "@/validators/file.validator";

import type { InternalSoftDeleteByEntityPayload, UploadFilePayload } from "@/validators/file.types";



type PersistFileInput = {

  tenantId: string;

  ownerUserId: string;

  actorRole?: string;

  filename: string;

  mimeType: string;

  sizeBytes: number;

  buffer: Buffer;

  entityType?: string;

  entityId?: string;

  expiresAt?: Date;

  isPublic?: boolean;

  replaceFileId?: string;

};



@Injectable()

export class FileStorageService {

  private readonly config = loadStorageConfig();



  constructor(

    private readonly fileObjectRepository: FileObjectRepository,

    private readonly storageProviderService: StorageProviderService,

    private readonly virusScanService: VirusScanService,

    private readonly thumbnailService: ThumbnailService,

    private readonly auditLogClient: AuditLogClient,

    private readonly subscriptionBillingClient: SubscriptionBillingClient,

  ) {}



  async getTenantStorageUsageMb(tenantId: string) {

    if (!tenantId?.trim()) {

      return { storageMB: 0 };

    }



    const aggregate = await this.fileObjectRepository.sumSizeBytesByTenant(tenantId.trim());

    const storageMB = Math.ceil((aggregate._sum.sizeBytes ?? 0) / (1024 * 1024));

    return { storageMB };

  }



  async uploadFile(

    payload: UploadFilePayload,

    file: UploadMultipartFile | undefined,

    requestingUser: AuthenticatedFileUser,

  ) {

    const validated = validateUploadFile(payload, file);



    return this.persistUploadedFile({

      tenantId: requestingUser.tenantId,

      ownerUserId: requestingUser.userId,

      actorRole: requestingUser.role,

      filename: validated.filename,

      mimeType: validated.mimeType,

      sizeBytes: validated.sizeBytes,

      buffer: file!.buffer,

      entityType: validated.entityType,

      entityId: validated.entityId,

      expiresAt: validated.expiresAt,

      isPublic: validated.isPublic,

      replaceFileId: validated.replaceFileId,

    });

  }



  async uploadFileInternal(payload: Record<string, unknown>) {

    const validated = validateInternalUploadPayload(payload);



    return this.persistUploadedFile({

      tenantId: validated.tenantId,

      ownerUserId: validated.ownerUserId,

      actorRole: readOptionalString(payload.actorRole),

      filename: validated.filename,

      mimeType: validated.mimeType,

      sizeBytes: validated.sizeBytes,

      buffer: validated.buffer,

      entityType: validated.entityType,

      entityId: validated.entityId,

      expiresAt: validated.expiresAt,

      isPublic: readOptionalBoolean(payload.isPublic),

      replaceFileId: readOptionalString(payload.replaceFileId),

    });

  }



  async getFileMetadata(id: string, requestingUser: AuthenticatedFileUser) {

    const record = await this.requireActiveFile(id);

    assertTenantAccess(record.tenantId, requestingUser);

    return { file: toFileObjectResponse(record) };

  }



  async getFileAccessUrl(

    id: string,

    query: Record<string, string | string[] | undefined>,

    requestingUser: AuthenticatedFileUser,

  ) {

    const parsed = parseFileAccessUrlQuery(query);

    const record = await this.resolveAccessTarget(id, parsed.variant);

    assertTenantAccess(record.tenantId, requestingUser);



    if (parsed.useCdn && !this.config.cdn.enabled) {

      throw cdnDisabledError();

    }



    return this.buildAccessUrl(record, { forceCdn: parsed.useCdn });

  }



  async getFileVersions(id: string, requestingUser: AuthenticatedFileUser) {

    const record = await this.requireActiveFile(id);

    assertTenantAccess(record.tenantId, requestingUser);



    const versions = await this.collectVersionHistory(record);



    return {

      data: versions.map(toFileObjectResponse),

    };

  }



  async generateThumbnails(id: string, requestingUser: AuthenticatedFileUser) {

    const record = await this.requireActiveFile(id);

    assertTenantAccess(record.tenantId, requestingUser);



    const result = await this.thumbnailService.generateThumbnails(record);



    return {

      message: result.message,

      thumbnails: result.thumbnails.map(toFileObjectResponse),

    };

  }



  async listFiles(

    query: Record<string, string | string[] | undefined>,

    requestingUser: AuthenticatedFileUser,

  ) {

    const parsed = parseListFilesQuery(query);

    const result = await this.fileObjectRepository.list({

      tenantId: requestingUser.tenantId,

      entityType: parsed.entityType,

      entityId: parsed.entityId,

      ownerUserId: parsed.ownerUserId,

      includeDeleted: parsed.includeDeleted,

      variantsOnly: ["ORIGINAL"],

      page: parsed.page,

      limit: parsed.limit,

    });



    return {

      data: result.data.map(toFileObjectResponse),

      pagination: {

        page: parsed.page,

        limit: parsed.limit,

        total: result.total,

        totalPages: Math.max(1, Math.ceil(result.total / parsed.limit)),

      },

    };

  }



  async softDeleteFile(id: string, requestingUser: AuthenticatedFileUser) {

    const record = await this.requireFile(id);

    assertTenantAccess(record.tenantId, requestingUser);



    if (record.isDeleted) {

      throw fileAlreadyDeletedError();

    }



    const updated = await this.fileObjectRepository.update(id, {

      isDeleted: true,

      deletedAt: new Date(),

      deletedByUserId: requestingUser.userId,

    });



    void this.auditLogClient.logAction({

      tenantId: updated.tenantId,

      actorUserId: requestingUser.userId,

      actorRole: requestingUser.role,

      entityType: "FILE",

      entityId: updated.id,

      action: "FILE_SOFT_DELETE",

      metadata: {

        filename: updated.filename,

        entityType: updated.entityType,

        entityId: updated.entityId,

      },

    });



    return { message: "File deleted (soft delete).", file: toFileObjectResponse(updated) };

  }



  async softDeleteFileBySystem(id: string) {

    const record = await this.requireFile(id);

    if (record.isDeleted) {

      return { message: "File already deleted.", file: toFileObjectResponse(record) };

    }



    const updated = await this.fileObjectRepository.update(id, {

      isDeleted: true,

      deletedAt: new Date(),

      deletedByUserId: "system",

    });



    void this.auditLogClient.logAction({

      tenantId: updated.tenantId,

      actorUserId: "system",

      entityType: "FILE",

      entityId: updated.id,

      action: "FILE_SOFT_DELETE",

      metadata: {

        filename: updated.filename,

        reason: "expired",

        entityType: updated.entityType,

        entityId: updated.entityId,

      },

    });



    return { message: "File deleted (soft delete).", file: toFileObjectResponse(updated) };

  }



  async softDeleteFilesByEntity(payload: InternalSoftDeleteByEntityPayload) {

    const count = await this.fileObjectRepository.softDeleteByEntity(

      payload.tenantId,

      payload.entityType,

      payload.entityId,

      payload.deletedByUserId,

    );



    if (count > 0) {

      void this.auditLogClient.logAction({

        tenantId: payload.tenantId,

        actorUserId: payload.deletedByUserId,

        actorRole: payload.actorRole,

        entityType: payload.entityType,

        entityId: payload.entityId,

        action: "FILE_SOFT_DELETE",

        metadata: { count, scope: "entity" },

      });

    }



    return {

      count,

      message: `${count} file(s) soft-deleted.`,

    };

  }



  async hardDeleteFile(id: string, requestingUser?: AuthenticatedFileUser) {

    const record = await this.requireFile(id);



    if (requestingUser) {

      assertTenantAccess(record.tenantId, requestingUser);

    }



    if (!record.isDeleted) {

      throw invalidDeleteStateError();

    }



    await this.storageProviderService.deleteFile({

      provider: record.storageProvider,

      storageKey: record.storageKey,

    });



    await this.fileObjectRepository.deleteById(id);



    void this.auditLogClient.logAction({

      tenantId: record.tenantId,

      actorUserId: requestingUser?.userId ?? "system",

      actorRole: requestingUser?.role,

      entityType: "FILE",

      entityId: record.id,

      action: "FILE_HARD_DELETE",

      metadata: {

        filename: record.filename,

        entityType: record.entityType,

        entityId: record.entityId,

      },

    });



    return { message: "File permanently deleted." };

  }



  findSoftDeletedBefore(cutoff: Date) {

    return this.fileObjectRepository.findSoftDeletedBefore(cutoff);

  }



  findExpiredActiveFiles(before: Date) {

    return this.fileObjectRepository.findExpiredActive(before);

  }



  async streamFileBySignedToken(token: string, response: Response) {

    const payload = verifySignedAccessToken(token);

    const record = await this.requireFile(payload.fileId);



    if (record.isDeleted) {

      throw fileNotFoundError();

    }



    if (record.storageKey !== payload.storageKey) {

      throw fileNotFoundError();

    }



    response.setHeader("Content-Type", record.mimeType);

    response.setHeader("Content-Disposition", `inline; filename="${record.filename}"`);



    if (record.storageProvider === "LOCAL") {

      const stream = this.storageProviderService.createLocalReadStream(record.storageKey);

      await new Promise<void>((resolve, reject) => {

        stream.on("error", reject);

        stream.on("end", resolve);

        stream.pipe(response);

      });

      return;

    }



    throw fileNotFoundError();

  }



  private async persistUploadedFile(input: PersistFileInput) {

    await this.subscriptionBillingClient.enforceFileUpload(input.tenantId, input.sizeBytes);

    await this.virusScanService.scanBuffer(input.buffer);



    let version = 1;

    let previousVersionFileId: string | null = null;

    let entityType = input.entityType ?? null;

    let entityId = input.entityId ?? null;



    if (input.replaceFileId) {

      const previous = await this.requireActiveFile(input.replaceFileId);

      if (previous.tenantId !== input.tenantId) {
        throw fileTenantMismatchError();
      }



      await this.fileObjectRepository.update(previous.id, {

        entityType: null,

        entityId: null,

      });



      version = previous.version + 1;

      previousVersionFileId = previous.id;

      entityType = entityType ?? previous.entityType;

      entityId = entityId ?? previous.entityId;

    }



    const objectId = randomUUID();

    const storageKey = `tenant/${input.tenantId}/${objectId}/${input.filename}`;

    const checksum = createHash("sha256").update(input.buffer).digest("hex");



    const uploadResult = await this.storageProviderService.uploadFileWithFailover({

      storageKey,

      fileBuffer: input.buffer,

      mimeType: input.mimeType,

    });



    const record = await this.fileObjectRepository.create({

      tenantId: input.tenantId,

      ownerUserId: input.ownerUserId,

      entityType,

      entityId,

      filename: input.filename,

      mimeType: input.mimeType,

      sizeBytes: input.sizeBytes,

      storageProvider: uploadResult.provider,

      storageKey,

      checksum,

      isPublic: input.isPublic ?? false,

      expiresAt: input.expiresAt ?? null,

      variant: "ORIGINAL",

      version,

      previousVersionFileId,

    });



    void this.subscriptionBillingClient.recordStorageUsage(input.tenantId, input.sizeBytes);



    void this.auditLogClient.logAction({

      tenantId: input.tenantId,

      actorUserId: input.ownerUserId,

      actorRole: input.actorRole,

      entityType: "FILE",

      entityId: record.id,

      action: "FILE_UPLOAD",

      metadata: {

        filename: record.filename,

        sizeBytes: record.sizeBytes,

        entityType: record.entityType,

        entityId: record.entityId,

        expiresAt: record.expiresAt?.toISOString() ?? null,

        version: record.version,

        storageProvider: record.storageProvider,

        isPublic: record.isPublic,

      },

    });



    if (TRANSFORMABLE_IMAGE_MIME_TYPES.has(input.mimeType)) {

      void this.thumbnailService.generateThumbnails(record).catch(() => undefined);

    }



    const access = await this.buildAccessUrl(record);



    return {

      file: toFileObjectResponse(record),

      accessUrl: access.url,

      message: "File uploaded successfully.",

      ...(uploadResult.usedFailover ? { warning: storageFailoverWarning() } : {}),

    };

  }



  private async resolveAccessTarget(fileId: string, variant?: string) {

    const record = await this.requireActiveFile(fileId);



    if (!variant || variant === "ORIGINAL") {

      return record;

    }



    const thumbVariant = variant as FileVariant;

    const thumbnail = await this.fileObjectRepository.findByParentAndVariant(fileId, thumbVariant);



    if (!thumbnail || thumbnail.isDeleted) {

      throw fileNotFoundError("Requested file variant does not exist.");

    }



    return thumbnail;

  }



  private async collectVersionHistory(record: FileObjectRecord) {

    let latest = record;



    while (true) {

      const newer = await this.fileObjectRepository.findByPreviousVersionFileId(latest.id);

      if (!newer) {

        break;

      }

      latest = newer;

    }



    const versions: FileObjectRecord[] = [];

    let current: FileObjectRecord | null = latest;



    while (current) {

      versions.push(current);

      if (!current.previousVersionFileId) {

        break;

      }

      current = await this.fileObjectRepository.findById(current.previousVersionFileId);

    }



    return versions;

  }



  private async buildAccessUrl(

    record: FileObjectRecord,

    options: { forceCdn?: boolean } = {},

  ) {

    const signedToken = createSignedAccessToken(

      record.id,

      record.storageKey,

      Math.floor(Date.now() / 1000) + this.config.signedUrlTtlSeconds,

    );



    if (record.isPublic && this.config.cdn.enabled) {

      return {

        url: this.storageProviderService.buildCdnUrl(record.storageKey, signedToken),

        expiresInSeconds: null,

      };

    }



    if (options.forceCdn) {

      return {

        url: this.storageProviderService.buildCdnUrl(record.storageKey, signedToken),

        expiresInSeconds: null,

      };

    }



    if (record.isPublic) {

      const providerUrl = await this.storageProviderService.generateSignedUrl({

        provider: record.storageProvider,

        storageKey: record.storageKey,

        expiresInSeconds: this.config.signedUrlTtlSeconds,

        signedToken,

      });



      return {

        url: providerUrl.url,

        expiresInSeconds: null,

      };

    }



    const signed = await this.storageProviderService.generateSignedUrl({

      provider: record.storageProvider,

      storageKey: record.storageKey,

      expiresInSeconds: this.config.signedUrlTtlSeconds,

      signedToken,

    });



    return {

      url: signed.url,

      expiresInSeconds: this.config.signedUrlTtlSeconds,

    };

  }



  private async requireFile(id: string) {

    const record = await this.fileObjectRepository.findById(id);

    if (!record) {

      throw fileNotFoundError();

    }



    return record;

  }



  private async requireActiveFile(id: string) {

    const record = await this.requireFile(id);

    if (record.isDeleted) {

      throw fileAlreadyDeletedError();

    }



    return record;

  }

}



function readOptionalString(value: unknown): string | undefined {

  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;

}



function readOptionalBoolean(value: unknown): boolean | undefined {

  if (typeof value === "boolean") {

    return value;

  }



  if (typeof value === "string") {

    const normalized = value.trim().toLowerCase();

    if (normalized === "true") {

      return true;

    }

    if (normalized === "false") {

      return false;

    }

  }



  return undefined;

}


