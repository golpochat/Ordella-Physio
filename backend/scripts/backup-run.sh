#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
LOG_DIR="${BACKUP_OUTPUT_DIR:-${BACKEND_DIR}/backups}"

mkdir -p "${LOG_DIR}"
cd "${BACKEND_DIR}"

echo "==> Clinic backend backup ($(date -u +%Y-%m-%dT%H:%M:%SZ))"
node scripts/backup-database.mjs >> "${LOG_DIR}/backup.log" 2>&1
echo "==> Backup complete"
