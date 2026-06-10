import { nextSequence, randomFrom } from "./random";

export type MockTenant = {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currency: string;
  address: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const TIMEZONES = ["UTC", "Europe/London", "America/New_York", "Australia/Sydney"];
const CURRENCIES = ["GBP", "USD", "EUR", "AUD"];

export function mockTenant(overrides: Partial<MockTenant> = {}): MockTenant {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");

  return {
    id: overrides.id ?? `tenant-${index}`,
    name: overrides.name ?? `Tenant ${index}`,
    slug: overrides.slug ?? `tenant-${index}`,
    timezone: overrides.timezone ?? randomFrom(TIMEZONES),
    currency: overrides.currency ?? randomFrom(CURRENCIES),
    address: overrides.address ?? `${index} Test Street`,
    phone: overrides.phone ?? `+447700900${String(index).padStart(3, "0").slice(-3)}`,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
