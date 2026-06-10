#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/.env.staging"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.staging.yml"

# shellcheck disable=SC1090
source <(grep -E '^(FRONTEND_URL|API_GATEWAY_URL)=' "${ENV_FILE}" | sed 's/^/export /')

PASS=0
FAIL=0

check() {
  local name="$1"
  local url="$2"
  if curl -fsS --max-time 10 "${url}" >/dev/null 2>&1; then
    echo "  OK   ${name} — ${url}"
    PASS=$((PASS + 1))
  else
    echo "  FAIL ${name} — ${url}"
    FAIL=$((FAIL + 1))
  fi
}

check_container() {
  local name="$1"
  if docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" ps --status running --format '{{.Name}}' \
    | grep -q "${name}"; then
    echo "  OK   container ${name}"
    PASS=$((PASS + 1))
  else
    echo "  FAIL container ${name}"
    FAIL=$((FAIL + 1))
  fi
}

echo "==> Container health"
check_container ordella_staging_postgres
check_container ordella_staging_redis
check_container ordella_staging_nats
check_container ordella_staging_api_gateway
check_container ordella_staging_frontend_web
check_container ordella_staging_traefik
check_container ordella_staging_grafana
check_container ordella_staging_prometheus
check_container ordella_staging_loki
check_container ordella_staging_tempo

echo ""
echo "==> HTTP health endpoints"
check "API Gateway" "${API_GATEWAY_URL}/health"
check "API Gateway services" "${API_GATEWAY_URL}/health/services"
check "Frontend" "${FRONTEND_URL}/"
check "Auth service (via gateway)" "${API_GATEWAY_URL}/auth/health"
check "Tenant service (via gateway)" "${API_GATEWAY_URL}/tenants/health"
check "Patient service (via gateway)" "${API_GATEWAY_URL}/patients/health"

echo ""
echo "==> Infrastructure probes (internal)"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres \
  pg_isready -U "$(grep '^POSTGRES_USER=' "${ENV_FILE}" | cut -d= -f2-)" && echo "  OK   Postgres pg_isready" && PASS=$((PASS + 1)) || { echo "  FAIL Postgres"; FAIL=$((FAIL + 1)); }
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T redis \
  redis-cli ping | grep -q PONG && echo "  OK   Redis PING" && PASS=$((PASS + 1)) || { echo "  FAIL Redis"; FAIL=$((FAIL + 1)); }
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T nats \
  wget -qO- http://localhost:8222/healthz >/dev/null && echo "  OK   NATS healthz" && PASS=$((PASS + 1)) || { echo "  FAIL NATS"; FAIL=$((FAIL + 1)); }

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"
if [[ "${FAIL}" -gt 0 ]]; then
  exit 1
fi

echo ""
echo "Manual verification checklist:"
echo "  [ ] All portals load at ${FRONTEND_URL}"
echo "  [ ] Login works with staging credentials"
echo "  [ ] Tenant isolation — data scoped per X-Tenant-Id"
echo "  [ ] API Gateway routes /auth, /patients, /appointments correctly"
echo "  [ ] Grafana dashboards show metrics at grafana.staging.ordella-physio.com"
echo "  [ ] Loki receives container logs"
echo "  [ ] Tempo receives distributed traces"
