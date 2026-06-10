import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

export type DeadLetterRecord = {
  id: string;
  stream: string;
  subject: string;
  tenantId: string;
  payload: Record<string, unknown>;
  reason: string;
  failedAt: string;
  retriedAt?: string;
};

export type CreateDeadLetterInput = Omit<DeadLetterRecord, "id" | "failedAt" | "retriedAt">;

export type ListDeadLetterFilter = {
  stream?: string;
  subject?: string;
  tenantId?: string;
  page: number;
  limit: number;
};

@Injectable()
export class DeadLetterRepository {
  private readonly records: DeadLetterRecord[] = [];

  create(input: CreateDeadLetterInput): DeadLetterRecord {
    const record: DeadLetterRecord = {
      id: randomUUID(),
      failedAt: new Date().toISOString(),
      ...input,
    };

    this.records.unshift(record);
    return record;
  }

  list(filter: ListDeadLetterFilter) {
    const filtered = this.records.filter((record) => {
      if (filter.stream && record.stream !== filter.stream) {
        return false;
      }

      if (filter.subject && record.subject !== filter.subject) {
        return false;
      }

      if (filter.tenantId && record.tenantId !== filter.tenantId) {
        return false;
      }

      return true;
    });

    const offset = (filter.page - 1) * filter.limit;
    const items = filtered.slice(offset, offset + filter.limit);

    return { items, total: filtered.length, page: filter.page, limit: filter.limit };
  }

  findById(id: string): DeadLetterRecord | undefined {
    return this.records.find((record) => record.id === id);
  }

  markRetried(id: string): DeadLetterRecord | undefined {
    const record = this.findById(id);
    if (!record) {
      return undefined;
    }

    record.retriedAt = new Date().toISOString();
    return record;
  }
}
