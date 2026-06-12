import type { FileVariant, StorageProvider } from "@/generated/prisma";

export type FileObjectRecord = {
  id: string;
  tenantId: string;
  ownerUserId: string;
  entityType: string | null;
  entityId: string | null;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  storageProvider: StorageProvider;
  storageKey: string;
  checksum: string | null;
  isPublic: boolean;
  isDeleted: boolean;
  deletedAt: Date | null;
  deletedByUserId: string | null;
  expiresAt: Date | null;
  parentFileId: string | null;
  variant: FileVariant;
  version: number;
  previousVersionFileId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type FileObjectResponse = {
  id: string;
  tenantId: string;
  ownerUserId: string;
  entityType: string | null;
  entityId: string | null;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  storageProvider: StorageProvider;
  storageKey: string;
  checksum: string | null;
  isPublic: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedByUserId: string | null;
  expiresAt: string | null;
  parentFileId: string | null;
  variant: FileVariant;
  version: number;
  previousVersionFileId: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toFileObjectResponse(record: FileObjectRecord): FileObjectResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    ownerUserId: record.ownerUserId,
    entityType: record.entityType,
    entityId: record.entityId,
    filename: record.filename,
    mimeType: record.mimeType,
    sizeBytes: record.sizeBytes,
    storageProvider: record.storageProvider,
    storageKey: record.storageKey,
    checksum: record.checksum,
    isPublic: record.isPublic,
    isDeleted: record.isDeleted,
    deletedAt: record.deletedAt?.toISOString() ?? null,
    deletedByUserId: record.deletedByUserId,
    expiresAt: record.expiresAt?.toISOString() ?? null,
    parentFileId: record.parentFileId,
    variant: record.variant,
    version: record.version,
    previousVersionFileId: record.previousVersionFileId,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
