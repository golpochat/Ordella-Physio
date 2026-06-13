import { aiValidationError } from "@/utils/ai-errors";
import { parseDatasetType, type DatasetType } from "@/models/AIDataset";
import type { DatasetLabelType } from "@/models/AIDatasetRecord";

export function validateCreateDataset(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const fields: Array<{ field: string; message: string }> = [];
  if (!name) {
    fields.push({ field: "name", message: "name is required." });
  }
  if (fields.length) {
    throw aiValidationError(fields);
  }

  const type = body.type ? parseDatasetType(String(body.type)) : ("TEXT" as DatasetType);
  const tags = Array.isArray(body.tags)
    ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];

  return {
    name,
    description: body.description ? String(body.description).trim() : "",
    type,
    tags,
    records: Array.isArray(body.records) ? body.records : [],
  };
}

export function validateUpdateDataset(body: Record<string, unknown>) {
  const input: {
    name?: string;
    description?: string;
    type?: DatasetType;
    tags?: string[];
  } = {};

  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) {
      throw aiValidationError([{ field: "name", message: "name cannot be empty." }]);
    }
    input.name = name;
  }
  if (body.description !== undefined) {
    input.description = String(body.description).trim();
  }
  if (body.type !== undefined) {
    input.type = parseDatasetType(String(body.type)) as DatasetType;
  }
  if (body.tags !== undefined) {
    input.tags = Array.isArray(body.tags)
      ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];
  }

  return input;
}

export function validateRecordInput(body: Record<string, unknown>) {
  if (body.input === undefined) {
    throw aiValidationError([{ field: "input", message: "input is required." }]);
  }

  return {
    input: body.input,
    output: body.output ?? null,
    metadata:
      body.metadata && typeof body.metadata === "object"
        ? (body.metadata as Record<string, unknown>)
        : {},
  };
}

export function validateBulkRecords(body: Record<string, unknown>) {
  if (!Array.isArray(body.records) || !body.records.length) {
    throw aiValidationError([{ field: "records", message: "records array is required." }]);
  }

  return body.records.map((item, index) => {
    const record = (item ?? {}) as Record<string, unknown>;
    if (record.input === undefined) {
      throw aiValidationError([{ field: `records[${index}].input`, message: "input is required." }]);
    }
    return {
      input: record.input,
      output: record.output ?? null,
      metadata:
        record.metadata && typeof record.metadata === "object"
          ? (record.metadata as Record<string, unknown>)
          : {},
    };
  });
}

export function validateLabelInput(body: Record<string, unknown>) {
  const labelType = String(body.labelType ?? "").toUpperCase() as DatasetLabelType;
  if (!["CLASSIFICATION", "EXTRACTION", "CORRECTION"].includes(labelType)) {
    throw aiValidationError([{ field: "labelType", message: "Invalid label type." }]);
  }

  return {
    labelType,
    labelValue:
      body.labelValue && typeof body.labelValue === "object"
        ? (body.labelValue as Record<string, unknown>)
        : { value: body.labelValue },
  };
}

export function validateImportDataset(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  if (!name) {
    throw aiValidationError([{ field: "name", message: "name is required for import." }]);
  }

  return {
    name,
    description: body.description ? String(body.description).trim() : "",
    type: body.type ? parseDatasetType(String(body.type)) : ("TEXT" as DatasetType),
    tags: Array.isArray(body.tags)
      ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
    records: validateBulkRecords({ records: body.records ?? [] }),
  };
}
