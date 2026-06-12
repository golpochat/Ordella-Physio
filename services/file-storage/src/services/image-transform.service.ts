import { Injectable, Logger } from "@nestjs/common";
import sharp from "sharp";
import { unsupportedImageTypeError } from "@/utils/file-errors";

export const TRANSFORMABLE_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

@Injectable()
export class ImageTransformService {
  private readonly logger = new Logger(ImageTransformService.name);

  assertTransformableMimeType(mimeType: string) {
    if (!TRANSFORMABLE_IMAGE_MIME_TYPES.has(mimeType)) {
      throw unsupportedImageTypeError();
    }
  }

  async resize(buffer: Buffer, width: number, height?: number): Promise<Buffer> {
    this.logger.debug(`Resizing image to ${width}x${height ?? "auto"}`);
    return sharp(buffer)
      .rotate()
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toBuffer();
  }

  async crop(buffer: Buffer, x: number, y: number, width: number, height: number): Promise<Buffer> {
    return sharp(buffer)
      .rotate()
      .extract({ left: x, top: y, width, height })
      .toBuffer();
  }

  async compress(buffer: Buffer, quality: number): Promise<Buffer> {
    const normalizedQuality = Math.min(100, Math.max(1, quality));
    return sharp(buffer)
      .rotate()
      .jpeg({ quality: normalizedQuality, mozjpeg: true })
      .toBuffer();
  }

  async autoOrient(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer).rotate().toBuffer();
  }
}
