#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${DEPLOY_DIR}"

if ! command -v kubectl &>/dev/null; then
  echo "kubectl is required but not installed."
  exit 1
fi

read -r -p "Deploy to PRODUCTION? Type 'yes' to continue: " confirm
if [[ "${confirm}" != "yes" ]]; then
  echo "Aborted."
  exit 1
fi

echo "Deploying Ordella Physio to production..."
kubectl apply -k k8s/overlays/production

echo ""
echo "Production deployment applied. Verify with:"
echo "  kubectl get pods -n ordella-production"
echo "  kubectl rollout status deployment/api-gateway -n ordella-production"
