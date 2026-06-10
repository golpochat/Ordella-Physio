import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../src/styles");
const distDir = path.join(__dirname, "../dist/styles");

fs.mkdirSync(distDir, { recursive: true });

for (const file of fs.readdirSync(srcDir)) {
  if (file.endsWith(".css")) {
    fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
  }
}

console.log("Copied styles to dist/styles");
