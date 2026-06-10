#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLING_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$TOOLING_DIR/../.." && pwd)"

if [ -f "$TOOLING_DIR/.env" ]; then
  # shellcheck disable=SC1091
  source "$TOOLING_DIR/.env"
fi

echo "==> Ordella developer tooling bootstrap"
echo "    Repo root: $ROOT_DIR"
echo "    Tooling:   $TOOLING_DIR"

cd "$ROOT_DIR"

if command -v corepack >/dev/null 2>&1; then
  corepack enable
  corepack prepare "pnpm@${PNPM_VERSION:-9.15.4}" --activate
fi

echo "==> Installing workspace dependencies"
pnpm install

echo "==> Installing tooling layer dependencies"
cd "$TOOLING_DIR"
pnpm install

echo "==> Preparing Husky hooks"
cd "$ROOT_DIR"
pnpm exec husky init 2>/dev/null || mkdir -p .husky

install_hook() {
  local name="$1"
  local source="$TOOLING_DIR/husky/$name"
  local target="$ROOT_DIR/.husky/$name"
  if [ -f "$source" ]; then
    cp "$source" "$target"
    chmod +x "$target"
    echo "    Installed hook: $name"
  fi
}

install_hook "pre-commit"
install_hook "commit-msg"

echo "==> Linking GitHub workflow templates"
mkdir -p "$ROOT_DIR/.github/workflows"
for workflow in "$TOOLING_DIR/github/workflows/"*.yml; do
  filename="$(basename "$workflow")"
  cp "$workflow" "$ROOT_DIR/.github/workflows/$filename"
  echo "    Copied workflow: $filename"
done

echo "==> Linking EditorConfig"
if [ ! -f "$ROOT_DIR/.editorconfig" ]; then
  cp "$TOOLING_DIR/.editorconfig" "$ROOT_DIR/.editorconfig"
  echo "    Installed root .editorconfig"
else
  echo "    Root .editorconfig already exists (skipped)"
fi

echo "==> Generating environment scaffolds"
bash "$TOOLING_DIR/scripts/generate-env.sh"

echo "==> Bootstrap complete"
