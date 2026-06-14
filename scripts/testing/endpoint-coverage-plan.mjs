#!/usr/bin/env node
/**
 * Phase 3 endpoint classification plan — scans controllers and route files.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const repoRoot = join(import.meta.dirname, "../..");
const servicesDir = join(repoRoot, "services");

const PRIORITY = [
  "auth-service",
  "api-gateway",
  "tenant-service",
  "patient-service",
  "appointment-service",
  "billing-service",
  "subscription-billing",
  "file-storage",
  "search-index",
  "ai-gateway",
  "ai",
];

const CLASSIFIERS = [
  { tag: "auth-critical", pattern: /auth|login|register|token|mfa|session|password/i },
  { tag: "tenant-critical", pattern: /tenant|staff|organization|location/i },
  { tag: "money-critical", pattern: /billing|invoice|stripe|payment|subscription|plan/i },
  { tag: "ai-critical", pattern: /\bai\b|inference|embedding|gateway|model|dataset|agent/i },
  { tag: "low-risk", pattern: /health|internal|directory|metrics/i },
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === "dist") continue;
      walk(full, files);
    } else if (/\.(controller|routes)\.ts$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function classify(text, route) {
  const haystack = `${text} ${route}`;
  const tags = CLASSIFIERS.filter((rule) => rule.pattern.test(haystack)).map((rule) => rule.tag);
  if (tags.length === 0) return ["standard"];
  if (tags.includes("low-risk") && tags.length > 1) {
    return tags.filter((tag) => tag !== "low-risk");
  }
  return tags;
}

function extractEndpoints(filePath) {
  const text = readFileSync(filePath, "utf8");
  const endpoints = [];
  const decoratorPattern = /@(Get|Post|Put|Patch|Delete|All)\(([^)]*)\)/g;
  let match;

  while ((match = decoratorPattern.exec(text)) !== null) {
    const method = match[1].toUpperCase();
    const route = match[2].replace(/['"`]/g, "").trim() || "/";
    endpoints.push({ method, route, tags: classify(text, route) });
  }

  return endpoints;
}

const plan = {};

for (const service of readdirSync(servicesDir)) {
  const servicePath = join(servicesDir, service);
  if (!statSync(servicePath).isDirectory()) continue;

  const files = walk(join(servicePath, "src"));
  const endpoints = [];

  for (const file of files) {
    for (const endpoint of extractEndpoints(file)) {
      endpoints.push({
        ...endpoint,
        file: relative(repoRoot, file),
      });
    }
  }

  plan[service] = {
    priority: PRIORITY.includes(service) ? PRIORITY.indexOf(service) + 1 : null,
    endpointCount: endpoints.length,
    byTag: endpoints.reduce((acc, endpoint) => {
      for (const tag of endpoint.tags) {
        acc[tag] = (acc[tag] ?? 0) + 1;
      }
      return acc;
    }, {}),
    endpoints,
  };
}

const prioritized = PRIORITY.map((name) => ({
  service: name,
  ...plan[name],
}));

console.log("Phase 3 Per-Service Coverage Plan");
console.log("=================================");
console.log("");

let total = 0;
for (const row of prioritized) {
  total += row.endpointCount ?? 0;
  const tags = Object.entries(row.byTag ?? {})
    .map(([tag, count]) => `${tag}:${count}`)
    .join(", ");
  console.log(
    `${row.priority}. ${row.service} — ${row.endpointCount} endpoints (${tags || "unclassified"})`,
  );
}

console.log("");
console.log(`Prioritized services: ${total} endpoints scanned`);
console.log(`All services: ${Object.values(plan).reduce((sum, s) => sum + s.endpointCount, 0)} endpoints`);

const outputPath = join(repoRoot, "scripts/testing/phase3-endpoint-plan.json");
writeFileSync(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), plan, prioritized }, null, 2)}\n`);
console.log(`Plan written to ${relative(repoRoot, outputPath)}`);
