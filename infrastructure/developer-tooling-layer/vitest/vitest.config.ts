import { defineConfig } from "vitest/config";

/**
 * Optional Vitest preset for packages and apps that prefer Vitest over Jest.
 * Extend this file from a workspace package:
 *   import { mergeConfig } from "vitest/config";
 *   import toolingPreset from "../../infrastructure/developer-tooling-layer/vitest/vitest.config";
 */
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["**/*.d.ts", "**/*.config.*", "**/dist/**"],
    },
    passWithNoTests: true,
  },
});
