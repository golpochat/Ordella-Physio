import {
  PATIENT_NOTE_TYPES,
  type CreatePatientNotePayload,
  type PatientNoteAttachment,
  type PatientNoteType,
  type PatientNoteValidationFieldError,
  type UpdatePatientNotePayload,
} from "@/models/PatientNote";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_REGEX.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function parseAttachments(value: unknown): PatientNoteAttachment[] | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (!Array.isArray(value)) {
    return null;
  }

  const attachments: PatientNoteAttachment[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return null;
    }

    const record = entry as Record<string, unknown>;
    const name = typeof record.name === "string" ? record.name.trim() : "";
    if (!name) {
      return null;
    }

    attachments.push({
      name,
      url: typeof record.url === "string" ? record.url.trim() : undefined,
      mimeType: typeof record.mimeType === "string" ? record.mimeType.trim() : undefined,
    });
  }

  return attachments;
}

function validateNoteType(value: unknown, required: boolean): PatientNoteType | null | undefined {
  if (value === undefined || value === null || value === "") {
    return required ? null : undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toUpperCase();
  if (!PATIENT_NOTE_TYPES.includes(normalized as PatientNoteType)) {
    return null;
  }

  return normalized as PatientNoteType;
}

function validateTitle(value: unknown, required: boolean): string | null | undefined {
  if (value === undefined || value === null) {
    return required ? null : undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return required ? null : undefined;
  }

  if (trimmed.length < 3) {
    return null;
  }

  return trimmed;
}

function validateContent(value: unknown, required: boolean): string | null | undefined {
  if (value === undefined || value === null) {
    return required ? null : undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return required ? null : undefined;
  }

  if (trimmed.length < 5) {
    return null;
  }

  return trimmed;
}

export function validateCreatePatientNote(
  payload: unknown,
):
  | { valid: true; payload: CreatePatientNotePayload }
  | { valid: false; fields: PatientNoteValidationFieldError[] } {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return {
      valid: false,
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const fields: PatientNoteValidationFieldError[] = [];
  const body = payload as Record<string, unknown>;

  const noteType = validateNoteType(body.noteType, true);
  if (noteType === null) {
    fields.push({ field: "noteType", message: "A valid note type is required." });
  }

  const title = validateTitle(body.title, true);
  if (title === null) {
    fields.push({ field: "title", message: "Title is required and must be at least 3 characters." });
  }

  const content = validateContent(body.content, true);
  if (content === null) {
    fields.push({
      field: "content",
      message: "Content is required and must be at least 5 characters.",
    });
  }

  const attachmentsResult = parseAttachments(body.attachments);
  if (attachmentsResult === null) {
    fields.push({ field: "attachments", message: "Attachments must be an array of objects with a name." });
  }

  if (fields.length > 0) {
    return { valid: false, fields };
  }

  return {
    valid: true,
    payload: {
      noteType: noteType as PatientNoteType,
      title: title as string,
      content: content as string,
      attachments: attachmentsResult ?? undefined,
    },
  };
}

export function validateUpdatePatientNote(
  payload: unknown,
):
  | { valid: true; payload: UpdatePatientNotePayload }
  | { valid: false; fields: PatientNoteValidationFieldError[] } {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return {
      valid: false,
      fields: [{ field: "payload", message: "Request body must be a JSON object." }],
    };
  }

  const fields: PatientNoteValidationFieldError[] = [];
  const body = payload as Record<string, unknown>;
  const normalized: UpdatePatientNotePayload = {};

  if ("noteType" in body) {
    const noteType = validateNoteType(body.noteType, false);
    if (noteType === null) {
      fields.push({ field: "noteType", message: "Note type must be a valid value." });
    } else if (noteType) {
      normalized.noteType = noteType;
    }
  }

  if ("title" in body) {
    const title = validateTitle(body.title, false);
    if (title === null) {
      fields.push({ field: "title", message: "Title must be at least 3 characters." });
    } else if (title) {
      normalized.title = title;
    }
  }

  if ("content" in body) {
    const content = validateContent(body.content, false);
    if (content === null) {
      fields.push({ field: "content", message: "Content must be at least 5 characters." });
    } else if (content) {
      normalized.content = content;
    }
  }

  if ("attachments" in body) {
    const attachmentsResult = parseAttachments(body.attachments);
    if (attachmentsResult === null) {
      fields.push({ field: "attachments", message: "Attachments must be an array of objects with a name." });
    } else {
      normalized.attachments = attachmentsResult ?? undefined;
    }
  }

  if (fields.length > 0) {
    return { valid: false, fields };
  }

  if (Object.keys(normalized).length === 0) {
    return {
      valid: false,
      fields: [{ field: "payload", message: "At least one field must be provided to update." }],
    };
  }

  return { valid: true, payload: normalized };
}

export type ListPatientNotesQuery = {
  page: number;
  limit: number;
  noteType?: PatientNoteType;
  staffId?: string;
  createdFrom?: string;
  createdTo?: string;
};

export type ListPatientNotesQueryResult =
  | { valid: true; payload: ListPatientNotesQuery }
  | { valid: false; error: "INVALID_PAGINATION" | "INVALID_FILTER" };

function readListQueryString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseListPositiveInt(value: unknown, fallback: number, required = false): number | null {
  if (value === undefined || value === null || value === "") {
    return required ? null : fallback;
  }

  const raw = readListQueryString(value);
  if (raw === undefined || raw === "") {
    return required ? null : fallback;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export function parseListPatientNotesQuery(query: unknown): ListPatientNotesQueryResult {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const body = query as Record<string, unknown>;
  const hasPage = "page" in body && body.page !== undefined && body.page !== "";
  const hasLimit = "limit" in body && body.limit !== undefined && body.limit !== "";

  const page = parseListPositiveInt(body.page, 1, hasPage);
  if (page === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const limit = parseListPositiveInt(body.limit, 20, hasLimit);
  if (limit === null) {
    return { valid: false, error: "INVALID_PAGINATION" };
  }

  const safeLimit = Math.min(limit, 200);

  let noteType: PatientNoteType | undefined;
  const noteTypeRaw = readListQueryString(body.noteType)?.trim().toUpperCase();
  if (noteTypeRaw) {
    if (!PATIENT_NOTE_TYPES.includes(noteTypeRaw as PatientNoteType)) {
      return { valid: false, error: "INVALID_FILTER" };
    }
    noteType = noteTypeRaw as PatientNoteType;
  }

  const staffId = readListQueryString(body.staffId)?.trim();
  const createdFromRaw = readListQueryString(body.createdFrom)?.trim();
  const createdToRaw = readListQueryString(body.createdTo)?.trim();

  if (createdFromRaw && !isValidIsoDate(createdFromRaw)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  if (createdToRaw && !isValidIsoDate(createdToRaw)) {
    return { valid: false, error: "INVALID_FILTER" };
  }

  return {
    valid: true,
    payload: {
      page,
      limit: safeLimit,
      noteType,
      staffId: staffId || undefined,
      createdFrom: createdFromRaw,
      createdTo: createdToRaw,
    },
  };
}
