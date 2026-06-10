# Multi-Region Architecture

Ordella Physio runs across three regional deployments with EU-West as the primary write region.

## Regions

| Region | Code | Role | API endpoint | Frontend |
|--------|------|------|--------------|----------|
| EU West | `eu-west` | Primary | `api.eu.ordella-physio.com` | `eu.ordella-physio.com` |
| US East | `us-east` | Secondary (read replica) | `api.us.ordella-physio.com` | `us.ordella-physio.com` |
| Asia-Pacific | `apac` | Optional (read replica) | `api.apac.ordella-physio.com` | `apac.ordella-physio.com` |

Global entry points (`api.ordella-physio.com`, `ordella-physio.com`) use geo-routing via Cloudflare or AWS Route53.

## Per-region infrastructure

Each region is a fully isolated Docker Compose stack in `deploy/multi-region/`:

- **Postgres** — dedicated cluster per region; EU is primary, US/APAC are streaming read replicas
- **NATS JetStream** — regional cluster; US/APAC leaf nodes federate to EU hub
- **Redis** — regional instance (cache and queues are not globally shared)
- **API Gateway** — regional instance with region-aware tenant routing
- **Frontend** — regional Next.js deployment behind CDN
- **Traefik** — regional reverse proxy with TLS termination

Deploy a region:

```bash
cd deploy/multi-region
docker compose --env-file .env.eu -f docker-compose.eu.yml up -d --build
```

## Global load balancing

Geo-routing sends users to the nearest healthy region:

- **Cloudflare** — `deploy/multi-region/load-balancer/cloudflare-geo-routing.json`
- **Route53** — `deploy/multi-region/load-balancer/route53-health-checks.json`

Health checks probe `GET /health` on each regional API gateway. Unhealthy pools are removed automatically; traffic fails over to EU-West.

## Global CDN

Static assets (`/_next/static/*`, fonts, images) are cached at the edge in all regions via Cloudflare CDN rules (`deploy/multi-region/cdn/cloudflare-cdn-rules.json`). API traffic bypasses cache. Tiered cache and Argo Smart Routing reduce latency for web and mobile clients.

## Database replication

- **Primary:** EU-West Postgres accepts all writes
- **Replicas:** US-East and APAC stream WAL from EU via logical replication
- **Reads:** Regional gateways can serve read-heavy endpoints from local replicas
- **Writes:** Always routed to tenant home region (EU for most tenants)

Optional multi-primary with conflict resolution is documented but not enabled by default.

## NATS federation

EU runs the NATS hub with a leafnode listener on port 7422. US and APAC run leaf nodes that connect to the EU hub. Events use tenant-scoped subjects (`ordella.events.{tenantId}.*`) so federation does not break tenant isolation.

## Region-aware tenant routing

Each tenant has a `homeRegion` field on the `Tenant` model (default: `eu-west`). The API Gateway:

1. Resolves tenant home region via `GET /tenants/internal/home-region/:id`
2. Forwards cross-region requests to the correct regional gateway when needed
3. Bypasses routing for `SYSTEM` role users (Super Admin cross-region access)
4. Honors `x-target-region` header for explicit region targeting

Response header `x-ordella-region` indicates which region served the request.

## Health endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /health` | Gateway liveness |
| `GET /health/services` | Downstream microservice health |
| `GET /health/region` | Regional infrastructure + peer region status |

Run regional verification:

```bash
./deploy/multi-region/scripts/region-health-check.sh eu
```
