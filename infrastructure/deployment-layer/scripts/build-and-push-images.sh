#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"

REGISTRY="${CONTAINER_REGISTRY:-ghcr.io/ordella}"
ENVIRONMENT="${1:-staging}"
GIT_SHA="$(git -C "${REPO_ROOT}" rev-parse --short HEAD 2>/dev/null || echo "local")"
TAG="${IMAGE_TAG:-${ENVIRONMENT}-${GIT_SHA}}"

declare -A SERVICES=(
  ["api-gateway"]="services/api-gateway"
  ["auth-service"]="services/auth-service"
  ["tenant-service"]="services/tenant-service"
  ["patient-service"]="services/patient-service"
  ["appointment-service"]="services/appointment-service"
  ["notes-service"]="services/notes-service"
  ["billing-service"]="services/billing-service"
  ["payment-service"]="services/payment-service"
  ["communication-service"]="services/communication-service"
  ["reporting-service"]="services/reporting-service"
  ["event-bus-service"]="services/event-bus-service"
  ["frontend-web"]="apps/frontend-web"
)

echo "Building and pushing images to ${REGISTRY}"
echo "Environment: ${ENVIRONMENT}"
echo "Tag: ${TAG}"
echo ""

for name in "${!SERVICES[@]}"; do
  context="${SERVICES[$name]}"
  image="${REGISTRY}/${name}:${TAG}"
  latest="${REGISTRY}/${name}:${ENVIRONMENT}"

  echo "Building ${name}..."
  docker build \
    --target production \
    --build-context workspace="${REPO_ROOT}" \
    -f "${REPO_ROOT}/${context}/Dockerfile" \
    -t "${image}" \
    -t "${latest}" \
    "${REPO_ROOT}/${context}"

  echo "Pushing ${image}..."
  docker push "${image}"
  docker push "${latest}"
  echo ""
done

echo "All images built and pushed."
echo "Update k8s/overlays/${ENVIRONMENT}/kustomization.yaml image tags if needed."
