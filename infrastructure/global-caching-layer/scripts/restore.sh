#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -f "${ROOT_DIR}/.env" ]]; then
  # shellcheck disable=SC1091
  source "${ROOT_DIR}/.env"
fi

CONTAINER_NAME="${REDIS_CONTAINER_NAME:-ordella-redis}"
BACKUP_DIR="${REDIS_BACKUP_DIR:-${ROOT_DIR}/backups}"
BACKUP_PATH="${1:-}"

if [[ -z "${BACKUP_PATH}" ]]; then
  echo "Usage: $0 <backup-directory>"
  echo "Example: $0 ${BACKUP_DIR}/20250610-120000"
  exit 1
fi

if [[ ! -d "${BACKUP_PATH}" ]]; then
  echo "Backup directory not found: ${BACKUP_PATH}"
  exit 1
fi

echo "WARNING: This will overwrite Redis data in ${CONTAINER_NAME}."
read -r -p "Type RESTORE to continue: " confirm

if [[ "${confirm}" != "RESTORE" ]]; then
  echo "Aborted."
  exit 1
fi

echo "Stopping Redis container..."
docker stop "${CONTAINER_NAME}"

if [[ -f "${BACKUP_PATH}/dump.rdb" ]]; then
  docker cp "${BACKUP_PATH}/dump.rdb" "${CONTAINER_NAME}:/data/dump.rdb"
fi

if [[ -f "${BACKUP_PATH}/appendonly.aof" ]]; then
  docker cp "${BACKUP_PATH}/appendonly.aof" "${CONTAINER_NAME}:/data/appendonly.aof"
fi

if [[ -d "${BACKUP_PATH}/appendonlydir" ]]; then
  docker cp "${BACKUP_PATH}/appendonlydir" "${CONTAINER_NAME}:/data/appendonlydir"
fi

echo "Starting Redis container..."
docker start "${CONTAINER_NAME}"

echo "Restore completed from ${BACKUP_PATH}"
