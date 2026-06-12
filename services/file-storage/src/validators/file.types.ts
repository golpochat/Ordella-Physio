export type UploadFilePayload = {
  entityType?: string;
  entityId?: string;
  expiresAt?: string;
  isPublic?: string;
  replaceFileId?: string;
};

export type InternalUploadFilePayload = {
  tenantId: string;
  ownerUserId: string;
  actorRole?: string;
  entityType?: string;
  entityId?: string;
  filename: string;
  mimeType: string;
  contentBase64: string;
  expiresAt?: string;
};

export type InternalSoftDeleteByEntityPayload = {
  tenantId: string;
  entityType: string;
  entityId: string;
  deletedByUserId: string;
  actorRole?: string;
};
