#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${DEPLOY_DIR}"

if ! command -v kubectl &>/dev/null; then
  echo "kubectl is required but not installed."
  exit 1
fi

if ! command -v kustomize &>/dev/null; then
  echo "Using kubectl built-in kustomize..."
fi

echo "Deploying Ordella Physio to staging..."
kubectl apply -k k8s/overlays/staging

echo ""
echo "Staging deployment applied. Verify with:"
echo "  kubectl get pods -n ordella-staging"
echo "  kubectl get ingress -n ordella-staging"
