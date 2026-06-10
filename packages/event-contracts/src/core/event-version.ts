export type EventVersionCompatibility = "compatible" | "breaking" | "unknown";

export function isVersionCompatible(
  publishedVersion: number,
  expectedVersion: number,
): EventVersionCompatibility {
  if (publishedVersion === expectedVersion) {
    return "compatible";
  }

  if (publishedVersion < expectedVersion) {
    return "compatible";
  }

  return "breaking";
}
