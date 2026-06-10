import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  platform: "node",
  external: [
    "@nestjs/common",
    "@opentelemetry/api",
    "express",
    "prom-client",
    "node:crypto",
    "node:fs",
    "node:path",
    "node:perf_hooks",
  ],
});
