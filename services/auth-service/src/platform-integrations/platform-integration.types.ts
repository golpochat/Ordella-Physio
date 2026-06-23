export const ADDRESS_LOOKUP_VENDORS = ["postcoder", "ideal_postcodes"] as const;

export type AddressLookupVendor = (typeof ADDRESS_LOOKUP_VENDORS)[number];

export type AddressLookupCredentials = {
  apiKey: string;
};

export type PlatformIntegrationPublic = {
  id: string;
  category: "ADDRESS_LOOKUP";
  vendor: AddressLookupVendor;
  label: string;
  apiKeyLast4: string | null;
  metadata: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  updatedByUserId: string | null;
};

export type AddressLookupRuntimeConfig = {
  enabled: boolean;
  provider: AddressLookupVendor | "none";
  integrationId: string | null;
  apiKey: string | null;
  metadata: Record<string, unknown>;
};

export type CreateAddressLookupIntegrationInput = {
  vendor: AddressLookupVendor;
  label: string;
  apiKey: string;
  metadata?: Record<string, unknown>;
};

export type UpdateAddressLookupIntegrationInput = {
  label?: string;
  apiKey?: string;
  metadata?: Record<string, unknown>;
};

export type AddressLookupConnectionTestInput = {
  vendor: AddressLookupVendor;
  apiKey: string;
};

export type AddressLookupConnectionTestResult = {
  connected: boolean;
  message: string;
  suggestionCount: number;
  testedAt: string;
};
