import type { createApiClient } from "@/lib/api-client";
import type {
  FileAccessUrlResponse,
  FileDeleteResponse,
  FileListFilters,
  FileListResponse,
  FileThumbnailResponse,
  FileUploadPipelineResponse,
  FileUploadResponse,
  FileVariant,
  FileVersionsResponse,
  StoredFileRecord,
} from "@/lib/file-types";

function isPipelineUploadResponse(
  value: FileUploadResponse,
): value is FileUploadPipelineResponse {
  return "fileId" in value && typeof value.fileId === "string";
}

function toStoredFileRecordFromPipeline(
  payload: FileUploadPipelineResponse,
  entityType?: string,
  entityId?: string,
): StoredFileRecord {
  const now = new Date().toISOString();
  return {
    id: payload.fileId,
    tenantId: "",
    ownerUserId: "",
    entityType: entityType ?? null,
    entityId: entityId ?? null,
    filename: payload.fileName,
    mimeType: payload.mimeType,
    sizeBytes: payload.size,
    storageProvider: "S3",
    storageKey: payload.fileId,
    checksum: null,
    isPublic: false,
    isDeleted: false,
    deletedAt: null,
    deletedByUserId: null,
    expiresAt: null,
    parentFileId: null,
    variant: "ORIGINAL",
    version: 1,
    previousVersionFileId: null,
    createdAt: now,
    updatedAt: now,
  };
}
function toQueryParams(filters: FileListFilters): Record<string, string | number | boolean | undefined> {
  return {
    page: filters.page,
    limit: filters.limit,
    entityType: filters.entityType,
    entityId: filters.entityId,
    ownerUserId: filters.ownerUserId,
    includeDeleted: filters.includeDeleted ? "true" : undefined,
  };
}

export function createFileApi(api: ReturnType<typeof createApiClient>) {
  return {
    listFiles(filters: FileListFilters = {}) {
      return api.get<FileListResponse>("files", "", {
        params: toQueryParams(filters),
      });
    },
    getFileMetadata(id: string) {
      return api.get<{ file: StoredFileRecord }>("files", `/${id}/metadata`);
    },
    async getFileAccessUrl(id: string, options?: { variant?: FileVariant; useCdn?: boolean }) {
      const result = await api.get<FileAccessUrlResponse>("files", `/${id}`, {
        params: {
          variant: options?.variant,
          useCdn: options?.useCdn ? "true" : undefined,
        },
      });

      return {
        url: result.signedUrl ?? result.url ?? "",
        expiresInSeconds: result.expiresInSeconds ?? null,
        fileId: result.fileId ?? id,
      };
    },
    getFileVersions(id: string) {
      return api.get<FileVersionsResponse>("files", `/${id}/versions`);
    },
    generateThumbnails(id: string) {
      return api.post<FileThumbnailResponse>("files", `/${id}/thumbnail`);
    },
    async uploadFile(input: {
      file: File;
      entityType?: string;
      entityId?: string;
      isPublic?: boolean;
      replaceFileId?: string;
    }) {
      const formData = new FormData();
      formData.append("file", input.file);
      if (input.entityType) {
        formData.append("entityType", input.entityType);
      }
      if (input.entityId) {
        formData.append("entityId", input.entityId);
      }
      if (input.isPublic !== undefined) {
        formData.append("isPublic", String(input.isPublic));
      }
      if (input.replaceFileId) {
        formData.append("replaceFileId", input.replaceFileId);
      }

      const result = await api.postForm<FileUploadResponse>("files", "/upload", formData);

      if (isPipelineUploadResponse(result)) {
        return {
          file: toStoredFileRecordFromPipeline(result, input.entityType, input.entityId),
          message: "File uploaded successfully.",
        };
      }

      return result;
    },

    softDeleteFile(id: string) {
      return api.delete<FileDeleteResponse>("files", `/${id}`);
    },
    hardDeleteFile(id: string) {
      return api.delete<FileDeleteResponse>("files", `/${id}/hard`);
    },
  };
}

