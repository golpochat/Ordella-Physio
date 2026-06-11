#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPOSE_FILE="${DEPLOY_DIR}/docker-compose.local.yml"

cd "${DEPLOY_DIR}"

echo "==> Syncing auth schema (adds PATIENT + PHARMACY roles if missing)..."
docker compose -f "${COMPOSE_FILE}" run --rm --no-deps auth-service \
  sh -c "pnpm exec prisma db push --skip-generate"

echo "==> Seeding demo tenant..."
docker compose -f "${COMPOSE_FILE}" run --rm --no-deps tenant-service \
  sh -c "pnpm exec prisma db seed"

echo "==> Seeding auth users..."
docker compose -f "${COMPOSE_FILE}" run --rm --no-deps auth-service \
  sh -c "pnpm exec prisma db seed"

echo "==> Seeding patient records..."
docker compose -f "${COMPOSE_FILE}" run --rm --no-deps patient-service \
  sh -c "pnpm exec prisma db seed"

echo "==> Restarting auth-service (loads PATIENT + PHARMACY role enum)..."
docker compose -f "${COMPOSE_FILE}" up -d --no-deps --force-recreate auth-service

echo ""
echo "Dev users seeded successfully."
echo "  Tenant:  demo-tenant"
echo "  Login:   http://localhost:3010/login"
echo "  Docs:    docs/ops-reference.md (section 4)"
