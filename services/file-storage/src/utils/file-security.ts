import { fileValidationError } from "@/utils/file-errors";

const BLOCKED_EXTENSIONS = new Set([
  ".exe",
  ".sh",
  ".bat",
  ".cmd",
  ".com",
  ".msi",
  ".scr",
  ".ps1",
  ".vbs",
  ".js",
  ".jar",
  ".zip",
  ".rar",
  ".7z",
  ".tar",
  ".gz",
]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "text/plain",
]);

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".pdf", ".txt"]);

export type FileSecurityInput = {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  maxBytes: number;
};

export function sanitizeFilename(filename: string): string {
  const base = filename
    .replace(/[/\\]/g, "")
    .replace(/\.\./g, "")
    .replace(/[^\w.\- ()]/g, "_")
    .trim();

  if (!base || base === "." || base === "..") {
    return "upload.bin";
  }

  return base.slice(0, 255);
}

function extractExtensions(filename: string): string[] {
  const parts = filename.toLowerCase().split(".");
  if (parts.length <= 1) {
    return [];
  }

  return parts.slice(1).map((part) => `.${part}`);
}

export function validateFileSecurity(input: FileSecurityInput): { filename: string; mimeType: string } {
  const filename = sanitizeFilename(input.filename);
  const mimeType = input.mimeType.trim().toLowerCase();

  if (input.sizeBytes <= 0) {
    throw fileValidationError([{ field: "file", message: "File is empty." }]);
  }

  if (input.sizeBytes > input.maxBytes) {
    throw fileValidationError([
      {
        field: "file",
        message: `File exceeds maximum size of ${input.maxBytes} bytes.`,
      },
    ]);
  }

  const extensions = extractExtensions(filename);
  if (extensions.length > 1) {
    throw fileValidationError([
      { field: "filename", message: "Files with multiple extensions are not allowed." },
    ]);
  }

  const extension = extensions[0] ?? "";
  if (extension && BLOCKED_EXTENSIONS.has(extension)) {
    throw fileValidationError([{ field: "filename", message: "Executable or archive file types are not allowed." }]);
  }

  if (extension && !ALLOWED_EXTENSIONS.has(extension)) {
    throw fileValidationError([{ field: "filename", message: "File extension is not allowed." }]);
  }

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw fileValidationError([{ field: "mimeType", message: "MIME type is not allowed." }]);
  }

  return { filename, mimeType };
}
