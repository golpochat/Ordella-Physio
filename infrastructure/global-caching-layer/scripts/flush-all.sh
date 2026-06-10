#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -f "${ROOT_DIR}/.env" ]]; then
  # shellcheck disable=SC1091
  source "${ROOT_DIR}/.env"
fi

CONTAINER_NAME="${REDIS_CONTAINER_NAME:-ordella-redis}"
REDIS_PASSWORD="${REDIS_PASSWORD:-changeme-redis-password}"

echo "WARNING: This will flush ALL Redis databases in ${CONTAINER_NAME}."
read -r -p "Type FLUSH to continue: " confirm

if [[ "${confirm}" != "FLUSH" ]]; then
  echo "Aborted."
  exit 1
fi

docker exec "${CONTAINER_NAME}" redis-cli -a "${REDIS_PASSWORD}" FLUSHALL
echo "Redis FLUSHALL completed."
