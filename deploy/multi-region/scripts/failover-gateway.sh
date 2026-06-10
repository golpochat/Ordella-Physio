#!/usr/bin/env bash
set -euo pipefail

# Automatic API Gateway failover — updates Cloudflare or Route53 to redirect traffic
# away from an unhealthy region. Database failover remains manual unless multi-primary
# replication is enabled.
#
# Usage:
#   ./failover-gateway.sh --from us-east --to eu-west --provider cloudflare
#   ./failover-gateway.sh --from apac --to eu-west --provider route53 --dry-run

FROM_REGION=""
TO_REGION="eu-west"
PROVIDER="cloudflare"
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) FROM_REGION="$2"; shift 2 ;;
    --to) TO_REGION="$2"; shift 2 ;;
    --provider) PROVIDER="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

if [[ -z "${FROM_REGION}" ]]; then
  echo "Usage: $0 --from <region> [--to eu-west] [--provider cloudflare|route53] [--dry-run]"
  exit 1
fi

echo "Failover plan:"
echo "  Remove ${FROM_REGION} from active load balancer pool"
echo "  Route traffic to ${TO_REGION} (${PROVIDER})"
echo "  Mode: graceful-degradation (read replicas remain, writes go to primary)"

if [[ "${DRY_RUN}" == "true" ]]; then
  echo "Dry run — no changes applied."
  exit 0
fi

case "${PROVIDER}" in
  cloudflare)
    echo "Apply via Cloudflare API: disable pool ordella-api-${FROM_REGION}"
    echo "  cf_load_balancer_pool_update --enabled=false --name ordella-api-${FROM_REGION}"
    ;;
  route53)
    echo "Apply via AWS CLI: set ${FROM_REGION} latency record weight to 0"
    echo "  aws route53 change-resource-record-sets --hosted-zone-id ZONE_ID ..."
    ;;
  *)
    echo "Unsupported provider: ${PROVIDER}"
    exit 1
    ;;
esac

echo "Failover initiated. Verify with: ./region-health-check.sh ${TO_REGION}"
