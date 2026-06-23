/** Client helper — refresh BFF runtime cache after super-admin vendor changes. */
export async function reloadAddressLookupRuntimeCache(): Promise<void> {
  try {
    await fetch("/api/address/reload-config", { method: "POST", cache: "no-store" });
  } catch {
    // Non-fatal; cache TTL will expire within a minute.
  }
}
