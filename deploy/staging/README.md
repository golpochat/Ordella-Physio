# Ordella Physio — Staging Deployment

Docker Compose stack for the full Ordella Physio platform on a staging host.

## URLs

| Service        | URL                                              |
|----------------|--------------------------------------------------|
| Frontend       | https://staging.ordella-physio.com               |
| API Gateway    | https://api.staging.ordella-physio.com           |
| Grafana        | https://grafana.staging.ordella-physio.com       |
| Traefik        | Dashboard on port `${TRAEFIK_DASHBOARD_PORT}`    |

## Prerequisites

- Linux host with Docker Engine 24+ and Compose v2
- DNS A records pointing to the staging host:
  - `staging.ordella-physio.com`
  - `api.staging.ordella-physio.com`
  - `grafana.staging.ordella-physio.com` (optional)
- Ports 80 and 443 open (Let's Encrypt HTTP challenge)
- Git access to the monorepo

## Quick Start

```bash
cd deploy/staging

# 1. Configure environment
cp .env.staging .env.staging.local   # optional backup
# Edit .env.staging — replace every CHANGE_ME value

# 2. Deploy
chmod +x staging-init.sh verify-staging.sh
./staging-init.sh

# 3. Verify
./verify-staging.sh
```

## Files

| File                       | Purpose                                      |
|----------------------------|----------------------------------------------|
| `docker-compose.staging.yml` | Full stack definition                      |
| `.env.staging`             | Environment variables and secrets            |
| `staging-init.sh`          | Pull, build, migrate, start, restart         |
| `verify-staging.sh`        | Post-deploy health and smoke checks          |
| `observability/prometheus.yml` | Prometheus scrape targets              |

## Environment Variables

Key variables in `.env.staging`:

- **DATABASE_URLs** — per-service Postgres connection strings (`AUTH_DATABASE_URL`, `TENANT_DATABASE_URL`, etc.)
- **JWT_SECRET** / **JWT_ACCESS_SECRET** — shared auth signing keys
- **TENANT_DEFAULT** — default tenant ID for login/register
- **API_GATEWAY_URL** — public API URL (`https://api.staging.ordella-physio.com`)
- **FRONTEND_URL** — public frontend URL (`https://staging.ordella-physio.com`)
- **NATS_URL** — JetStream connection (`nats://nats:4222`)
- **REDIS_URL** — cache/queue Redis (`redis://redis:6379`)
- **EMAIL_PROVIDER** / **STORAGE_PROVIDER** — third-party placeholders

Frontend `NEXT_PUBLIC_*` variables are passed as Docker build args and must match `.env.staging` before `docker compose build`.

## Manual Commands

```bash
# Start without rebuild
docker compose --env-file .env.staging -f docker-compose.staging.yml up -d

# Rebuild a single service
docker compose --env-file .env.staging -f docker-compose.staging.yml build frontend-web
docker compose --env-file .env.staging -f docker-compose.staging.yml up -d frontend-web

# View logs
docker compose --env-file .env.staging -f docker-compose.staging.yml logs -f api-gateway

# Stop stack (keep data)
docker compose --env-file .env.staging -f docker-compose.staging.yml down

# Stop and remove volumes
docker compose --env-file .env.staging -f docker-compose.staging.yml down -v
```

## Health Checks

| Component          | Endpoint                                      |
|--------------------|-----------------------------------------------|
| API Gateway        | `GET /health`, `GET /health/services`         |
| Auth               | `GET /auth/health`                            |
| Tenants            | `GET /tenants/health`                         |
| Patients           | `GET /patients/health`                        |
| Appointments       | `GET /appointments/health`                    |
| Notes              | `GET /notes/health`                           |
| Billing            | `GET /billing/health`                         |
| Payments           | `GET /payments/health`                        |
| Communication      | `GET /communication/health`                   |
| Reporting          | `GET /reporting/health`                       |
| Event Bus          | `GET /event-bus/health`                       |
| Postgres           | `pg_isready`                                  |
| Redis              | `redis-cli PING`                              |
| NATS               | `GET :8222/healthz`                           |
| Grafana            | `GET /api/health`                             |
| Prometheus         | `GET /-/healthy`                              |
| Tempo              | `GET /ready`                                  |

## Post-Deployment Verification

1. **Portals** — open https://staging.ordella-physio.com and confirm patient, therapist, clinic admin, and super admin routes load.
2. **Login** — authenticate with a staging user; confirm JWT is issued.
3. **Tenant isolation** — request data with different `X-Tenant-Id` headers; confirm cross-tenant access is denied.
4. **API Gateway routing** — `curl https://api.staging.ordella-physio.com/health/services` shows all services `up`.
5. **Observability** — Grafana dashboards display metrics; Loki shows container logs; Tempo receives traces.

## Troubleshooting

- **TLS certificate pending** — ensure port 80 is reachable for ACME HTTP challenge.
- **Migration failures** — check `docker compose logs <service>` and confirm `AUTH_DATABASE_URL` etc. use the same `POSTGRES_PASSWORD`.
- **Frontend API errors** — rebuild `frontend-web` after changing `NEXT_PUBLIC_API_GATEWAY_URL`.
- **Redis connection errors** — confirm `REDIS_URL=redis://redis:6379` and the redis container is healthy.
