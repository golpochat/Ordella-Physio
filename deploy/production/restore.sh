#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/.env.production"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.prod.yml"

# shellcheck disable=SC1090
source <(grep -E '^(POSTGRES_USER|BACKUP_DIR)=' "${ENV_FILE}" | sed 's/^/export /')

BACKUP_ARCHIVE="${1:-}"

if [[ -z "${BACKUP_ARCHIVE}" ]]; then
  echo "Usage: ./restore.sh <backup-archive.tar.gz>"
  echo ""
  echo "Available backups:"
  ls -1 "${SCRIPT_DIR}/${BACKUP_DIR:-./backups}"/ordella_backup_*.tar.gz 2>/dev/null || echo "  (none found)"
  exit 1
fi

if [[ ! -f "${BACKUP_ARCHIVE}" ]]; then
  BACKUP_ARCHIVE="${SCRIPT_DIR}/${BACKUP_DIR:-./backups}/${BACKUP_ARCHIVE}"
fi

if [[ ! -f "${BACKUP_ARCHIVE}" ]]; then
  echo "ERROR: Backup file not found: ${BACKUP_ARCHIVE}"
  exit 1
fi

echo "WARNING: This will overwrite production databases."
read -r -p "Type RESTORE to continue: " CONFIRM
if [[ "${CONFIRM}" != "RESTORE" ]]; then
  echo "Aborted."
  exit 1
fi

RESTORE_DIR="${SCRIPT_DIR}/${BACKUP_DIR:-./backups}/restore_$(date +%Y%m%d_%H%M%S)"
mkdir -p "${RESTORE_DIR}"
tar -xzf "${BACKUP_ARCHIVE}" -C "${RESTORE_DIR}" --strip-components=1

echo "==> Stopping application services..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" stop \
  auth-service tenant-service patient-service appointment-service notes-service \
  billing-service payment-service communication-service reporting-service \
  event-bus-service api-gateway frontend-web

echo "==> Restoring databases..."
for dump in "${RESTORE_DIR}"/*.dump; do
  db="$(basename "${dump}" .dump)"
  echo "  -> ${db}"
  docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres \
    dropdb -U "${POSTGRES_USER}" --if-exists "${db}"
  docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres \
    createdb -U "${POSTGRES_USER}" "${db}"
  docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres \
    pg_restore -U "${POSTGRES_USER}" -d "${db}" --no-owner --role="${POSTGRES_USER}" < "${dump}"
done

rm -rf "${RESTORE_DIR}"

echo "==> Restarting application services..."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d \
  auth-service tenant-service patient-service appointment-service notes-service \
  billing-service payment-service communication-service reporting-service \
  event-bus-service api-gateway frontend-web

echo "Restore complete. Run ./verify-production.sh to validate."
