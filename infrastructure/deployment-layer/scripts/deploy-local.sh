#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${DEPLOY_DIR}"

if [[ ! -f .env.local ]]; then
  echo "Creating .env.local from .env.local.example"
  cp .env.local.example .env.local
  echo "Review .env.local and update secrets before production-like testing."
fi

echo "Starting Ordella Physio local stack..."
docker compose -f "${DEPLOY_DIR}/../../docker-compose.dev.yml" up -d

echo ""
echo "Running database migrations..."
node "${SCRIPT_DIR}/migrate-local-databases.mjs"

echo ""
echo "Local stack is up."
echo "  API Gateway:  http://localhost:${API_GATEWAY_PORT:-3049}"
echo "  Frontend Web: http://localhost:${FRONTEND_WEB_PORT:-3010}"
