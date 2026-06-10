#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLING_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$TOOLING_DIR/../.." && pwd)"
PRETTIER_CONFIG="$TOOLING_DIR/prettier/prettier.config.js"

cd "$ROOT_DIR"

echo "==> Formatting repository with Prettier"

pnpm exec prettier \
  --config "$PRETTIER_CONFIG" \
  --write \
  "apps/**/*.{js,jsx,ts,tsx,mjs,cjs,json,md,yml,yaml,css}" \
  "services/**/*.{js,jsx,ts,tsx,mjs,cjs,json,md,yml,yaml,css}" \
  "packages/**/*.{js,jsx,ts,tsx,mjs,cjs,json,md,yml,yaml,css}" \
  "infrastructure/**/*.{js,jsx,ts,tsx,mjs,cjs,json,md,yml,yaml,css}"

echo "==> Format complete"
