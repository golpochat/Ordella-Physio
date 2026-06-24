#!/usr/bin/env node
/**
 * Install runtime peers into slim deploy images (/opt/peers pattern).
 * pnpm deploy omits optional peers from @ordella/* workspace packages.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

// Versions aligned with pnpm-lock.yaml
const PEER_INSTALL = `RUN mkdir -p /opt/peers && cd /opt/peers && npm init -y \\
  && npm install --omit=dev \\
    bcrypt@5.1.1 \\
    @nestjs/microservices@10.4.22 \\
    jsonwebtoken@9.0.2 \\
    helmet@8.0.0 \\
    cors@2.8.5 \\
    prom-client@15.1.3 \\
    nats@2.29.3 \\
    class-validator@0.14.4 \\
    class-transformer@0.5.1 \\
  && cp -rf /opt/peers/node_modules/. /deploy/node_modules/`;

const PEER_BLOCK_RE =
  /RUN mkdir -p \/opt\/peers[\s\S]*?&& cp -r[nf] \/opt\/peers\/node_modules\/\. \/deploy\/node_modules\//;

function files() {
  const out = [];
  for (const name of readdirSync(join(ROOT, "services"))) {
    const f = join(ROOT, "services", name, "Dockerfile");
    try {
      if (statSync(f).isFile()) out.push(f);
    } catch {
      /* skip */
    }
  }
  out.push(join(ROOT, "backend", "Dockerfile"));
  return out;
}

let n = 0;
for (const f of files()) {
  const c = readFileSync(f, "utf8");
  if (!PEER_BLOCK_RE.test(c)) continue;
  writeFileSync(f, c.replace(PEER_BLOCK_RE, PEER_INSTALL), "utf8");
  console.log("updated:", f.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
  n++;
}
console.log(`Done. ${n} Dockerfile(s).`);
