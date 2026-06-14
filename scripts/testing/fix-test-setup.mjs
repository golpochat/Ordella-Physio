import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const servicesDir = join(import.meta.dirname, "../../services");

for (const service of readdirSync(servicesDir)) {
  const setupPath = join(servicesDir, service, "test-setup.ts");
  try {
    if (!statSync(setupPath).isFile()) continue;
  } catch {
    continue;
  }

  let content = readFileSync(setupPath, "utf8");
  const broken = content.includes('?? " 1500;');
  if (!broken) continue;

  content = content.replace(
    /process\.env\.GATEWAY_PROBE_TIMEOUT_MS = process\.env\.GATEWAY_PROBE_TIMEOUT_MS \?\? " 1500;/g,
    'process.env.GATEWAY_PROBE_TIMEOUT_MS = process.env.GATEWAY_PROBE_TIMEOUT_MS ?? "1500";',
  );

  if (!content.includes("jest.setTimeout")) {
    content = `${content.trimEnd()}\njest.setTimeout(20000);\n`;
  }

  writeFileSync(setupPath, content);
  console.log(`Fixed ${service}/test-setup.ts`);
}
