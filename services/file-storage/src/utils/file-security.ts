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
  ".dll",
  ".bin",
  ".apk",
  ".app",
  ".dmg",
  ".iso",
  ".hta",
  ".cpl",
  ".msc",
]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "text/plain",
]);

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".pdf", ".txt"]);

const MIME_SIGNATURES: Array<{ mime: string; check: (buffer: Buffer) => boolean }> = [
  {
    mime: "application/pdf",
    check: (buffer) => buffer.length >= 4 && buffer.subarray(0, 4).toString("utf8") === "%PDF",
  },
  {
    mime: "image/jpeg",
    check: (buffer) => buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff,
  },
  {
    mime: "image/png",
    check: (buffer) =>
      buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47,
  },
];

export type FileSecurityInput = {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  maxBytes: number;
  buffer?: Buffer;
};

function detectMimeFromBuffer(buffer: Buffer): string | null {
  for (const signature of MIME_SIGNATURES) {
    if (signature.check(buffer)) {
      return signature.mime;
    }
  }
  return null;
}

function extensionForMime(mimeType: string): string | null {
  switch (mimeType) {
    case "application/pdf":
      return ".pdf";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "text/plain":
      return ".txt";
    default:
      return null;
  }
}

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

  for (const extension of extensions) {
    if (BLOCKED_EXTENSIONS.has(extension)) {
      throw fileValidationError([
        { field: "filename", message: "Executable or archive file types are not allowed." },
      ]);
    }
  }

  const extension = extensions[0] ?? "";
  if (extension && !ALLOWED_EXTENSIONS.has(extension)) {
    throw fileValidationError([{ field: "filename", message: "File extension is not allowed." }]);
  }

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw fileValidationError([{ field: "mimeType", message: "MIME type is not allowed." }]);
  }

  if (input.buffer && input.buffer.length > 0 && mimeType !== "text/plain") {
    const detected = detectMimeFromBuffer(input.buffer);
    if (detected && detected !== mimeType) {
      throw fileValidationError([
        { field: "mimeType", message: "File content does not match declared MIME type." },
      ]);
    }

    const expectedExtension = extensionForMime(mimeType);
    if (expectedExtension && extension && extension !== expectedExtension && extension !== ".jpeg") {
      throw fileValidationError([
        { field: "filename", message: "File extension does not match MIME type." },
      ]);
    }
  }

  return { filename, mimeType };
}
