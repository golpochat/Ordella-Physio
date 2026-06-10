#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"

REGISTRY="${CONTAINER_REGISTRY:-ghcr.io/ordella}"
ENVIRONMENT="${1:-staging}"
GIT_SHA="$(git -C "${REPO_ROOT}" rev-parse --short HEAD 2>/dev/null || echo "local")"
TAG="${IMAGE_TAG:-${ENVIRONMENT}-${GIT_SHA}}"

declare -A SERVICES=(
  ["api-gateway"]="services/api-gateway/Dockerfile"
  ["auth-service"]="services/auth-service/Dockerfile"
  ["tenant-service"]="services/tenant-service/Dockerfile"
  ["patient-service"]="services/patient-service/Dockerfile"
  ["appointment-service"]="services/appointment-service/Dockerfile"
  ["notes-service"]="services/notes-service/Dockerfile"
  ["billing-service"]="services/billing-service/Dockerfile"
  ["payment-service"]="services/payment-service/Dockerfile"
  ["communication-service"]="services/communication-service/Dockerfile"
  ["reporting-service"]="services/reporting-service/Dockerfile"
  ["event-bus-service"]="services/event-bus-service/Dockerfile"
  ["frontend-web"]="apps/frontend-web/Dockerfile"
)

echo "Building and pushing images to ${REGISTRY}"
echo "Environment: ${ENVIRONMENT}"
echo "Tag: ${TAG}"
echo ""

for name in "${!SERVICES[@]}"; do
  dockerfile="${SERVICES[$name]}"
  image="${REGISTRY}/${name}:${TAG}"
  latest="${REGISTRY}/${name}:${ENVIRONMENT}"

  echo "Building ${name}..."
  docker build \
    -f "${REPO_ROOT}/${dockerfile}" \
    -t "${image}" \
    -t "${latest}" \
    "${REPO_ROOT}"

  echo "Pushing ${image}..."
  docker push "${image}"
  docker push "${latest}"
  echo ""
done

echo "All images built and pushed."
echo "Update k8s/overlays/${ENVIRONMENT}/kustomization.yaml image tags if needed."
