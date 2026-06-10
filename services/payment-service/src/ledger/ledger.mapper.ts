import type { LedgerEntry } from "@/generated/prisma";

export type LedgerEntryResponse = {
  id: string;
  tenantId: string;
  type: string;
  referenceId: string;
  amount: number;
  currency: string;
  description: string | null;
  createdAt: string;
};

function toNumber(value: { toNumber(): number } | number): number {
  return typeof value === "number" ? value : value.toNumber();
}

export function toLedgerEntryResponse(entry: LedgerEntry): LedgerEntryResponse {
  return {
    id: entry.id,
    tenantId: entry.tenantId,
    type: entry.type,
    referenceId: entry.referenceId,
    amount: toNumber(entry.amount),
    currency: entry.currency,
    description: entry.description,
    createdAt: entry.createdAt.toISOString(),
  };
}

export function toLedgerEntryListResponse(entries: LedgerEntry[]) {
  return entries.map(toLedgerEntryResponse);
}
