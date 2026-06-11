import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import { extname, join } from "path";

export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export const ALLOWED_AVATAR_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const ALLOWED_AVATAR_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export type AvatarUploadFile = {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalname: string;
};

export function getAvatarUploadDir(): string {
  return process.env.AVATAR_UPLOAD_DIR ?? join(process.cwd(), "uploads", "avatars");
}

export function buildAvatarPublicUrl(filename: string): string {
  const configuredBase = process.env.AVATAR_PUBLIC_BASE_URL?.replace(/\/$/, "");
  const path = `/auth/uploads/avatars/${filename}`;
  return configuredBase ? `${configuredBase}${path}` : path;
}

function resolveAvatarExtension(file: AvatarUploadFile): string {
  const fromName = extname(file.originalname).toLowerCase();
  if (ALLOWED_AVATAR_EXTENSIONS.has(fromName)) {
    return fromName === ".jpeg" ? ".jpg" : fromName;
  }

  switch (file.mimetype) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    default:
      return ".jpg";
  }
}

function extractAvatarFilename(avatarUrl: string | null | undefined): string | null {
  if (!avatarUrl) {
    return null;
  }

  const segments = avatarUrl.split("/").filter(Boolean);
  const filename = segments.at(-1);
  if (!filename || filename.includes("..")) {
    return null;
  }

  return filename;
}

export async function deleteStoredAvatarFile(avatarUrl: string | null | undefined): Promise<void> {
  const filename = extractAvatarFilename(avatarUrl);
  if (!filename) {
    return;
  }

  const storage = process.env.AVATAR_STORAGE ?? "local";
  if (storage === "s3") {
    return;
  }

  try {
    await unlink(join(getAvatarUploadDir(), filename));
  } catch {
    // Ignore missing files during cleanup.
  }
}

async function uploadAvatarToLocal(buffer: Buffer, filename: string): Promise<string> {
  const dir = getAvatarUploadDir();
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, filename), buffer);
  return buildAvatarPublicUrl(filename);
}

async function uploadAvatarToS3(
  _buffer: Buffer,
  _filename: string,
  _mimeType: string,
): Promise<string> {
  const bucket = process.env.AVATAR_S3_BUCKET;
  const publicBase = process.env.AVATAR_S3_PUBLIC_BASE_URL?.replace(/\/$/, "");

  if (!bucket || !publicBase) {
    throw new Error("S3_NOT_CONFIGURED");
  }

  // Production S3 uploads require @aws-sdk/client-s3 in the deployment image.
  throw new Error("S3_SDK_NOT_AVAILABLE");
}

export async function uploadAvatarFile(
  file: AvatarUploadFile,
  userId: string,
): Promise<string> {
  const extension = resolveAvatarExtension(file);
  const filename = `${userId}-${randomUUID()}${extension}`;
  const storage = process.env.AVATAR_STORAGE ?? "local";

  if (storage === "s3") {
    return uploadAvatarToS3(file.buffer, filename, file.mimetype);
  }

  return uploadAvatarToLocal(file.buffer, filename);
}
