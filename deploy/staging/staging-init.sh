#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
ENV_FILE="${SCRIPT_DIR}/.env.staging"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.staging.yml"

cd "${REPO_ROOT}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "ERROR: ${ENV_FILE} not found."
  echo "Copy deploy/staging/.env.staging and replace all CHANGE_ME values."
  exit 1
fi

if grep -q "CHANGE_ME" "${ENV_FILE}"; then
  echo "WARNING: ${ENV_FILE} still contains CHANGE_ME placeholders."
  echo "Replace secrets before running in a real staging environment."
fi

echo "==> Pulling latest code..."
git pull --ff-only origin "$(git rev-parse --abbrev-ref HEAD)"

echo "==> Building Docker images..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" build

echo "==> Starting infrastructure (postgres, redis, nats)..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d postgres redis nats

echo "==> Waiting for Postgres to become healthy..."
until docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres \
  pg_isready -U "$(grep '^POSTGRES_USER=' "${ENV_FILE}" | cut -d= -f2-)" >/dev/null 2>&1; do
  sleep 2
done

PRISMA_SERVICES=(
  auth-service
  tenant-service
  patient-service
  appointment-service
  notes-service
  billing-service
  payment-service
  communication-service
  reporting-service
)

echo "==> Running Prisma migrations..."
for service in "${PRISMA_SERVICES[@]}"; do
  echo "  -> ${service}"
  docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" run --rm --no-deps "${service}" \
    sh -c "pnpm exec prisma migrate deploy"
done

echo "==> Starting full staging stack..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d

echo "==> Waiting for API Gateway health..."
until docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T api-gateway \
  wget -qO- http://localhost:3049/health >/dev/null 2>&1; do
  sleep 3
done

echo "==> Restarting application services..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" restart \
  auth-service tenant-service patient-service appointment-service notes-service \
  billing-service payment-service communication-service reporting-service \
  event-bus-service api-gateway frontend-web

echo ""
echo "Staging deployment complete."
echo "  Frontend:  https://staging.ordella-physio.com"
echo "  API:       https://api.staging.ordella-physio.com"
echo "  Grafana:   https://grafana.staging.ordella-physio.com"
echo ""
echo "Run ./verify-staging.sh to validate health checks."
