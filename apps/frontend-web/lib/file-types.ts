export type StoredFileRecord = {
  id: string;
  tenantId: string;
  ownerUserId: string;
  entityType: string | null;
  entityId: string | null;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  storageProvider: string;
  storageKey: string;
  checksum: string | null;
  isPublic: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedByUserId: string | null;
  expiresAt: string | null;
  parentFileId: string | null;
  variant: "ORIGINAL" | "THUMB_SMALL" | "THUMB_MEDIUM";
  version: number;
  previousVersionFileId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FileVariant = "ORIGINAL" | "THUMB_SMALL" | "THUMB_MEDIUM";

export type FileListFilters = {
  page?: number;
  limit?: number;
  entityType?: string;
  entityId?: string;
  ownerUserId?: string;
  includeDeleted?: boolean;
};

export type FileListResponse = {
  data: StoredFileRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type FileUploadResponse = {
  file: StoredFileRecord;
  accessUrl?: string;
  message: string;
};

export type FileAccessUrlResponse = {
  url: string;
  expiresInSeconds?: number | null;
};

export type FileVersionsResponse = {
  data: StoredFileRecord[];
};

export type FileThumbnailResponse = {
  message: string;
  thumbnails: StoredFileRecord[];
};

export type FileDeleteResponse = {
  message: string;
  file?: StoredFileRecord;
};
