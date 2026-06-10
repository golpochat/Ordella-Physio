#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLING_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$TOOLING_DIR/../.." && pwd)"

copy_if_missing() {
  local example="$1"
  local target="$2"
  if [ -f "$example" ] && [ ! -f "$target" ]; then
    cp "$example" "$target"
    echo "    Created $target"
  fi
}

echo "==> Generating .env scaffolds (missing files only)"

for dir in "$ROOT_DIR"/services/* "$ROOT_DIR"/apps/*; do
  [ -d "$dir" ] || continue
  copy_if_missing "$dir/.env.example" "$dir/.env"
done

copy_if_missing "$ROOT_DIR/services/api-gateway/.env.example" "$ROOT_DIR/services/api-gateway/.env"
copy_if_missing "$TOOLING_DIR/.env.example" "$TOOLING_DIR/.env"

for infra_dir in "$ROOT_DIR"/infrastructure/*; do
  [ -d "$infra_dir" ] || continue
  copy_if_missing "$infra_dir/.env.example" "$infra_dir/.env"
done

echo "==> Environment scaffold complete"
