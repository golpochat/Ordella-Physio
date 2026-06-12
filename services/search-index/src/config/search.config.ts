import type { SearchProviderName } from "@/generated/prisma";

export const SUPPORTED_INDEX_NAMES = [
  "patients",
  "appointments",
  "invoices",
  "staff",
  "products",
] as const;

export type SupportedIndexName = (typeof SUPPORTED_INDEX_NAMES)[number];

export const FEDERATED_INDEXES = [
  "patients",
  "appointments",
  "invoices",
  "staff",
] as const satisfies readonly SupportedIndexName[];

export const INDEX_SEARCH_FIELDS: Record<SupportedIndexName, string[]> = {
  patients: ["name", "firstName", "lastName", "email", "phone", "label"],
  appointments: ["patientName", "providerName", "staffName", "date", "time", "label"],
  invoices: ["invoiceNumber", "patientName", "status", "label"],
  staff: ["firstName", "lastName", "name", "email", "role", "label"],
  products: ["name", "sku", "description", "label"],
};

export const DEFAULT_SEARCH_PROVIDER: SearchProviderName =
  (process.env.DEFAULT_SEARCH_PROVIDER?.toUpperCase() as SearchProviderName | undefined) ?? "LOCAL";

export const DEFAULT_SEARCH_LIMIT = 20;
export const MAX_SEARCH_LIMIT = 100;

export function isSupportedIndexName(value: string): value is SupportedIndexName {
  return (SUPPORTED_INDEX_NAMES as readonly string[]).includes(value);
}

export function buildTenantIndexKey(tenantId: string, indexName: string) {
  return `${tenantId}:${indexName}`;
}
