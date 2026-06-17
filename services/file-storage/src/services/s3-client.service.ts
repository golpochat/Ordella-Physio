import { Injectable, Logger } from "@nestjs/common";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { loadStorageConfig } from "@/config/storage.config";
import { fileStorageError } from "@/utils/file-errors";

@Injectable()
export class S3ClientService {
  private readonly logger = new Logger(S3ClientService.name);
  private readonly config = loadStorageConfig();
  private client: S3Client | null = null;

  isConfigured(): boolean {
    const s3 = this.config.providerConfigs.S3;
    return Boolean(s3.bucket && s3.region);
  }

  getBucket(): string {
    const bucket = this.config.providerConfigs.S3.bucket;
    if (!bucket) {
      throw fileStorageError("S3 bucket is not configured.");
    }
    return bucket;
  }

  private getClient(): S3Client {
    if (this.client) {
      return this.client;
    }

    const s3 = this.config.providerConfigs.S3;
    if (!s3.bucket || !s3.region) {
      throw fileStorageError("S3 storage is not configured.");
    }

    this.client = new S3Client({
      region: s3.region,
      credentials:
        s3.accessKeyId && s3.secretAccessKey
          ? {
              accessKeyId: s3.accessKeyId,
              secretAccessKey: s3.secretAccessKey,
            }
          : undefined,
    });

    return this.client;
  }

  async putObject(input: { key: string; body: Buffer; mimeType: string }): Promise<void> {
    try {
      await this.getClient().send(
        new PutObjectCommand({
          Bucket: this.getBucket(),
          Key: input.key,
          Body: input.body,
          ContentType: input.mimeType,
          ServerSideEncryption: "AES256",
        }),
      );
    } catch (error) {
      this.logger.error(
        `S3 PutObject failed for ${input.key}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw fileStorageError("S3 upload failed.");
    }
  }

  async getSignedGetUrl(key: string, expiresInSeconds: number): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.getBucket(),
        Key: key,
      });

      return await getSignedUrl(this.getClient(), command, { expiresIn: expiresInSeconds });
    } catch (error) {
      this.logger.error(
        `S3 signed URL failed for ${key}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw fileStorageError("S3 signed URL generation failed.");
    }
  }

  async deleteObject(key: string): Promise<void> {
    try {
      await this.getClient().send(
        new DeleteObjectCommand({
          Bucket: this.getBucket(),
          Key: key,
        }),
      );
    } catch (error) {
      this.logger.warn(`S3 delete failed for ${key}: ${error instanceof Error ? error.message : "unknown"}`);
    }
  }
}
