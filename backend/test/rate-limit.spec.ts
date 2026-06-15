import { describe, expect, it } from "vitest";

import { InMemoryRateLimitStore } from "../src/lib/rate-limit-store";

describe("InMemoryRateLimitStore", () => {
  it("allows requests under the limit within the window", async () => {
    const store = new InMemoryRateLimitStore();

    const first = await store.increment("test-key", 60_000);
    expect(first.count).toBe(1);

    const second = await store.increment("test-key", 60_000);
    expect(second.count).toBe(2);
  });

  it("resets the bucket after the window expires", async () => {
    const store = new InMemoryRateLimitStore();

    await store.increment("expiring-key", 1);
    await new Promise((resolve) => setTimeout(resolve, 5));

    const afterExpiry = await store.increment("expiring-key", 1);
    expect(afterExpiry.count).toBe(1);
  });
});
