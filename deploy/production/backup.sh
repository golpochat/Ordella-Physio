#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/.env.production"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.prod.yml"

# shellcheck disable=SC1090
source <(grep -E '^(POSTGRES_USER|BACKUP_DIR|BACKUP_RETENTION_DAYS)=' "${ENV_FILE}" | sed 's/^/export /')

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_PATH="${SCRIPT_DIR}/${BACKUP_DIR:-./backups}"
ARCHIVE_DIR="${BACKUP_PATH}/${TIMESTAMP}"

mkdir -p "${ARCHIVE_DIR}"

DATABASES=(
  ordella_auth
  ordella_tenant
  ordella_patient
  ordella_appointment
  ordella_notes
  ordella_billing
  ordella_payment
  ordella_communication
  ordella_reporting
  ordella_event_bus
)

echo "==> Starting Postgres backup (${TIMESTAMP})..."

for db in "${DATABASES[@]}"; do
  echo "  -> ${db}"
  docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" exec -T postgres \
    pg_dump -U "${POSTGRES_USER}" -Fc "${db}" > "${ARCHIVE_DIR}/${db}.dump"
done

tar -czf "${BACKUP_PATH}/ordella_backup_${TIMESTAMP}.tar.gz" -C "${BACKUP_PATH}" "${TIMESTAMP}"
rm -rf "${ARCHIVE_DIR}"

echo "==> Backup saved: ${BACKUP_PATH}/ordella_backup_${TIMESTAMP}.tar.gz"

RETENTION="${BACKUP_RETENTION_DAYS:-30}"
echo "==> Pruning backups older than ${RETENTION} days..."
find "${BACKUP_PATH}" -name "ordella_backup_*.tar.gz" -type f -mtime +"${RETENTION}" -delete

echo "Backup complete."
