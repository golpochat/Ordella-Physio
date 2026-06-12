import { createReadStream } from "fs";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { Injectable, Logger } from "@nestjs/common";
import type { StorageProvider } from "@/generated/prisma";
import { loadStorageConfig } from "@/config/storage.config";
import { fileStorageError } from "@/utils/file-errors";

export type UploadProviderInput = {
  provider: StorageProvider;
  storageKey: string;
  fileBuffer: Buffer;
  mimeType: string;
};

export type UploadWithFailoverInput = {
  storageKey: string;
  fileBuffer: Buffer;
  mimeType: string;
};

export type UploadWithFailoverResult = {
  provider: StorageProvider;
  usedFailover: boolean;
};

export type ReadProviderInput = {
  provider: StorageProvider;
  storageKey: string;
};

export type GenerateSignedUrlInput = {
  provider: StorageProvider;
  storageKey: string;
  expiresInSeconds: number;
  signedToken: string;
};

export type DeleteProviderInput = {
  provider: StorageProvider;
  storageKey: string;
};

@Injectable()
export class StorageProviderService {
  private readonly logger = new Logger(StorageProviderService.name);
  private readonly config = loadStorageConfig();

  async uploadFileWithFailover(input: UploadWithFailoverInput): Promise<UploadWithFailoverResult> {
    const providers = this.config.failoverProviders;
    let lastError: unknown;

    for (let index = 0; index < providers.length; index += 1) {
      const provider = providers[index]!;

      try {
        await this.uploadFile({
          provider,
          storageKey: input.storageKey,
          fileBuffer: input.fileBuffer,
          mimeType: input.mimeType,
        });

        if (index > 0) {
          this.logger.warn(
            `Primary storage provider failed; used fallback provider ${provider} for ${input.storageKey}`,
          );
        }

        return {
          provider,
          usedFailover: index > 0,
        };
      } catch (error) {
        lastError = error;
        this.logger.warn(
          `Storage provider ${provider} failed for ${input.storageKey}`,
          error instanceof Error ? error.message : error,
        );
      }
    }

    this.logger.error("All storage providers failed", lastError instanceof Error ? lastError.stack : undefined);
    throw fileStorageError();
  }

  async uploadFile(input: UploadProviderInput): Promise<{ url?: string }> {
    switch (input.provider) {
      case "LOCAL":
        return this.uploadToLocal(input);
      case "S3":
        return this.uploadToS3(input);
      case "GCS":
        return this.uploadToGcs(input);
      case "AZURE":
        throw fileStorageError("AZURE storage is not configured yet.");
      default:
        throw fileStorageError("Unsupported storage provider.");
    }
  }

  async readFileBuffer(input: ReadProviderInput): Promise<Buffer> {
    switch (input.provider) {
      case "LOCAL":
        return readFile(this.resolveLocalAbsolutePath(input.storageKey));
      case "S3":
      case "GCS":
      case "AZURE":
        throw fileStorageError(`${input.provider} read is not configured yet.`);
      default:
        throw fileStorageError("Unsupported storage provider.");
    }
  }

  async generateSignedUrl(input: GenerateSignedUrlInput): Promise<{ url: string }> {
    switch (input.provider) {
      case "LOCAL":
        return {
          url: `${this.config.publicBaseUrl}/access?token=${encodeURIComponent(input.signedToken)}`,
        };
      case "S3":
        return this.generateS3SignedUrl(input);
      case "GCS":
        return this.generateGcsSignedUrl(input);
      case "AZURE":
        throw fileStorageError("AZURE signed URLs are not configured yet.");
      default:
        throw fileStorageError("Unsupported storage provider.");
    }
  }

  buildCdnUrl(storageKey: string, signedToken?: string): string {
    const base = `${this.config.cdn.baseUrl}/${storageKey.replace(/^\//, "")}`;

    if (this.config.cdn.signUrls && signedToken) {
      return `${base}?token=${encodeURIComponent(signedToken)}`;
    }

    return base;
  }

  async deleteFile(input: DeleteProviderInput): Promise<void> {
    switch (input.provider) {
      case "LOCAL":
        await this.deleteFromLocal(input.storageKey);
        return;
      case "S3":
        this.logger.warn("S3 delete is not implemented yet.");
        return;
      case "GCS":
        this.logger.warn("GCS delete is not implemented yet.");
        return;
      default:
        return;
    }
  }

  resolveLocalAbsolutePath(storageKey: string): string {
    return join(this.config.providerConfigs.LOCAL.basePath, storageKey);
  }

  createLocalReadStream(storageKey: string) {
    return createReadStream(this.resolveLocalAbsolutePath(storageKey));
  }

  private async uploadToLocal(input: UploadProviderInput): Promise<{ url?: string }> {
    try {
      const absolutePath = this.resolveLocalAbsolutePath(input.storageKey);
      await mkdir(dirname(absolutePath), { recursive: true });
      await writeFile(absolutePath, input.fileBuffer);
      return { url: absolutePath };
    } catch (error) {
      this.logger.error("Local file upload failed", error instanceof Error ? error.stack : undefined);
      throw fileStorageError();
    }
  }

  private async deleteFromLocal(storageKey: string): Promise<void> {
    try {
      await unlink(this.resolveLocalAbsolutePath(storageKey));
    } catch {
      // Ignore missing files during cleanup.
    }
  }

  private async uploadToS3(input: UploadProviderInput): Promise<{ url?: string }> {
    const s3Config = this.config.providerConfigs.S3;
    if (!s3Config.bucket || !s3Config.region) {
      throw fileStorageError("S3 storage is not configured.");
    }

    this.logger.warn(`S3 upload requested for ${input.storageKey}; SDK integration pending.`);
    throw fileStorageError("S3 upload is not implemented yet.");
  }

  private async uploadToGcs(input: UploadProviderInput): Promise<{ url?: string }> {
    const gcsConfig = this.config.providerConfigs.GCS;
    if (!gcsConfig.bucket) {
      throw fileStorageError("GCS storage is not configured.");
    }

    this.logger.warn(`GCS upload requested for ${input.storageKey}; SDK integration pending.`);
    throw fileStorageError("GCS upload is not implemented yet.");
  }

  private async generateS3SignedUrl(input: GenerateSignedUrlInput): Promise<{ url: string }> {
    const s3Config = this.config.providerConfigs.S3;
    if (!s3Config.bucket || !s3Config.region) {
      throw fileStorageError("S3 storage is not configured.");
    }

    this.logger.warn(`S3 signed URL requested for ${input.storageKey}; SDK integration pending.`);
    throw fileStorageError("S3 signed URLs are not implemented yet.");
  }

  private async generateGcsSignedUrl(input: GenerateSignedUrlInput): Promise<{ url: string }> {
    const gcsConfig = this.config.providerConfigs.GCS;
    if (!gcsConfig.bucket) {
      throw fileStorageError("GCS storage is not configured.");
    }

    this.logger.warn(`GCS signed URL requested for ${input.storageKey}; SDK integration pending.`);
    throw fileStorageError("GCS signed URLs are not implemented yet.");
  }
}
