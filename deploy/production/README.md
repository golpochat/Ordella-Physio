# Ordella Physio — Production Deployment

Docker Compose stack for the full Ordella Physio platform in production.

## URLs

| Service        | URL                                    |
|----------------|----------------------------------------|
| Frontend       | https://ordella-physio.com             |
| API Gateway    | https://api.ordella-physio.com         |
| Grafana        | https://grafana.ordella-physio.com     |

TLS certificates are issued and auto-renewed by Traefik via Let's Encrypt (ACME HTTP challenge).

## Prerequisites

- Linux production host (8 GB+ RAM recommended)
- Docker Engine 24+ and Compose v2
- DNS A records for `ordella-physio.com`, `api.ordella-physio.com`, `grafana.ordella-physio.com`
- Ports 80 and 443 open to the internet
- All `CHANGE_ME` values replaced in `.env.production`
- Secrets managed via Vault / AWS Secrets Manager / GCP Secret Manager (recommended)

## Quick Start

```bash
cd deploy/production

# 1. Configure secrets (required — init script refuses CHANGE_ME values)
nano .env.production

# 2. Deploy
chmod +x production-init.sh verify-production.sh backup.sh restore.sh
./production-init.sh

# 3. Verify
./verify-production.sh
```

## Files

| File | Purpose |
|------|---------|
| `docker-compose.prod.yml` | Full production stack |
| `.env.production` | Environment variables and secrets |
| `production-init.sh` | Pull, build, migrate, rolling deploy |
| `verify-production.sh` | Health, SSL, and smoke checks |
| `backup.sh` | Manual or scheduled Postgres backup |
| `restore.sh` | Emergency database restore |
| `nats/nats-server.conf` | JetStream production limits |
| `observability/` | Prometheus, Grafana dashboards, datasources |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AUTH_DATABASE_URL` … `EVENT_BUS_DATABASE_URL` | Per-service Postgres URLs |
| `JWT_SECRET` | Shared JWT signing key (64+ chars) |
| `TENANT_DEFAULT` | Default tenant for login/register |
| `API_GATEWAY_URL` | `https://api.ordella-physio.com` |
| `FRONTEND_URL` | `https://ordella-physio.com` |
| `NATS_URL` | JetStream connection |
| `REDIS_URL` | Cache and queue Redis |
| `EMAIL_PROVIDER` / `STORAGE_PROVIDER` | Production third-party providers |
| `PROMETHEUS_URL`, `LOKI_URL`, `TEMPO_URL` | Observability endpoints |
| `BACKUP_RETENTION_DAYS` | Backup retention (default 30 days) |

Rebuild `frontend-web` after changing any `NEXT_PUBLIC_*` variable.

## Rolling Deploy (Zero Downtime)

`production-init.sh` recreates services one at a time, waiting for each health check before proceeding:

1. Infrastructure (Postgres, Redis, NATS, Traefik)
2. Prisma migrations
3. Observability + backup scheduler
4. Microservices → API Gateway → Frontend (sequential rolling recreate)

For incremental updates to a single service:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --no-deps --build --force-recreate api-gateway
```

## Backup Strategy

| Setting | Default |
|---------|---------|
| Schedule | Nightly at 02:00 UTC (`BACKUP_CRON_SCHEDULE`) |
| Retention | 30 days (`BACKUP_RETENTION_DAYS`) |
| Location | `deploy/production/backups/` |
| Format | Per-database `pg_dump -Fc` in timestamped `.tar.gz` |

```bash
# Manual backup
./backup.sh

# List backups
ls -lh backups/ordella_backup_*.tar.gz

# Emergency restore (requires typing RESTORE to confirm)
./restore.sh backups/ordella_backup_20260101_020000.tar.gz
```

## Health Checks

| Component | Check |
|-----------|-------|
| API Gateway | `GET /health`, `GET /health/services` |
| Microservices | Service-specific `/health` via gateway |
| Postgres | `pg_isready` |
| Redis | `redis-cli PING` |
| NATS | `GET :8222/healthz` |
| Traefik | `traefik healthcheck --ping` |
| SSL | `openssl s_client` certificate expiry |
| Grafana | `GET /api/health` |
| Prometheus | `GET /-/healthy` |
| Tempo | `GET /ready` |

## Monitoring

Grafana is provisioned with:

- **Prometheus** — service metrics and Traefik request rates
- **Loki** — container logs via Promtail
- **Tempo** — distributed traces (OTLP on port 4318)
- **Dashboard** — "Ordella Physio — Production Overview"

Access Grafana at https://grafana.ordella-physio.com (admin password from `GRAFANA_ADMIN_PASSWORD`).

## Post-Deployment Verification

1. All portals load at https://ordella-physio.com
2. Login issues JWT and redirects to role dashboard
3. Tenant isolation — cross-tenant requests return 403
4. `curl https://api.ordella-physio.com/health/services` — all services `up`
5. SSL certificates valid (check `./verify-production.sh` output)
6. Grafana dashboards show metrics; Loki has logs; Tempo has traces
7. Confirm backup ran: `tail backups/backup.log`

## Troubleshooting

- **Init refuses to run** — all `CHANGE_ME` placeholders must be replaced.
- **ACME failure** — port 80 must be reachable; check `docker logs ordella_prod_traefik`.
- **Frontend API 404** — rebuild frontend after `NEXT_PUBLIC_API_GATEWAY_URL` changes.
- **Restore fails** — ensure application services are stopped; use latest backup archive.
