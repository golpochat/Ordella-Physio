# Failover Strategy

Ordella Physio uses tiered failover: automatic for the API gateway and CDN, manual for databases unless multi-primary replication is enabled.

## Failure modes

| Component | Detection | Automatic failover | Manual steps |
|-----------|-----------|-------------------|--------------|
| API Gateway | `/health` fails for 3 checks | Yes — LB removes region from pool | None |
| Frontend | `/` health fails | Yes — CDN serves stale + failover origin | Redeploy if needed |
| Traefik / SSL | TLS probe fails | Yes — LB routes to healthy region | Renew certs on recovery |
| Postgres primary (EU) | Replication lag / connection errors | No | Promote replica or restore from backup |
| Postgres replica | Replica disconnect | Yes — reads route to primary | Rebuild replica |
| NATS hub (EU) | Leaf disconnect | Partial — regions operate locally | Restore EU hub; leaves reconnect |
| Redis | `PING` fails | Degraded — services retry | Restart Redis pod |

## API Gateway automatic failover

When a regional API gateway fails health checks:

1. Cloudflare or Route53 removes the region from the active pool
2. Geo-routing redirects new sessions to the next-nearest healthy region
3. API Gateway in the receiving region uses tenant `homeRegion` to forward writes to EU if needed
4. Clients receive `503` with `mode: graceful-degradation` only when all regions are unreachable

Trigger manual gateway failover:

```bash
./deploy/multi-region/scripts/failover-gateway.sh --from us-east --to eu-west --provider cloudflare
```

Dry run first:

```bash
./deploy/multi-region/scripts/failover-gateway.sh --from us-east --to eu-west --dry-run
```

## Database failover (manual)

EU-West is the sole write primary. If EU Postgres fails:

1. **Assess** — check replication lag on US replica (`pg_stat_replication`)
2. **Promote** — stop replication, promote US replica to primary (break-glass procedure)
3. **Update DNS** — point `postgres.eu.ordella-physio.internal` to promoted host
4. **Reconfigure** — set `REGION_ENDPOINT_EU_WEST` to US gateway temporarily
5. **Rebuild** — restore EU as replica once hardware is recovered

Database failover is **not automatic** to prevent split-brain writes. Multi-primary with CRDT conflict resolution is an optional future enhancement.

## NATS failover

If the EU NATS hub fails:

- US and APAC continue processing local events
- Cross-region event propagation pauses until the hub recovers
- Leaf nodes auto-reconnect when the hub is restored
- No events are lost if JetStream persistence is intact

## Graceful degradation mode

When cross-region routing fails, the gateway returns:

```json
{
  "statusCode": 503,
  "message": "Cross-region routing failed",
  "mode": "graceful-degradation"
}
```

Regional health endpoint reports `failoverMode: "degraded"` when any infrastructure check is down.

## Recovery checklist

1. Restore failed region stack: `docker compose --env-file .env.<region> -f docker-compose.<region>.yml up -d`
2. Verify health: `./scripts/region-health-check.sh <region>`
3. Re-enable load balancer pool for the recovered region
4. Confirm replication caught up: `SELECT pg_last_wal_receive_lsn()` on replica
5. Confirm NATS leaf reconnected: `nats server report leafnodes`
