#!/usr/bin/env bash
# Ordella Physio — Platform Readiness Validation
# Usage: ./deploy/validate-platform-readiness.sh [local|production]
set -eu
if (set -o pipefail) 2>/dev/null; then
  set -o pipefail
fi

MODE="${1:-local}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
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

echo "==> Ordella Platform Readiness Validation (${MODE})"
echo ""

if [[ "${MODE}" == "production" ]]; then
  exec "${SCRIPT_DIR}/production/verify-production.sh"
fi

# Local validation
GATEWAY_URL="${API_GATEWAY_URL:-http://localhost:3049}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3010}"

echo "==> Core endpoints"
check "API Gateway health" "${GATEWAY_URL}/health"
check "API Gateway services" "${GATEWAY_URL}/health/services"
check "Frontend portal" "${FRONTEND_URL}/"

echo ""
echo "==> Gateway service probes (via /health/services)"
SERVICES_JSON=$(curl -fsS --max-time 15 "${GATEWAY_URL}/health/services" 2>/dev/null || echo "")
if [[ -n "${SERVICES_JSON}" ]]; then
  for name in auth tenant patient appointment notes billing payment communication reporting messaging notification ai-notes marketplace enterprise; do
    if echo "${SERVICES_JSON}" | grep -q "\"name\":\"${name}\""; then
      if echo "${SERVICES_JSON}" | grep -A4 "\"name\":\"${name}\"" | grep -q '"status":"up"'; then
        echo "  OK   ${name} (up)"
        PASS=$((PASS + 1))
      else
        echo "  FAIL ${name} (down or missing)"
        FAIL=$((FAIL + 1))
      fi
    else
      echo "  SKIP ${name} (not in probe list — start container to include)"
    fi
  done
else
  echo "  FAIL could not fetch /health/services"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "==> Docker containers"
if command -v docker >/dev/null 2>&1; then
  RUNNING=$(docker ps --format '{{.Names}}' | grep -c ordella || true)
  if [[ "${RUNNING}" -gt 0 ]]; then
    echo "  OK   ${RUNNING} ordella containers running"
    PASS=$((PASS + 1))
  else
    echo "  FAIL no ordella containers running"
    FAIL=$((FAIL + 1))
  fi
else
  echo "  SKIP docker not available"
fi

echo ""
echo "==> Mobile app build"
APK_PATH="${ROOT_DIR}/apps/mobile/build/app/outputs/flutter-apk/app-debug.apk"
if [[ -f "${APK_PATH}" ]]; then
  echo "  OK   Flutter debug APK present"
  PASS=$((PASS + 1))
elif command -v flutter >/dev/null 2>&1; then
  if (cd "${ROOT_DIR}/apps/mobile" && flutter analyze --no-fatal-infos >/dev/null 2>&1); then
    echo "  OK   Flutter analyze passed"
    PASS=$((PASS + 1))
  else
    echo "  FAIL Flutter analyze"
    FAIL=$((FAIL + 1))
  fi
else
  echo "  SKIP flutter not in PATH"
fi

echo ""
echo "==> Multi-region configs"
for f in docker-compose.eu.yml docker-compose.us.yml docker-compose.apac.yml; do
  if [[ -f "${SCRIPT_DIR}/multi-region/${f}" ]]; then
    echo "  OK   multi-region/${f}"
    PASS=$((PASS + 1))
  else
    echo "  FAIL multi-region/${f} missing"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "==> English-only UI"
if grep -q 'lang="en"' "${ROOT_DIR}/apps/frontend-web/app/layout.tsx" 2>/dev/null; then
  echo "  OK   frontend-web lang=en"
  PASS=$((PASS + 1))
else
  echo "  FAIL frontend-web missing lang=en"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"
if [[ "${FAIL}" -gt 0 ]]; then
  exit 1
fi

echo ""
echo "Platform readiness validation PASSED (${MODE})"
