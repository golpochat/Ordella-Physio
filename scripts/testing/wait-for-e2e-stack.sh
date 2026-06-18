#!/usr/bin/env bash
set -euo pipefail

GATEWAY_URL="${API_GATEWAY_URL:-http://localhost:3049}"
FRONTEND_URL="${PLAYWRIGHT_BASE_URL:-http://localhost:3010}"
MAX_ATTEMPTS="${E2E_STACK_WAIT_ATTEMPTS:-90}"
SLEEP_SECONDS="${E2E_STACK_WAIT_INTERVAL:-10}"

echo "Waiting for API gateway at ${GATEWAY_URL} and frontend at ${FRONTEND_URL}..."

for attempt in $(seq 1 "${MAX_ATTEMPTS}"); do
  if curl -sf "${GATEWAY_URL}/health" >/dev/null && curl -sf "${FRONTEND_URL}" >/dev/null; then
    echo "E2E stack is ready (attempt ${attempt})."
    exit 0
  fi

  echo "Attempt ${attempt}/${MAX_ATTEMPTS}: stack not ready yet..."
  sleep "${SLEEP_SECONDS}"
done

echo "E2E stack failed to become healthy in time." >&2
if command -v docker >/dev/null 2>&1; then
  docker compose -f docker-compose.dev.yml ps || true
  docker compose -f docker-compose.dev.yml logs --tail=80 api-gateway billing-service frontend core-service tenant-service organization-service || true
fi
exit 1
