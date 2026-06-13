#!/usr/bin/env node
/**
 * Lists Docker resources that violate ordella-physio naming standards.
 * Run from repo root. Does not remove active/in-use resources unless --prune is passed.
 */
import { spawnSync } from "node:child_process";

const PROJECT = "ordella-physio";
const ALLOWED_NETWORKS = new Set([
  "ordella-physio-network",
  "bridge",
  "host",
  "none",
]);

function docker(args) {
  const result = spawnSync("docker", args, { encoding: "utf8" });
  return (result.stdout || "").trim();
}

function jsonLines(args) {
  const out = docker(args);
  if (!out) return [];
  return out
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

const prune = process.argv.includes("--prune");

console.log(`\n=== Docker audit — ${PROJECT} ===\n`);

const containers = jsonLines([
  "ps",
  "-a",
  "--format",
  "{{json .}}",
]);

const badContainers = containers.filter(
  (c) => c.Names && !c.Names.startsWith(`${PROJECT}-`) && !c.Names.startsWith("buildx"),
);

console.log(`Containers not matching ${PROJECT}-*: ${badContainers.length}`);
for (const c of badContainers) {
  console.log(`  - ${c.Names} (${c.Image})`);
}

const images = jsonLines([
  "images",
  "--format",
  "{{json .}}",
]);

const badImages = images.filter((img) => {
  const ref = img.Repository || "";
  if (ref === "<none>") return true;
  if (
    ref.startsWith("postgres") ||
    ref.startsWith("redis") ||
    ref.startsWith("nats") ||
    ref.startsWith("traefik") ||
    ref.startsWith("grafana") ||
    ref.startsWith("prom") ||
    ref.startsWith("grafana/") ||
    ref.startsWith("node") ||
    ref.startsWith("alpine")
  ) {
    return false;
  }
  return !ref.startsWith(`${PROJECT}-`);
});

console.log(`\nNon-project / dangling images: ${badImages.length}`);
for (const img of badImages.slice(0, 30)) {
  console.log(`  - ${img.Repository}:${img.Tag} (${img.ID})`);
}
if (badImages.length > 30) {
  console.log(`  ... and ${badImages.length - 30} more`);
}

const networks = jsonLines([
  "network",
  "ls",
  "--format",
  "{{json .}}",
]);

const badNetworks = networks.filter(
  (n) => !ALLOWED_NETWORKS.has(n.Name) && !n.Name.startsWith(`${PROJECT}-`),
);

console.log(`\nNon-standard networks: ${badNetworks.length}`);
for (const n of badNetworks) {
  console.log(`  - ${n.Name}`);
}

const volumes = jsonLines([
  "volume",
  "ls",
  "--format",
  "{{json .}}",
]);

const badVolumes = volumes.filter(
  (v) => !v.Name.startsWith(`${PROJECT}-`) && !v.Name.startsWith("ordella-physio-"),
);

console.log(`\nNon-standard volumes: ${badVolumes.length}`);
for (const v of badVolumes) {
  console.log(`  - ${v.Name}`);
}

if (prune) {
  console.log("\n--- Pruning unused resources (docker-clean.sh) ---");
  spawnSync("bash", ["scripts/docker-clean.sh"], { stdio: "inherit" });

  for (const c of badContainers.filter((x) => x.State !== "running")) {
    console.log(`Removing container ${c.ID}...`);
    spawnSync("docker", ["rm", "-f", c.ID], { stdio: "inherit" });
  }

  for (const n of badNetworks) {
    console.log(`Removing network ${n.Name}...`);
    spawnSync("docker", ["network", "rm", n.Name], { stdio: "inherit" });
  }

  console.log("\nPrune pass complete. Re-run without --prune to verify.");
} else {
  console.log("\nTo prune unused Docker resources, run:");
  console.log("  ./scripts/docker-clean.sh");
  console.log("  node scripts/docker/audit-orphans.mjs --prune");
}

console.log("");
