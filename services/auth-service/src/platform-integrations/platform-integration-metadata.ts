import type {
  AddressLookupConnectionTestResult,
  StoredConnectionTest,
} from "@/platform-integrations/platform-integration.types";

export const CONNECTION_TEST_METADATA_KEY = "connectionTest";

export type { StoredConnectionTest };

function isStoredConnectionTest(value: unknown): value is StoredConnectionTest {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.testedAt === "string" &&
    typeof record.connected === "boolean" &&
    typeof record.message === "string" &&
    typeof record.suggestionCount === "number"
  );
}

export function readConnectionTest(metadata: Record<string, unknown>): StoredConnectionTest | null {
  const raw = metadata[CONNECTION_TEST_METADATA_KEY];
  return isStoredConnectionTest(raw) ? raw : null;
}

export function writeConnectionTestMetadata(
  metadata: Record<string, unknown>,
  result: AddressLookupConnectionTestResult,
): Record<string, unknown> {
  const stored: StoredConnectionTest = {
    testedAt: result.testedAt,
    connected: result.connected,
    message: result.message,
    suggestionCount: result.suggestionCount,
  };

  return {
    ...metadata,
    [CONNECTION_TEST_METADATA_KEY]: stored,
  };
}

export function clearConnectionTestMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
  if (!(CONNECTION_TEST_METADATA_KEY in metadata)) {
    return metadata;
  }

  const next = { ...metadata };
  delete next[CONNECTION_TEST_METADATA_KEY];
  return next;
}
