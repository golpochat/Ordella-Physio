import { scanUploadBuffer } from "./virus-scan.service";
import { ForbiddenError } from "../../utils/api-error";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "text/plain",
]);

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf", ".txt"]);

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export type UploadValidationInput = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

export type UploadValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export function validateUpload(input: UploadValidationInput): UploadValidationResult {
  if (input.sizeBytes <= 0) {
    return { ok: false, reason: "Empty file" };
  }

  if (input.sizeBytes > MAX_UPLOAD_BYTES) {
    return { ok: false, reason: `File exceeds maximum size of ${MAX_UPLOAD_BYTES} bytes` };
  }

  const extension = input.fileName.includes(".")
    ? `.${input.fileName.split(".").pop()?.toLowerCase()}`
    : "";

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return { ok: false, reason: "File extension is not allowed" };
  }

  if (!ALLOWED_MIME_TYPES.has(input.mimeType.toLowerCase())) {
    return { ok: false, reason: "MIME type is not allowed" };
  }

  if (input.fileName.includes("..") || input.fileName.includes("/") || input.fileName.includes("\\")) {
    return { ok: false, reason: "Invalid file name" };
  }

  return { ok: true };
}

export async function validateAndScanUpload(
  input: UploadValidationInput & { buffer?: Buffer },
): Promise<UploadValidationResult> {
  const validation = validateUpload(input);
  if (!validation.ok) {
    return validation;
  }

  if (input.buffer && input.buffer.length > 0) {
    try {
      await scanUploadBuffer(input.buffer);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return { ok: false, reason: error.message };
      }

      return { ok: false, reason: "Virus scan failed" };
    }
  }

  return { ok: true };
}

export function stripExifFromImageBuffer(buffer: Buffer, mimeType: string): Buffer {
  if (!mimeType.startsWith("image/")) {
    return buffer;
  }

  // JPEG EXIF segments start after SOI (0xFFD8). Strip APP1 (0xFFE1) if present.
  if (mimeType === "image/jpeg" && buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        break;
      }

      const marker = buffer[offset + 1];
      const segmentLength = buffer.readUInt16BE(offset + 2);
      if (marker === 0xe1) {
        const before = buffer.subarray(0, offset);
        const after = buffer.subarray(offset + 2 + segmentLength);
        return Buffer.concat([before, after]);
      }

      offset += 2 + segmentLength;
    }
  }

  return buffer;
}
