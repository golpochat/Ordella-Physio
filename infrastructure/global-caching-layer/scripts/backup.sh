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
BACKUP_DIR="${REDIS_BACKUP_DIR:-${ROOT_DIR}/backups}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
TARGET_DIR="${BACKUP_DIR}/${TIMESTAMP}"

mkdir -p "${TARGET_DIR}"

echo "Triggering BGSAVE on ${CONTAINER_NAME}..."
docker exec "${CONTAINER_NAME}" redis-cli -a "${REDIS_PASSWORD}" BGSAVE

echo "Waiting for background save to finish..."
until docker exec "${CONTAINER_NAME}" redis-cli -a "${REDIS_PASSWORD}" LASTSAVE | grep -qE '^[0-9]+$'; do
  sleep 1
done

echo "Copying RDB and AOF files to ${TARGET_DIR}..."
docker cp "${CONTAINER_NAME}:/data/dump.rdb" "${TARGET_DIR}/dump.rdb" 2>/dev/null || true
docker cp "${CONTAINER_NAME}:/data/appendonly.aof" "${TARGET_DIR}/appendonly.aof" 2>/dev/null || true
docker cp "${CONTAINER_NAME}:/data/appendonlydir" "${TARGET_DIR}/appendonlydir" 2>/dev/null || true

cat > "${TARGET_DIR}/backup.meta" <<EOF
timestamp=${TIMESTAMP}
container=${CONTAINER_NAME}
source=/data
EOF

echo "Backup completed: ${TARGET_DIR}"
