import { createHash } from "crypto";
import { Injectable, Logger } from "@nestjs/common";
import type { FileVariant } from "@/generated/prisma";
import type { FileObjectRecord } from "@/models/FileObject";
import { FileObjectRepository } from "@/repositories/file-object.repository";
import { ImageTransformService } from "@/services/image-transform.service";
import { StorageProviderService } from "@/services/storage-provider.service";
import { unsupportedImageTypeError } from "@/utils/file-errors";

const THUMBNAIL_SIZES: Array<{ variant: FileVariant; maxEdge: number; suffix: string }> = [
  { variant: "THUMB_SMALL", maxEdge: 200, suffix: "_thumb_small" },
  { variant: "THUMB_MEDIUM", maxEdge: 600, suffix: "_thumb_medium" },
];

@Injectable()
export class ThumbnailService {
  private readonly logger = new Logger(ThumbnailService.name);

  constructor(
    private readonly fileObjectRepository: FileObjectRepository,
    private readonly storageProviderService: StorageProviderService,
    private readonly imageTransformService: ImageTransformService,
  ) {}

  async generateThumbnails(parent: FileObjectRecord) {
    if (parent.variant !== "ORIGINAL") {
      throw unsupportedImageTypeError("Thumbnails can only be generated for original files.");
    }

    this.imageTransformService.assertTransformableMimeType(parent.mimeType);

    const sourceBuffer = await this.storageProviderService.readFileBuffer({
      provider: parent.storageProvider,
      storageKey: parent.storageKey,
    });

    const created: FileObjectRecord[] = [];

    for (const definition of THUMBNAIL_SIZES) {
      const existing = await this.fileObjectRepository.findByParentAndVariant(
        parent.id,
        definition.variant,
      );

      if (existing && !existing.isDeleted) {
        created.push(existing);
        continue;
      }

      const thumbBuffer = await this.imageTransformService.resize(
        sourceBuffer,
        definition.maxEdge,
        definition.maxEdge,
      );

      const storageKey = `${parent.storageKey}${definition.suffix}`;
      const uploadResult = await this.storageProviderService.uploadFileWithFailover({
        storageKey,
        fileBuffer: thumbBuffer,
        mimeType: parent.mimeType,
      });

      const record = await this.fileObjectRepository.create({
        tenantId: parent.tenantId,
        ownerUserId: parent.ownerUserId,
        entityType: parent.entityType,
        entityId: parent.entityId,
        filename: `${parent.filename}${definition.suffix}`,
        mimeType: parent.mimeType,
        sizeBytes: thumbBuffer.length,
        storageProvider: uploadResult.provider,
        storageKey,
        checksum: createHash("sha256").update(thumbBuffer).digest("hex"),
        isPublic: parent.isPublic,
        parentFileId: parent.id,
        variant: definition.variant,
        version: 1,
      });

      created.push(record);
    }

    this.logger.log(`Generated ${created.length} thumbnail(s) for file ${parent.id}`);

    return {
      message: "Thumbnails generated.",
      thumbnails: created,
    };
  }
}
