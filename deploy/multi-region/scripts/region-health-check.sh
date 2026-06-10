#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REGION="${1:-eu}"
ENV_FILE="${SCRIPT_DIR}/../.env.${REGION}"
COMPOSE_FILE="${SCRIPT_DIR}/../docker-compose.${REGION}.yml"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Unknown region: ${REGION}"
  exit 1
fi

# shellcheck disable=SC1090
source <(grep -E '^(FRONTEND_URL|API_GATEWAY_URL|API_HOST|FRONTEND_HOST)=' "${ENV_FILE}" | sed 's/^/export /')

PASS=0
FAIL=0

check() {
  local name="$1"
  local url="$2"
  if curl -fsS --max-time 15 "${url}" >/dev/null 2>&1; then
    echo "  OK   ${name}"
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
    echo "  FAIL ${name} SSL"
    FAIL=$((FAIL + 1))
  fi
}

echo "==> Region ${REGION} infrastructure health"

check "Postgres (via tenant service)" "${API_GATEWAY_URL}/tenants/health"
check "Redis/NATS (via messaging)" "${API_GATEWAY_URL}/messaging/health"
check "API Gateway" "${API_GATEWAY_URL}/health"
check "API Gateway services" "${API_GATEWAY_URL}/health/services"
check "Region health endpoint" "${API_GATEWAY_URL}/health/region"
check "Frontend" "${FRONTEND_URL}/"
check_ssl "API" "${API_HOST:-api.${REGION}.ordella-physio.com}"
check_ssl "Frontend" "${FRONTEND_HOST:-${REGION}.ordella-physio.com}"

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"
[[ "${FAIL}" -eq 0 ]]
