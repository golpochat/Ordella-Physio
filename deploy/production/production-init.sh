#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
ENV_FILE="${SCRIPT_DIR}/.env.production"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.prod.yml"

cd "${REPO_ROOT}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "ERROR: ${ENV_FILE} not found."
  exit 1
fi

if grep -q "CHANGE_ME" "${ENV_FILE}"; then
  echo "ERROR: ${ENV_FILE} still contains CHANGE_ME placeholders."
  echo "Replace all production secrets before deploying."
  exit 1
fi

mkdir -p "${SCRIPT_DIR}/backups"

echo "==> Pulling latest code..."
git pull --ff-only origin "$(git rev-parse --abbrev-ref HEAD)"

echo "==> Building production Docker images..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" build

echo "==> Starting infrastructure..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d postgres redis nats traefik

echo "==> Waiting for Postgres..."
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

echo "==> Starting observability + backup scheduler..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d \
  loki promtail prometheus alertmanager tempo grafana backup-scheduler

ROLLING_SERVICES=(
  auth-service
  tenant-service
  patient-service
  appointment-service
  notes-service
  billing-service
  payment-service
  communication-service
  reporting-service
  event-bus-service
  api-gateway
  frontend-web
)

echo "==> Rolling deploy (zero-downtime)..."
for service in "${ROLLING_SERVICES[@]}"; do
  echo "  -> ${service}"
  docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d --no-deps --force-recreate "${service}"

  CID="$(docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" ps -q "${service}")"
  if [[ -n "${CID}" ]]; then
    echo "     waiting for health..."
    for _ in $(seq 1 40); do
      STATUS="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "${CID}" 2>/dev/null || echo "missing")"
      if [[ "${STATUS}" == "healthy" || "${STATUS}" == "none" ]]; then
        break
      fi
      sleep 3
    done
  fi
done

echo ""
echo "Production deployment complete."
echo "  Frontend:  https://ordella-physio.com"
echo "  API:       https://api.ordella-physio.com"
echo "  Grafana:   https://grafana.ordella-physio.com"
echo ""
echo "Run ./verify-production.sh to validate."
