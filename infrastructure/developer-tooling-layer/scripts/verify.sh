#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLING_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$TOOLING_DIR/../.." && pwd)"

cd "$ROOT_DIR"

echo "==> Verifying ordella-physio workspace"

echo "-> Lint"
bash "$TOOLING_DIR/scripts/lint-all.sh"

echo "-> Typecheck"
pnpm typecheck

echo "-> Test"
bash "$TOOLING_DIR/scripts/test-all.sh"

echo "==> Verification complete"
