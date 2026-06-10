# Multi-Region Deployment

Deploy Ordella Physio across EU-West (primary), US-East, and Asia-Pacific.

## Quick start

```bash
# EU-West (primary) — deploy first
docker compose --env-file .env.eu -f docker-compose.eu.yml up -d --build

# US-East (secondary replica)
docker compose --env-file .env.us -f docker-compose.us.yml up -d --build

# Asia-Pacific (optional)
docker compose --env-file .env.apac -f docker-compose.apac.yml up -d --build
```

Replace all `CHANGE_ME` secrets in `.env.eu`, `.env.us`, and `.env.apac` before production use.

## Layout

```
deploy/multi-region/
├── docker-compose.region.yml   # Shared regional stack template
├── docker-compose.eu.yml         # EU-West overrides
├── docker-compose.us.yml         # US-East overrides
├── docker-compose.apac.yml       # APAC overrides
├── .env.eu / .env.us / .env.apac
├── nats/                         # Hub + leafnode federation configs
├── postgres/                     # Replication bootstrap scripts
├── load-balancer/                # Cloudflare + Route53 geo-routing
├── cdn/                          # Cloudflare CDN cache rules
└── scripts/
    ├── region-health-check.sh
    └── failover-gateway.sh
```

## Post-deploy

1. Bootstrap Postgres replication on EU primary (`postgres/replication-primary.conf`)
2. Configure US/APAC replicas (`postgres/replication-replica.conf`)
3. Apply Cloudflare or Route53 load balancer configs
4. Enable CDN rules for static asset caching
5. Verify each region: `./scripts/region-health-check.sh eu`

## Documentation

- [Multi-Region Architecture](../../docs/Multi-Region-Architecture.md)
- [Failover Strategy](../../docs/Failover-Strategy.md)
- [Tenant Region Mapping](../../docs/Tenant-Region-Mapping.md)
