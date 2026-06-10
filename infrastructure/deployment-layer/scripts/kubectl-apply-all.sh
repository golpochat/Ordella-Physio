#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

usage() {
  cat <<EOF
Usage: $(basename "$0") <target>

Targets:
  base        Apply k8s/base manifests
  staging     Apply k8s/overlays/staging
  production  Apply k8s/overlays/production

Examples:
  $(basename "$0") staging
  $(basename "$0") production
EOF
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

TARGET="$1"
cd "${DEPLOY_DIR}"

case "${TARGET}" in
  base)
    kubectl apply -k k8s/base
    ;;
  staging)
    kubectl apply -k k8s/overlays/staging
    ;;
  production)
    kubectl apply -k k8s/overlays/production
    ;;
  *)
    echo "Unknown target: ${TARGET}"
    usage
    exit 1
    ;;
esac

echo "Applied: ${TARGET}"
