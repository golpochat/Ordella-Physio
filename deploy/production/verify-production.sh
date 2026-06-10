#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/.env.production"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.prod.yml"

# shellcheck disable=SC1090
source <(grep -E '^(FRONTEND_URL|API_GATEWAY_URL|GRAFANA_URL)=' "${ENV_FILE}" | sed 's/^/export /')

PASS=0
FAIL=0

check() {
  local name="$1"
  local url="$2"
  if curl -fsS --max-time 15 "${url}" >/dev/null 2>&1; then
    echo "  OK   ${name} — ${url}"
    PASS=$((PASS + 1))
  else
    echo "  FAIL ${name} — ${url}"
    FAIL=$((FAIL + 1))
  fi
}

check_ssl() {
  local name="$1"
  local host="$2"
  local expiry
  expiry="$(echo | openssl s_client -servername "${host}" -connect "${host}:443" 2>/dev/null \
    | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2- || true)"
  if [[ -n "${expiry}" ]]; then
    echo "  OK   ${name} SSL — expires ${expiry}"
    PASS=$((PASS + 1))
  else
    echo "  FAIL ${name} SSL — could not read certificate"
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
check_container ordella_prod_postgres
check_container ordella_prod_redis
check_container ordella_prod_nats
check_container ordella_prod_traefik
check_container ordella_prod_api_gateway
check_container ordella_prod_frontend_web
check_container ordella_prod_grafana
check_container ordella_prod_prometheus
check_container ordella_prod_loki
check_container ordella_prod_tempo
check_container ordella_prod_backup_scheduler

echo ""
echo "==> SSL certificates"
check_ssl "Frontend" "ordella-physio.com"
check_ssl "API Gateway" "api.ordella-physio.com"

echo ""
echo "==> HTTP health endpoints"
check "API Gateway" "${API_GATEWAY_URL}/health"
check "API Gateway services" "${API_GATEWAY_URL}/health/services"
check "Frontend" "${FRONTEND_URL}/"
check "Auth (via gateway)" "${API_GATEWAY_URL}/auth/health"
check "Tenants (via gateway)" "${API_GATEWAY_URL}/tenants/health"
check "Patients (via gateway)" "${API_GATEWAY_URL}/patients/health"
check "Grafana" "${GRAFANA_URL:-https://grafana.ordella-physio.com}/api/health"

echo ""
echo "==> Infrastructure probes (internal)"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres \
  pg_isready -U "$(grep '^POSTGRES_USER=' "${ENV_FILE}" | cut -d= -f2-)" && echo "  OK   Postgres" && PASS=$((PASS + 1)) || { echo "  FAIL Postgres"; FAIL=$((FAIL + 1)); }
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T redis \
  redis-cli ping | grep -q PONG && echo "  OK   Redis" && PASS=$((PASS + 1)) || { echo "  FAIL Redis"; FAIL=$((FAIL + 1)); }
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T nats \
  wget -qO- http://localhost:8222/healthz >/dev/null && echo "  OK   NATS" && PASS=$((PASS + 1)) || { echo "  FAIL NATS"; FAIL=$((FAIL + 1)); }
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T traefik \
  traefik healthcheck --ping >/dev/null 2>&1 && echo "  OK   Traefik" && PASS=$((PASS + 1)) || { echo "  FAIL Traefik"; FAIL=$((FAIL + 1)); }

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"
if [[ "${FAIL}" -gt 0 ]]; then
  exit 1
fi

echo ""
echo "Manual verification checklist:"
echo "  [ ] All portals load at ${FRONTEND_URL}"
echo "  [ ] Login works with production credentials"
echo "  [ ] Tenant isolation enforced via X-Tenant-Id"
echo "  [ ] API Gateway routes all service prefixes"
echo "  [ ] SSL valid and auto-renewing (Traefik ACME)"
echo "  [ ] Grafana dashboards show live metrics"
echo "  [ ] Loki ingests container logs"
echo "  [ ] Tempo receives distributed traces"
echo "  [ ] Nightly backup runs (check backups/backup.log)"
