export type InternalFileUploadInput = {
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

export type InternalSoftDeleteByEntityInput = {
  tenantId: string;
  entityType: string;
  entityId: string;
  deletedByUserId: string;
  actorRole?: string;
};

export type StoredFileSummary = {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  entityType: string | null;
  entityId: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export type FileStorageClientOptions = {
  baseUrl?: string;
  logger?: Pick<Console, "warn">;
};

export class FileStorageHttpClient {
  private readonly baseUrl: string;
  private readonly logger: Pick<Console, "warn">;

  constructor(options: FileStorageClientOptions = {}) {
    this.baseUrl = (
      options.baseUrl ?? process.env.FILE_STORAGE_SERVICE_URL ?? "http://file-storage-service:3071"
    ).replace(/\/$/, "");
    this.logger = options.logger ?? console;
  }

  async uploadInternal(input: InternalFileUploadInput): Promise<{ file: StoredFileSummary }> {
    const response = await fetch(`${this.baseUrl}/files/internal/upload`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      this.logger.warn(`Internal file upload failed: HTTP ${response.status}`);
      throw new Error(`File storage upload failed with status ${response.status}`);
    }

    return (await response.json()) as { file: StoredFileSummary };
  }

  async softDeleteByEntity(
    input: InternalSoftDeleteByEntityInput,
  ): Promise<{ count: number; message: string }> {
    const response = await fetch(`${this.baseUrl}/files/internal/soft-delete-by-entity`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      this.logger.warn(`Internal file soft-delete failed: HTTP ${response.status}`);
      throw new Error(`File storage soft-delete failed with status ${response.status}`);
    }

    return (await response.json()) as { count: number; message: string };
  }
}
