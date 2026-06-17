import { Injectable, Logger } from "@nestjs/common";

const FILE_STORAGE_PREFIX = "file-storage:";

type InternalUploadResponse = {
  file: {
    id: string;
    filename: string;
    mimeType: string;
    sizeBytes: number;
  };
  accessUrl?: string;
};

@Injectable()
export class FileStorageClient {
  private readonly logger = new Logger(FileStorageClient.name);
  private readonly baseUrl = (
    process.env.FILE_STORAGE_SERVICE_URL ?? "http://file-storage-service:3071"
  ).replace(/\/$/, "");

  buildStorageReference(fileId: string): string {
    return `${FILE_STORAGE_PREFIX}${fileId}`;
  }

  parseStorageReference(storagePath: string): string | null {
    if (!storagePath.startsWith(FILE_STORAGE_PREFIX)) {
      return null;
    }

    const fileId = storagePath.slice(FILE_STORAGE_PREFIX.length).trim();
    return fileId || null;
  }

  async uploadPatientAttachment(input: {
    tenantId: string;
    ownerUserId: string;
    actorRole?: string;
    patientId: string;
    filename: string;
    mimeType: string;
    buffer: Buffer;
  }): Promise<InternalUploadResponse> {
    const response = await fetch(`${this.baseUrl}/files/internal/upload`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tenantId: input.tenantId,
        ownerUserId: input.ownerUserId,
        actorRole: input.actorRole,
        filename: input.filename,
        mimeType: input.mimeType,
        contentBase64: input.buffer.toString("base64"),
        entityType: "PATIENT",
        entityId: input.patientId,
      }),
    });

    const payload = (await response.json().catch(() => null)) as
      | InternalUploadResponse
      | { message?: string; error?: { message?: string; metadata?: { error?: string } } }
      | null;

    if (!response.ok || !payload || !("file" in payload) || !payload.file?.id) {
      const metadataError = (payload as { error?: { metadata?: { error?: string } } } | null)?.error
        ?.metadata?.error;
      const message =
        (payload as { message?: string } | null)?.message ??
        (payload as { error?: { message?: string } } | null)?.error?.message ??
        "FILE_STORAGE_UPLOAD_FAILED";

      if (metadataError === "VIRUS_DETECTED" || message.includes("unsafe")) {
        throw new Error("VIRUS_DETECTED");
      }

      this.logger.warn(`File storage upload failed with status ${response.status}`);
      throw new Error(message);
    }

    return payload;
  }

  async getAccessUrl(fileId: string, tenantId: string, authorization: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/files/${encodeURIComponent(fileId)}/access-url`, {
      headers: {
        accept: "application/json",
        authorization,
        "x-tenant-id": tenantId,
      },
    });

    const payload = (await response.json().catch(() => null)) as { url?: string } | null;
    if (!response.ok || !payload?.url) {
      throw new Error("FILE_ACCESS_URL_FAILED");
    }

    return payload.url;
  }

  async softDeleteFile(fileId: string, tenantId: string, authorization: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/files/${encodeURIComponent(fileId)}`, {
      method: "DELETE",
      headers: {
        authorization,
        "x-tenant-id": tenantId,
      },
    });

    if (!response.ok) {
      this.logger.warn(`File storage delete failed for ${fileId} with status ${response.status}`);
    }
  }

  async softDeleteByEntity(input: {
    tenantId: string;
    entityType: string;
    entityId: string;
    deletedByUserId: string;
    actorRole?: string;
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/files/internal/soft-delete-by-entity`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      this.logger.warn(
        `File storage entity delete failed for ${input.entityType}/${input.entityId} with status ${response.status}`,
      );
    }
  }
}
