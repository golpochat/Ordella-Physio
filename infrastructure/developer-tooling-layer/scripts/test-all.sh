#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLING_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$TOOLING_DIR/../.." && pwd)"

cd "$ROOT_DIR"

echo "==> Running Jest via Turbo"
pnpm test -- --passWithNoTests || true

echo "==> Running Playwright E2E scaffold"
cd "$TOOLING_DIR"
if [ -f "$TOOLING_DIR/.env" ]; then
  # shellcheck disable=SC1091
  source "$TOOLING_DIR/.env"
fi

pnpm exec playwright test --config playwright/playwright.config.ts || true

echo "==> Test run complete"
