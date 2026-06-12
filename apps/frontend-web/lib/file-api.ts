import type { createApiClient } from "@/lib/api-client";
import type {
  FileAccessUrlResponse,
  FileDeleteResponse,
  FileListFilters,
  FileListResponse,
  FileThumbnailResponse,
  FileUploadResponse,
  FileVariant,
  FileVersionsResponse,
  StoredFileRecord,
} from "@/lib/file-types";

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
      return api.get<{ file: StoredFileRecord }>("files", `/${id}`);
    },
    getFileAccessUrl(id: string, options?: { variant?: FileVariant; useCdn?: boolean }) {
      return api.get<FileAccessUrlResponse>("files", `/${id}/access-url`, {
        params: {
          variant: options?.variant,
          useCdn: options?.useCdn ? "true" : undefined,
        },
      });
    },
    getFileVersions(id: string) {
      return api.get<FileVersionsResponse>("files", `/${id}/versions`);
    },
    generateThumbnails(id: string) {
      return api.post<FileThumbnailResponse>("files", `/${id}/thumbnail`);
    },
    uploadFile(input: {
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

      return api.postForm<FileUploadResponse>("files", "", formData);
    },
    softDeleteFile(id: string) {
      return api.delete<FileDeleteResponse>("files", `/${id}`);
    },
    hardDeleteFile(id: string) {
      return api.delete<FileDeleteResponse>("files", `/${id}/hard`);
    },
  };
}
