import { existsSync } from "node:fs";
import path from "node:path";

const engineName =
  process.platform === "win32" ? "query_engine-windows.dll.node" : "libquery_engine.node";

const candidates = [
  path.join(process.cwd(), "src/generated/prisma", engineName),
  path.join(__dirname, "generated/prisma", engineName),
];

for (const candidate of candidates) {
  if (existsSync(candidate)) {
    process.env.PRISMA_QUERY_ENGINE_LIBRARY ??= candidate;
    break;
  }
}
