#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLING_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$TOOLING_DIR/../.." && pwd)"

cd "$ROOT_DIR"

echo "==> Linting via Turbo (workspace packages)"

if pnpm turbo run lint; then
  echo "==> Turbo lint complete"
else
  echo "==> Turbo lint reported issues or missing tasks; continuing scaffold verification"
fi
