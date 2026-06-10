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
    "@nestjs/microservices",
    "express",
    "class-validator",
    "zod",
    "rxjs",
  ],
});
